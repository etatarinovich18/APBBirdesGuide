import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class SingleBirdAudioTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      playing: false,
      audio: null
    };
    this.dest = `${RNFS.DocumentDirectoryPath}/audio.mp3`;
  }

  createSound() {
    const audio = new Sound(this.dest, '', (error) => {
      if (error) {
        this.setState({soundError: true});
        return;
      }
      const duration = Math.round(audio.getDuration());

      this.setState({ audio, duration });
    });
  }

  onPlayFinishedCallback() {
    clearInterval(this.interval);

    this.state.audio.stop().release();

    this.createSound();

    this.setState({
      playing: false,
      duration: Math.round(this.state.audio.getDuration())
    });
  }

  componentDidMount() {
    Sound.setCategory('Playback');

    const job = RNFS.downloadFile({
      fromUrl: `http://guide.florafauna.by/${this.props.bird.audio}`,
      toFile: this.dest
    });

    job.promise.then(downLoadResult => {
      if (downLoadResult.statusCode === 200) {
        this.setState({
          loading: false
        });
        this.createSound();
      }
    })
  }

  onPressPlay = () => {
    const { audio, playing } = this.state;

    if (!playing) {
      audio.play(this.onPlayFinishedCallback.bind(this));

      this.interval = setInterval(() => {
        const { duration } = this.state;

        this.setState({
          duration: duration - 1
        })
      }, 1000);
    } else {
      clearInterval(this.interval);
      audio.pause();
    }

    this.setState({
      playing: !playing
    });
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
    this.state.audio && this.state.audio.stop();
    this.state.audio && this.state.audio.release();
  }

  render() {
    const voice = this.props.bird.voice;

    // capitalize voice description
    const voiceLetters = voice.split('');

    voiceLetters[0] = voiceLetters[0].toUpperCase();

    return (
        <ScrollView style={{ height: 300 }}>
          <View>
            <Text style={styles.title}>{ voiceLetters.join('') }</Text>
          </View>
          <View style={styles.playButtonWrapper}>
            { !this.state.loading && this.state.audio ? (
              <TouchableOpacity onPress={() => this.onPressPlay()} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <MCIcon name={this.state.playing ? 'pause-circle' : 'play-circle'} style={{ color: '#1d1d1d' }} size={48}  />
                <Text style={styles.seconds}>{ this.state.duration } сек</Text>
              </TouchableOpacity>
            ) : <ActivityIndicator/> }
          </View>
        </ScrollView>
    )
  }
}

const styles = {
  title: {
    marginTop: 10,
    marginLeft: 10,
    color: '#1d1c1c',
  },
  playButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60
  },
  seconds: {
    marginLeft: 10
  }
};

export default SingleBirdAudioTab;
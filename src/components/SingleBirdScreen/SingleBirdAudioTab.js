import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';

import { Audio } from 'expo';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class SingleBirdAudioTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      soundObject: null,
      soundStatus: {},
      soundDuration: '',
      soundPosition: '0:00',
      soundPositionMillis: 0
    };
  }

  async setSoundPosition() {
    const { soundObject } = this.state;
    const roundDurationMillis = 1000 * Math.round(this.state.soundStatus.durationMillis / 1000);

    let soundPosition = '0:00';

    if (roundDurationMillis === this.state.soundPositionMillis) {
      await soundObject.pauseAsync();

      clearInterval(this.timerID);
    }

    soundPosition = this.translateMillisToMinutesWithSeconds(this.state.soundPositionMillis);

    this.state.soundPositionMillis += 1000;
    console.log(soundPosition);
    this.setState({ soundPosition });
  }

  async setSoundDuration() {
    const soundStatus = await this.state.soundObject.getStatusAsync();
    const soundDuration = this.translateMillisToMinutesWithSeconds(soundStatus.durationMillis);

    this.setState({ soundStatus, soundDuration });
  }

  async loadNewSound() {
    const soundObject = new Audio.Sound();

    try {
      await soundObject.loadAsync({ uri: `http://guide.florafauna.by/${this.props.bird.audio}`});
      this.setState({ soundObject, soundStatus: await soundObject.getStatusAsync() });
    } catch (error) {
      this.setState({ soundError: true });
    }

    this.setSoundDuration();
  }

  async onPressPlay() {
    const { soundObject } = this.state;
    const soundStatus = await soundObject.getStatusAsync();

    if (soundStatus.isPlaying) {
      await soundObject.pauseAsync();

      clearInterval(this.timerID);
    } else {
      await soundObject.playAsync();

      this.timerID = setInterval(async () => {
        await this.setSoundPosition();
      }, 1000);
    }

    this.setState({ soundStatus: await soundObject.getStatusAsync() });
  }

  translateMillisToMinutesWithSeconds(millis) {
    const millisRound = 1000 * Math.round(millis / 1000);
    const date = new Date(millisRound);
    const soundMinutes = date.getUTCMinutes();
    const soundSeconds = (date.getUTCSeconds() < 10) ? `0${date.getUTCSeconds()}` : date.getUTCSeconds();

    return soundMinutes + ':' + soundSeconds;
  }

  componentDidMount() {
    this.loadNewSound();
  }

  componentWillUnmount() {
    const { soundObject } = this.state;

    soundObject.stopAsync();

    clearInterval(this.timerID);
  }

  render() {
    const voice = this.props.bird.voice;
    const voiceLetters = voice.split('');

    voiceLetters[0] = voiceLetters[0].toUpperCase();

    return (
        <ScrollView style={{ backgroundColor: '#313131' }}>
          <View>
            <Text style={styles.title}>{ voiceLetters.join('') }</Text>
          </View>
          <View style={styles.playerWrap}>
            <View style={styles.playButtonWrapper}>
              { this.state.soundObject ? (
                <TouchableHighlight underlayColor='transparent' onPress={() => this.onPressPlay()} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <MCIcon name={this.state.soundStatus.isPlaying ? 'pause' : 'play'} style={{ color: '#fff' }} size={40}  />
                </TouchableHighlight>
              ) : <ActivityIndicator/> }
            </View>
            <View style={styles.playContentWrapper}>
              <View style={styles.playContentInfo}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Запись 1</Text>
                <Text style={{ color: '#8f8e94' }}>{ this.state.soundDuration }</Text>
              </View>
              <View style={styles.progressBarWrap}>
                <View style={styles.progressBar}>
                   <View style={styles.downloadedProgressBar}></View>
                </View>
                <View style={styles.progressBarTime}>
                  <Text style={{ color: '#fff' }}>{ this.state.soundPosition }</Text>
                  <Text style={{ color: '#fff' }}>{ this.state.soundDuration }</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
    )
  }
}

const styles = {
  title: {
    marginTop: 21,
    marginBottom: 21,
    marginLeft: 16,
    color: '#fff',
  },
  playerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 78,
    marginBottom: 20,
    paddingLeft: 16,
    paddingRight: 10,
    borderTopWidth: 1,
    borderTopColor: '#464646',
    borderBottomWidth: 1,
    borderBottomColor: '#464646'
  },
  text: {
    color: '#fff'
  },
  playButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 48,
    height: 48,
    marginRight: 24,
    backgroundColor: '#464646',
    borderRadius: 50
  },
  playContentWrapper: {
    flexDirection: 'column',
    height: 78,
    width: '80%',
    marginRight: 16,
    paddingTop: 8,
    paddingBottom: 8
  },
  playContentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    height: '60%'
  },
  progressBarWrap: {
    flexDirection: 'column',
    height: '40%'
  },
  progressBar: {
    flexDirection: 'row',
    height: 4,
    width: '100%',
    marginBottom: 2,
    backgroundColor: '#fff'
  },
  progressBarTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
};

export default SingleBirdAudioTab;

import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';

import { Audio } from 'expo';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class SingleBirdAudioTab extends Component {

  constructor(props) {
    super(props);
    this.soundTimerMillis = 0;
    this.state = {
      soundObject: null,
      soundStatus: {},
      soundDuration: '',
      soundDurationMillis: 0,
      soundTimer: '',
      soundTimeLeft: '',
      downloadedProgressBarWidth: 0
    };
  }

  async setSoundTimer() {
    this.soundTimerMillis += 1000;

    const { soundObject } = this.state;

    let soundTimer = this.translateMillisToMinutesWithSeconds(this.soundTimerMillis);

    if (this.soundTimerMillis >= this.state.soundDurationMillis) {
      this.soundTimerMillis = 0;

      await soundObject.playAsync();
      await soundObject.stopAsync();
      clearInterval(this.timerID);
      this.setSoundInitialState();

      return;
    }

    console.log(1);
    this.setState({
      soundTimer
    });
  }

  async setSoundTimeLeft() {
    let soundTimeLeftMillis = this.state.soundDurationMillis - this.soundTimerMillis;
    let soundTimeLeft = `-${this.translateMillisToMinutesWithSeconds(soundTimeLeftMillis)}`;

    this.setState({
      soundTimeLeft
    });
  }

  async setDownloadedProgressBarWidth() {
    let downloadedProgressBarWidth = (this.soundTimerMillis * 100) / this.state.soundDurationMillis;
    console.log(downloadedProgressBarWidth);
    this.setState({
      downloadedProgressBarWidth
    });
  }

  async setSoundInitialState() {
    const soundStatus = await this.state.soundObject.getStatusAsync();
    const soundDurationMillis = 1000 * Math.round(soundStatus.durationMillis / 1000);
    const soundDuration = this.translateMillisToMinutesWithSeconds(soundStatus.durationMillis);

    this.setState({
      soundStatus,
      soundDuration,
      soundDurationMillis,
      soundTimer: '0:00',
      soundTimeLeft: `-${soundDuration}`,
      progressBarWidth: 0,
      downloadedProgressBarWidth: 0
    });
  }

  async loadNewSound() {
    const soundObject = new Audio.Sound();

    try {
      await soundObject.loadAsync({ uri: `http://guide.florafauna.by/${this.props.bird.audio}` });
      this.setState({
        soundObject,
        soundStatus: await soundObject.getStatusAsync()
      });
    } catch (error) {
      this.setState({
        soundError: true
      });
    }

    this.setSoundInitialState();
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
        await this.setSoundTimer();
        await this.setSoundTimeLeft();
        await this.setDownloadedProgressBarWidth();
      }, 1000);
    }

    this.setState({
      soundStatus: await soundObject.getStatusAsync()
    });
  }

  translateMillisToMinutesWithSeconds(millis) {
    const millisRound = 1000 * Math.round(millis / 1000);
    const date = new Date(millisRound);
    const soundMinutes = date.getUTCMinutes();
    const soundSeconds = (date.getUTCSeconds() < 10) ? `0${date.getUTCSeconds()}` : date.getUTCSeconds();

    return soundMinutes + ':' + soundSeconds;
  }

  onPressProgressBar(event) {
    const { soundObject } = this.state;
    const progressBarWidth = this.state.progressBarWidth;
    let location = event.nativeEvent.locationX;
    let newSoundPositionMillis = 1000 * Math.round(((this.state.soundDurationMillis / progressBarWidth) * location) / 1000);
    let soundTimer = this.translateMillisToMinutesWithSeconds(newSoundPositionMillis);
    this.soundTimerMillis = newSoundPositionMillis;
    console.log(soundTimer);
    soundObject.setPositionAsync(newSoundPositionMillis);
    this.setDownloadedProgressBarWidth();
    this.setSoundTimeLeft();
    this.setState({
      soundTimer
    });
  }

  setProgressBarWidth(event) {
    this.setState({
      progressBarWidth: event.nativeEvent.layout.width
    });
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
                <View onLayout={(event) => this.setProgressBarWidth(event)} style={styles.progressBar}>
                  <TouchableHighlight underlayColor='transparent' onPress={(event) => this.onPressProgressBar(event)} style={{ width: '100%', height: '100%' }}>
                    <View style={{ position: 'absolute', height: 5, backgroundColor: '#c2a855', width: `${this.state.downloadedProgressBarWidth}%` }}></View>
                  </TouchableHighlight>
                </View>
                <View style={styles.progressBarTime}>
                  <Text style={{ color: '#fff' }}>{ this.state.soundTimer }</Text>
                  <Text style={{ color: '#fff' }}>{ this.state.soundTimeLeft }</Text>
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
  downloadedProgressBar: {
    position: 'absolute',
    height: 5,
    width: 5,
    backgroundColor: '#464646'
  },
  progressBarTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
};

export default SingleBirdAudioTab;

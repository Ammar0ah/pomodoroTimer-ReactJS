import React, {Component} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import * as actionTypes from '../types/TimerTypes';
class Timer extends Component {
  state = {
    timestamp: this.props.timestamp,
    sessionEnded: false,
    disabled: false,
  };
  componentDidUpdate() {
    console.log(this.props.rounds, this.props.minutes, this.props.seconds);
  }

  startTimer = () => {
    console.log('rounds', this.props.rounds);
    this.setState({disabled: true});
    this.interval = setInterval(() => {
      let date = new Date();
      date.setMinutes(this.state.timestamp.getMinutes());
      date.setSeconds(this.state.timestamp.getSeconds() - 1);
      this.setState({timestamp: date});

      if (
        this.state.timestamp.getMinutes() == 0 &&
        this.state.timestamp.getSeconds() == 0
        // this.state.sessionEnded == false
      ) {
        console.warn('rounds', this.props.rounds);
        this.props.finished().then(() => {
          this.setState(state => ({
            timestamp: this.props.timestamp,
            disabled: false,
          }));
          console.log('changed');
          // if (this.props.rounds == 3){
          //   this.setState({sessionEnded:true})
          // }
        });
        console.log('rounds', this.props.rounds);

        clearInterval(this.interval);
      }
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.clockView}>
          <Text style={styles.clock}>
            {this.state.timestamp.getMinutes() == 0
              ? '0' + this.state.timestamp.getMinutes().toString()
              : this.state.timestamp.getMinutes()}
          </Text>
          <Text style={{fontSize: 60}}>:</Text>
          <Text style={[styles.clock, {textAlign: 'left'}]}>
            {' '}
            {this.state.timestamp.getSeconds() < 10
              ? '0' + this.state.timestamp.getSeconds().toString()
              : this.state.timestamp.getSeconds().toString()}
          </Text>
        </View>
        <View style={styles.buttonsStack}>
          <View style={styles.startBtn}>
            <Button
              disabled={this.state.disabled}
              color="white"
              title="Start"
              onPress={this.startTimer}
            />
          </View>
          <View style={styles.stopBtn}>
            <Button
              color="white"
              title="Stop"
              onPress={() => {
                clearInterval(this.interval);
                this.setState({disabled: false});
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  clockView: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  clock: {
    width: 100,
    textAlign: 'center',
    fontSize: 60,
    backgroundColor: 'yellow',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'grey',
  },
  buttonsStack: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-around',
  },
  stopBtn: {
    width: 100,
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  startBtn: {
    width: 100,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
});
const MapDispatchToProps = dispatch => {
  return {
    onSession: () => dispatch({type: actionTypes.TIMER_TRAIN}),
    //  finishedRound:()=>dispatch({type:actionTypes.TIMER_FINISHED_ROUND})
  };
};
const MapStateToProps = state => {
  return {
    rests: state.sessions[state.sessionIndex].rests,
    rounds: state.sessions[state.sessionIndex].rounds,
    index : state.sessionIndex,
    sessionEnded:state.sessionEnded,
    // minutes:state.time.min,
    // seconds:state.time.sec
  };
};
export default connect(
  MapStateToProps,
  MapDispatchToProps,
)(Timer);

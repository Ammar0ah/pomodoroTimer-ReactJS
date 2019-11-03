import React, {Component} from 'react';
import {Text, View, Alert, FlatList, TouchableOpacity,StyleSheet} from 'react-native';
import Timer from './Timer';
import {connect} from 'react-redux';
import SessionItem from './sessionItem'
import * as actionTypes from '../types/TimerTypes';



export class Pomodoro extends Component {
         state = {
           visible: false,
         };
         setModalVisability = isVisible => {
           this.setState({visible: isVisible});
         };
         imFinishedRound = () =>
           new Promise(resolve => {
             if (this.props.rounds < 4) {
               Alert.alert(
                 'Round Finished!',
                 'You finished the round successfully',
                 [
                   {
                     text: 'Next Round',
                     onPress: () => {
                       this.props.increaseRounds();
                       resolve();
                     },
                   },
                   {
                     text: 'Take Break',
                     onPress: () => {
                       this.props.increaseBreaks();
                       resolve();
                     },
                   },
                 ],
               );
             } else {
               this.imFinishedSession();
               resolve();
             }
           });

         imFinishedSession = () => {
           Alert.alert('Congrats!!!', 'You finished the Session successfully', [
             {
               text: 'Next Session',
               onPress: () => {
                 this.props.increaseSessions();
               },
             },
             {
               text: 'Take Break',
               onPress: () => {
                 this.props.increaseBreaksSessions();
               },
             },
           ]);
         };
         componentDidUpdate() {
           console.log('skips', this.props.rest);
           if (this.props.rounds == 4) {
           }
         }
         showSessionDetails = () => {
           Alert.alert('Session Detils', {Rounds: this.props.rounds});
         };
         render() {
           console.log(this.props.sessionIndex);
           return (
             <View>
               <Timer
                 timestamp={
                   new Date(
                     0,
                     0,
                     0,
                     0,
                     this.props.minutes,
                     this.props.seconds,
                     0,
                   )
                 }
                 finished={this.imFinishedRound}
               />
               <FlatList
                 data={this.props.sessions}
                 keyExtractor={(item, index) => item + index.toString()}
                 renderItem={item => {
                   return (
                     <TouchableOpacity
                       onPress={() => this.setState({visible: true})}>
                       <View style={styles.listItem}>
                         <Text style={{fontSize: 20, color: '#444'}}>
                           Session {item.index + 1}
                         </Text>
                         <SessionItem rounds={item.item.rounds} skips={item.item.skips}
                         rests={item.item.rests} setVisible={this.setModalVisability} visible={this.state.visible} />
                       </View>
                     </TouchableOpacity>
                   );
                 }}
               />
             </View>
           );
         }
       }
const mapStateToProps = state => {
  return {
    rounds: state.sessions[state.sessionIndex].rounds,
    skips: state.sessions[state.sessionIndex].skips,
    rests: state.sessions[state.sessionIndex].rests,
    sessionIndex: state.sessionIndex,
    minutes: state.time.min,
    seconds: state.time.sec,
    rest: state.sessions[state.sessionIndex].rests,
    sessions: state.sessions,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    increaseRounds: () => dispatch({type: actionTypes.TIMER_Next_ROUND}),
    increaseBreaks: () => dispatch({type: actionTypes.TIMER_REST_ROUND}),
    increaseSessions: () => dispatch({type: actionTypes.TIMER_FINISHED_SESSION}),
    increaseBreaksSessions: () =>
      dispatch({type: actionTypes.TIMER_REST_SESSION}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pomodoro);

const styles = StyleSheet.create({
  listItem:{
    textAlign:'center',
    height:50,
    borderBottomWidth:1,
    borderBottomColor:'#CCC',
    alignItems:'center',
    justifyContent:'center',
    marginTop:10
    
  }
})
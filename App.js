import React, { Component } from 'react'
import { Text, View ,StatusBar,StyleSheet} from 'react-native'
import Pomodoro from './components/Pomodoro'
import {Provider} from 'react-redux'
import store from './store/index'
export default class App extends Component {
  
 
  render() {
    return (
      
      <Provider store={store}>
        <View>
          <View style={styles.bar} />
          <Pomodoro/> 
        </View>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bar: {
    height: 70,
    width: '100%',
    backgroundColor: '#64ccda',
  },
});

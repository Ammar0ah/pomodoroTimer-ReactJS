import React from 'react'
import {Modal, Text, View ,StyleSheet,Button} from 'react-native'

const sessionItem = (props)=> {
    let {rounds , skips , rests,visible} = props
    return (
          <Modal visible={visible} animationType="fade">
            <View style={styles.container}>
              <Text> Skips {skips}  </Text>
              <Text> Rounds {rounds}  </Text>
              <Text> Rests {rests}  </Text>
               <Button title="Go Back" onPress={()=>props.setVisible(false)}/>
            </View>
          </Modal>
        );

}
export default sessionItem
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
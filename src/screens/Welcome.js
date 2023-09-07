import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import pattern from '../../assets/pattern.png';
import welcomelogo from '../../assets/welcomelogo.png'
import { button1 } from '../common/button';
const Welcome = () => {
  return (
    <View style={styles.container}>
        <Image style= {styles.patternbg} source={pattern}/>
        {/* <Text style={styles.head}>Hii</Text> */}
        <View style={styles.conatiner1}>
            
             {/* <Text style={styles.head}>Welcome </Text> */}
            {/* <Image style={styles.logo} source={welcomelogo}/> */}
            <Text style={button1}>Login</Text>
            <Text style={button1}>Signup</Text>
        </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    conatiner:{
        width :'100%',
        height :'100%',
    },
    patternbg:{
        position : 'absolute',
        top : 0,
        // width : '100%',
        // height : '100%',
        zIndex: -1,
    },
    conatiner1:{
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100%'

    },
    logo:{
        width :'70%',
        height:'70%',

    }

})
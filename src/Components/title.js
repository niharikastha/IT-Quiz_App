import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
const Title =({titleText})=>{
    return(
        <View style={styles.container}>
            <Text style={styles.title} >
                {titleText}
            </Text>
        </View>)
}

const styles = StyleSheet.create({
title:{
    fontSize: 30,
    fontWeight: '600',
    color : 'black',
},
 container :{
    paddingVertical : 16,
    justifyContent : 'center',
    alignItems:'center'
 }
})

export default Title
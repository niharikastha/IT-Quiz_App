import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
import pattern from '../../assets/pattern.png';
import logo from '../../assets/mainlogo.png';
import { head1, head2, formGroup, label, input, link, link2 } from '../common/formcss';
import { button1 } from '../common/button';

const Signup = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.patternbg} source={pattern} />
            <View style={styles.conatiner1}>
                <View style={styles.s1}>

                </View>
                <ScrollView style={styles.s2}>
                    <Text style={head1}>Create a new account</Text>
                    <Text style={link2}> Already registered?&nbsp;
                        <Text styel={link} onPress={()=>navigation.navigate('login')}>Login here</Text></Text>
                    <View style={formGroup}>
                        <Text style={label}>Name</Text>
                        <TextInput style={input} placeholder='Enter your Name' />
                    </View>
                    <View style={formGroup}>
                        <Text style={label}>Email</Text>
                        <TextInput style={input}placeholder='Enter your Email' />
                    </View>
                    <View style={formGroup}>
                        <Text style={label}>DOB</Text>
                        <TextInput style={input} placeholder='Enter your date of birth'/>
                    </View>
                    <View style={formGroup}>
                        <Text style={label}>Password</Text>
                        <TextInput style={input} placeholder='Enter your password'/>
                    </View>
                    <View style={formGroup}>
                        <Text style={label}>Confirm Password</Text>
                        <TextInput style={input}placeholder='Confirm your password' />
                    </View>
                    <View style={styles.buttonMargin}>
                        <Text style={button1}>Signup</Text>

                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    conatiner: {
        width: '100%',
        height: '100%',
    },
    patternbg: {
        position: 'absolute',
        top: 0,
        // width : '100%',
        // height : '100%',
        zIndex: -1,
    },
    conatiner1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    s1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
    },
    small1: {
        color: '#fff',
        fontSize: 17,
    },
    h1: {
        fontSize: 30,
        color: '#fff'
    },
    s2: {
        display: 'flex',
        backgroundColor: '#fff',
        width: '100%',
        height: '80%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

        padding: 20
    },
    fp: {
        display: 'flex',
        alignItems: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 5,

    },
    buttonMargin: {
        marginLeft: 80
    }

})
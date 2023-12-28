import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import pattern from '../../assets/pattern.png';
import logo from '../../assets/mainlogo.png';
import { head1, head2, formGroup, label2, input, link, link2, errormessage, bwmessage } from '../common/formcss';
import { button1 } from '../common/button';
import { act } from 'react-test-renderer';
const Verification = ({ navigation, route }) => {
    const { userdata } = route.params;
    const [errormsg, setErrormsg] = useState(null);
    const [userCode, setUserCode] = useState('XXXX');

    async function Sendtobackend() {
        try {

            if (userCode == 'XXXX' || userCode == '') {
                setErrormsg('Please enter the code');
                return;
            }
            else {
                const fdata = {
                    email: userdata.email,
                    otpCode: userCode
                }

                const response = await fetch('http://192.168.38.120:4000/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(fdata)
                })

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                if (data.msg === 'Verification successful ') {
                    alert(data.msg);
                    navigation.navigate('login')
                }
                else if (data.msg === 'User already verified') {
                    alert(data.msg);
                    navigation.navigate('login')
                }
                else if (data.msg === 'Time expired.Please resend a verification code') {
                    alert(data.msg);
                }
                else if (data.msg === 'Invalid credentials') {
                    alert(data.msg);
                }
                else {
                    alert("Something went wrong !! Try Signing Up Again");
                }
            }
        } catch (error) {
            console.error('Error posting otp:', error);
        }


    }
    return (
        <View style={styles.container}>
            <Image style={styles.patternbg} source={pattern} />
            <View style={styles.conatiner1}>
                <View style={styles.s1}>
                    <Image style={styles.logo} source={logo} />
                    <Text style={styles.h1} onPress={() => navigation.navigate('welcome')}>Used2, Inc.</Text>
                    <Text style={styles.small1}>A place where you practice</Text>
                </View>
                <View style={styles.s2}>
                    <Text style={head1}>Verification</Text>

                    <Text style={bwmessage}>A code has been sent to you on your Email</Text>
                    <Text></Text>

                    {

                        errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
                    }

                    <View style={formGroup}>
                        <Text style={styles.label}>Enter Code</Text>
                        <Text></Text>
                        <TextInput style={input}
                            placeholder="Enter 6 digit verification code"
                            onPressIn={() => setErrormsg(null)}
                            secureTextEntry={true}
                            onChangeText={(text) => setUserCode(text)} />
                        <Text style={label2}>Resend Otp</Text>
                    </View>

                    <TouchableOpacity style={styles.buttonMargin}
                        onPress={() => Sendtobackend()}
                    >
                        <Text style={button1}
                        >Verify</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonMargin}
                        onPress={() => navigation.navigate('welcome')}
                    >
                        <Text style={button1}
                        >Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default Verification

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    patternbg: {
        position: 'absolute',
        top: 0,
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
        height: '50%',
    },
    label: {
        fontSize: 20,
        color: '#F50057',
        fontWeight: 'bold',
        textAlign: 'center'
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
        height: '60%',
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
    },
    logo: {
        height: 80,
        resizeMode: 'contain',
    }

})
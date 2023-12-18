import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import pattern from '../../assets/pattern.png';
import logo from '../../assets/mainlogo.png';
import { head1, head2, formGroup, label, input, link, link2, errormessage, bwmessage } from '../common/formcss';
import { button1 } from '../common/button';
import { act } from 'react-test-renderer';
const Verification = ({ navigation, route }) => {
    const { userdata } = route.params;

    const [errormsg, setErrormsg] = useState(null);
    const [userCode, setUserCode] = useState('XXXX');
    const [actualCode, setActualCode] = useState(null);
    // const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setActualCode(userdata[0]?.verificationCode)
    }, [])

    const Sendtobackend = () => {
        // console.log(userCode);
        // console.log(actualCode);

        if (userCode == 'XXXX' || userCode == '') {
            setErrormsg('Please enter the code');
            return;
        }
        else if (userCode == actualCode) {
            // console.log('correct code');
            const fdata = {
                email: userdata[0]?.email,
                password: userdata[0]?.password,
                name: userdata[0]?.name,
                dob: userdata[0]?.dob,
            }

            fetch('http://192.168.29.122:4000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fdata)
            })
                .then(res => res.json())
                .then(data => {
                    // setIsLoading(false);
                    if (data.message === 'User registered successfully') {
                        alert(data.message);
                        navigation.navigate('login')
                    }
                    else {
                        alert("Something went wrong !! Try Signing Up Again");
                    }
                })
        }
        else if (userCode != actualCode) {
            setErrormsg('Incorrect code');
            alert('Incorrect Code')
            return;
        }

    }
    return (
        <View style={styles.container}>
            {/* {isLoading ? (<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Text style={{ fontSize: 30, fontWeight: '800', color: 'black' }} >LOADING...</Text></View>) : (
                <View> */}
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
                                <Text style={styles.label}>Code</Text>
                                <Text></Text>
                                <TextInput style={input}
                                    placeholder="Enter 6 digit verification code"
                                    onPressIn={() => setErrormsg(null)}
                                    secureTextEntry={true}
                                    onChangeText={(text) => setUserCode(text)} />
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
                {/* </View>
            )
            } */}
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
        height: '50%',
    },
    label: {
        fontSize: 20,
        color: '#F50057',
        fontWeight: 'bold',
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
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import pattern from '../../assets/pattern.png';
import logo from '../../assets/mainlogo.png';
import { head1, head2, formGroup, label, input, link, link2, errormessage } from '../common/formcss';
import { button1 } from '../common/button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [fdata, setFdata] = useState({
        email: '',
        password: ''
    })
    const [errormsg, setErrormsg] = useState(null);


    async function Sendtobackend() {

        try {
            if (fdata.email == '' || fdata.password == '') {
                setErrormsg("All fields are required");
                return;
            }
            else {
                const response = await fetch('http://192.168.176.120:4000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(fdata)
                });

                const data = await response.json();

                console.log(data);

                if (data.err) {
                    setErrormsg('Enter Correct details');
                    console.log(data);
                    alert("Please enter correct details.");
                } else {
                    const authToken = data.data;
                    await AsyncStorage.setItem('authToken', authToken);
                    alert('Login Successful');
                    navigation.navigate('category');
                }
            }


        }
        catch (error) {
            console.error('Error logging in:', error);

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
                    <Text style={head1}>Login</Text>
                    <Text style={head2}>Sign in to Continue</Text>
                    {
                        errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
                    }
                    <View style={formGroup}>
                        <Text style={label}>Email</Text>
                        <TextInput style={input}
                            placeholder="Enter your email"
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, email: text })}
                        />
                    </View>
                    <View style={formGroup}>
                        <Text style={label}>Password</Text>
                        <TextInput style={input}
                            placeholder="Enter your password"
                            onPressIn={() => setErrormsg(null)}
                            secureTextEntry={true}
                            onChangeText={(text) => setFdata({ ...fdata, password: text })}
                        />
                    </View>
                    <View style={styles.fp}>
                        <Text style={link}>Forgot Password</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonMargin}
                        onPress={() => Sendtobackend()}
                    >
                        <Text style={button1}
                        >Login</Text>
                    </TouchableOpacity>
                    <Text style={link2}>Don't have an account? &nbsp;
                        <Text styel={link} onPress={() => navigation.navigate('signup')}>Create a new account</Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Login

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
        height: '50%',
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
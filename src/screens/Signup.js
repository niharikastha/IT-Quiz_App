import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import pattern from '../../assets/pattern.png';
import { head1, head2, formGroup, label, input, link, link2, errormessage } from '../common/formcss';
import { button1 } from '../common/button';

const Signup = ({ navigation }) => {

    const [fdata, setFdata] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',

    })

    const [errormsg, setErrormsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validateDob = (dob) => {
        const re = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(19[0-9]{2}|200[0-8])$/;
        return re.test(String(dob));
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(String(password));
    };
    async function Sendtobackend() {
        setLoading(true);
        try {
            if (
                fdata.name == '' ||
                fdata.email == '' ||
                fdata.password == '' ||
                fdata.confirmPassword == '' ||
                fdata.dob == ''
            ) {
                setErrormsg('All fields are required');
                return;
            }
            else if (!validateEmail(fdata.email)) {
                setErrormsg('Please enter a valid email address');
                return;
            } else if (!validateDob(fdata.dob)) {
                setErrormsg('Please enter a valid date of birth. DOB should be less than 01/01/2019');
                return;
            } else if (!validatePassword(fdata.password)) {
                setErrormsg(
                    'Password must be at least 8 characters long with a number, a special character, and a capital letter'
                );
                return;
            } else if (fdata.password != fdata.confirmPassword) {
                setErrormsg("Passwords do not match");
                return;
            }
            else {
                const response = await fetch('http://192.168.176.120:4000/signup', {
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
                if (data.error === 'Invalid credentials') {
                    alert('Invalid Credentials')
                    setErrormsg('Invalid credentials');
                }
                else if (data.msg === "User registered successfully. Verification code sent") {
                    alert(data.msg);
                    navigation.navigate('verification', { userdata: data.data });
                }
            }


        }

        catch (error) {
            console.log("Server error", error);
            setErrormsg("An error occurred. Please try again.");

        }
        finally {
            setLoading(false);
        }
    }
    return (
        <View style={styles.container}>
            <Image style={styles.patternbg} source={pattern} />
            <View style={styles.conatiner1}>
                <View style={styles.s1}>

                </View>
                <ScrollView style={styles.s2}>
                    <Text style={head1}>Create a new account</Text>
                    <Text style={link2}> Already registered?&nbsp;
                        <Text style={link} onPress={() => navigation.navigate('login')}>Login here</Text></Text>
                    {
                        errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
                    }
                    <View style={formGroup}>
                        <Text style={label}>Name</Text>
                        <TextInput style={input} placeholder='Enter your Name'
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, name: text })}
                        />
                    </View>
                    <View style={formGroup}>
                        <Text style={label}>Email</Text>
                        <TextInput style={input} placeholder='Enter your Email'
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, email: text })}

                        />
                    </View>
                    <View style={formGroup}>
                        <Text style={label}>DOB</Text>
                        <TextInput style={input} placeholder='Enter your date of birth'
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, dob: text })}
                        />
                    </View>
                    <View style={formGroup}>
                        <Text style={label}>Password</Text>
                        <TextInput style={input} placeholder='Enter your password'
                            secureTextEntry={true}
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, password: text })}
                        />
                    </View>
                    <View style={formGroup}>
                        <Text style={label}>Confirm Password</Text>
                        <TextInput style={input} placeholder='Confirm your password'
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, confirmPassword: text })}
                        />
                    </View>

                    <TouchableOpacity style={styles.buttonMargin} onPress={() => { Sendtobackend();setErrormsg(null) }}>
                        <View style={styles.loaderContainer}>

                            {loading ? (
                                <ActivityIndicator size="large" color="pink" style={styles.loader} />
                            ) : (
                                <Text style={button1}>Signup</Text>)
                            }
                        </View>

                    </TouchableOpacity>
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
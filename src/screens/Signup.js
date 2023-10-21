import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import pattern from '../../assets/pattern.png';
import logo from '../../assets/mainlogo.png';
import { head1, head2, formGroup, label, input, link, link2, errormessage } from '../common/formcss';
import { button1 } from '../common/button';
import { useAmp } from 'next/amp';

const Signup = ({ navigation }) => {

    const [fdata, setFdata] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
        dob: '',

    })

    const [errormsg, setErrormsg] = useState(null);
    const Sendtobackend = () => {
        // console.log(fdata);
        if(
        fdata.name == '' ||
        fdata.email == '' ||
        fdata.password == '' ||
        fdata.cpassword == '' ||
        fdata.dob == '' 
        )
        {
            setErrormsg('All fields are required');
            return;
        }
        else {
            if (fdata.password != fdata.cpassword){
                setErrormsg("Passowrds do not match");
                return;
            }
            else {
                fetch('http://192.168.29.122:4000/verify',{
                    method : 'POST',
                    headers :{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(fdata)
                })
                .then((res) => res.json())
                .then(
                    (data) =>{
                        // console.log(data);
                        if(data.error === 'Invalid credentials'){
                            setErrormsg('Invalid credentials');
                        }
                        else if(data.message === "Verification code sent to your Email"){
                            // alert('account created successfully');
                            // console.log(data.udata);
                            alert(data.message);
                            navigation.navigate('verification', {userdata : data.udata});
                        }
                    }
                )
                .catch((error) => {
                    console.error('Network request failed:', error.message);
                    // Handle the error here
                  });
                // console.log(fdata);
            }
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
                            onPressIn ={()=> setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, name: text })}
                        />
                    </View>
                    <View style={formGroup}>
                        <Text style={label}>Email</Text>
                        <TextInput style={input} placeholder='Enter your Email'
                            onPressIn ={()=> setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, email: text })}

                        />
                    </View>
                    <View style={formGroup}>
                        <Text style={label}>DOB</Text>
                        <TextInput style={input} placeholder='Enter your date of birth'
                            onPressIn ={()=> setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, dob: text })}
                        />
                    </View>
                    <View style={formGroup}>
                        <Text style={label}>Password</Text>
                        <TextInput style={input} placeholder='Enter your password'
                            secureTextEntry={true}
                            onPressIn ={()=> setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, password: text })}
                        />
                    </View>
                    <View style={formGroup}>
                        <Text style={label}>Confirm Password</Text>
                        <TextInput style={input} placeholder='Confirm your password'
                            onPressIn ={()=> setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, cpassword: text })}
                        />
                    </View>
                
                    <TouchableOpacity style={styles.buttonMargin}
                        onPress={() => {
                            Sendtobackend();
                        }}>
                        <Text style={button1}>Signup</Text>
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
    buttonMargin: {
        marginLeft: 80
    }

})
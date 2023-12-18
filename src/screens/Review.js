import React from 'react';
import { useEffect } from 'react';
import { useState, useRef } from 'react';import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Review = ({ navigation, route }) => {
    const { courseID} = route.params;

    console.log(courseID,"++++++++++++++++++++++++++++++++++++");
    async function fetchQuestions() {
        try {            
            const authToken = await AsyncStorage.getItem('authToken');
            if (!authToken) {
                navigation.navigate('login');
                return;
            }
            console.log(authToken);
            const response = await fetch(`http://192.168.29.122:4000/api/reviewQuiz/${courseID}`,{
                headers:{
                    Authorization: `Bearer ${authToken}`,
                }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }
    useEffect(() => {
        fetchQuestions();
    }, [ ]);


    return (
       <View>
                                        <Text style={styles.timerText}>00</Text>

    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%',
    },
    top: {
        marginVertical: 16,
    },
    timer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timerBox: {
        width: 30, 
        height: 30, 
        backgroundColor: '#F50057', 
        borderRadius: 5, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        color: 'white',
        fontSize: 16, 
        fontWeight: 'bold',
    },
    timerSeparator: {
        fontSize: 16, 
        marginHorizontal: 5,
    },
    question_no_container: {
        width: 50,
        height: 50,
        backgroundColor: "#F50057",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 150,
    },
    question_no: {
        alignContent: "center",
        fontWeight: "900",
        fontSize: 20,
    },
    options: {
        marginVertical: 16,
        flex: 1,
    },
    bottom: {
        marginBottom: 12,
        paddingVertical: 16,
        justifyContent: "space-between",
        flexDirection: 'row',
    },
    button: {
        backgroundColor: "#F50057",
        padding: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    question: {
        fontSize: 28,
        color: "black",

    },
    option: {
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
    },
    optionButton: {
        paddingVertical: 12,
        marginVertical: 6,
        backgroundColor: '#FFB0CC',
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    parent: {
        height: '100%',
    }
    
})

export default Review;

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Review = ({ navigation, route }) => {
    const { quizId } = route.params;
    const [responseData, setResponseData] = useState([]);
    const [responseObject, setResponseObject] = useState([]);
    const [responseEachQuestion, setResponseEachQuestion] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const mounted = useRef(true);

    async function fetchQuestions() {
        try {
            const authToken = await AsyncStorage.getItem('authToken');
            if (!authToken) {
                navigation.navigate('login');
                return;
            }
            const response = await fetch(`http://192.168.29.122:4000/api/reviewQuiz/${quizId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (mounted.current) {
                setResponseData(data.data);
                setResponseObject(data.data.quizRes);
                // setResponseEachQuestion(data.data.quizRes[0]);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }

    useEffect(() => {
        mounted.current = true;
        fetchQuestions();
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        console.log(responseObject);
        if (responseObject.length > 0) {
             setResponseEachQuestion(responseObject[0]);
        }
    }, [responseObject]);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>LOADING...</Text>
                </View>
            ) : (
                responseObject && responseEachQuestion && (
                    <View style={styles.parent}>
                        <View style={styles.timer}>
                            {/* Timer UI goes here */}
                        </View>
                        {/* <View style={styles.questionContainer}>
                            <Text style={styles.questionText}>{responseEachQuestion.question_text}</Text>
                        </View> */}
                        {/* <View style={styles.options}>
                            {responseEachQuestion.options.map((option, index) => (
                                <TouchableOpacity key={index} style={styles.optionButton}>
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View> */}
                        <View style={styles.bottom}>
                            {/* Navigation buttons go here */}
                        </View>
                    </View>
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%',
    },
    parent: {
        height: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 30,
        fontWeight: '800',
        color: 'black',
    },
    timer: {
        // Timer styles
    },
    questionContainer: {
        marginVertical: 16,
    },
    questionText: {
        fontSize: 28,
        color: 'black',
    },
    options: {
        marginVertical: 16,
        flex: 1,
    },
    optionButton: {
        paddingVertical: 12,
        marginVertical: 6,
        backgroundColor: '#FFB0CC',
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    optionText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
    },
    bottom: {
        marginBottom: 12,
        paddingVertical: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    // Add styles for navigation buttons if needed
});

export default Review;

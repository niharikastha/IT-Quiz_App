import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Review = ({ navigation, route }) => {
    const { quizId, courseId } = route.params;
    const [ques, setQues] = useState(0);
    const [quizRes, setQuizRes] = useState([]);
    const [userQues, setUserQues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const mounted = useRef(true);

    async function fetchQuestions() {
        try {
            const authToken = await AsyncStorage.getItem('authToken');
            if (!authToken) {
                navigation.navigate('login');
                return;
            }

            const response = await fetch(`http://192.168.159.120:4000/api/reviewQuiz/${quizId}/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // console.log(data.data);
            if (data && data.data && data.data.quizRes && data.data.userQues) {
                setQuizRes(data.data.quizRes);
                setUserQues(data.data.userQues);
                setIsLoading(false);
            } else {
                throw new Error('Invalid response structure');
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

    const handleMenuPress = () => {
        navigation.navigate('category');
    };


    return (
        <ScrollView style={styles.scrollView}>

            <View style={styles.container}>
                {isLoading ? (
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Text style={{ fontSize: 30, fontWeight: '800', color: 'black' }} >LOADING...</Text>
                    </View>
                ) : (
                    quizRes[0] && userQues[0] && (
                        <View style={styles.parent}>
                            <View style={styles.questionContainer}>
                        // Inside the map function for questions
                                {userQues.map((question, index) => {
                                    const userAnswer = quizRes[index].chosen_answer;
                                    const correctAnswer = question.correct_answer;
                                    const isCorrect = userAnswer === correctAnswer;
                                    const isSkipped = question.skipped_question;

                                    return (
                                        <View key={index} style={styles.questionItem}>
                                            <View style={styles.top}>
                                                <Text style={styles.question}>{question.question_text}</Text>
                                            </View>
                                            {question.options.map((option, optionIndex) => (
                                                <TouchableOpacity
                                                    key={optionIndex}
                                                    style={[
                                                        styles.optionButton,
                                                        {
                                                            backgroundColor: isSkipped && correctAnswer === option
                                                                ? 'purple' // Highlight correct answer in purple for skipped questions
                                                                : userAnswer === option
                                                                    ? isCorrect
                                                                        ? 'green' // Chosen and correct option
                                                                        : 'red' // Chosen but incorrect option
                                                                    : correctAnswer === option
                                                                        ? 'green' // Correct option
                                                                        : '#FFB0CC', // Default background color
                                                        },
                                                    ]}
                                                    disabled
                                                >
                                                    <Text style={styles.option}>{option}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    );
                                })}

                            </View>
                            <View style={styles.bottom}>
                                <TouchableOpacity style={styles.button} onPress={handleMenuPress}>
                                    <Text style={styles.buttonText}>MENU</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%',
    },
    top: {
        marginVertical: 16,
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
        // alignContent:'center'
    },
    button: {
        backgroundColor: "#F50057",
        padding: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 30,
        alignContent: 'center'
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
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    parent: {
        height: '100%',
    },
    questionItem: {
        marginBottom: 25,


    }
});

export default Review;

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Review = ({ navigation, route }) => {
    const { quizId } = route.params;
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

            const response = await fetch(`http://192.168.29.122:4000/api/reviewQuiz/${quizId}`, {
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

    const handleNextPress = () => {
        if (ques < userQues.length - 1) {
            setQues(ques + 1);
        }
    };

    const handlePrevPress = () => {
        if (ques > 0) {
            setQues(ques - 1);
        }
    }

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Text style={{ fontSize: 30, fontWeight: '800', color: 'black' }} >LOADING...</Text>
                </View>
            ) : (
                quizRes[0] && userQues[0] && (
                    <View style={styles.parent}>
                        <View style={styles.question_no_container}>
                            <Text style={styles.question_no}>{ques + 1}</Text>
                        </View>
                        <View style={styles.questionContainer}>
                            {userQues.map((question, index) => {
                                const userAnswer = quizRes[index].chosen_answer;
                                const correctAnswer = question.correct_answer;
                                const isCorrect = userAnswer === correctAnswer;

                                return (
                                    <View key={index} style={styles.questionItem}>
                                        <View style={styles.top}>
                                            <Text style={styles.question}>{question.question_text}</Text>
                                        </View>
                                        {/* Display options */}
                                        {question.options.map((option, optionIndex) => (
                                            <TouchableOpacity
                                                key={optionIndex}
                                                style={[
                                                    styles.optionButton,
                                                    {
                                                        backgroundColor: userAnswer === option
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
                            <TouchableOpacity style={styles.button} onPress={handlePrevPress}>
                                <Text style={styles.buttonText}>PREV</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                                <Text style={styles.buttonText}>NEXT</Text>
                            </TouchableOpacity>
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
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    parent: {
        height: '100%',
    }
});

export default Review;

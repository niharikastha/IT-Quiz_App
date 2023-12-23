import React from 'react';
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Quiz = ({ navigation, route }) => {
    const { quizId, courseId, courseName } = route.params;
    // console.log(quizId);
    const [remainingTime, setRemainingTime] = useState(20);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [ques, setQues] = useState(0);
    const [score, setScore] = useState(0);
    const [corr, setCorr] = useState(0);
    const [incorr, setIncorr] = useState(0);
    const [responseSubmitted, setResponseSubmitted] = useState(false);
    let selectedAnswer = "";


    async function fetchQuestions() {
        try {
            const authToken = await AsyncStorage.getItem('authToken');
            if (!authToken) {
                navigation.navigate('login');
                return;
            }
            const response = await fetch(`http://192.168.159.120:4000/api/questions/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            // console.log(data);
            setQuestions(data.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching questions:", error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            setCurrentQuestion(questions[0]);
        }
    }, [questions]);


    useEffect(() => {
        const timer = setInterval(decrementTime, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [remainingTime]);

    const decrementTime = () => {
        if (remainingTime > 0) {
            setRemainingTime(remainingTime - 1);
        } else {
            handleNextPress();
        }
    };

    const resetTimer = () => {
        setRemainingTime(20);
    }




    async function responsetrack() {
        try {
            const authToken = await AsyncStorage.getItem('authToken');
            const response = {
                quiz_id: quizId,
                user_id: authToken,
                question_id: currentQuestion._id,
                response_at: new Date(),
                chosen_answer: selectedAnswer,
                correct_answer: currentQuestion.correct_answer,
            };

            const res = await fetch("http://192.168.159.120:4000/api/quiz-response/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(response),
            });

            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error('Network request failed:', error.message);
        }
    }




    const handleSelectedOption = (_option) => {

        selectedAnswer = _option;
        if (ques !== 4) {
            setQues(ques + 1)
            if (_option == currentQuestion.correct_answer) {
                setScore(score + 4)
                setCorr(corr + 1)
                handleNextPress()
            }
            else {
                setScore(score - 1)
                setIncorr(incorr + 1)
                handleNextPress()
            }
        }
        if (ques === 4) {
            if (_option == currentQuestion.correct_answer) {
                setScore(score + 4)
                setCorr(corr + 1)
            }
            else {
                setScore(score - 1)
                setIncorr(incorr + 1)
            }
            handleShowResult()
        }
    }
    const handleNextPress = () => {
        if (!responseSubmitted) {
            responsetrack();
            setResponseSubmitted(true);
        }
        resetTimer();
        if (ques === 4) {
            setResponseSubmitted(false);
            handleShowResult();
        } else if (ques < 4) {
            setCurrentQuestion(questions[ques + 1]);
            setQues(ques + 1);
            setResponseSubmitted(false);
        }
    };


    const handleSkipPress = () => {
        resetTimer();
        setCurrentQuestion(questions[ques + 1]);
        setQues(ques + 1);

    }

    const handlePrevPress = () => {
        resetTimer();
        setCurrentQuestion(questions[ques - 1]);
        setQues(ques - 1);

    }

    const handleShowResult = () => {
        if (!responseSubmitted) {
            responsetrack();
            setResponseSubmitted(true);
        }
         navigation.navigate('result', {
            score: score, correct: corr, incorrect: incorr, courseId: courseId, quizId: quizId
        });
    }

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Text style={{ fontSize: 30, fontWeight: '800', color: 'black' }} >LOADING...</Text>
                </View>
            ) : (
                questions[0] && currentQuestion &&
                <View style={styles.parent}>
                    <View style={styles.timer}>
                        <View style={styles.question_no_container}>
                            <Text style={styles.question_no}>{ques + 1}</Text>
                        </View>
                        <View style={styles.timerContainer}>
                            <View style={styles.timerBox}>
                                <Text style={styles.timerText}>00</Text>
                            </View>
                            <Text style={styles.timerSeparator}>:</Text>
                            <View style={styles.timerBox}>
                                <Text style={styles.timerText}>{remainingTime}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.top}>
                        <Text style={styles.question}>{currentQuestion.question_text}</Text>
                    </View>
                    <View style={styles.options}>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(currentQuestion.options[0])}>
                            <Text style={styles.option}>{currentQuestion.options[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(currentQuestion.options[1])}>
                            <Text style={styles.option}>{currentQuestion.options[1]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(currentQuestion.options[2])}>
                            <Text style={styles.option}>{currentQuestion.options[2]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(currentQuestion.options[3])}>
                            <Text style={styles.option}>{currentQuestion.options[3]}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottom}>
                        {/* {ques !== 0 && <TouchableOpacity style={styles.button} onPress={handlePrevPress}>
                            <Text style={styles.buttonText}>PREV</Text>
                        </TouchableOpacity>} */}
                        {ques !== 4 && <TouchableOpacity style={styles.button} onPress={handleSkipPress}>
                            <Text style={styles.buttonText}>SKIP</Text>
                        </TouchableOpacity>}
                        {ques !== 4 && <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                            <Text style={styles.buttonText}>NEXT</Text>
                        </TouchableOpacity>}
                        {ques === 4 && <TouchableOpacity style={styles.button} onPress={handleShowResult}>
                            <Text style={styles.buttonText}>SHOW RESULTS</Text>
                        </TouchableOpacity>}

                    </View>
                </View>
            )
            }
        </View>
    )
}

export default Quiz

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
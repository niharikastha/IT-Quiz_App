import React from 'react';
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Quiz = ({ navigation, route }) => {
    let data = "";
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [ques, setQues] = useState(1);
    const [score, setScore] = useState(0);

    async function fetchQuestions() {
        try {
            const response = await fetch("http://192.168.29.122:4000/api/questions");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setQuestions(data.questions);
            setCurrentQuestion(data.questions[0]);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }
    useEffect(() => {
        fetchQuestions();
        if (data) {
            setCurrentQuestion(data.questions[0]);
          }
    }, []);

    const handleSelectedOption = (_option) => {
        if (ques !== 5) {
            setQues(ques + 1)
        }
        if (ques === 5) {
            handleShowResult()
        }
        if (_option == currentQuestion.correct_answer) {
            setScore(score + 4)
            handleNextPress()
        }
        else {
            setScore(score - 1)
            handleNextPress()
        }
    }
    const handleNextPress = () => {
        setQues(ques + 1);
        if (ques === 5) {
          handleShowResult();
        } else { 
            setCurrentQuestion(questions[ques]);
        }
    }

    const handleSkipPress =()=>{
        setQues(ques + 1);
        setCurrentQuestion(questions[ques]);
    }

    const handlePrevPress =()=>{
        setQues(ques - 1);
        setCurrentQuestion(questions[ques]);

    }

    const handleShowResult = () => {
        navigation.navigate('result', {
            score: score
        });
    }

    return (
        <View style={styles.container}>
            {isLoading ? (<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Text style={{ fontSize: 30, fontWeight: '800', color: 'black' }} >LOADING...</Text></View>) : (
               currentQuestion && currentQuestion.question_text &&
                <View style={styles.parent}>
                    <View style={styles.top}>
                        <Text style={styles.question}>Q. {currentQuestion.question_text}</Text>
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
                        {ques !==0 && <TouchableOpacity style={styles.button} onPress={handlePrevPress}>
                            <Text style={styles.buttonText}>PREV</Text>
                        </TouchableOpacity>}
                         {ques !== 5 && <TouchableOpacity style={styles.button} onPress={handleSkipPress}>
                            <Text style={styles.buttonText}>SKIP</Text>
                        </TouchableOpacity>}
                         {ques !== 5 && <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                            <Text style={styles.buttonText}>NEXT</Text>
                        </TouchableOpacity>}
                        {ques === 5 && <TouchableOpacity style={styles.button} onPress={handleShowResult}>
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
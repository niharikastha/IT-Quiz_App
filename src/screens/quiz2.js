import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
const Quiz = ({ navigation , route}) => {
    const {data} = route.params;

    const [questions, setQuestions] = useState();
    const [ques, setQues] = useState(0);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true)

    const getQuiz = async () => {
        const url = "http://192.168.29.122:4000/api/questions";
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.results[0]);
        setQuestions(data.results);
        setOptions(generateOptionsAndShuffle(data.results[0]))
        setIsLoading(false)
    };
    useEffect(() => {
        getQuiz();
    }, []);
    const handleNextPress = () => {
        setQues(ques + 1)
        setOptions(generateOptionsAndShuffle(questions[ques + 1]))

    }

    const generateOptionsAndShuffle = (_question) => {
        const options = [..._question.incorrect_answers]
        options.push(_question.correct_answer)
        shuffleArray(options)
        return options;
    }

    const handleSelectedOption = (_option) => {
        if (_option === questions[ques].correct_answer) {
            setScore(score + 4)
        }
        if (_option === questions[ques].incorrect_answers) {
            setScore(score - 1)
        }
        if (ques !== 9) {
            setQues(ques + 1)
            setOptions(generateOptionsAndShuffle(questions[ques + 1]))
        }
        if (ques === 9) {
            handleShowResult()
        }
    }

    const handleShowResult = () => {
        navigation.navigate('result', {
            score: score
        });
    }
    return (
        <View style={styles.container}>
            {isLoading ? <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Text style={{ fontSize: 30, fontWeight: '800', color: 'black' }} >LOADING...</Text></View> :
                questions &&
                <View style={styles.parent}>
                    <View style={styles.top}>
                        <Text style={styles.question}>Q. {decodeURIComponent(questions[ques].question)}</Text>
                    </View>
                    <View style={styles.options}>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[0])}>
                            <Text style={styles.option}>{decodeURIComponent(options[0])}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[1])}>
                            <Text style={styles.option}>{decodeURIComponent(options[1])}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[2])}>
                            <Text style={styles.option}>{decodeURIComponent(options[2])}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[3])}>
                            <Text style={styles.option}>{decodeURIComponent(options[3])}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottom}>
                        
                        {ques !== 9 && <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                            <Text style={styles.buttonText}>SKIP</Text>
                        </TouchableOpacity>}
                        {ques === 9 && <TouchableOpacity style={styles.button} onPress={handleShowResult}>
                            <Text style={styles.buttonText}>SHOW RESULTS</Text>
                        </TouchableOpacity>}

                    </View>
                </View>
            }
        </View>
    )

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
        color: 'white',
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

export default Quiz
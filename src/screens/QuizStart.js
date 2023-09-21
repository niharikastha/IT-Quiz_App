import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Title from '../Components/title';

const QuizStart = ({ navigation, route }) => {
    const { data } = route.params;
    return (
        <View style={styles.container}>
            <Title titleText={data} />
            <View style={styles.bannerContainer}>
                <Image source={{
                    uri: 'https://cdni.iconscout.com/illustration/premium/thumb/giving-different-feedback-and-review-in-websites-2112230-1779230.png',
                }}
                    style={styles.banner}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.ruleContainer}>
                <View style={styles.ruleNameContainer}>
                    <Text style={styles.ruleName}>Rules</Text>
                </View>
                <View style={styles.rulesBlock}>
                    <Text style={styles.rule}>
                        1. You will be presented with a series of multiple-choice questions.
                    </Text>
                    <Text style={styles.rule}>
                        2. Each correct answer will earn you 4 points.
                    </Text>
                    <Text style={styles.rule}>
                        3. Each incorrect answer will deduct 1 point.
                    </Text>
                    <Text style={styles.rule}>
                        4. You can choose to skip a question if you're unsure, but it will earn you 0 points.
                    </Text>
                    <Text style={styles.rule}>
                        5. The total score will be calculated at the end of the quiz.
                    </Text>
                    <Text style={styles.rule}>
                        6. Good luck, and have fun!
                    </Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("quiz",{data})} style={styles.button}>
                <Text style={styles.buttonText}>
                    Start
                </Text>
            </TouchableOpacity>
        </View>)
}

const styles = StyleSheet.create({
    banner: {
        height: 300,
        width: 300,
    },
    bannerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%'
    },
    button: {
        width: '100%',
        backgroundColor: "#F50057",
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
    },
    ruleContainer: {
        flex: 1,
    },
    ruleNameContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    ruleName: {
        color: 'black',
        fontSize: 25,
        textDecorationLine: 'underline',
    },
    rulesBlock: {
        backgroundColor: '#FFB0CC',
        flex: 1,
        borderRadius: 20,
        marginBottom: 20,
        marginTop: 10,
        paddingLeft: 20,
        paddingTop: 10,

    },
    rule: {
        fontSize: 14,
        marginBottom: 10,
        color:'black'
      },
});

export default QuizStart
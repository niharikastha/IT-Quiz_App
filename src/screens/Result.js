import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Title from '../Components/title';



const Result = ({ navigation, route }) => {
    const { score } = route.params
    const resultBanner = score > 10 ? "https://cdni.iconscout.com/illustration/premium/thumb/men-celebrating-victory-4587301-3856211.png" : "https://cdni.iconscout.com/illustration/free/thumb/concept-about-business-failure-1862195-1580189.png"

    return (
        <View style={styles.container}>
            <Title titleText='Result' />
            <Text style={styles.scoreValue}>{score}</Text>
            <View style={styles.bannerContainer}>
                <Image
                    source={{
                        uri: resultBanner,
                    }}
                    style={styles.banner}
                    resizeMode="contain"
                />
            </View >
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('category')} style={styles.button}>
                    <Text style={styles.buttonText}>Homepage</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('category')} style={styles.button}>
                    <Text style={styles.buttonText}>Dashboard</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
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
        height: '100%',
    },
    button: {
        width: '50%',
        backgroundColor: '#F50057',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
    },
    scoreValue: {
        fontSize: 40,
        fontWeight: '800',
        alignSelf: 'center',
        color:'black'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        padding:20,
        gap: 50
    }
})

export default Result;

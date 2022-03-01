import React, {useState} from 'react'
import { StatusBar, SafeAreaView, TextInput, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'

import app from '../../../../firebase'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

const Login = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = () => {
        signInWithEmailAndPassword(getAuth(app), email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user.email)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
        });
      }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
            <TextInput 
                    placeholder='Email'
                    value={email}
                    onChangeText={text =>setEmail(text)}></TextInput>
                <TextInput 
                    placeholder='Password' 
                    value={password}
                    onChangeText={text =>setPassword(text)}
                    secureTextEntry></TextInput>
            </View>
            <TouchableOpacity onPress={() => handleLogin()}>
                <Text>
                    Log-in
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container:{
        marginTop: StatusBar.currentHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    }
})

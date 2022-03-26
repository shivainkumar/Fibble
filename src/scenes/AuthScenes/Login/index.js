import React, {useState} from 'react'
import { StatusBar, SafeAreaView, TextInput, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'

import app from '../../../../firebase'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import * as Colors from "../../../styles/colors"


const Login = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")

    const handleLogin = () => {
        signInWithEmailAndPassword(getAuth(app), email.trim(), password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user.email)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            switch (errorCode) {
                case "auth/invalid-email":
                    setError("Invalid Email")
                    break;
                case "auth/invalid-password":
                    setError("Invalid Password")
                    break;
                default:
                    break;
            }
            console.log(errorCode)
        });
      }
    return (
        <SafeAreaView style={styles.container}>
             <View style={{width: "100%", alignItems: "flex-start"}}>
                <Text style={{fontSize: 28, color: Colors.WHITE, fontWeight: "bold"}}>Welcome {'\n'}Back.</Text>
            </View>
            <View style={styles.inputContainer}>
            <TextInput 
                style={styles.inputs}
                placeholderTextColor={Colors.WHITE}
                placeholder='Email'
                value={email}
                onChangeText={text =>setEmail(text)}/>
            <TextInput 
                style={styles.inputs}
                placeholderTextColor={Colors.WHITE}
                placeholder='Password' 
                value={password}
                onChangeText={text =>setPassword(text)}
                secureTextEntry/>
            </View>
            {error? 
             <View>
                <Text>
                    {error}
                </Text>
            </View>:
            null
            }
           
            <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                <Text style={{color: Colors.WHITE}}>
                    Log-in
                </Text>
            </TouchableOpacity>
            <Image style={{height: "30%", width: 150}} source={require('../../../assets/welcomeImage2.png')}/>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        padding: 50
    },
    inputContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: "40%"
    },
    inputs:{
        color: Colors.SECONDARY,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginVertical: 5,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.SECONDARY,
        width: '100%'
    },
    button:{
        width:"100%",
        backgroundColor: Colors.SECONDARY,
        padding: 20,
        alignItems: 'center'
    }
})

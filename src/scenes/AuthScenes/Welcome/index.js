import React, {useState} from 'react'
import { StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View, KeyboardAvoidingView, Image, SafeAreaView } from 'react-native'
import { Backdrop } from 'react-native-backdrop';
import * as Colors from '../../../styles/colors'
import LoginScreen from '../Login'
import SignupScreen from '../Signup'

const Welcome = ({navigation}) => {
    //visibility state for the backdrop
    const [visible, setVisible] = useState(false);
    const [signUp, setSignUp] = useState(null)

    //toggles the visibility of the backdrop element

    const toggleVisibilityLogin = () => {
       
        setSignUp(false)
        setVisible(!visible)
    }
    const toggleVisibilitySignup = () => {
        
        setSignUp(true)
        setVisible(!visible)
    }

    const toggleVisibility = () => {
       
        setVisible(!visible)
    }
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.logoContainer}>
                <Image style={styles.logo} resizeMode='center' resizeMethod='resize' source={require('../../../assets/logo.png')}/>
            </View>
            <Image style={styles.centerImage} resizeMode='contain' resizeMethod='resize' source={require('../../../assets/welcomeImage.png')} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.continueButton} onPress={() => toggleVisibilityLogin()}>
                    <Text style={styles.continueButtonText}>
                        Log-in
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.continueButton} onPress={() => toggleVisibilitySignup()}>
                    <Text style={styles.continueButtonText}>
                        Sign-up
                    </Text>
                </TouchableOpacity>
            </View>
            
            <Backdrop
                
                visible={visible}
                handleOpen={toggleVisibility}
                handleClose={toggleVisibility}
                onClose={() => {}}
                swipeConfig={{
                  velocityThreshold: 0.3,
                  directionalOffsetThreshold: 100,
                }}
                animationConfig={{
                  speed: 14,
                  bounciness: 4,
                }}
                overlayColor="rgba(0,0,0,0.32)"
                backdropStyle={{
                  backgroundColor: Colors.PRIMARY,
                }}>
                    <View style={styles.backDropContainer}>
                        {/* <View style={{height: "20%", backgroundColor: Colors.SECONDARY, opacity: 0.2}}>
                            <Text>f</Text>
                        </View> */}
                        <View style={{width:'100%', height: "100%"}}>
                            {signUp?  <SignupScreen/>:<LoginScreen/> }
                        </View>
                       
                        {/* <TouchableOpacity onPress={() => {navigation.navigate('Signup')}}>
                            <Text>
                                Signup
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
                            <Text>
                                Login
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.socialButtonsContainer}>
                            <TouchableOpacity><Text>Continue with google</Text></TouchableOpacity>
                            <TouchableOpacity><Text>Continue with facebook</Text></TouchableOpacity>
                        </View> */}
                    </View>
            </Backdrop>
        </SafeAreaView>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.WHITE
    },
    backDropContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY
        
    },
    socialButtonsContainer:{
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    logo:{
        minWidth: "100%",
        flex: 1
    },
    centerImage:{
        margin: 2,
        flex: 2,
        maxWidth: '95%'
    },
    continueButton:{
        backgroundColor: Colors.SECONDARY,
        paddingVertical: 20,
        width: "40%",
        alignItems: 'center',
        borderRadius: 20
    },
    continueButtonText:{
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: "bold"
    },
    logoContainer:{
        flex: 1
    },
    buttonContainer:{
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
       
    }
})

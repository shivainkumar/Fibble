import React, {useState} from 'react'
import { StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View, SafeAreaView } from 'react-native'
import { Backdrop } from 'react-native-backdrop';



const Welcome = ({navigation}) => {
    //visibility state for the backdrop
    const [visible, setVisible] = useState(false);


    //toggles the visibility of the backdrop element
    const toggleVisibility = () => {
        console.log(visible)
        setVisible(!visible)
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text>
                welcome and shit
            </Text>
            <TouchableOpacity onPress={() => toggleVisibility()}>
                <Text>
                    Lets get started
                </Text>
            </TouchableOpacity>
            <Backdrop
            style
                visible={visible}
                handleOpen={toggleVisibility}
                handleClose={toggleVisibility}
                onClose={() => {}}
                swipeConfig={{
                  velocityThreshold: 0.3,
                  directionalOffsetThreshold: 80,
                }}
                animationConfig={{
                  speed: 14,
                  bounciness: 4,
                }}
                overlayColor="rgba(0,0,0,0.32)"
                backdropStyle={{
                  backgroundColor: '#fff',
                }}>
                    <View style={styles.backDropContainer}>
                    <TouchableOpacity onPress={() => {navigation.navigate('Signup')}}>
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
                    </View>
                    </View>
            </Backdrop>
        </SafeAreaView>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container:{
        marginTop: StatusBar.currentHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backDropContainer:{
        height:'80%',
        borderTopLeftRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    socialButtonsContainer:{
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row'
    }
})

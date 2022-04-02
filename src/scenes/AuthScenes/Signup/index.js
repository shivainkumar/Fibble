import React, {useState, useEffect} from 'react'
import { StatusBar, Alert, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity, View, Image, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import * as ImagePicker from 'expo-image-picker'; 
import { AntDesign } from '@expo/vector-icons';
import {app, db, storage} from '../../../../firebase'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import * as Colors from "../../../styles/colors"

const Signup = ({navigation}) => {
  
    const [email, setEmail] = useState('')
    const [displayName, setName] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState("")
    const auth = getAuth(app);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        
        console.log(result.uri);
        if (!result.cancelled) {
          setImage(result.uri);
        }
    };

    const uploadImage = async(userCredentials) =>{
        
        if (image) {
            const childPath = `profilePictures/${userCredentials.user.uid}`;
            const res = await fetch(image);
            const blob = await res.blob();
            const storageRef = ref(storage, childPath);
            await uploadBytes(storageRef, blob);
            const url = await getDownloadURL(storageRef)
            console.log("url ", url)
            await updateProfile(userCredentials.user, {
                displayName: displayName,
                photoURL: url
            })
            console.log(userCredentials.user.photoURL);
        } else {
            console.log("unable to upload");
        }
    }

    const createUserInDatabase = async (user) =>{
        await setDoc(doc(db, "users", user.uid), {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL
        })
    }

    const handleSignUp = async() => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email.trim(), password.trim())
            //uploads an image to the storage named as the Uid and updates the photoURL to the profile
            await uploadImage(userCredentials)
            //creates a database record
            await createUserInDatabase(userCredentials.user);  
        } catch (error) {
            triggerAlert(error.code)
            console.log(error.code);
        }
            
    }

    const ImageButton = () =>{
        if (image == null) {
            return(
                <View style={{alignItems: 'center', justifyContent: 'center', height: 80, width: "100%", borderRadius:40, padding: 20, backgroundColor: Colors.SECONDARY}}>
                    <AntDesign name="camera" size={30} color={Colors.WHITE} />
                </View>
                
            )
        } else {
            return(
                <View style={{padding: 15, backgroundColor: Colors.SECONDARY}}>
                    <Image style={{width: 100, height: 100}} source={{ uri: image }}/>
                </View>
            )
        }
    }
    
    const triggerAlert = (errorCode) =>{
        let errorMessage = ""

        switch (errorCode) {
            case "auth/invalid-email":
                errorMessage = "Invalid Email"
                break;
            case "auth/invalid-password":
                errorMessage = "Invalid Password"
                break;
            default:
                break;
        }
        Alert.alert(
            "Invalid Input",
            errorMessage,
            [
              { text: "Try again", onPress: () => console.log("OK Pressed") }
            ]
          );
    }

    return (
        <View style={styles.container}>
            <View style={{width: "100%", alignItems: "flex-start", flex: 1}}>
                <Text style={{fontSize: 28, color: Colors.WHITE, fontWeight: "bold"}}>Create {'\n'}New Account</Text>
            </View>
            {/* <Image style={{height: 150, width: 150}} source={require('../../../assets/welcomeImage2.png')}/> */}
            <TouchableOpacity  onPress={() => pickImage()}>
                <ImageButton />
            </TouchableOpacity>
            <View behavior='padding' style={styles.inputContainer}>
                
                <TextInput 
                style={styles.inputs}
                placeholderTextColor={Colors.WHITE}
                    
                    placeholder='Name'
                    value={displayName}
                    onChangeText={text =>setName(text)}></TextInput>
                <TextInput 
                    style={styles.inputs}
                    placeholderTextColor={Colors.WHITE}
                    placeholder='Email'
                    value={email}
                    onChangeText={text =>setEmail(text)}></TextInput>
                <TextInput 
                    placeholderTextColor={Colors.WHITE}
                    style={styles.inputs}
                    placeholder='Password' 
                    value={password}
                    onChangeText={text =>setPassword(text)}
                    secureTextEntry></TextInput>
                
                  
                <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
                    <Text style={{color: Colors.WHITE}}>
                        Sign up
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        paddingHorizontal: 50,
        paddingVertical: 25
    },
    inputContainer:{
        alignItems: 'center',
        width: '100%',
        flex: 3,
        marginVertical: 10
    },
    inputs:{
        color: Colors.SECONDARY,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginVertical: 10,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.SECONDARY,
        width: '100%'
    },
    button:{
        width:"100%",
        backgroundColor: Colors.SECONDARY,
        padding: 20,
        marginTop: 20,
        alignItems: 'center'
    }
})

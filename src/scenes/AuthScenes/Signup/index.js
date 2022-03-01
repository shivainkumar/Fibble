import React, {useState, useEffect} from 'react'
import { StatusBar, SafeAreaView, TextInput, StyleSheet, Text, Touchable, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import * as ImagePicker from 'expo-image-picker'; 
import { AntDesign } from '@expo/vector-icons';
import {app, db, storage} from '../../../../firebase'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';



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
          aspect: [4, 3],
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
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            //uploads an image to the storage named as the Uid and updates the photoURL to the profile
            await uploadImage(userCredentials)

            //creates a database record
            await createUserInDatabase(userCredentials.user);  
        } catch (error) {
            console.error(error);
        }
            
    }

        const ImageButton = () =>{
            if (image == null) {
                return(
                    <AntDesign name="pluscircleo" size={30} color="black" />
                )
            } else {
                return(
                    <Image style={{width: 100, height: 100}} source={{ uri: image }}/>
                )
            }
        }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => pickImage()}>
                <ImageButton />
                <Text>
                    Pick Image
                </Text>
            </TouchableOpacity>


            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder='Name'
                    value={displayName}
                    onChangeText={text =>setName(text)}></TextInput>
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
            
            <TouchableOpacity onPress={() => handleSignUp()}>
                <Text>
                    Sign up
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Signup

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

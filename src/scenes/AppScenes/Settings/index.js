import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, Modal, Alert, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import * as Colors from '../../../styles/colors'
import {app, db, storage} from "../../../../firebase"
import { getAuth, sendPasswordResetEmail, signOut, updateProfile } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker'; 
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { doc, setDoc, updateDoc } from "firebase/firestore"; 


const Settings = ({navigation}) => {

    const auth = getAuth(app)
    const [name, setName] = useState(auth.currentUser.displayName)
    const [email, setEmail] = useState(auth.currentUser.email)
    const [bio, setBio] = useState("")
    const [image, setImage] = useState(null)
    const [password, setPassword] = useState("")
    const [modalVisible, setModalVisible] = useState(false);


 
    const changePassword = () =>{
        sendPasswordResetEmail(auth, email).then(() =>{
            console.log("passwordChanged");
        }).catch((error) => {
            console.error(error)
        })
    }

    const handleSignOut = () =>{
        signOut(getAuth(app))
        .catch(error => alert(error.message))
    }
    // const pickImage = async () => {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.All,
    //       allowsEditing: true,
    //       aspect: [1, 1],
    //       quality: 1,
    //     });
        
    //     console.log(result.uri);
    //     if (!result.cancelled) {
    //       setImage(result.uri).then(() =>  updateImage(auth))
    //     }
    // };

    // const updateImage = async(user) =>{

    //     const desertRef = ref(storage,  `profilePictures/${user.currentUser.uid}`);
    //     // Delete the file
    //     deleteObject(desertRef).then(async() => {
    //         if (image) {
    //             const childPath = `profilePictures/${user.currentUser.uid}`;
    //             const res = await fetch(image);
    //             const blob = await res.blob();
    //             const storageRef = ref(storage, childPath);
    //             await uploadBytes(storageRef, blob);
    //             const url = await getDownloadURL(storageRef)
    //             console.log("url ", url)
    //             await updateProfile(user.currentUser, {
    //                 photoURL: url
    //             })
    //             console.log(user.currentUser.photoURL);
    //         } else {
    //             console.log("unable to upload");
    //         }
    //     }).catch((error) => {
    //     // Uh-oh, an error occurred!
    //     });
        
    // }
    const updateProfileInfo = async() =>{
        await updateProfile(auth.currentUser, {
            displayName: name 
          })
        console.log(auth.currentUser.uid);
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, { "displayName": name, "bio": bio })
        await navigation.popToTop()
        
    }

    const updateWarning = () =>
    Alert.alert(
      "Change Password",
      "If you press 'Confirm', an email will be sent to you with a link to change the password, and will be logged out of the app.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Confirm", onPress: () => changePassword()}
      ]
    );
  return (
    <SafeAreaView style={{flex: 1, padding: 20, alignItems: 'center', backgroundColor: Colors.WHITE}}>
 
        <View style={{ width: '100%', justifyContent: 'space-evenly'}}>
        <Text style={styles.titleText}>
                Settings
            </Text>
            {/* <TouchableOpacity onPress={() => pickImage()}>
                <Image source={{uri: auth.currentUser.photoURL}} style={{height: 100, width: 100, borderRadius: 50}}/>
            </TouchableOpacity> */}
            <View >
                <TextInput style={styles.inputs} placeholder="Name" value={name} onChangeText={setName}/>
                <Text style={[styles.inputs, {borderBottomColor: "white", marginBottom: 20}]}>{email}</Text>
                <TextInput style={styles.inputs} placeholder="Bio" value={bio} onChangeText={setBio}/>
            </View>
        </View>
       
        
        <TouchableOpacity style={[styles.button]} onPress={() => updateWarning()}>
            <Text style={styles.textStyle}>Change Password</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', width: "100%", justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity style={[styles.button, {width: "45%", borderColor: Colors.SECONDARY, borderWidth: 1, backgroundColor: Colors.WHITE}]} onPress={() => navigation.popToTop()}>
                    <Text style={{color: Colors.SECONDARY}}>Cancel</Text>
                </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {width: "45%"}]} onPress={() => updateProfileInfo()}>
                <Text style={styles.textStyle}>Update Profile</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.button, {position: 'absolute', bottom: 10, width: "100%"}]} onPress={() => handleSignOut()}>
            <Text style={{color: Colors.WHITE, fontWeight: 'bold'}}>
                Sign out
            </Text>
        </TouchableOpacity>
        
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
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
    titleText:{    
        fontSize: 20,
        fontWeight: 'bold'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
       
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "70%",
        height: "50%"
      },
      button: {
        borderRadius: 15,
        marginBottom: 7,
        padding: 10,
        elevation: 2,
        backgroundColor: Colors.SECONDARY,
        alignItems: 'center',
        justifyContent: 'center'
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})
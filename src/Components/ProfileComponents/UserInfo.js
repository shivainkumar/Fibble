import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import React, {useState} from 'react'; 
import * as Colors from '../../styles/colors';
import * as ImagePicker from 'expo-image-picker'; 
import { Ionicons } from '@expo/vector-icons';
import { backgroundColor, borderLeftColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { updateProfile, signOut, getAuth } from "firebase/auth";
import { NavigationContext } from 'react-navigation';
import {app} from '../../../firebase'


const UserInfo = ({user, navigation}) => {
    const [image, setImage] = useState(user.photoURL);
  
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          setImage(result.uri);
          handleUpdateProfilePicture();
        }
    };
    const handleUpdateProfilePicture = () =>{
        updateProfile(user,{
            photoURL: image
        })
    }

    const handleSignOut = () =>{
        signOut(getAuth(app))
        .catch(error => alert(error.message))
    }
    return (
        <View>
        <View style={styles.container}>
            <View style={styles.profileInfoContainer}> 
                <TouchableOpacity onPress={() => pickImage()}>
                    <Image style={styles.image} source={{uri: image}}/>
                </TouchableOpacity>
                <View>
                    <Text style={styles.name}>{user.displayName}</Text> 
                    <Text style={styles.bio}>foooooooood</Text>
                    <TouchableOpacity style={{width: "100%", padding: 7, backgroundColor: Colors.WHITE, alignItems: 'center', justifyContent: 'center', borderRadius: 15}}>
                        <Text style={{color: Colors.SECONDARY}}>Settings</Text>
                    </TouchableOpacity>
                </View>
            
            </View>
            <View style={{flexDirection: 'row',width:'70%', height: 80, justifyContent: 'space-between'}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.labelNumber}>
                        50
                    </Text>
                    <Text>
                        Posts
                    </Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.labelNumber}>
                        50
                    </Text>
                    <Text>
                        Followers
                    </Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.labelNumber}>
                        50
                    </Text>
                    <Text>
                        Following
                    </Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => handleSignOut()}>
                <Text>
                    Sign out
                </Text>
            </TouchableOpacity>
        </View>
        <Text style={{width: '95%', fontSize: 20, fontWeight: 'bold', marginTop: 10, marginHorizontal: 20}}>
            My Recipe
        </Text>

      <TouchableOpacity style={styles.addButton} onPress={()=> navigation.navigate('CreateRecipe')}>
          <Ionicons name='add' color={Colors.SECONDARY} size={25}/>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 10, color: Colors.SECONDARY}}>Create New Recipe</Text>
      </TouchableOpacity>
      </View>
    );
};

export default UserInfo;

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors.SECONDARY,
        paddingBottom: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },

    profileInfoContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    name:{
        fontSize: 23,
        fontWeight: 'bold'
    },
    bio:{
        color: Colors.WHITE
    },
    image:{
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10
    },
    followButton:{
        width: '50%',
        height: 30,
        borderWidth: 1,
        borderColor: Colors.SECONDARY,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        
    },
    followButtonText: {
        color: Colors.SECONDARY
    },
    labelNumber :{
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.WHITE
    },
    
});

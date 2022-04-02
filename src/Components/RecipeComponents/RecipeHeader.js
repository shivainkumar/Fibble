import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Colors from '../../styles/colors';
import { doc, getDoc, setDoc, deleteDoc, collection } from 'firebase/firestore';
import { db, app } from '../../../firebase';
import { getAuth } from "firebase/auth";



const LikeButton = ({recipeLiked}) =>{
  if(recipeLiked){
    return(
      <Ionicons name="heart" size={28} color={Colors.SECONDARY} />
    )
  }else{
    return(
      <Ionicons name="heart-outline" size={28} color={Colors.SECONDARY}/>
    )
  }
}


const RecipeHeader = ({ liked, navigation, recipedata}) => {

  const [recipeLiked, setRecipeLiked] = useState(liked)
  const [itemID, setItemID] = useState(recipedata)

  const toggleLike = () =>{
    if (recipeLiked) {
      try {
        const docRefFollowing = doc(db, "Likes", getAuth(app).currentUser.uid);
        const colRefFollowing = collection(docRefFollowing, "userLiked");
        const a = doc(colRefFollowing, itemID)
        deleteDoc(a, {})
      } catch (error) {
        console.error("error while disliking: ", error)
      }
    } else {
      try {
        const docRefFollowing = doc(db, "Likes", getAuth(app).currentUser.uid);
        const colRefFollowing = collection(docRefFollowing, "userLiked");
        const a = doc(colRefFollowing, itemID)
        setDoc(a, {})
      } catch (error) {
        console.error("error while liking: ", error)
      }
     
    }
    setRecipeLiked(!recipeLiked)

  }

  return (
    <View style={styles.titleContainer}>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color={Colors.SECONDARY} />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => toggleLike()} style={styles.buttonContainer}>
        <LikeButton recipeLiked={liked}/>
      </TouchableOpacity>
    </View>
  );
};

export default RecipeHeader;

const styles = StyleSheet.create({
  titleContainer:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 60,
    paddingHorizontal: 10,
    paddingTop: 15
  },
  title:{
    color: Colors.SECONDARY,
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonContainer:{
    backgroundColor: 'rgba(255, 255, 255, 0.39)',
    borderRadius: 10,
    padding: 5
  }
});

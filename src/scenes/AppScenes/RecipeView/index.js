import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import * as Colors from '../../../styles/colors';
import RecipeHeader from '../../../Components/RecipeComponents/RecipeHeader';
import RecipeDescription from '../../../Components/RecipeComponents/RecipeDescription';
import { doc, getDoc, getDocs, deleteDoc, collection, query, where, setDoc, updateDoc } from 'firebase/firestore';
import { db, app } from '../../../../firebase';
import {getAuth} from 'firebase/auth'
import Loadinng from '../../../Components/Loadinng';
import { async } from '@firebase/util';


const RecipeView = (props) => {

  const [loading, setLoading] = useState(true)
  const [recipeLiked, setRecipeLiked] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [recipedata, setRecipedata] = useState(props.navigation.state.params)
  const [author, setAuthor] = useState({})  

  useEffect(() => {
    console.log(recipedata);
    setLoading(true)
    fetchAuthor()
    fetchLiked()
    setLoading(false)
  }, [])
  
  const fetchAuthor = async() =>{
    try {
      const docRef = doc(db, "users", recipedata.author)
      const documentSnapshots = await getDoc(docRef)
      await setAuthor(documentSnapshots.data())
    } catch (error) {
      console.error(error);
    }
  }

  const fetchLiked = async() =>{
    const docRef = doc(db, "Likes", getAuth(app).currentUser.uid);
    const colRef = collection(docRef, "userLiked");
    const d = doc(colRef, recipedata.itemID)
    const snapshot = await getDoc(d)
    if (snapshot.exists()) {
      setRecipeLiked(true)
    } else {
      setRecipeLiked(false)
    }
  }

  const toggleLike = async() =>{
    if (recipeLiked) {
      try {
        const docRefFollowing = doc(db, "Likes", getAuth(app).currentUser.uid);
        const colRefFollowing = collection(docRefFollowing, "userLiked");
        const a = doc(colRefFollowing, recipedata.itemID)
        deleteDoc(a, {})

        const recipeDocRef = doc(db, "recipesAll", recipedata.itemID)
        const x = await getDoc(recipeDocRef)
        const y = x.data()
        await updateDoc(recipeDocRef, {likes: y.likes-1})
      } catch (error) {
        console.error("error while disliking: ", error)
      }
    } else {
      try {
       
        const docRefFollowing = doc(db, "Likes", getAuth(app).currentUser.uid);
        const colRefFollowing = collection(docRefFollowing, "userLiked");
        const a = doc(colRefFollowing, recipedata.itemID)
        setDoc(a, {})
       
        const recipeDocRef = doc(db, "recipesAll", recipedata.itemID)
        const x = await getDoc(recipeDocRef)
        const y = x.data()
        await updateDoc(recipeDocRef, {likes: y.likes+1})

      } catch (error) {
        console.error("error while liking: ", error)
      }
     
    }
    setRecipeLiked(!recipeLiked)

  }

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
  return (
   
    <ScrollView style={styles.container} stickyHeaderIndices={[2]} >
      {loading?
      <Loadinng/>:
      <View>
        <ImageBackground style={{width: '100%', height: 300, }} source={{uri: recipedata.downloadURL}}>
        <View style={styles.titleContainer}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color={Colors.SECONDARY} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => toggleLike()} style={styles.buttonContainer}>
            <LikeButton recipeLiked={recipeLiked}/>
          </TouchableOpacity>
        </View>
        {/* <RecipeHeader liked={recipeLiked} navigation={props.navigation} recipedata={recipedata.itemID}/> */}
          </ImageBackground>
        <RecipeDescription recipe={recipedata} author={author}/>
      </View>
     
      }
      
    </ScrollView>
   
  );
};

export default RecipeView;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
  },
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

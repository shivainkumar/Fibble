import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import RecipeHeader from '../../../Components/RecipeComponents/RecipeHeader';
import RecipeDescription from '../../../Components/RecipeComponents/RecipeDescription';
const RecipeView = (props) => {

  const [loading, setLoading] = useState(true)
  const [recipeLiked, setRecipeLiked] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [recipedata, setRecipedata] = useState(props.navigation.state.params)
  //const {id} = route.params
 
  return (
   
    <ScrollView style={styles.container} stickyHeaderIndices={[2]} >
      <ImageBackground style={{width: '100%', height: 300, }} source={{uri: recipedata.downloadURL}}>
        <RecipeHeader liked={recipeLiked} navigation={props.navigation}/>
      </ImageBackground>
      <RecipeDescription recipe={recipedata} />
    </ScrollView>
   
  );
};

export default RecipeView;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
  }
});

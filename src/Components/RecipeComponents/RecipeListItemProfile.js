import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const RecipeListItemProfile = ({recipe}) => {
  return (
    <View style={styles.container}>
      {/* <Image /> */}
      <View style={styles.descriptionContainer}>
        <Text>dfgdf{recipe.title}</Text>
      </View>
    </View>
  );
};

export default RecipeListItemProfile;

const styles = StyleSheet.create({
  container:{
    width: '80%',
    height: 250,
    flexDirection: 'row'
  },
  descriptionContainer:{
    width: 100,
    height: 100
  }
});

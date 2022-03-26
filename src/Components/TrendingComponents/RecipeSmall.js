import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { PickerItem } from 'react-native/Libraries/Components/Picker/Picker';
import * as Colors from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';

const Recipe = ({navigation, recipe}) => {
  return (
    <TouchableOpacity onPress={() => 
      navigation.navigate('RecipeView', recipe)} style={styles.container}>
      <View style={styles.bottomInfoContainer}>
        <Text style={styles.userName}>
          {recipe.creator}
          </Text>
        <Text style={styles.title}>
         {recipe.title} 
        </Text>
        <Text numberOfLines={3}>
          {recipe.shortDescription}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center',  marginVertical: 5}}>
          <Ionicons name='heart' color={Colors.SECONDARY} size={25}/>
          <Text style={{color: Colors.SECONDARY, paddingLeft: 10}}>3873</Text>
        </View>
      </View>
      <Image style={styles.thumbnail} resizeMode='cover' source={{uri: recipe.downloadURL}}/>

    </TouchableOpacity>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  container:{
    height: 140,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    marginVertical: 7,
    borderRadius: 30,
    shadowColor: 'rgb(0, 0, 0)',
    
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 7,
    backgroundColor: 'white',
    
  },
  userName:{
    fontSize: 14,
    color: Colors.SECONDARY,
  },
  thumbnail:{
    width: '100%',
    height: '100%',
    flex: 2,
    padding: 5,
    borderRadius: 15
  },
  title:{
    fontSize: 18,
    color: Colors.BLACK,
    fontWeight: 'bold',
    
  },
  bottomInfoContainer:{
    width: '100%',
    flex: 4,
  }
});

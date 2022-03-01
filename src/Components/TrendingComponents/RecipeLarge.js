import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { PickerItem } from 'react-native/Libraries/Components/Picker/Picker';
import * as Colors from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';
const Recipe = ({recipe,navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('RecipeView')} style={styles.container}>
      <Image style={styles.thumbnail} resizeMode='cover'  source={require('../../assets/pizza.jpg')}/>
      <View style={styles.bottomInfoContainer}>
        <Text style={styles.userName}>
          {recipe.creator}
          </Text>
        <Text style={styles.title}>
         {recipe.title} 
        </Text>
        <Text numberOfLines={4}>
          {recipe.description}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center',  marginVertical: 5}}>
          <Ionicons name='heart' color={Colors.SECONDARY} size={25}/>
          <Text style={{color: Colors.SECONDARY, paddingLeft: 10}}>3873</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  container:{
    minHeight: 480,
    maxHeight:550,
    marginHorizontal: 10,
    borderRadius: 30,
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: Colors.PRIMARY
    // shadowColor: 'rgb(0, 0, 0)',
    // shadowOpacity: 0.6,
    // shadowRadius: 6,
    // elevation: 2,
  },
  userName:{
    fontSize: 20,
    color: Colors.SECONDARY,
  },
  thumbnail:{
    width: '100%',
    flex: 5,
    marginBottom: 3,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30
  },
  title:{
    fontSize: 20,
    color: Colors.BLACK,
    fontWeight: 'bold',
    marginVertical: 5
  },
  bottomInfoContainer:{
    width: '100%',
    flex: 3,
    padding: 20
  }
});

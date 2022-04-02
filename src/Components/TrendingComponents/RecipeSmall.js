import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { PickerItem } from 'react-native/Libraries/Components/Picker/Picker';
import * as Colors from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';

const Recipe = ({navigation, item, itemID}) => {
  
  return (
    <TouchableOpacity onPress={() => 
      navigation.navigate('RecipeViewScreen', {...item, itemID})} style={styles.container}>
      <View style={styles.bottomInfoContainer}>
        {/* <Text style={styles.userName}>
          {item.creator}
          </Text> */}
        <Text style={styles.title}>
         {item.title} 
        </Text>
        <Text numberOfLines={3}>
          {item.shortDescription}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center',  marginVertical: 5}}>
          <Ionicons name='heart' color={Colors.SECONDARY} size={25}/>
          <Text style={{color: Colors.SECONDARY, paddingLeft: 10}}>{item.likes}</Text>
        </View>
      </View>
      <Image style={styles.thumbnail} resizeMode='cover' source={{uri: item.downloadURL}}/>

    </TouchableOpacity>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  container:{
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    marginVertical: 7,
    marginHorizontal: 7,
    borderRadius: 30,
    shadowColor: 'rgb(0, 0, 0)',
    
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
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

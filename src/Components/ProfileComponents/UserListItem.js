import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const UserListItem = ({user}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: user.photoURL}}/>
      <Text>{user.name}</Text>
    </View>
  );
};

export default UserListItem;
 
const styles = StyleSheet.create({
    container:{
        width: '80%',
        height: 300
    },
    image:{
        
    }
});

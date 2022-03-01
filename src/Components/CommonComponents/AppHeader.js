import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';


const AppHeader = () => {
  return (
    <View style={styles.header}>
        <Image style={styles.logo} resizeMode='contain' source={require('../../assets/logo.png')}/>
        {/* <TouchableOpacity>
            <Ionicons name="person-circle-sharp" size={45} color="#DD0050" />
        </TouchableOpacity> */}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
    header:{
        height: 70,
        width: '100%',
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        top: 0
    },
    logo:{
        width: "50%",
        height: '70%',
    },
});

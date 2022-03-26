import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Colors from '../../styles/colors'

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
        justifyContent: 'space-between',
        alignItems: 'center',
        top: 0,
        backgroundColor: Colors.SECONDARY,
    },
    logo:{
        width: "40%",
        height: '60%',
        marginHorizontal: 20
    },
});

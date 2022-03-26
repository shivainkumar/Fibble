import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import * as Colors from '../styles/colors'

const Loadinng = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
           <ActivityIndicator size="large" color={Colors.PRIMARY} />
    </View>
  )
}
export default Loadinng

const styles = StyleSheet.create({})
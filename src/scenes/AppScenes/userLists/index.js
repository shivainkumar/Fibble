import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

const index = ({}) => {

    const [users, setUsers] = useState([])
  return (
    <SafeAreaView>
        <Text>

        </Text>
        <FlatList 
            renderItem={}
        />
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});

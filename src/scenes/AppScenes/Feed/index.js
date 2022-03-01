import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import Recipe from '../../../Components/TrendingComponents/RecipeLarge';
import * as Colors from '../../../styles/colors';


const testdata = [
  {
      id:"1",
      creator: "John Doe",
      title: "Swaad Chawal",
      description: "ation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    id:"2",
    creator: "John Doe",
    title: "Swaad Chawal",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    id:"3",
    creator: "John Doe",
    title: "Swaad Chawal",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    id:"4",
    creator: "John Doe",
    title: "Swaad Chawal",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
 
]

const index = ({navigation}) => {

  const renderItem = ({ item }) => (
    <Recipe recipe={item} navigation={navigation}/>
  );

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>
              Feed
          </Text>
          <TouchableOpacity>
              <Ionicons name="person-circle-sharp" size={45} color="#DD0050" />
          </TouchableOpacity>
        </View>
        
        <FlatList 
          renderItem={renderItem}
          data={testdata}
          keyExtractor={item => item.id}
          style={styles.list}
        />
        
        
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  header:{
    height: 100,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
},
logo:{
    width: "50%",
    
    color: Colors.SECONDARY,
    fontSize: 40
},
  container:{
    flex: 1,
    width: '100%'
  },
  list:{
    flex: 1,
    width: '100%'
  }
});

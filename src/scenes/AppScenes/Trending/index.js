import React, {useState} from 'react'
import { ScrollView, SafeAreaView, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput, ImageBackground, VirtualizedList } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import LatestPick from '../../../Components/TrendingComponents/LatestPick'
import AppHeader from '../../../Components/CommonComponents/AppHeader';

const index = () => {

    const testdata = [
        {
            "id":"1",
            "Creater": "John Doe",
            "RecipeName": "Swaad Chawal",
            "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
            "id":"2",
            "Creater": "John Doe",
            "RecipeName": "Swaad Chawal",
            "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },    {
            "id":"3",
            "RecipeName": "Swaad Chawal",
            "Creater": "John Doe",
            "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },    {
            "id":"4",
            "RecipeName": "Swaad Chawal",
            "Creater": "John Doe",
            "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },    {
            "id":"5",
            "RecipeName": "Swaad Chawal",
            "Creater": "John Doe",
            "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
    ]
    const tags = ["Indian", "Italian", "Middle Eastern", "Mexican", "Russian"]

    const [searching, setSearching] = useState(false)

    const Cuisine = ({ item }) => (
        <ImageBackground style={styles.cuisineItems} resizeMode="cover" source={require('../../../assets/pizza.jpg')}>
            <Text style={styles.cuisineText}>{item.RecipeName}</Text> 
        </ImageBackground>
        
    );

    const Tags = () =>{
        return(
            <View>
                 <Text> fd</Text>
                {
                    tags.forEach(element => {
                        console.log(element)
                        return(
                            <Text>
                                aad  {element}
                            </Text>
                        )
                        
                   })
                }
            </View>
        )
    
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={styles.container}>
            <AppHeader />
            <View style={styles.searchView}>
                <TouchableOpacity>
                    <Ionicons name="search-circle" size={45} color="#43C8A8" />
                </TouchableOpacity>
                <TextInput style={styles.searchTextInput} placeholder='Search'></TextInput>
            </View>
           
            <View style={styles.body}>
                    <Text style={styles.titles}>
                        Latest Picks
                    </Text>
                    <FlatList
                        style={styles.latestPicksList}
                        data={testdata}
                        renderItem={LatestPick}
                        keyExtractor={item => item.id}
                        horizontal={true}
                    />
                    <View >
                        <Text style={styles.titles}>
                            BROWSE BY TAGS
                        </Text>
                        <View style={styles.tagList}>
                            <Text style={styles.tag}>Indian</Text>
                            <Text style={styles.tag}>Indian</Text>
                            <Text style={styles.tag}>Indian</Text>
                            <Text style={styles.tag}>Indian</Text>
                            <Text style={styles.tag}>Indian</Text>
                            <Text style={styles.tag}>Indian</Text>
                            <Text style={styles.tag}>Indian</Text>
                            <Text style={styles.tag}>Indian</Text>
                            <Text style={styles.tag}>Indian</Text>
                            <Text style={styles.tag}>Indian</Text>
                            <Text style={styles.tag}>Indian</Text>
                            <Text style={styles.tag}>Indian</Text>
                            <Text style={styles.tag}>Indian</Text>
                            <Text style={styles.tag}>Indian</Text>
                        </View>
                    </View> 
                    <View >
                        <Text style={styles.titles}>
                            BROWSE BY CUISINE
                        </Text>
                        <FlatList
                        style={styles.cuisineList}
                        data={testdata}
                        renderItem={Cuisine}
                        keyExtractor={item => item.id}
                        horizontal={true}
                    />
                    </View>
                    <View >
                        <Text style={styles.titles}>
                            Trending Recipes
                        </Text>
                        {/* <FlatList
                        
                        initialNumToRender={4}
                        data={testdata}
                        renderItem={Cuisine}
                        keyExtractor={item => item.id}
                     
                        /> */}
                    </View>
            </View>
            </ScrollView>
        </SafeAreaView>
      
    )
}

export default index

const styles = StyleSheet.create({
    container:{
        
        height: "100%"
    },
   
    searchView:{
        flexDirection: 'row',
        backgroundColor: "#CDFFF3",
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 90 
    },
    searchTextInput:{
        width:"100%",
        backgroundColor: "#CDFFF3",
 
    },
    body:{
        flex: 5,
        paddingHorizontal: 20
    },
    titles:{    
        fontSize: 20,
        fontWeight: 'bold'
    },
    latestPicksList:{
        width: "100%",
        height:400
    },
    latestPicksListTitle:{
        fontSize: 20,
        marginBottom: 9
    },
    latestPicksListDescription:{
        width: "100%"
    },
    latestPicksInfo:{
        padding: 20
    },
    tagList:{
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tag:{
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "black",
        color: "white",
        borderRadius: 20,
        marginRight:10,
        marginBottom: 10
    },
    cuisineList:{

    },
    cuisineItems:{
        height:100,
        width: 200,
        justifyContent: "flex-end",
        tintColor: "#000000",
        marginRight: 15,
    
    },
    cuisineText:{
        color: "white",
        fontSize: 30,
        fontWeight: 'bold',
        padding: 10,
        letterSpacing: 7
    }
})

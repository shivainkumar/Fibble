import React, {useState, useEffect} from 'react'
import { ScrollView, SafeAreaView, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, RefreshControl, ImageBackground, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import LatestPick from '../../../Components/TrendingComponents/LatestPick'
import AppHeader from '../../../Components/CommonComponents/AppHeader';
import { collection, doc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { app, db } from '../../../../firebase';
import { getAuth, signOut } from "firebase/auth";
import * as Colors from '../../../styles/colors'

const index = ({navigation}) => {

    const [cuisines, setCuisines] = useState([])
    const [searching, setSearching] = useState(false)
    const [latestPicks, setLatestPicks] = useState([])
    const [userFollowing, setUserFollowing] = useState([])
    const [tags, setTags] = useState(["indian", "food", "shishiman", "Vegan", "testtag"])
    const [recipesByFollowing, setRecipesByFollowing] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchCuisine = async() => {
        const colRef = collection(db, "cuisines")
        const snapshot = await getDocs(colRef)
       
        let tempdata = [];
        snapshot.forEach((doc) =>{
           
            tempdata.push(doc.id)
        })
        setCuisines(tempdata)
    }

    const fetchLatestPicks = async() =>{
        const colRef = collection(db, "recipesAll")
        const q = query(colRef, orderBy("createdOn", "desc"), limit(10))
        const documentSnapshots = await getDocs(q);
        let tempdata = [];
        documentSnapshots.forEach((doc) => {
            tempdata.push(doc.data())
        });
        setLatestPicks(tempdata)
    }

    const fetchFollowing = async() =>{
        const docRef = doc(db, "Following", getAuth(app).currentUser.uid);
        const colRef = collection(docRef, "userFollowing");
        
        const documentSnapshots = await getDocs(colRef);
        let tempdata = [];
        documentSnapshots.forEach((doc) => {
            console.log("following", doc.id);
            tempdata.push(doc.id)
        });
        console.log(tempdata);
        if (tempdata.length > 0) {
            fetchRecipesByFollowing(tempdata)
        } else {

        }
    }

    const fetchRecipesByFollowing = async(users) =>{
        const colRef = collection(db, "recipesAll")
        const q = query(colRef,where("author", "in", users), orderBy("createdOn", "desc"), limit(10))
        const documentSnapshots = await getDocs(q);
        let tempdata = [];
        documentSnapshots.forEach((doc) => {

            tempdata.push(doc.data())
        });
        setRecipesByFollowing(tempdata)
    }


    const Cuisine = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('RecipeList', [item])}>
            <ImageBackground style={styles.cuisineItems} resizeMode="cover" source={require('../../../assets/pizza.jpg')}>
                <Text style={styles.cuisineText}>{item}</Text> 
            </ImageBackground>
        </TouchableOpacity>
       
        
    );

    useEffect(() => {
        fetchCuisine()
        fetchLatestPicks()
        fetchFollowing()
        
    }, [])
    

    return (
        <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
            <ScrollView  refreshControl={
                    <RefreshControl
                        colors={["#9Bd35A", "#689F38"]}
                        refreshing={loading}
                        onRefresh={() => {
                            
                            fetchLatestPicks()
                            fetchFollowing()
                        }}
                    />
                  } style={styles.container}>
            <AppHeader />
            {/* <View style={styles.searchView}>
                <TouchableOpacity>
                    <Ionicons name="search-circle" size={45} color="#43C8A8" />
                </TouchableOpacity>
                <TextInput style={styles.searchTextInput} placeholder='Search'></TextInput>
            </View>
            */}
            <View style={styles.body}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.titles}>
                        Latest Picks
                    </Text>
                    <Button title='View More' color={Colors.SECONDARY}/>
                </View>
                    
                    <FlatList
                        style={styles.latestPicksList}
                        data={latestPicks}
                        renderItem={({item}) => <LatestPick navigation={navigation} item={item}/>}
                        keyExtractor={(item, index) => item + index}
                        horizontal={true}
                        ListFooterComponent={
                            <View >
                                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', height: "100%"}}>
                                <Ionicons name="ios-arrow-forward-circle-outline" size={60} color={Colors.SECONDARY} />
                                </TouchableOpacity>
                            </View>
                        }
                    />
                    <View >
                        <Text style={styles.titles}>
                            BROWSE BY TAGS
                        </Text>
                        <View style={styles.tagList}>
                        <FlatList 
                            style={styles.tagList}
                            scrollEnabled={false}
                            data={tags}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({item}) => 
                                <TouchableOpacity onPress={() => navigation.navigate('RecipeList', [item])}>
                                    <Text style={styles.tag}>{item}</Text>
                                </TouchableOpacity>
                                }
                            contentContainerStyle={{width: "100%", justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' }}
                            
                        />
                        </View>
                    </View> 
                    <View >
                        <Text style={styles.titles}>
                            BROWSE BY CUISINE
                        </Text>
                        <FlatList
                        style={styles.cuisineList}
                        data={cuisines}
                        renderItem={Cuisine}
                         keyExtractor={(item, index) => item + index}
                        horizontal={true}
                    />
                    </View>
                    <View style={{marginTop: 15}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.titles}>
                                Recipe's by your {'\n'}favourites
                            </Text>
                            <Button title='View More' color={Colors.SECONDARY}/>
                        </View>
                        <FlatList
                        data={recipesByFollowing}
                        renderItem={({item}) => <LatestPick navigation={navigation} item={item}/>}
                        keyExtractor={(item, index) => item + index}
                        contentContainerStyle={{width: "100%", justifyContent: 'center'}}
                        />
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
        paddingHorizontal: 20,
        marginTop: 18
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

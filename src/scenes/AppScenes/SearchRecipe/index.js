import { StyleSheet, Text, View,TextInput, SafeAreaView, FlatList, TouchableOpacity, Button, Switch, RefreshControl, Image } from 'react-native'
import React, {useState} from 'react'
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import * as Colors from '../../../styles/colors'
import RecipeSmall from '../../../Components/TrendingComponents/RecipeSmall';
import Loadinng from '../../../Components/Loadinng';
import { collection, query, where, getDocs, doc, orderBy, limit, startAfter, startAt } from 'firebase/firestore';
import {app, db} from "../../../../firebase"
import AppHeader from '../../../Components/CommonComponents/AppHeader';


const index = ({navigation}) => {

    const [searchRecipeText, setSearchRecipeText] = useState("");
    const [searchUserText, setSearchUserText] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [enabledRecipe, setEnabledRecipe] = useState(false);
    const [users, setUsers] = useState([])

    const toggleSwitch = () => setEnabledRecipe(previousState => !previousState);
    
    const openList = () =>{
        let tags = searchRecipeText.split(" ")
        console.log(tags);
        navigation.navigate('Results',tags)
    }

   
    const fetchRecipes = async() =>{
        setLoading(true)
        let tags = searchRecipeText.split(" ")
        console.log(tags);
        const colRef = collection(db, "recipesAll")
        const q = query(colRef, where("tag", "array-contains-any", tags))
        const documentSnapshots = await getDocs(q);
        let tempdata = [];
        documentSnapshots.forEach((doc) => {
            tempdata.push({docID: doc.id, docData: doc.data()})
        });
        setRecipes(tempdata)
        setLoading(false)
    }

    const ListItem = ({item}) =>{
        return(
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', item)} style={styles.listItem}>
                <Image style={styles.listImage} source={{uri: item.data.photoURL}}/>
                <View style={styles.listInfo}>
                    <Text style={styles.listText}>{item.data.displayName}</Text>
                    <Text>{item.data.bio}</Text>
                </View>

            </TouchableOpacity>
        )
    }

    const fetchUsers = async() =>{
        setLoading(true)
        if (searchUserText) {
            const userRef = collection(db, "users")
            const q = query(userRef, where("displayName", ">=", searchUserText.trim()))
            const querySnapshot = await getDocs(q);
            let tempdata = [];
            querySnapshot.forEach((doc) => {
                tempdata.push({id: doc.id, data: doc.data()})
            });
            setUsers(tempdata)
        } else {
            setUsers([])
        }
        
        setLoading(false)
    }
    return (
        
        <SafeAreaView style={styles.container}>
            <AppHeader/>
            <View style={{flex: 1, padding: 10}}>
                <View style={styles.textSearchContainer}>
                    <Ionicons name="search-circle" size={45} color={enabledRecipe ? Colors.SECONDARY : Colors.PRIMARY} />
                    <TextInput 
                    style={styles.inputs} 
                    placeholder={enabledRecipe? 'Search  (Cuisines, Diets, Recipe titles)':
                    'Search Chefs'} 
                    onChangeText={enabledRecipe? setSearchRecipeText: setSearchUserText} 
                    />
                    <View style={{width: '20%', alignItems: 'center'}}>
                        {enabledRecipe?
                        <Text>
                            View Creators
                        </Text>:
                        <Text>
                            View Recipes
                        </Text>
                        }
                    <Switch
                        trackColor={"#767577"}
                        thumbColor={enabledRecipe ? Colors.SECONDARY : Colors.PRIMARY}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={enabledRecipe}
                        />
                    </View>
                    
                </View>
                <View>
                    <Button title='Search' color={enabledRecipe ? Colors.SECONDARY : Colors.PRIMARY} onPress={() => {
                        if(enabledRecipe){
                            fetchRecipes()
                        }else{
                            fetchUsers()
                        }
                    }}/>
                </View>
            </View>
            <View style={{flex: 5, width: "100%"}}>
                {loading?
                    <Loadinng/>:
                    <View style={{ flex: 1, marginTop: 10}}>
                        {enabledRecipe?
                            <FlatList
                            style={styles.scrollviewContainer}
                            data={recipes}
                            refreshControl={
                                <RefreshControl
                                    colors={["#9Bd35A", "#689F38"]}
                                    refreshing={loading}
                                    onRefresh={fetchRecipes}
                                />
                            }
                            renderItem={({item}) =><RecipeSmall item={item.docData} navigation={navigation} itemID={item.docID}/>
                        }
                            keyExtractor={(item, index) => item + index}
                            />:
                            <FlatList
                            data={users}
                            renderItem={ListItem}
                            keyExtractor={(item, index) => item + index}
                            refreshControl={
                                <RefreshControl
                                    colors={["#9Bd35A", "#689F38"]}
                                    refreshing={loading}
                                    onRefresh={fetchUsers}
                                />
                            }
                            /> 
                        }
                        
                    </View>
                  
                }
            </View>
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.WHITE,
        
        justifyContent: 'center',
        alignItems: 'center'
    },
    textSearchContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tagsContainer:{
        flex: 1
    },
    inputs:{
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginVertical: 5,
        borderRadius: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.SECONDARY,
        minWidth: '60%',
        maxWidth: "100%"
    },
    tag:{
        backgroundColor: Colors.SECONDARY,
        color: "white",
        fontSize: 18,
        marginRight: 10
    },
    tagInput:{
        paddingVertical: 7,
        paddingHorizontal: 13,
        color: Colors.SECONDARY,
        borderRadius: 20,
        marginRight:10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.SECONDARY,
    },
    scrollviewContainer:{
        width: '100%',
        flex: 5,      
    },
    title:{
        marginHorizontal: 30,
        fontSize: 26
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: Colors.WHITE,
        elevation: 2
    },
    listImage:{
        height: 70,
        width: 70,
        borderRadius: 35
    },
    listInfo:{
        margin: 20
    },
    listText:{
        fontWeight: 'bold',
        fontSize: 20,
    }
})
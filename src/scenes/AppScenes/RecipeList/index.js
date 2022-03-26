import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { collection, query, where, getDocs, doc, orderBy, limit, startAfter, startAt } from 'firebase/firestore';
import {app, db} from "../../../../firebase"
import RecipeSmall from '../../../Components/TrendingComponents/RecipeSmall';
import Loadinng from '../../../Components/Loadinng';


const index = (props) => {

    useEffect(() => {
      fetchRecipes()
    }, [])

    const renderItem = ({ item }) => (
        <RecipeSmall recipe={item} navigation={props.navigation}/>
    );
    
    const [searchTags, setSearchTags] = useState(props.navigation.state.params)
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchRecipes = async() =>{
        setLoading(true)
        console.log(searchTags);
        const colRef = collection(db, "recipesAll")
        const q = query(colRef, where("tag", "array-contains-any", searchTags))
        const documentSnapshots = await getDocs(q);
        let tempdata = [];
        documentSnapshots.forEach((doc) => {
            tempdata.push(doc.data())
        });
        setRecipes(tempdata)
        setLoading(false)
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Results
            </Text>
            {loading?
                <Loadinng/>:
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    {recipes.length == 0? 
                    <Text> No recipe for {searchTags}</Text>
                    :
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
                    renderItem={renderItem}
                    keyExtractor={item => item.docID}
                    />
                    }
                    
                </View>
                
            }
           
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        padding: 10
    },
    scrollviewContainer:{
        width: '100%',
        flex: 1,      
    },
    title:{
        marginHorizontal: 30,
        fontSize: 26
    }
})
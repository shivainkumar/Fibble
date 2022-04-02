import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { collection, query, where, getDocs, doc, orderBy, limit, startAfter, startAt } from 'firebase/firestore';
import {app, db} from "../../../../firebase"
import RecipeSmall from '../../../Components/TrendingComponents/RecipeSmall';
import Loadinng from '../../../Components/Loadinng';
import ColorPropType from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';
import * as Colors from '../../../styles/colors'

const index = (props) => {

    useEffect(() => {
      fetchRecipes()
    }, [])

    
    
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
            tempdata.push({docID: doc.id, docData: doc.data()})
        });
        setRecipes(tempdata)
        setLoading(false)
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Results for {searchTags}
            </Text>
            {loading?
                <Loadinng/>:
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    {recipes.length == 0? 
                    <Text style={{fontSize: 20, color: Colors.BLACK, opacity: 0.5}}> No recipes found for {searchTags}</Text>
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
                    renderItem={({item}) =><RecipeSmall item={item.docData} navigation={props.navigation} itemID={item.docID}/>}

                    keyExtractor={(item, index) => item + index}
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
import { SafeAreaView, ScrollView, StyleSheet, Text, View, SectionList, LogBox, Image } from 'react-native';
import React, { useState } from 'react';
import * as Colors from '../../styles/colors';
import { FlatList } from 'react-native-gesture-handler';

const RecipeDescription = ({recipe, author}) =>{
    const [ings, setIngs] = useState([
        {
            title: "Ingredients",
            data: recipe.ingredients
          },
    ])
    const Ingredients = ({ingredients}) =>{
            return(
                <Text>
                    {ingredients.ingredient}
                </Text>
            )
            
    }

    const ProcedureSections = ({item}) =>{
        return(
            <View style={styles.procedureSections}>
                <Text style={styles.procedureSectionsTitle}>
                    {item.title}
                </Text>
                <FlatList
                scrollEnabled={false}

                data={item.data}
                renderItem={({item, index}) => 
                <View style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}>
                    <View style={{borderRadius: 13, width: 25, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.GRAY}}>
                        <Text style={{color: "black", fontWeight: 'bold', padding: 1}}>{index + 1}</Text>
                    </View>
                    <Text style={styles.procedureSectionsStep}> {item}</Text>
                </View>}
                keyExtractor={(item, index) => item + index}
                />
            </View>
        )
    }

    const Tags = ({item}) => {
        return(
        <View style={{flexDirection: 'row', backgroundColor: Colors.SECONDARY, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 20, margin: 2}}>
            <Text style={styles.tag}>#{item}</Text>
        </View>)
    }
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other fu']);
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.shortDescription}>
                {recipe.shortDescription}
            </Text>
            {recipe.calories != null || recipe.server != null?
                <View style={styles.info}>
                    {recipe.calories != null?
                    <View style={styles.infoNodes}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.SECONDARY}}>
                            {recipe.calories}
                        </Text>
                        <Text>
                            Calories
                        </Text>
                    </View>:
                    null
                    }
                    {recipe.server != null?
                    <View style={styles.infoNodes}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.SECONDARY}}>
                            {recipe.serves}
                        </Text>
                        <Text>
                            Serves
                        </Text>
                    </View>:
                    null            
                    }
                    
                </View>: 
                null
            }
           
            <Text style={styles.longDescription}>
                {recipe.longDescription}
            </Text>
            <View style={styles.ingredients}>
                <Text style={styles.headings}>
                    Ingredients
                </Text>
                <SectionList
                scrollEnabled={false}

                sections={ings}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Ingredients ingredients={item} />}
                // renderSectionHeader={({ section: { title } }) => (
                //     <Text style={styles.header}>{title}</Text>
                // )}
                />
            </View>
            <View style={styles.ingredients}>
                <Text style={styles.headings}>
                    Procedure
                </Text>
                <FlatList 
                scrollEnabled={false}
                data={recipe.procedure}
                renderItem={ProcedureSections}
                keyExtractor={(item, index) => item + index}
                /> 
                {/* <Text>
                    {recipe.procedure}
                </Text> */}
            </View>
            {recipe.tag?
                <View>
                    <Text style={styles.headings}>
                        Tags
                    </Text>
                    <FlatList 
                        scrollEnabled={false}
                        data={recipe.tag}
                        keyExtractor={(item, index) => item + index}
                        renderItem={Tags}
                        style={styles.tagList}
                        contentContainerStyle={{width: "100%", justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' }}
                    />
                </View>:
                null
            }
            
            <View style={styles.ingredients}>
                <Text style={styles.headings}>
                    Author
                </Text>
                <View style={{flexDirection: 'row', width: "100%", marginTop: 15}}>
                    <Image style={{height: 120, width: 120, borderRadius: 60, alignItems: 'center', marginRight: 15}} source={{uri: author.photoURL}}/>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={{fontSize: 22, fontWeight: 'bold'}}>{author.displayName}</Text>
                        <Text>{author.bio}</Text>
                    </View>

                </View>
            </View>
            
        </View>
    )
}
export default RecipeDescription;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    title:{
        fontSize: 25,
        color: Colors.SECONDARY,
        fontWeight: 'bold',
        marginVertical: 10
    },
    shortDescription:{
        fontWeight: 'bold',
        fontSize: 16
    },
    longDescription:{
        fontSize: 16,
        lineHeight: 25
    },
    info:{
        height: 110,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      
    },
    infoNodes:{
        height: 90,
        width:90,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 4 
    },
    headings:{
        fontSize: 23,
        fontWeight: 'bold',
        color: 'black'
    },
    ingredients:{
        marginVertical: 10
    },  
    procedureSections: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.LIGHTGRAY,
        borderRadius: 15,
        paddingBottom: 15,
        marginBottom: 10
    },
    procedureSectionsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10
    },
    procedureSectionsStep: {
        marginLeft: 10,
        marginBottom: 10
    },
    tagList:{
        marginTop: 10,
        width: "100%",
        
    },
    tag:{
        backgroundColor: Colors.SECONDARY,
        color: "white",
        fontSize: 18,
        marginRight: 10
    },
});

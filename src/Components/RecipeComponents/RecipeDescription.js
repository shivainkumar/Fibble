import { SafeAreaView, ScrollView, StyleSheet, Text, View, SectionList } from 'react-native';
import React, { useState } from 'react';
import * as Colors from '../../styles/colors';
import { FlatList } from 'react-native-gesture-handler';

const RecipeDescription = ({recipe}) =>{
    const [ings, setIngs] = useState([
        {
            title: "Ingredients",
            data: recipe.ingredients
          },
    ])
    const Ingredients = ({ingredients}) =>{
            return(
                <Text>
                    {ingredients}
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
    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.shortDescription}>
                {recipe.shortDescription}
            </Text>
            <View style={styles.info}>
                <View style={styles.infoNodes}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.SECONDARY}}>
                        {recipe.calories}
                    </Text>
                    <Text>
                        Calories
                    </Text>
                </View>
                <View style={styles.infoNodes}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.SECONDARY}}>
                        {recipe.serves}
                    </Text>
                    <Text>
                        Serves
                    </Text>
                </View>
                <View style={styles.infoNodes}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.SECONDARY}}>
                        300
                    </Text>
                    <Text>
                        Calories
                    </Text>
                </View>
            </View>
            <Text style={styles.longDescription}>
                {recipe.longDescription}
            </Text>
            <View style={styles.ingredients}>
                <Text style={styles.headings}>
                    Ingredients
                </Text>
                <SectionList
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
                data={recipe.procedure}
                renderItem={ProcedureSections}
                keyExtractor={item => item.index}
                /> 
                {/* <Text>
                    {recipe.procedure}
                </Text> */}
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
        fontWeight: 'bold',
        fontSize: 18,
        paddingTop: 20,
        paddingBottom: 7
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
    }
});

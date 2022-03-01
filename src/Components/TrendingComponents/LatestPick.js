import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'


const LatestPicks = ({ item }) => {
        return(
            <View style={styles.latestPicksListItems}>
                <Image style={styles.latestPicksThumnail} source={require('../../assets/pexels-dzenina-lukac-1583884.jpg')}/>
                <View style={styles.latestPicksInfo}>
                    <Text style={styles.latestPicksListTitle}>{item.RecipeName}</Text>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra lorem sem non lorem massa non. Massa quis ultrices lectus arcu in imperdiet quis..
                    </Text> 
                </View>
            </View> 
        )
    
    };

export default LatestPicks

const styles = StyleSheet.create({
    titles:{    
        fontSize: 20,
        fontWeight: 'bold'
    },
    latestPicksList:{
        width: "100%",
        height:400
    },
    latestPicksListItems:{
        marginRight: 25,
        marginVertical: 15,
        flex:1,
        width: 300,
        borderRadius: 30,
        shadowColor: 'rgb(0, 0, 0)',
       
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        backgroundColor: 'white',

        padding: 10,
        margin: 10,
    },
    latestPicksThumnail:{
        height: 200,
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
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
})

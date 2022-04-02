import { collection, getDoc } from 'firebase/firestore';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { db } from '../../../firebase';
import { doc } from 'firebase/firestore';
import * as Colors from '../../styles/colors'
import { Ionicons } from '@expo/vector-icons';



const LatestPicks = ({navigation, item, itemID} ) => {
    const [date, setDate] = useState(new Date(item.createdOn))
    const [user, setUser] = useState({})
    useEffect(() => {
      fetchUserInfo()
    }, [])
    

    const fetchUserInfo = async() =>{
        const docRef = doc(db, "users", item.author)
        const documentSnapshots = await getDoc(docRef)
        await setUser(documentSnapshots.data())
    }
        return(
            <TouchableOpacity onPress={() => navigation.navigate('RecipeViewScreen', {...item, itemID})} style={styles.latestPicksListItems}>
                <Image style={styles.latestPicksThumnail} source={{uri: item.downloadURL}}/>
                <View style={styles.latestPicksInfo}>
                    <Text style={styles.latestPicksListTitle}>{item.title}</Text>
                    <Text numberOfLines={2}>
                        {item.shortDescription}
                    </Text> 

                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                        <Image style={{height: 30, width: 30, borderRadius: 15}} source={{uri: user.photoURL}}/>
                        <Text style={{marginLeft: 15, fontSize: 18}}>{user.displayName}</Text>
                    </View>
                    {/* <Text style={{color: Colors.PRIMARY, opacity: 0.6, marginVertical: 10}}>{date.getDate()+
                        "/"+(date.getMonth()+1)+
                        "/"+date.getFullYear()}</Text> */}
                    
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center',  margin: 5, position: 'absolute', top: 10, right: 20, backgroundColor: Colors.WHITE, padding: 5, borderRadius: 8}}>
                        <Ionicons name='heart' color={Colors.SECONDARY} size={25}/>
                        <Text style={{color: Colors.SECONDARY, paddingLeft: 10}}>{item.likes}</Text>
                </View>
            </TouchableOpacity> 
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
        paddingBottom: 15,
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
        marginBottom: 9,
        color: 'black'
    },
    latestPicksListDescription:{
        width: "100%"
    },
    latestPicksInfo:{
        padding: 20
    },
})

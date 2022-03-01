import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native'
import React, {useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import firebase from '../../../../firebase'
import { collection, query, where, getDocs, } from 'firebase/firestore';
import * as Colors from '../../../styles/colors'
import {app, db} from "../../../../firebase"


const Search = ({navigation}) => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchUsers = async (search) =>{
        setLoading(true)
        if (search) {
            const userRef = collection(db, "users")
            const q = query(userRef, where("displayName", ">=", search.trim()))
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

    const ListItem = ({item}) =>{
        return(
            <TouchableOpacity onPress={() => navigation.navigate('Profile', item)} style={styles.listItem}>
                <Image style={styles.listImage} source={{uri: item.data.photoURL}}/>
                <View style={styles.listInfo}>
                    <Text style={styles.listText}>{item.data.displayName}</Text>
                    <Text>{item.data.bio}</Text>
                </View>
                

            </TouchableOpacity>
        )
    }
    return (
        <View>
        <View style={styles.searchView}>
                <TouchableOpacity>
                    <Ionicons name="search-circle" size={45} color="#43C8A8" />
                </TouchableOpacity>
                <TextInput style={styles.searchTextInput} placeholder='Search' onChangeText={fetchUsers}></TextInput>
            </View>
            {loading?
            <ActivityIndicator style={{flex:1}} size='large' color={Colors.SECONDARY}/>:
            <FlatList
            data={users}
            renderItem={ListItem}
            keyExtractor={(item, index) => item + index}
            />
            }
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    searchView:{
        flexDirection: 'row',
        backgroundColor: "#CDFFF3",
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 20 
    },
    searchTextInput:{
        width:"100%",
        backgroundColor: "#CDFFF3",
 
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderBottomWidth: 0.5,
        borderRadius: 20,
        backgroundColor: Colors.PRIMARY
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
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React,{useState, useEffect} from 'react'
import { collection, query, where, getDoc, doc, orderBy, limit, startAfter, startAt } from 'firebase/firestore';
import {app, db} from "../../../../firebase"
import *  as Colors from '../../../styles/colors'
const FollowersFollowingList = (props) => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetchUser()
        console.log(users);
    }, [list])
    

    const fetchUser = async() =>{
        setLoading(true)
        let tempdata = []
         //setList(props.navigation.state.params)
         list.forEach(async(element) => {
            tempdata = users
            const docRef = doc(db, "users", element);
            const docSnap = await getDoc(docRef);
           // console.log({id: docSnap.id, data: docSnap.data()});
            tempdata.push({id: docSnap.id, data: docSnap.data()})
            setUsers(tempdata)
        });
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
    <View style={styles.container}>
      
      <FlatList
        style={{flex: 1, backgroundColor: 'pink'}}
        data={users}
        renderItem={ListItem}
        keyExtractor={(item, index) => item + index}
        refreshControl={
            <RefreshControl
                colors={["#9Bd35A", "#689F38"]}
                refreshing={loading}
                onRefresh={fetchUser}
            />
        }
        /> 
    </View>
  )
}

export default FollowersFollowingList

const styles = StyleSheet.create({
    container:{
        flex: 1
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
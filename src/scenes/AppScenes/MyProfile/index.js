import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, RefreshControl, ActivityIndicator, Button, LogBox} from 'react-native'
import {app, db} from "../../../../firebase"
import { getAuth, signOut } from "firebase/auth";
import UserInfo from '../../../Components/ProfileComponents/UserInfo';
import AppHeader from '../../../Components/CommonComponents/AppHeader';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import RecipeSmall from '../../../Components/TrendingComponents/RecipeSmall';
import { collection, query, where, getDocs, doc, orderBy, limit, startAfter, startAt } from 'firebase/firestore';
import * as Colors from '../../../styles/colors'
LogBox.ignoreLogs(['Setting a timer for a long']);
LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);

const MyProfile = ({navigation}) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [lastVisible, setLastVisible] = useState(0)

    useEffect(async() => {
        fetchData()
    }, [])


    const fetchData = async() =>{
        setLoading(true)
        //const docRef = doc(db, "recipes", getAuth(app).currentUser.uid);
        //const colRef = collection(docRef, "userPosts");
        const colRef = collection(db, "recipesAll")
        const q = query(colRef, where("author", "==", getAuth(app).currentUser.uid), orderBy("createdOn", "desc"), limit(5))
        const documentSnapshots = await getDocs(q);
        let tempdata = [];
        setLastVisible(documentSnapshots.size)
        documentSnapshots.forEach((doc) => {
            tempdata.push(doc.data())
        });
        setData(tempdata)
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
        setLastVisible(lastVisible)
        setLoading(false)
       
    }

    const fetchMoreData = async() =>{
        
        const colRef = collection(db, "recipesAll")
        const q = query(colRef, where("author", "==", getAuth(app).currentUser.uid), startAfter(lastVisible), orderBy("createdOn", "desc"), limit(5))
        const documentSnapshots = await getDocs(q);
        let tempdata = data;
        console.log("before ",tempdata);
        documentSnapshots.forEach((doc) => {
            console.log("adddin",doc.data());
            tempdata.push(doc.data())
        }); 
        const templast = documentSnapshots.docs[documentSnapshots.docs.length-1];
        setLastVisible(templast)
        setData(tempdata)
    }

   

    const renderItem = ({ item }) => (
        <RecipeSmall recipe={item} navigation={navigation}/>
      );

    return (
        <SafeAreaView style={styles.container}>
             <AppHeader/>
            {loading? 
            <ActivityIndicator size='large' style={{flex:1}} color={Colors.SECONDARY}/>:
            <FlatList 
                style={styles.scrollviewContainer}
                data={data}
                keyExtractor={(item, index) => item + index}
                refreshControl={
                    <RefreshControl
                        colors={["#9Bd35A", "#689F38"]}
                        refreshing={loading}
                        onRefresh={fetchData}
                    />
                  }
                renderItem={renderItem}
                ListHeaderComponent={
                    <View>
                        <UserInfo user={getAuth(app).currentUser} navigation={navigation}/>
                        
                    </View>            
            }
            ListHeaderComponentStyle={{flex: 1}}
            //contentContainerStyle={{flex: 3}}
                ListFooterComponent={
                    <View>
                        <Button title='Load more' color={Colors.SECONDARY} onPress={() => fetchMoreData()}/> 
                    </View>
                }
               
                />
                       
            // {/* <ImageModal
            //     resizeMode="contain"
            //     imageBackgroundColor="#000000"
            //     style={{
            //     width: 250,
            //     height: 250,
            //     }}
            //     source={{
            //     uri: 'https://cdn.pixabay.com/photo/2019/07/25/18/58/church-4363258_960_720.jpg',
            //     }}
            // /> */}
            }
        </SafeAreaView>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    scrollviewContainer:{
       
       
    },
    addButton:{
        flexDirection: 'row', 
        alignItems: 'center', 
        marginVertical: 7, 
        alignSelf: 'flex-start', 
        margin: 7,
        padding: 5,
        borderRadius: 10
    }
})

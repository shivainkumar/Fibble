import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, RefreshControl, ActivityIndicator, Button, FlatList} from 'react-native'
import React, {useState, useEffect} from 'react'
import AppHeader from '../../../Components/CommonComponents/AppHeader';
import UserInfo from '../../../Components/ProfileComponents/UserInfo';
import RecipeSmall from '../../../Components/TrendingComponents/RecipeSmall';
import * as Colors from '../../../styles/colors'
import { collection, query, where, getDocs, doc, orderBy, limit, startAfter, setDoc, addDoc, deleteDoc } from 'firebase/firestore';
import {app, db, firebaseConfig} from "../../../../firebase"
import { getAuth } from "firebase/auth";

import { Ionicons } from '@expo/vector-icons';
import { add } from 'react-native-reanimated';


const ProfileView = (props) => {
    const [user, setUser] = useState(props.navigation.state.params)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingFollowStatus, setLoadingFollowStatus] = useState(false)
    const [lastVisible, setLastVisible] = useState(0)
    const [following, setFollowing] = useState(false)
    const [followersUids, setFollowersUids] = useState([])
    const [followingUids, setFollowingUids] = useState([])

    useEffect(async() => {
        fetchRecipes()
        checkFollowing()
        fetchFollowerFollowingData()
    }, [])


    const checkFollowing = async() => {
        const docRef = doc(db, "Following", getAuth(app).currentUser.uid);
        const colRef = collection(docRef, "userFollowing");
        
        const documentSnapshots = await getDocs(colRef);
        let tempdata = [];
        documentSnapshots.forEach((doc) => {
            
            tempdata.push(doc.id)
        });
        console.log(tempdata);
        if (tempdata.includes(user.id)) {
            setFollowing(true)
        } else {
            setFollowing(false)
        }
    }


    //fetches a list of recipes by the user
    const fetchRecipes = async() =>{
        setLoading(true)
        const colRef = collection(db, "recipesAll")
        const q = query(colRef, where("author", "==", user.id), orderBy("createdOn", "desc"), limit(5))
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

    const fetchMoreRecipes = async() =>{
        const colRef = collection(db, "recipesAll")
        const q = query(colRef, orderBy("createdOn", "desc"), startAfter(lastVisible), limit(5))
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
   
    

    //creates a doc with followee's uid as the id in Following<{current user's uid}<userFollowing
    const onFollow = async() => {
        setLoadingFollowStatus(true)
        try {
            const docRefFollowing = doc(db, "Following", getAuth(app).currentUser.uid);
            const colRefFollowing = collection(docRefFollowing, "userFollowing");
            const a = doc(colRefFollowing, user.id)
            await setDoc(a, {})
            
            const docRefFollowers = doc(db, "Followers", user.id);
            const colRefFollowers = collection(docRefFollowers, "userFollowers");
            const b = doc(colRefFollowers, getAuth(app).currentUser.uid)
            await setDoc(b, {})

        } catch (error) {
            console.error(error);
        }
        setFollowing(true)
        setLoadingFollowStatus(false)

    }

    //deletes a doc with followee's uid as the id in Following<{current user's uid}<userFollowing
    const onUnfollow = async () =>{
        setLoadingFollowStatus(true)
        try {
            const docRefFollowing = doc(db, "Following", getAuth(app).currentUser.uid);
            const colRefFollowing = collection(docRefFollowing, "userFollowing");
            const a = doc(colRefFollowing, user.id)
            await deleteDoc(a)

            const docRefFollowers = doc(db, "Followers", user.id);
            const colRefFollowers = collection(docRefFollowers, "userFollowers");
            const b = doc(colRefFollowers, getAuth(app).currentUser.uid )
            await deleteDoc(b)
        } catch (error) {
            console.error(error);
        }
        setFollowing(false)
        setLoadingFollowStatus(false)
    }


    const fetchFollowerFollowingData = async() =>{
        const docRefFollowers = doc(db, "Followers", user.id);
        const colRefFollowers = collection(docRefFollowers, "userFollowers");
        const documentSnapshotsFollowers = await getDocs(colRefFollowers);
        let tempdataFollowers = [];
        documentSnapshotsFollowers.forEach((doc) => {
            tempdataFollowers.push(doc.id)
        });
        setFollowersUids(tempdataFollowers)

        const docRefFollowing = doc(db, "Following", user.id);
        const colRefFollowing = collection(docRefFollowing, "userFollowing");
        const documentSnapshotsFollowing = await getDocs(colRefFollowing);
        let tempdataFollowing = [];
        documentSnapshotsFollowing.forEach((doc) => {
            tempdataFollowing.push(doc.id)
        });
        setFollowingUids(tempdataFollowing)
    }


    const renderItem = ({ item }) => (
        <RecipeSmall recipe={item} navigation={props.navigation}/>
      );

    return (
        <SafeAreaView style={styles.container}>
            {loading? 
            <ActivityIndicator size='large' style={{flex:1}} color={Colors.SECONDARY}/>:
            <FlatList 
                style={styles.scrollviewContainer}
                data={data}
                refreshControl={
                    <RefreshControl
                        colors={["#9Bd35A", "#689F38"]}
                        refreshing={loading}
                        onRefresh={fetchRecipes}
                    />
                  }
                renderItem={renderItem}
                keyExtractor={(item, index) => item + index}
                ListHeaderComponent={
                    <View style={styles.headerContainer}>
                        <TouchableOpacity style={{
                                top: 0,
                                left:0,
                                position: 'absolute',
                                marginHorizontal: 10
                            }} onPress={() => props.navigation.goBack()}>
                            <Ionicons name='chevron-back' color={Colors.SECONDARY} size={30} style={{backgroundColor: Colors.WHITE, marginTop: 10, opacity: 0.9, borderRadius: 5}}/>
                        </TouchableOpacity>
                        <View style={styles.userInfoContainer}>
                            <View style={{width: '40%'}}>
                                <Image style={styles.image} source={{uri: user.data.photoURL}}/>
                            </View>
                            
                            <View style={{width: '50%', alignItems: 'center'}}>
                                <Text style={styles.name}>{user.data.displayName}</Text> 

                                <View style={{flexDirection: 'row',width:'100%', height: 80, justifyContent: 'space-between'}}>
                                    {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={styles.labelNumber}>
                                            50
                                        </Text>
                                        <Text>
                                            Posts
                                        </Text>
                                    </View> */}
                                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={styles.labelNumber}>
                                            {followersUids.length}
                                        </Text>
                                        <Text>
                                            Followers
                                        </Text>
                                    </View>
                                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={styles.labelNumber}>
                                            {followingUids.length}
                                        </Text>
                                        <Text>
                                            Following
                                        </Text>
                                    </View>
                                </View>
                                
                            </View>
                        </View> 
                        {following?
                            <TouchableOpacity onPress={() => onUnfollow()} style={styles.unfollowButton} disabled={loadingFollowStatus? true: false}>
                                <Text style={styles.unfollowButtonText}>
                                    Unfollow
                                </Text>
                            </TouchableOpacity>:
                            <TouchableOpacity onPress={() => onFollow()} style={styles.followButton} disabled={loadingFollowStatus? true: false}>
                                <Text style={styles.followButtonText}>
                                    Follow
                                </Text>
                            </TouchableOpacity>

                        }                                              
                    </View>
                }

                ListFooterComponent={
                    <View>
                        {lastVisible < 5? 
                            <Button title='Load more' color={Colors.SECONDARY} onPress={() => fetchMoreData()}/> 
                            : null
                    }
                    </View>
                }
                />

                
            }
            </SafeAreaView>
    )
}

export default ProfileView

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    scrollviewContainer:{
        marginHorizontal: 10,
        width: '100%',
        flex: 1,      
    },
  
    headerContainer:{
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: Colors.SECONDARY
    },
    userInfoContainer:{
        marginTop: 50,
        flexDirection: 'row',
       
    },
    name:{
        fontSize: 23,
        fontWeight: 'bold',
        color: Colors.WHITE
    },
    image:{
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10
    },
    followButton:{
        width: '90%',
        height: 30,
        
        backgroundColor: Colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        
    },
    unfollowButton:{
        width: '90%',
        height: 30,
        borderWidth: 1,
        borderColor: Colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: Colors.SECONDARY
        
    },
    followButtonText: {
        color: Colors.SECONDARY
    },
    unfollowButtonText: {
        color: Colors.WHITE,
    },
    labelNumber :{
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.WHITE
    },
    addButton:{
        flexDirection: 'row', 
        alignItems: 'center', 
        marginVertical: 7, 
        backgroundColor: Colors.PRIMARY, 
        alignSelf: 'flex-start', 
        margin: 7,
        padding: 5,
        borderRadius: 10
    }
})

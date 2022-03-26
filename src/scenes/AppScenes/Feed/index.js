import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, {useState, useEffect} from 'react';
import Recipe from '../../../Components/TrendingComponents/RecipeLarge';
import * as Colors from '../../../styles/colors';
import { collection, query, where, getDocs, doc, orderBy, limit, startAfter, setDoc, addDoc, deleteDoc } from 'firebase/firestore';
import {app, db, firebaseConfig} from "../../../../firebase"
import { getAuth } from "firebase/auth";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../../../Redux/Action/index'

const testdata = []

const Feed = ({navigation}) => {
  const [following, setFollowing] = useState([])

  useEffect(() => {
    // fetchUserFollowing()
    fetchUser()
  }, [])
  

  const fetchUserFollowing = async() =>{
      const docRef = doc(db, "Following",  getAuth(app).currentUser.uid);
      const colRef = collection(docRef, "userFollowing");
      const q = query(colRef, limit(5))
      const documentSnapshots = await getDocs(q);
      let tempdata = [];
      documentSnapshots.forEach((doc) => {
        console.log(doc.id);
        tempdata.push(doc.id)
      });
      setFollowing(tempdata)
      console.log(tempdata);
  }

  const fetchPosts = async() =>{
    following.forEach(element => {
      const docRef = doc(db, "recipes", element);
    });
  }
  const renderItem = ({ item }) => (
    <Recipe recipe={item} navigation={navigation}/>
  );
  return (
    <SafeAreaView style={styles.container}>
        {/* <View style={styles.header}>
          <Text style={styles.logo}>
              Feed
          </Text>
          <TouchableOpacity>
              <Ionicons name="person-circle-sharp" size={45} color="#DD0050" />
          </TouchableOpacity>
        </View>
        
        <FlatList 
          renderItem={renderItem}
          data={testdata}
          keyExtractor={item => item.id}
          style={styles.list}
        />
         */}
     
    </SafeAreaView>
  );
};

// const mapStateToProps = (store) =>({
//   currentUser: store.userState.currentUser
// })
// const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);
// connect(mapStateToProps, mapDispatchProps)
export default (Feed);

const styles = StyleSheet.create({
  header:{
    height: 100,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
},
logo:{
    width: "50%",
    
    color: Colors.SECONDARY,
    fontSize: 40
},
  container:{
    flex: 1,
    width: '100%'
  },
  list:{
    flex: 1,
    width: '100%'
  }
});

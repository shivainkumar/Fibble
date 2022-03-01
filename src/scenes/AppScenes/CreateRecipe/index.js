import { StyleSheet, Text, View, SafeAreaView, TextInput, ScrollView, Touchable, TouchableOpacity, Pressable, BackHandler, Alert, Image, Button, SectionList } from 'react-native';
import React,{useState, useEffect} from 'react';
import * as Colors from '../../../styles/colors';
import AppHeader from '../../../Components/CommonComponents/AppHeader';
import { borderLeftColor, color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, signOut } from "firebase/auth";
import {app, db, storage} from '../../../../firebase';
import { addDoc, collection, setDoc, Timestamp, doc, FieldValue } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { proc } from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { setWarningHandler } from 'react-native/Libraries/Utilities/RCTLog';

const CreateRecipe = ({navigation}) => {
    const [title, settitle] = useState("");
    const [shortDescription, setshortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [ingredients, setIngridients] = useState([]);
    const [links, setLinks] = useState("")
    const [image, setImage] = useState(null);
    const [tempIng, settempIng] = useState("")
    const [tempProcedure, setTempProcedure] = useState({
        title:"",
        steps:[""]
    })
    const [procAddVisible, setProcAddVisible] = useState(true)
    const [procedureSections, setProcedureSections] = useState([])
    const [tempSteps, setTempSteps] = useState([])
    const [step, setStep] = useState("")
    const [sectionTitle, setSectionTitle] = useState("")
    const [calories, setCalories] = useState(null)
    const [time, setTime] = useState("")
    const [serves, setServes] = useState(null)
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState("")

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result.uri);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
    };
    

    const handleSubmit = async() =>{
        uploadImage();
    }


    const uploadRecipeData = async(downloadURL) =>{
        const docRef = doc(db, "recipes", getAuth(app).currentUser.uid);
        const colRef = collection(docRef, "userPosts");
        addDoc(colRef, {
            title: title,
            shortDescription: shortDescription,
            longDescription: longDescription,
            ingredients: ingredients,
            procedure: procedureSections,
            createdOn: Date.now(),
            calories: calories,
            serves: serves,
            downloadURL: downloadURL
        })
        navigation.popToTop();
    }


    const uploadImage = async() =>{
        
        if (image) {
            const childPath = `recipeImages/${getAuth(app).currentUser.uid}/${Math.random().toString(36)}`;
            const res = await fetch(image);
            const blob = await res.blob();
            const storageRef = ref(storage, childPath);
            await uploadBytes(storageRef, blob);
            getDownloadURL(storageRef).then((url) =>{
                uploadRecipeData(url)
            })
        } else {
            console.log("unable to upload");
        }
    }

    const Ingredients = ({ item }) =>{
        return(
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <Text>{item}</Text>
                <TouchableOpacity >
                    <Ionicons name='remove' color={Colors.SECONDARY} size={24}/>
                </TouchableOpacity>
                
            </View>
        )
    }

    const addIngredients = (ingredient) =>{
        let temp = ingredients;
        temp.push(ingredient) 
        setIngridients(temp)
        settempIng("")
    }

    const addTag = () =>{
        let temp = tags;
        temp.push(tag) 
        setTags(temp)
        setTag("")
    }

    const addProcedureSections = () =>{
        setProcAddVisible(false)   
    }

    const saveSection = () =>{
        let temp = procedureSections;
        temp.push({
            title: sectionTitle,
            data: tempSteps
        })
        setProcedureSections(temp)
        setSectionTitle("")
        setTempSteps([])
        setStep("")
        setProcAddVisible(true)
    }

    const saveStep = () => {
        let temp = tempSteps;
        temp.push(step);
        setTempSteps(temp)
        setStep("")
    }
    // const removeIngredient = () =>{
    //     let temp = ingredients;
    //     temp.push(ingredient) 
    //     setIngridients(temp)
    //     settempIng("")
    // }

    // const uploadImage = async() =>{
    //     const uri = image
    //     const response = await fetch(uri);
    //     const blob = await response.blob();

    //     const task = firebase.storage().ref().child(`post/${getAuth(app).currentUser.uid}/${Math.random().toString(36)}`).put(blob);
    //     const taskProgress = snapshot =>{
    //         console.log(`transferred: ${snapshot.bytesTransferred}`);
    //     }
    // }
    
    const ImageRender = () =>{
        if (image == null) {
            return <Ionicons name='add-circle' size={100} color={Colors.SECONDARY}/>
        } else {
            return <Image style={{height: '100%', width:'100%', borderRadius: 20}} source={{uri: image}}/>
        }
    }

    const ProcedureStepRender = ({Witem, index}) =>{
        return(
            <View style={styles.procedureSections}>
                <Text style={styles.procedureSectionsTitle}>
                    {item.title}
                </Text>
               
                <FlatList
                data={item.data}
                scrollEnabled={false}
                renderItem={({item, index}) => 
                <View style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}>
                    <View style={{borderRadius: 13, width: 25, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.GRAY}}>
                        <Text style={{color: "black", fontWeight: 'bold', padding: 1}}>{index + 1}</Text>
                    </View>
                    <Text style={styles.procedureSectionsStep}> {item}</Text>
                </View>}
                keyExtractor={(item, index) => item + index}
                />
                {/* <TouchableOpacity onPress={() =>{
                    let temp = procedureSections;
                    temp.filter(item =>{
                        item.title !==
                    })
                }}>
                    <FontAwesome name="remove" size={24} color="red" />
                </TouchableOpacity> */}
            </View>
        )
           
            //<TextInput style={{backgroundColor: 'pink'}} placeholder='test'/>
        
    }

    return (
        <ScrollView style={styles.container}>
            <AppHeader/>
            <Text style={styles.pageIntro}>Add new recipe</Text>
            <TouchableOpacity onPress={() => pickImage()} style={{height: 200, width: '100%', backgroundColor: Colors.OFFWHITE, marginVertical: 10, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
               <ImageRender />                
            </TouchableOpacity>
           
            <View style={styles.introduction}>
                <Text style={styles.sectionTitle}>Introduction</Text>
                <TextInput 
                style={styles.inputs} 
                placeholder='Title (Required)' 
                placeholderTextColor={Colors.SECONDARY} 
                value={title} 
                onChangeText={settitle}/>

                <Text style={styles.descriptionText}>Tip - Keep titles short and concise.</Text>

                <TextInput 
                style={styles.inputs} 
                placeholder='Short Description (Optional)' 
                placeholderTextColor={Colors.SECONDARY} 
                multiline={true} 
                maxLength={170}
                value={shortDescription} 
                onChangeText={setshortDescription}/>

                <Text style={styles.descriptionText}>A one or two line description thats helps the audience learn about your recipe before they click to view it. </Text>
                <TextInput 
                style={styles.inputs} 
                placeholder='Long Description (Optional)' 
                placeholderTextColor={Colors.SECONDARY} 
                multiline={true} 
                numberOfLines={3}
                maxLength={350}
                value={longDescription} 
                onChangeText={setLongDescription}/>
                <Text style={styles.descriptionText}>A good description helps the audience understand your recipe.</Text>
                
            </View>

            <View style={styles.ingridientsContainer}>
                <Text style={styles.sectionTitle}>Ingridients</Text>
                 {ingredients?
                    <FlatList
                    style={{marginHorizontal: 15}}
                    scrollEnabled={false} 
                    data={ingredients}
                    renderItem={Ingredients}
                    keyExtractor={(item, index) => item + index}
                    /> : <Text>No ingredients added</Text>}
                <TextInput style={styles.inputs} placeholder='Add Ingredients' value={tempIng} onChangeText={settempIng}/>
                <View style={{marginHorizontal: 15}}>
                    <Button title='Add' disabled={tempIng? false: true} color={Colors.SECONDARY} onPress={() =>
                            addIngredients(tempIng)
                            }/>
                </View>
            
            </View>

            <View style={{width: "100%"}}>
                <Text style={styles.sectionTitle}>Procedure</Text>
                <FlatList 
                data={procedureSections}
                scrollEnabled={false}
                renderItem={({ item, index }) => <ProcedureStepRender item={item} index={index} />}
                keyExtractor={(item, index) => item + index}
                /> 
                {/* <SectionList
                scrollEnabled={false} 
                sections={procedureSections}
                keyExtractor={(item, index) => item + index}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
                /> */}

                
                {procAddVisible? 
                <TouchableOpacity onPress={() => addProcedureSections()} style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginLeft:10}}>
                    <AntDesign name="pluscircle" size={24} color={Colors.SECONDARY} />
                    <Text style={{color: Colors.SECONDARY, paddingLeft: 10, fontWeight: 'bold'}}>Add Procedure</Text>
                </TouchableOpacity>: 
                <View style={styles.introduction}>
                    <TextInput style={styles.sectionTitleInput} placeholder='Section title' value={sectionTitle} onChangeText={setSectionTitle}/>
                    <FlatList 
                    scrollEnabled={false}
                    data={tempSteps}
                    renderItem={({item}) => <Text>{item.index} {item}</Text>}
                    keyExtractor={(item, index) => item + index}
                    />
                    <TextInput style={styles.sectionStepsInput} placeholder='Add Steps' value={step} onChangeText={setStep}/>
                    {step?
                    <Button title='Add Step' color={Colors.SECONDARY} style={styles.buttonStyle} onPress={() => saveStep()}/>:
                    <View></View>
                    }
                    {tempSteps && sectionTitle?
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', margin: 10}}>
                        <Button title='Cancel' color={Colors.SECONDARY} style={styles.buttonStyle} onPress={() =>{
                            setTempSteps([]);
                            setStep("");
                            setSectionTitle("");
                        }}/>
                        <Button title='Confirm' color={Colors.SECONDARY} style={styles.buttonStyle} onPress={() =>saveSection()}/>
                    </View>
                    :
                    <View></View>
                    }
                    
                </View>
                }
            </View>

            <View>
                <Text style={styles.sectionTitle}>
                    Tags
                </Text>
                <FlatList 
                    data={tags}
                    keyExtractor={(item, index) => item + index}
                    renderItem={(item) => <Text style={styles.tag}>{item.item}</Text>}
                    style={styles.tagList}
                    contentContainerStyle={{flexDirection : "column"}} 
                />
                <View style={{flexDirection: 'row', width: "100%", justifyContent: 'space-evenly'}}>
                    <TextInput placeholder='Add tags' value={tag} onChangeText={setTag} placeholderTextColor={Colors.SECONDARY} style={styles.inputs}/>
                    <Button title='Add Tag' style={{minWidth: "30%", borderRadius: 10}} color={Colors.SECONDARY} onPress={() => {addTag()}}/>
                </View>
            </View>
            <View>
                <TextInput 
                style={styles.inputs} 
                placeholder='Calories (kCal)' 
                keyboardType='numeric'
                placeholderTextColor={Colors.SECONDARY} 
                value={calories} 
                onChangeText={setCalories}/>
                 {/* <TextInput 
                style={styles.inputs} 
                placeholder='Cooking Time' 
                placeholderTextColor={Colors.SECONDARY} 
                value={time} 
                onChangeText={setTime}/> */}
                 <TextInput 
                style={styles.inputs} 
                placeholder='Serves' 
                keyboardType='numeric'
                placeholderTextColor={Colors.SECONDARY} 
                value={serves} 
                onChangeText={setServes}/>
            </View>

            <View style={{margin: 20}}>
                <Button color={Colors.SECONDARY} onPress={() => handleSubmit()} title='Submit'/>
            </View>
            
        </ScrollView>
    );
};

export default CreateRecipe;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        padding: 10
    },
    pageIntro:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
    },
    sectionTitle:{
        fontSize: 23,
        fontWeight: 'bold',
        color: 'black',
        paddingHorizontal: 15,
    },
    introduction:{
        backgroundColor: Colors.LIGHTGRAY,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 20,
    },
    inputs:{
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginVertical: 5,
        borderRadius: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.SECONDARY,
        minWidth: '75%'
    },
    descriptionText:{
        marginBottom: 5,
        marginHorizontal: 15,
        fontSize: 12
    },
    ingridientsContainer:{
        width: '100%',
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
    buttonStyle:{
        padding: 10,
        margin: 10
    },
    sectionTitleInput:{
        fontSize: 18, 
        backgroundColor: Colors.GRAY, 
        color: 'black', 
        padding: 5, 
        borderRadius: 10,
        marginBottom: 10
    },
    sectionStepsInput:{
        backgroundColor: Colors.GRAY, 
        color: 'black', 
        paddingHorizontal: 5, 
        borderRadius: 10
    },
    tagList:{
        marginTop: 10,
        width: "100%",
    },
    tag:{
        paddingVertical: 7,
        paddingHorizontal: 13,
        backgroundColor: Colors.SECONDARY,
        color: "white",
        borderRadius: 20,
        marginRight:10,
        marginBottom: 10
    },

});

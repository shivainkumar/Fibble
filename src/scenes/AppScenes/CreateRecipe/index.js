import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, Button, LogBox } from 'react-native';
import React,{useState, useEffect} from 'react';
import * as Colors from '../../../styles/colors';
import AppHeader from '../../../Components/CommonComponents/AppHeader';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from "firebase/auth";
import {app, db, storage} from '../../../../firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FlatList } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';


LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);
LogBox.ignoreLogs(['`flexWrap: `wrap`` is not supported with the `VirtualizedList` components.Consider using `numColumns` with `FlatList` instead.']);
LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality ']);

const CreateRecipe = ({navigation}) => {
    const [title, settitle] = useState("");
    const [shortDescription, setshortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [links, setLinks] = useState("")
    const [image, setImage] = useState(null);
    //Ingredient States
    const [ingredients, setIngridients] = useState([]);
    const [tempIng, settempIng] = useState("")
    const [ingredientsAddVisible, setIngredientsAddVisible] = useState(false)

    //Proceduce states
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
    const [confirmUpload, setConfirmUpload] = useState(false)
    const [openCuisineDropdown, setOpenCuisineDropdown] = useState(false);
    const [cuisine, setCuisine] = useState(null);
    const [cuisines, setCuisines] = useState([
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'}
    ]);

    DropDownPicker.setListMode("SCROLLVIEW");
useEffect(() => {
    fetchCuisine()
}, [])


    const fetchCuisine = async() => {
        const colRef = collection(db, "cuisines")
        const snapshot = await getDocs(colRef)
       
        let tempdata = [];
        snapshot.forEach((doc) =>{
            tempdata.push({label: doc.id, value: doc.id})
        })
        console.log(tempdata);
        setCuisines(tempdata)
    }

    //image picker
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
    
//upload functions
    const handleSubmit = async() =>{
        uploadImage();
    }
    const uploadRecipeData = async(downloadURL) =>{
        let tagsFinal = []
        tags.forEach(e => tagsFinal.push(e.tag))
        if(cuisine){
            tagsFinal.push(cuisine)
        }
        const titleTags = title.split(" ")
        titleTags.forEach(e => {
            if (!tagsFinal.includes(e)) {
                tagsFinal.push(e)   
            }})
        
        const docRef = addDoc(collection(db, "recipesAll"), {
            title: title,
            shortDescription: shortDescription,
            longDescription: longDescription,
            ingredients: ingredients,
            procedure: procedureSections,
            createdOn: Date.now(),
            calories: calories,
            serves: serves,
            downloadURL: downloadURL,
            author: getAuth(app).currentUser.uid,
            tag: tagsFinal,
            likes: 0
        })
        navigation.popToTop();
        console.log(docRef);
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
            <View style={{flexDirection: 'row',
             paddingVertical: 7,
            paddingHorizontal: 13,
            backgroundColor: Colors.SECONDARY,
            borderRadius: 20,
            marginRight:10,
            marginBottom: 10,
            justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={styles.ingridientText}>{item.ingredient}</Text>
                <TouchableOpacity onPress={() =>removeIngredients(item)}>
                    <Entypo name="circle-with-cross" size={26} color={Colors.WHITE}  />
                </TouchableOpacity>
                
            </View>
        )
    }

    const removeIngredients = item => {
        let temp = ingredients.filter(e => e !== item)
        setIngridients(temp)
    }

    const addIngredients = (ingredient) =>{
        setIngredientsAddVisible(true)
        const index = ingredients.length;
        let temp = ingredients;
        temp.push({id: index, ingredient: ingredient}) 
        setIngridients(temp)
        settempIng("")
    }

    const Tags = ({item}) => {
        return(
        <View style={{flexDirection: 'row', backgroundColor: Colors.SECONDARY, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 20, margin: 5}}>
            <Text style={styles.tag}>#{item.tag}</Text>
            <TouchableOpacity onPress={() =>removeTag(item)}>
                <Entypo name="circle-with-cross" size={26} color={Colors.WHITE}  />
            </TouchableOpacity>
        </View>)
    }

    const addTag = () =>{
        const index = tags.length;
        let temp = tags;
        temp.push({id: index, tag: tag}) 
        setTags(temp)
        setTag("")
    }

    const removeTag = item => {
        let temp = tags.filter(e => e !== item)
        setTags(temp)
    }

    const addProcedureSections = () =>{
        setProcAddVisible(false)   
    }

    const saveSection = () =>{
        const index = procedureSections.length;
        let temp = procedureSections;
        temp.push({
            id: index,
            title: sectionTitle,
            data: tempSteps
        })
        setProcedureSections(temp)
        setSectionTitle("")
        setTempSteps([])
        setStep("")
        setProcAddVisible(true)
    }

    const removeSection = item => {
        let temp = procedureSections.filter(e => e !== item)
        setProcedureSections(temp)
    }


    const saveStep = () => {
        let temp = tempSteps;
        temp.push(step);
        setTempSteps(temp)
        setStep("")
    }
    
    const ImageRender = () =>{
        if (image == null) {
            return <Ionicons name='add-circle' size={100} color={Colors.SECONDARY}/>
        } else {
            return <Image style={{height: '100%', width:'100%', borderRadius: 20}} source={{uri: image}}/>
        }
    }

    const ProcedureStepRender = ({item, index}) =>{
        return(
            <View style={styles.procedureSections}>
                <TouchableOpacity onPress={() =>removeSection(item)} style={{position: 'absolute', right: 0}}>
                    <Entypo name="circle-with-cross" size={26} color={Colors.SECONDARY}  />
                </TouchableOpacity>
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
            <Text style={styles.pageIntro}>Create a new recipe</Text>
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

            <View style={styles.ingridientsSectionContainer}>
                <Text style={styles.sectionTitle}>Ingridients</Text>
                    <FlatList
                    style={{ marginTop: 8}}
                    scrollEnabled={false} 
                    data={ingredients}
                    renderItem={Ingredients}
                    keyExtractor={(item, index) => item + index}
                    />
                                
                <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', width: '100%'}}>
                    <TextInput style={[styles.inputs, {width: "85%"}]} placeholder='Add Ingredients' value={tempIng} onChangeText={settempIng}/>
                    <TouchableOpacity onPress={() => addIngredients(tempIng)} disabled={tempIng? false: true} style={{flexDirection: 'row', alignItems: 'center', width: "15%"}}>
                        <AntDesign name="pluscircle" size={28} color={Colors.SECONDARY} />
                    </TouchableOpacity>
                </View>
            
            </View>

            <View style={styles.ingridientsSectionContainer}>
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
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TextInput style={styles.sectionStepsInput} placeholder='Add Steps' value={step} onChangeText={setStep}/>
                        {/* <Button title='Add Step' color={Colors.SECONDARY} style={styles.buttonStyle} onPress={() => saveStep()}/> */}
                        <TouchableOpacity onPress={() => saveStep()} disabled={step? false: true} style={{flexDirection: 'row', alignItems: 'center', width: "15%", justifyContent:'center'}}>
                            <AntDesign name="pluscircle" size={28} color={Colors.SECONDARY} />
                        </TouchableOpacity>
                    </View>
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
                    null
                    }
                    
                </View>
                }
            </View>

            <View>
                <TextInput 
                style={styles.inputs} 
                placeholder='Calories (kCal) per serving' 
                keyboardType='numeric'
                placeholderTextColor={Colors.SECONDARY} 
                value={calories} 
                onChangeText={setCalories}/>
                 <TextInput 
                style={styles.inputs} 
                placeholder='Serves' 
                keyboardType='numeric'
                placeholderTextColor={Colors.SECONDARY} 
                value={serves} 
                onChangeText={setServes}/>
               
            </View>
          
            <View style={styles.ingridientsSectionContainer}>
                <Text style={styles.sectionTitle}>
                    Cuisine
                </Text>
               
                <DropDownPicker
                open={openCuisineDropdown}
                value={cuisine}
                items={cuisines}
                setOpen={setOpenCuisineDropdown}
                setValue={setCuisine}
                setItems={setCuisines}
                searchable={true}
                searchTextInputProps={{
                    maxLength: 25
                  }}
                style={{marginHorizontal: 10, width: "95%"}}
                />
            </View>

            <View style={styles.ingridientsSectionContainer}>
                <Text style={styles.sectionTitle}>
                    Tags
                </Text>

                <FlatList 
                    scrollEnabled={false}
                    data={tags}
                    keyExtractor={(item, index) => item + index}
                    renderItem={Tags}
                    style={styles.tagList}
                    contentContainerStyle={{width: "100%", justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' }}
                    ListFooterComponent={
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TextInput placeholder='Add tags' value={tag} onChangeText={setTag} placeholderTextColor={Colors.SECONDARY} style={styles.tagInput}/>
                            <TouchableOpacity style={{ borderRadius: 25}} onPress={() => {addTag()}}>
                                <AntDesign name="pluscircle" size={28} color={Colors.SECONDARY} />
                            </TouchableOpacity>
                            {/* /<Button title='Add Tag'  color={Colors.SECONDARY} /> */}
                        </View>
                    }
                />
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
        minWidth: '75%',
        maxWidth: "100%"
    },
    descriptionText:{
        marginBottom: 5,
        marginHorizontal: 15,
        fontSize: 12
    },
    ingridientsSectionContainer:{
        width: '100%',
        marginVertical: 10
    },
    ingridientText:{
        color: Colors.WHITE,
        fontSize: 18
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
        borderRadius: 10,
        width: "85%"
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
    tagInput:{
        paddingVertical: 7,
        paddingHorizontal: 13,
        color: Colors.SECONDARY,
        borderRadius: 20,
        marginRight:10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.SECONDARY,
    },
});

import { app, db } from '../../../firebase'
import getAuth from 'firebase/auth'
import { collection, query, where, getDoc, doc } from 'firebase/firestore';
import {USER_STATE_CHANGE} from '../Constants/index'

export function fetchUser() {
  
    return((dispatch) =>{
        const docref = collection(db, "users", getAuth(app).currentUser.uid)
        const snapshot = getDoc(docref)

        if (snapshot.exists) {
            dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
        } else {
            console.log("does not exist");
        }
        console.log(docSnap);
        console.log(dispatch);
    })
}

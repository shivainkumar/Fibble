import {combineReducers} from 'redux'
import {user} from './user'

const Reducers = combineReducers({
    userState: user
})

export default Reducers
// export default function reducer(state = [], action) {
//     switch (action.type) {
//         case "FETCH_FOLLOWING":
//             return[
//                 action.payload
//             ]

//         default:
//             break;
//     }
// } 
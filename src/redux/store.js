import {createStore, combineReducers} from 'redux'
const initialForm = {
    
    name: '',
    surname: '',
    id: '',
    Major: '',
    GPA: ' '
}
const formReducer = (state=initialForm,action)=>{
    switch(action.type){
        
        case 'CHANGE_NAME': return {...state,name: action.name}
        case 'CHANGE_SURNAME': return {...state,surname: action.surname}
        case 'CHANGE_ID': return {...state,id: action.id}
        case 'CHANGE_MAJOR': return {...state,Major: action.Major}
        case 'CHANGE_GPA': return {...state,GPA: action.GPA}
        default:return state;
    }
}

const studentReducer=(state=[],action)=>{
    switch(action.type){
        case 'GET_STUDENTS':
            return action.student
        case 'ADD_STUDENT': 
            return [...state,action.student]
        case 'DELETE_STUDENT':
                return state.filter(student => student.no !== +action.no)
        case 'UPDATE_STUDENT':
            return state.map(student =>{
                if(+student.no === +action.no)
                    return action.student;
                else return student;
                })
        default:
            return state;
    }
}
const reducer = combineReducers({
    student: studentReducer,
    form: formReducer
})



export const store = createStore(reducer)
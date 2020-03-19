import React, { useEffect } from './node_modules/react'
import {useSelector,useDispatch} from './node_modules/react-redux'
import axios from './'
const ListStudent=(props)=>{


    const students = useSelector(state=> state.student);
    const form = useSelector(state => state.form)
    const dispatch = useDispatch()
     useEffect(()=>{
        getStudents();
     },[])
     const getStudents = async () => {
        const result = await axios.get(`http://localhost/api/students`)
        console.log(result.data)
        const action = {type:'GET_STUDENTS',student: result.data}
        dispatch(action)
      }
    
    const deleteStudent = async (students_no)=>{
        await axios.delete(`http://localhost/api/students/${students_no}`)
        dispatch({type:'DELETE_STUDENT',no: students_no })
        getStudents()
          
    }
    const updateStudent = async (students_no) => {
        await axios.put(`http://localhost/api/students/${students_no}`,form)
         dispatch(
             {type:'UPDATE_STUDENT',
             no: props.no,
             student:{...form, no:  students_no}
         })
         getStudents()
         
       }
    
   
    const printStudents = ()=>{
        if(students && students.length){
            return students.map((student,index)=>{
                return(
                    <li key={index}>
                            no: {student.no}, 
                            {student.name}  {student.surname  } : 
                            {student.id} Major: {student.Major} GPA:{student.GPA}
                            <button onClick={ ()=>deleteStudent(student.no)}>DEL</button>
                            <button onClick={ ()=>updateStudent(student.no)}>Update</button>
                    </li> 
                )
            })
        }
        else{
            return(<h1>No data</h1>)
        }
    }


    return(
        <div>
             <ul>
                {printStudents()}
            </ul>
        </div>
    )



}
export default ListStudent
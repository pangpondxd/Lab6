import React, { useState, useEffect } from 'react'
import axios from 'axios'
 
export default () => {
 
   const [bears, setBears] = useState({})
   const [bear, setBear] = useState('')
   const [weight,setWeight] = useState(0)
 
   const getBears = async () => {
       const result = await axios.get(`http://localhost/api/bears`)
       setBears(result.data)
   }
 
   const getBear = async (id) => {
       const result = await axios.get(`http://localhost/api/bears/${id}`)
       console.log('bear id: ', result.data)
       setBear(result.data)
   }
 
   const addBear = async (name, weight) => {
       const result = await axios.post(`http://localhost/api/bears/`,{
           name,
           weight
       })
       console.log(result.data)
       getBears()
   }
 
   const deleteBear = async (id) => {
       const result = await axios.delete(`http://localhost/api/bears/${id}`)
       console.log(result.data)
       getBears()
   }
 
   const updateBear = async (id) => {
       const result = await axios.put(`http://localhost/api/bears/${id}`,{
           name,
           weight
       })
       console.log('bear id update: ', result.data)
       getBears()
   }
   const printBears = () => {
    console.log('Bears:', bears)
    if (bears && bears.length)
        return (bears.map((bear, index) =>
            (<li key={index}>
                {(bear)?bear.name:'-'} : {(bear)?bear.weight:0}
                <button onClick={() => deleteBear(bear.id)}> Delete </button>
                <button onClick={() => getBear(bear.id)}>Get</button>
                <button onClick={() => updateBear(bear.id)}>Update</button>
            </li>)
        ))
    else {
        return (<h2>No bears</h2>)
    }
}

useEffect(() => {
    getBears()
},[])

return (
    <div>
        <h2>Bears</h2>
        <ul>{printBears()}</ul>
       
        selected bear: {bear.name} {bear.weight}
        <h2>Add bear</h2>
        Name:<input type="text" onChange={(e)=>setName(e.target.value)} /> <br/>
        Weight:<input type="number" onChange={(e)=>setWeight(e.target.value)} /> <br/>
        <button onClick={ () => addBear(name, weight)}>Add new bear</button>
    </div>
)
}

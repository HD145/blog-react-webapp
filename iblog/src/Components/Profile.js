import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../App'
import { useContext } from 'react'


export const Profile = () => {
    
    const navigate=useNavigate();
    const [userData, setUserData] = useState({})

    const {state,dispatch}= useContext(UserContext);
    dispatch({type:"USER",payload:true}) //for toggle


    const callAboutPage=async()=>{
        try{
            const res=await fetch('/about',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });

            const data=await res.json();
            console.log(data);
            setUserData(data);

            if(res.status!==200){
                const error=new Error(res.error);
                throw error
            }
        }catch(err){
            // alert("invalid")
            console.log(err)
            navigate("/login")
        }
    };

    useEffect(() => {
     callAboutPage();
    }, []);

  return (
    <div className='container'>

      {userData.name} <br></br>
      {userData.email} <br></br>
      {/* {userData.blogs?
        userData.blogs.map((blog)=>{
          return(
            <div className='container'>
            
              {blog.title}
              {blog.description}
            </div>
          )

        }):"No blogs to show"
      } */}

      {/* {userData.blogs && userData.blogs.map((blog,index)=>{
        <h3>{userData}</h3>
      })} */}
    </div>
  )
}

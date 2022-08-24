import React, {useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Blog } from './Blog';
import { UserContext } from '../App'
import { useContext } from 'react'


export const YourBlogs = () => {
    

    const {state,dispatch}= useContext(UserContext);
    dispatch({type:"USER",payload:true}) //for toggle
    
    const navigate=useNavigate();
    const [userData, setUserData] = useState([])


    const yourBLogs=async()=>{
        let id=localStorage.getItem("id");
        try{
            const res=await fetch(`/getByUserId/${id}`,{
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
     yourBLogs();
    }, []);


  return (

    <>
    
    <section class="details-card">
    <div class="container">
    <div class="row">

        {
        
            userData.map((blog)=>{
            return(
                <>
                <Blog id={blog._id} title={blog.title} description={blog.description} imageUrl={blog.imageUrl} like={blog.likes.length} />
                </>
            )

            })

        }
    </div>
    </div>
    </section>
        
    </>
  )
}

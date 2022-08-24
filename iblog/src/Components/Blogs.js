import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Blog } from './Blog';
import { UserContext } from '../App'
import { useContext } from 'react'
import { useState, useEffect } from 'react';


export const Blogs = () => {

    const navigate=useNavigate();
    const [blogData, setBlogData] = useState([])

    const {state,dispatch}= useContext(UserContext);
    dispatch({type:"USER",payload:true}) //for toggle


    const callBlogData=async()=>{
        try{
            const res=await fetch('/allBlogs',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });

            const data=await res.json();
            console.log(data);
            setBlogData(data);

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
     callBlogData();
    }, []);

    

  return (
   
    <section class="details-card">
    <div class="container">
    <div class="row">

        {
        
            blogData.map((blog)=>{
            return(
                <>
                <Blog id={blog._id} title={blog.title} description={blog.description} imageUrl={blog.imageUrl} like={blog.likes.length} flag={true}/>
                </>
            )

            })

        }
    </div>
    </div>
    </section>
    
   
  )
}

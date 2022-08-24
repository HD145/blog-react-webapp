import React, { useState, useEffect } from 'react'
import { ShowBlog } from './ShowBlog'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import { useContext } from 'react'


export const Blog = ({id, title,description,imageUrl,like,flag}) => {

    const navigate=useNavigate();

    const {state,dispatch}= useContext(UserContext);
    dispatch({type:"USER",payload:true}) //for toggle

    const [likes, setLikes] = useState(like)
    const [likeflag, setLikeflag] = useState(true)

    const handleDelete=async(e)=>{
        // e.preventDefault();
        console.log(e)

        const res= await fetch(`/deleteblog/${id}`,{
          method:"DELETE",
          headers:{
            "Content-Type":"application/json"
          },
        })
        document. location. reload()
       
    }

    const showBlog=async(e)=>{
        navigate(`/showBlog/${id}`)
    }

    const handleEdit=async(e)=>{
      navigate(`/updateBlog/${id}`)
    }

    const likeBtn=async(e)=>{
      e.preventDefault();
      console.log(e)

        const res=await fetch(`/like/${id}`,{
          method:"PUT",
          headers:{
              Accept:"application/json",
              "Content-Type":"application/json"
          },
          credentials:"include"
        });
      const data=await res.json();
      setLikeflag(false)
      setLikes(data.length)
    }

    const unlikeBtn=async(e)=>{
      e.preventDefault();
      console.log(e)

        const res=await fetch(`/unlike/${id}`,{
          method:"PUT",
          headers:{
              Accept:"application/json",
              "Content-Type":"application/json"
          },
          credentials:"include"
        });
      const data=await res.json();
      setLikeflag(true)
      setLikes(data.length)
    }


  return (
    // <section class="details-card">
    //         <div class="container">
    //             <div class="row">
        
        <div class="col-md-4 mb-5">
            <div class="card-content">
                <div class="card-img">
                    <img src="https://placeimg.com/380/230/nature"/>
                </div>
                <div class="card-desc">

                    <h3>{title ? title.slice(0, 20)+"..." : ''}</h3>
                    <p>{description ? description.slice(0, 60)+"..." : 'No description to show'}</p>
                    <p>
                      {likes} likes
                    </p>
                    {
                    likeflag?
                    <>
                    <i class="fa fa-thumbs-up" onClick={likeBtn} style={{"font-size":"24px"}}></i><br/>
                    </>
                    :
                    <>
                    <i class="fa fa-thumbs-down" onClick={unlikeBtn} style={{"font-size":"24px"}}></i><br/>
                    </>
                    }    
                    
                  {
                    flag?
                    <>
                    <input type="button" class="btn-card" onClick={showBlog} value="Full Read" /><span/>
                    
                    </>
                    :
                    <><input type="button" class="btn-card" onClick={handleDelete} value="Delete" /> <span/>
                    <input type="button" class="btn-card" onClick={handleEdit} value="Edit" /><span/>
                    </>
                  }  
                       
                
                </div>
            </div>

        </div>
      
          
        //         </div>
                
        //     </div>
        // </section>
        
  )
}

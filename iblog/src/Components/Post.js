import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../App'
import { useContext } from 'react'


export const Post = () => {
    const navigate=useNavigate();
    const [blog, setBlog] = useState({title:"",description:"",imageUrl:""})

    const {state,dispatch}= useContext(UserContext);
    dispatch({type:"USER",payload:true}) //for toggle

    
    const handleInputs=(e)=>{

        console.log(e);
        let name=e.target.name;
        let value=e.target.value;
        setBlog({...blog,[name]:value});
    }

    const submitForm=async(e)=>{
        
        e.preventDefault();
        console.log(e)
        const userId=localStorage.getItem("id")
        console.log(userId)
        const user=userId;
        const{title,description,imageUrl}=blog;
        console.log(user)
        try{
          const res= await fetch('/postBlog',{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              title,description,imageUrl,user
            })
          })
          const data=await res.json();
          console.log(data);
          console.log(res)
      
          if(res.status===400){
            alert("cannot save");
          }else{
              alert("Successful posted");
              navigate("/")
          }
        }catch(err){
          // alert("invalid")
          console.log(err)
          navigate("/login")
      }
        
    }


  return (
    <div className='container' style={{"border": "4px solid #ff6767","border-radius":"20px","margin-top":"7rem"}}>
        <form method='POST'>
            <div class="form-group mt-3">
                <label for="exampleFormControlInput1">Blog Title</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" name='title' value={blog.title} onChange={handleInputs}  />
            </div>
            
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Blog Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name='description' value={blog.description} onChange={handleInputs}></textarea>
            </div>

            <div class="form-group">
                <label for="exampleFormControlInput1">Image URL</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" name='imageUrl' value={blog.imageUrl} onChange={handleInputs} />
            </div>

            <button type="button" class="btn btn-danger mb-3" style={{"width": "5rem","font-weight": "bold"}} onClick={submitForm}>Post</button>
        </form>
    </div>
  )
}

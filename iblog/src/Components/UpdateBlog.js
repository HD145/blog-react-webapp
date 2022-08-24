import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ShowBlog } from './ShowBlog';
import { UserContext } from '../App'
import { useContext } from 'react'


export const UpdateBlog = () => {

    const navigate= useNavigate();
    const id=useParams().id;

    const {state,dispatch}= useContext(UserContext);
    dispatch({type:"USER",payload:true}) //for toggle


    const [blogData, setBlogData] = useState([])

    const handleInputs=(e)=>{

        console.log(e);
        let name=e.target.name;
        let value=e.target.value;
        setBlogData({...blogData,[name]:value});
    }

    const callBlogData=async()=>{
        try{
            const res=await fetch(`/getById/${id}`,{
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
            // navigate("/login")
        }
    };

    useEffect(() => {
        callBlogData();
    }, [])

    const submitForm=async(e)=>{
        e.preventDefault();
        console.log(e)
        const{title,description,imageUrl}=blogData;
        
        const res= await fetch(`/editblog/${id}`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            title,description,imageUrl
          })
        })
        const data=await res.json();
        console.log(data);
        console.log(res)
    
        if(res.status===400){
          alert("cannot save");
        }else{
            alert("Successfully updated");
            navigate("/")
        }
    }
    
  return (
    <div className='container' style={{"margin-top":"7rem"}}>
    <div class="card container my-5" >
    <div class="row no-gutters">
        <div class="col-auto">
            <img src="https://placeimg.com/380/230/nature" style={{"width":"500px"}} class="img-fluid" alt=""/>
        </div>
        <div class="col">
            <div class="card-block px-2">
                <h4 class="card-title">{blogData.title}</h4>
                <p class="card-text">{blogData.description}</p>
              
            </div>
        </div>
    </div>
    </div>

    <h3>Update your blog</h3>
    <div className='container mt-5 mb-5' style={{"border": "2px solid #ff6767","border-radius":"20px"}}>
        <form method='POST'>
            <div class="form-group mt-3">
                <label for="exampleFormControlInput1">Blog Title</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" name='title' value={blogData.title} onChange={handleInputs}  />
            </div>
            
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Blog Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name='description' value={blogData.description} onChange={handleInputs}></textarea>
            </div>

            <div class="form-group">
                <label for="exampleFormControlInput1">Image URL</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" name='imageUrl' value={blogData.imageUrl} onChange={handleInputs} />
            </div>

            <button type="button" class="btn btn-danger mb-3" style={{"width": "5rem","font-weight": "bold"}} onClick={submitForm}>Post</button>
        </form>
    </div>
    </div>
  )
}

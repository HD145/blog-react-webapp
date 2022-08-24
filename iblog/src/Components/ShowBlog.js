import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../App'
import { useContext } from 'react'


export const ShowBlog = () => {

  const id=useParams().id;
  const [blog, setBlog] = useState([]);
  const [comment, setComment] = useState()
  const [viewComment, setViewComment] = useState([])

  const {state,dispatch}= useContext(UserContext);
  dispatch({type:"USER",payload:true}) //for toggle

  const fetchBlog=async(e)=>{
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
      setBlog(data);
      setViewComment(data.comments.reverse())

      if(res.status!==200){
          const error=new Error(res.error);
          throw error
      } 
    }catch(err){
        // alert("invalid")
        console.log(err)
        // navigate("/login")
    }
  }


    const handleInputs=(e)=>{

        console.log(e);
        let name=e.target.name;
        let value=e.target.value;
        setComment(value);
    }

    const postComment=async(e)=>{
      e.preventDefault();
        console.log(e)
    
        // const comment=comment;
        // console.log(user)
        const res= await fetch(`/postComment/${id}`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            comment
          })
        })
        const data=await res.json();
        console.log(data);
        setViewComment(data.reverse())
        setComment("")
    }

  useEffect(() => {
    fetchBlog();
  }, [])
  
  return (
  <>

    <div class="container marketing" style={{"margin-top":"5rem"}}>

        <div class="row featurette">
        <h2 class="featurette-heading mb-4" id="head1"><u>{blog.title}</u></h2>
        <img src="https://placeimg.com/380/230/nature" style={{"width":"500px"}} class="img-fluid" alt=""/>
        <hr class="featurette-divider"/>
          <div class="col-md-7">

            <p id="para2" class="lead">{blog.description}</p>

          </div>
          <div class="col-md-5" style={{"position":"absolute","top":"9rem","right":"2rem"}}>
              <form method='POST'>
                
                <div class="form-group">
                    <label for="exampleFormControlTextarea1" className='primary'><u>Comment</u></label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name='views' value={comment} onChange={handleInputs}></textarea>
                </div>

                <button type="button" class="btn btn-primary mb-3" style={{"width": "7rem","font-weight": "bold"}} onClick={postComment}>Comment</button>
              </form>
              <p className='mt-2'><u>Comments</u></p>
          
          {
              viewComment.map((comment)=>{
                return(
                    <>
                      <p>{comment.comment}</p>
                      <hr/>
                    </>
                )

              })

          }
          </div>
        </div>
    </div>
    </>

    
  )
}

import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../App'
import { useContext } from 'react'

export const Logout = () => {

  //for toogle
  const {state,dispatch}= useContext(UserContext);


  const navigate=useNavigate();
    //using promises this time. this can be similarly done using async await like in about page.

    useEffect(() => {
            fetch('/logout',{
            method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            }).then((res)=>{
              dispatch({type:"USER",payload:false}) //for toggle
              navigate('/login',{replace:true});
              alert("successfully logged out")
                if(res.status!==200){
                    const error=new error(res.error);
                    throw error;
                }
            }).catch((err)=>{
                console.log(err)
            })
    }, [])

  return (
    <>
    </>
  )
}

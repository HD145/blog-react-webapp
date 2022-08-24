import React, { useState, useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

export const Login = () => {

    const navigate=useNavigate();
    //for toogle
    const {state,dispatch}= useContext(UserContext);

    const [user, setUser] = useState({email:"",password:""})

    const handleInputs=(e)=>{
        console.log(e);
        let name=e.target.name;
        let value=e.target.value;
        setUser({...user,[name]:value});
    }

    const submitForm=async(e)=>{
        e.preventDefault();
        console.log(e)
    
        const{email,password}=user;
        // http://localhost:5000/register
        console.log(user)
        const res= await fetch('/login',{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email,password
          })
        })
        const data=await res.json();
        console.log(data);
        console.log(res)
        // console.log(data)
        
        if(res.status===404){
            alert("Invalid Credentials");
        }else{
            alert("Successful Login");
            dispatch({type:"USER",payload:true}) //for toggle
            localStorage.setItem("id",data._id)
            console.log(data._id)
            // localStorage.setItem("id",JSON.stringify(data._id))
            navigate("/")
        }
    }
    

  return (
    <>
	<div class="container login" style={{"margin-top":"7rem"}}>
        <form method='POST'>
                <div class="row">
                    <div class="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                        <p>If you are new, please Register!</p>
                        {/* <input type="submit" name="" value="Login"/><br/> */}
						
						<Link class="nav-link log-bt" to="/register">Register</Link>
						
                    </div>
                    <div class="col-md-9 register-right">
                        
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">SignUp</h3>
                                <div class="row login-form">
                                    <div class="col-md-6 log-form">
                                        <div class="form-group">
                                            <input type="email" class="form-control" placeholder="Email *" name='email' value={user.email} onChange={handleInputs}/>
                                        </div>
                                        
                                        <div class="form-group">
                                            <input type="password" class="form-control" placeholder="Password *" name='password' value={user.password} onChange={handleInputs} />
                                        </div>
										<input type="submit" class="btnRegister" onClick={submitForm} value="Login"/>
                            
                                    </div>
                                  
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </form>
            </div>
    

    </>
  )
}

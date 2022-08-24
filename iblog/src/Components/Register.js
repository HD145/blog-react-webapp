import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

export const Register = () => {

    const navigate=useNavigate();

    const [user, setUser] = useState({name:"",phone:"",email:"",profession:"",password:""})

    const handleInputs=(e)=>{

        console.log(e);
        let name=e.target.name;
        let value=e.target.value;
        setUser({...user,[name]:value});
    }
    const submitForm=async(e)=>{
        e.preventDefault();
        console.log(e)
    
        const{name,phone,email,profession,password}=user;
        // http://localhost:5000/register
        console.log(user)
        const res= await fetch('/register',{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            name,phone,email,profession,password
          })
        })
        const data=await res.json();
        console.log(data);
        console.log(res)
    
        if(res.status===404){
          alert("Invalid Registration");
        }else{
            alert("Successful Registration");
            navigate("/login")
        }
    }
    
  return (
    <div class="container register" style={{"margin-top":"5rem"}}>
        <form method='POST'>
                <div class="row">
                    <div class="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                        <p>If you are already an iBlogger, please Login!</p>
                        <Link class="nav-link reg-bt" to="/login">SignIn</Link>
                    </div>
                    <div class="col-md-9 register-right">
                        
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">Register Yourself</h3>
                                <div class="row register-form">
                                    
                                    <div class="col-md-6">
                                        
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="UserName *" name='name' value={user.name} onChange={handleInputs}/>
                                        </div>
                                        
                                        
                                        <div class="form-group">
                                            <input type="text" minlength="10" maxlength="10" name="phone" class="form-control" placeholder="Your Phone *" value={user.phone} onChange={handleInputs} />
                                        </div>
                                        
                                        <div class="form-group">
                                            <input type="password" name='password' class="form-control" placeholder="Password *" value={user.password} onChange={handleInputs} />
                                        </div>
                            
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="email" class="form-control" placeholder="Your Email *" name='email' value={user.email} onChange={handleInputs}  />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Your Profession *" name='profession' value={user.profession} onChange={handleInputs}  />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control"  placeholder="Confirm Password *"name='cpassword' onChange={handleInputs} />
                                        </div>
                                        <input type="submit" class="btnRegister" value="Register" onClick={submitForm}/>
                                        {/* <Link class="reg-bt1" to="/login">Register</Link> */}
                                        {/* <Link className='btnRegister'>Register</Link> */}
                                        
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </form>
            </div>
  )
}

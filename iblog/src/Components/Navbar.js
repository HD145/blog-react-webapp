import React from 'react'
import { Link} from 'react-router-dom'
import { UserContext } from '../App'
import { useContext } from 'react'

export const Navbar = () => {

    //for toogle
    const {state,dispatch}= useContext(UserContext);

    const navstyle={
        "margin-left": "118px",
        "font-weight": "bold",
        "font-size": "1.4rem",
        "color": "cornsilk",
        "font-family": "cursive",
    }

    const lis={
        "margin-left": "17rem",
        "font-size": "1.1rem",
        "font-weight": "700",
    }

    const RederMenu=()=>{
        if(state){
            return(
            <>
            <li class="nav-item">
                <Link class="nav-link" to="/">Blogs</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="/yourBlogs">YourBlogs</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="/post">Post</Link>
            </li>
            {/* <li class="nav-item">
                <Link class="nav-link" to="/profile">Profile</Link>
            </li> */}
            <li class="nav-item" style={{"margin-left":"25rem"}}>
                <Link class="nav-link" to="/logout">Logout</Link>
            </li>
            </>
            )
        
        }
        else{
            return(
            <>
            <li class="nav-item" style={{"margin-left":"39rem"}}>
                <Link class="nav-link" to="/register">Register</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="/login">Login</Link>
            </li>
            </>
            )
        }
    }
    
  return (
    <>

        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-danger">
        <Link class="navbar-brand" style={navstyle} to="#">iBlog</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto" style={lis}>
            <RederMenu/>
                
            </ul>
        </div>
        </nav>
   </>

  )
}

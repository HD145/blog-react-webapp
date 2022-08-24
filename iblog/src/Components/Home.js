import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'
import { useContext } from 'react'


export const Home = () => {

  
  return (
    <>
        <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light" style={{"height":"35rem"}}>
            <div class="col-md-5 p-lg-5 mx-auto my-5">
                <h1 class="display-4 font-weight-normal">iBlog</h1>
                <p class="lead font-weight-normal">Connecting ideas and people – how talk can change our lives</p>
                <a class="btn btn-outline-secondary" href="/register">Register</a>
            </div>
            <div class="product-device box-shadow d-none d-md-block"></div>
            <div class="product-device product-device-2 box-shadow d-none d-md-block"></div>
        </div>

     <footer class="footer navbar-fixed-bottom" style={{"position": "fixed","height": "2.5rem","bottom": "0","width": "100%"}}>
     <div class="container">
    
     <a href="https://twitter.com/harshitdwivedi_" target="_blank" class="fa fa-twitter"></a> <span/><span/>
       <span class="text-muted">iBlog |&#169;  2022 All rights reserved </span>
     </div>
   </footer>
    </>
   
    
  )
}

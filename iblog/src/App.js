import logo from './logo.svg';
import './App.css';
import { Navbar } from './Components/Navbar';
import { Register } from './Components/Register';
import { Login } from './Components/Login';
import { Blogs } from './Components/Blogs';
import { Profile } from './Components/Profile';
import { Post } from './Components/Post';
import { YourBlogs } from './Components/YourBlogs';
import { ShowBlog } from './Components/ShowBlog';
import { UpdateBlog } from './Components/UpdateBlog';
import { Logout } from './Components/Logout';
import { Home } from './Components/Home';

import { createContext, useReducer } from 'react';
import { reducer,initialState } from './reducer/UseReducer';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


export const UserContext = createContext();

function App() {

  //ContextApi for toggling of navbar

  const [state,dispatch]=useReducer(reducer,initialState);

  return (
    <Router>
      <UserContext.Provider value={{state,dispatch}}>
      <Navbar/>
        <Routes>
          {/* <Route exact path="/" element={<Home/>}/> */}
          <Route exact path="/" element={<Blogs/>}/>
          <Route exact path="/yourBlogs" element={<YourBlogs/>}/>
          <Route exact path="/post" element={<Post/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/showBlog/:id" element={<ShowBlog/>}/>
          <Route exact path="/updateBlog/:id" element={<UpdateBlog/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/logout" element={<Logout/>}/>
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;

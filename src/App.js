import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import '../src/configureAmplify'
import Navbar from "./Components/Navbar";
import CreatePost from "./Page/CreatePost";
import Home from "./Page/Home";
import MyPost from "./Page/MyPost";
import Post from "./Page/Post";
import Profile from "./Page/Profile";

function App() {
  return (
    <div className=" mx-24">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/createPost" element={<CreatePost/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/post" element={<MyPost/>}/>
        <Route path="/post/:id" element={<Post/>}/>
      </Routes>
    </div>
  );
}

export default App;

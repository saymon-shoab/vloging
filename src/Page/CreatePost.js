import React from 'react'
import { useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import {v4 as uuid} from 'uuid'
import {createPost} from '../../src/graphql/mutations'
import SimpleMDE from "react-simplemde-editor"
import { useNavigate } from 'react-router-dom'
import "easymde/dist/easymde.min.css";
import { API } from 'aws-amplify'


const initialState = {title: "", content: ""}
const CreatePost = () => {
    const [post, setPost] = useState(initialState);
    const {title, content} = post;
    let navigate = useNavigate();
    function onChange(e) {
       setPost(()=>({
         ...post, [e.target.name]:e.target.value
       }))
    }
  
    async function createNewPost() {
      if(!title || !content) return;
      const id = uuid();
      post.id = id
       await API.graphql({
        query: createPost,
        variables: {input: post},
        authMode: "AMAZON_COGNITO_USER_POOLS"
      })
      navigate(`/post/${id}`)
    }
  return (
    <div className=' px-10 bg-slate-100 h-screen'>
        <h1 className="text-3xl font-semibold tracking-wide mt-6">Create Vlog</h1>
        <input 
          className=" border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500"
          placeholder="Title"
          name="title"
          value={post.title}
          onChange={onChange}
        />
        <SimpleMDE
          className=" w-auto"
          value={post.content}
          onChange={(value)=> setPost({...post, content: value})}
        />
        <button
         type="button"
         onClick={createNewPost}
         className=" mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
        >
          Post
        </button>
    </div>
  )
}

export default CreatePost
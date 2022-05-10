import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listPosts } from "../graphql/queries";

const Home = () => {
    const [posts, setPosts] = useState([]);
    
    const fetchPost = async () => {
        const postData = await API.graphql({
            query: listPosts
        })
        setPosts(postData.data.listPosts.items)
    }

    useEffect(()=>{
        fetchPost()
      },[])

  return (
    <div>
    <h1 className='text-sky-400 text-3xl font-bold tracking-wide mt-6 mb-2'> my post </h1>
      {posts.map((post,index)=> (
        <Link to={`/post/${post.id}`} key={index}>
          <div className=' cursor-pointer border-b border-gray-300 '>
          <h1 className='text-xl font-semibold'>{post.title}</h1>
          <p className='text-gray-500 mt-2 '>Author: {post.username}</p>
        </div>
        </Link>

      ))}

  </div>
  )
}

export default Home
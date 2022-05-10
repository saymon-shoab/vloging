import {useEffect, useState} from 'react'
// import Auth from '@aws-amplify/auth'
import { Auth, API } from 'aws-amplify'
import { Link } from 'react-router-dom'
import { postsByUsername } from '../graphql/queries';

const MyPost = () => {
    const [posts, setPosts] = useState([]);
    console.log("this saymon posts",posts)

    const fetchPost = async ()=> {
       const {username} = await Auth.currentAuthenticatedUser();
       const postData = await API.graphql({
         query: postsByUsername,
         variables: {username}
       })
       setPosts(postData.data.postsByUsername.items)
    }
 
    useEffect(() => {
     fetchPost()
   }, [])
  return (
    <div className='py-8 px-8 max-w-xl max-auto bg-white rounded-sm sm:items-center sm:space-x-6  mb-2'>
    <h1 className='text-3xl text-blue-500 tracking-wide mt-6 mb-2'>MY Posts</h1>
    {
      posts.map((post, index)=>(
       <Link to={`${post.id}`} key={index}>
        <div className='cursor-pinter border-b border-gray-300 mt-8 pb-4'>
          <h2 className='text-xl font-semibold'>
            {post?.title}
          </h2>
          <p className='text-gray-500'>Author: {post?.username}</p>
        </div>
       </Link>
      ))
    }
</div>
  )
}

export default MyPost
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react'

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    checkUser()
  },[])

  const checkUser = async ()=> {
    const user = await Auth.currentAuthenticatedUser()
    setUser(user)
  }
  if(!user) return null
  return (
    <div className=' mx-56 mt-32 border-2 border-blue-500 rounded-lg p-16'>
        <h1 className='font-semibold tracking-wide text-3xl mt-6'>my profile</h1>
        <h1 className='font-medium  text-gray-500 my-2'>
          <span className=' font-extrabold text-gray-700'>Username :</span> {user.username} 
        </h1> 
        <p className=' font-medium text-gray-500 mb-6'>
         <span className=' font-extrabold text-gray-700'>Email: </span>{user.attributes.email}
        </p>
        <AmplifySignOut />
    </div>
  )
}

export default withAuthenticator(Profile) 
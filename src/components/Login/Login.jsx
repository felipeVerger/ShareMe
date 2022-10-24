import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../../assets/share.mp4';
import logo from '../../assets/logowhite.png';

import { client } from '../../client';

const Login = () => {
  const navigate = useNavigate();

  /* A function that is called when the user clicks the button to create user. */
  const login = useGoogleLogin({
    onSuccess: async (res) => {
      const token = res?.access_token;

      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      
      const result = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        requestOptions
      )
        .then((response) => response.json())
        .catch((err) => err.json());
        localStorage.setItem('user', JSON.stringify(result));
        
        const { given_name, sub, picture } = result;

        const doc = {
          _id: sub,
          _type: 'user',
          userName: given_name,
          image: picture
        }

        client.createIfNotExists(doc)
          .then(() => {
            navigate('/', {replace: true})
          })
    },
    onError: error => console.log(error),
  })

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} alt='logo' width='130px'/>
          </div>
          <div className='shadow-2xl'>
            <button
              className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
              onClick={() => login()}
            >
              <FcGoogle className='mr-4'/> Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
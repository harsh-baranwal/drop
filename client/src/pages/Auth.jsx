import React, { useState } from 'react'
import Bar from '../components/Bar'
import dropLogo from '/logo.svg'
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../actions/AuthAction';

const Auth = () => {
  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(true);
  const loading = useSelector((state) => state.authReducer.loading)

  const [data, setData] = useState({fullname: "", username: "", email: "", password: ""});
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const resetForm = () => {
    setData({fullname: "", username: "", email: "", password: ""})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
     if(isSignUp) {
      dispatch(signUp(data));
     }
     else {
      dispatch(logIn(data));
     }
  }


  return (
    <>
      <Bar />
      {/* Logo section */}
      <img src={dropLogo} className='w-48 mx-auto mt-16' />
      <div className="max-w-[520px] mx-auto">

        {/* Authentication Form */}
        <Card>
          <div className="py-10">
            <h2 className="text-[1.80rem] font-bold font-suisse text-center">Every droplet makes an ocean.</h2>
            <form action="" onSubmit={handleSubmit}>
              <div className="px-10">
                {isSignUp &&
                  <div className="">
                    <input type="text" name="fullname" id="fullname" value={data.fullname} onChange={handleChange} className="block w-full h-12 my-5 p-4 border-b-[1px] border-b-primary" placeholder="Full Name" />
                    <input type="text" name="username" id="username" value={data.username} onChange={handleChange} className="block w-full h-12 my-5 p-4 border-b-[1px] border-b-primary" placeholder="Username" />
                  </div>}
                <input type="email" name="email" id="email" value={data.email} onChange={handleChange} className="block w-full h-12 my-5 p-4 border-b-[1px] border-b-primary" placeholder="Email" />
                <input type="password" name="password" id="password" value={data.password} onChange={handleChange} className="block w-full h-12 my-5 p-4 border-b-[1px] border-b-primary" placeholder="Password" />
              </div>
              <div className="flex justify-center mt-10">
                <button type="submit" className="bg-primary rounded-full text-white p-3 px-12 hover:bg-[#6e48c3] disabled:cursor-not-allowed" disabled={loading}>{loading ? "Loading..." : isSignUp ? "Sign up" : "Log in"}</button>
              </div>
            </form>
            <p className="text-center mt-5">{isSignUp ? "Already have an account!" : "Don't have an account?"} <span className="hover:underline font-medium cursor-pointer" onClick={() => {setIsSignUp((prev) => !prev); resetForm();}}>{isSignUp ? "Login" : "Signup"}</span></p>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Auth
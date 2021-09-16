import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
function Login() {
  const [email, setEmail ] = useState('');
  const [password, setPassword] = useState('');

  const  signIn = (e) => {
    e.preventDefault()
    // firebase login code

  }
  const register = (e) => {
    e.preventDefault()
    // firebase register code
  }
  return (
    <div className='login'>
      <Link to='/'>
        <img className = "login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="" />
      </Link>
    <div className="login__container">
      <h1>Sign In</h1>
      <form action="">
        <h5>E-mail</h5>
        <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>
        <h5>Password</h5>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={signIn} type="submit"
         className='login__signInButton'>Sign In</button>
      </form>
      <p>
        By signing-in you are agreeing to AMAZON CLONE Conditions of Use & Sale
        Please see out privacy notice, our Cookies Notice and our Interest-Based Ads Notice
      </p>
      <button onClick={register}
      className='login__registerButton'>Create Account</button>
    </div>
    </div>
  )
}

export default Login

// SignInForm.js
import React, { useState } from 'react';
import './SignInModule.css'

const SignInForm = () => {
  const [useremail, setEmail] = useState('');
  const [userpassword, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    // Perform authentication logic (e.g., API call)
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhtBao2njYVi96Uz7q4xFZFi21ZvedCUk',
    {
        method: 'POST',
        body: JSON.stringify({
            email: useremail,
            password : userpassword,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).then((res) => {
        if(res.ok){
            //
        }else{
            return res.json().then(data => {
                console.log(data)
                alert('SignIn Fail')
            })
        }
    })
    setEmail('')
    setPassword('')
  };

  return (
    <div className='signindiv'>
    <form onSubmit={handleSignIn} className='signinForm'>
      <label>Email:</label>
      <input placeholder='Enter Valid Email' className='signinput' type="email" value={useremail} onChange={(e) => setEmail(e.target.value)} required />
      <label>Password:</label>
      <input placeholder='Enter Valid Password' className='signinput' type="password" value={userpassword} onChange={(e) => setPassword(e.target.value)} required />
      <button className='siginbutton' type="submit">Sign In</button>
    </form>
    </div>
  );
};

export default SignInForm;

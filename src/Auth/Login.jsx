// LoginForm.js
import React, { useState, useContext } from 'react';
import './LogInModule.css'
import AuthContext from '../storage/AuthContext';
import { useNavigate  } from 'react-router-dom';


const LoginForm =() => {
  const [useremail, setEmail] = useState('');
  const [userpassword, setPassword] = useState('');
  const Navigate = useNavigate ();


  const AuthCtx =  useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhtBao2njYVi96Uz7q4xFZFi21ZvedCUk',
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
            return res.json()
            
        }else{
            return res.json().then(data => {
                let errorMessage = 'Login Fail'
                console.log(data)
                alert(error.errorMessage)
                throw new Error(errorMessage)
            })
        }
    }).then((data)=>{
       AuthCtx.login(data.idToken)
       Navigate('/');
  })
    .catch((error)=>{
        alert(error.errorMessage)
    })
    setEmail('')
    setPassword('')
  };

  return (
    <div className='LogIndiv'>
    <form onSubmit={handleLogin} className='LogInForm'>
      <h3>Log-In</h3>
      <label>Email:</label>
      <input className='LoginInput' type="email" value={useremail} onChange={(e) => setEmail(e.target.value)} required />
      <label>Password:</label>
      <input className='LoginInput' type="password" value={userpassword} onChange={(e) => setPassword(e.target.value)} required />
      <button className='Loginbutton' type="submit">Login</button>
    </form>
    </div>
  );
};

export default LoginForm;

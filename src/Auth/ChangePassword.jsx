// ChangePassword.js
import React, { useState, useContext } from 'react';
import AuthContext from '../storage/AuthContext';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const authCtx = useContext(AuthContext)

  const handleChangePassword = (e) => {
    e.preventDefault();
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAhtBao2njYVi96Uz7q4xFZFi21ZvedCUk',{
        method: 'POST',
        body: JSON.stringify({
             idToken: authCtx.token,
             password: newPassword,
             returnSecureToken: false   
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })
  
  };

  return (
    <div>
      <h2>Change Password</h2>
      {isSuccess && <p style={{ color: 'green' }}>Password changed successfully!</p>}
      <form onSubmit={handleChangePassword}>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength="7"
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;

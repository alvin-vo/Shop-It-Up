import React, { useState } from 'react';
import './LoginPage.css'; // Make sure the CSS file is correctly linked
//import img1 from " ./images/shopitup.png";
import { Box } from '@chakra-ui/react'
//import { GoogleLogin } from 'react-google-login'; // Import the GoogleLogin component



const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement your login logic here
    console.log('Login attempt with email:', email, 'and password:', password);
    // Redirect or show error based on login logic
    return <div>Login Page</div>; //
  };

  return (

    <div className="login-page">


      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
        <img src={" ./images/shopitup.png"} alt="Form Logo" style={{ width: '150px', margin: '0 auto', display: 'block' }} />
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

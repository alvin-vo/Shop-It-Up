import React, { useState } from 'react';
import './LoginPage.css'; // Make sure the CSS file is correctly linked
//import img1 from " ./images/shopitup.png";
import { Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement your login logic here
    console.log('Login attempt with email:', email, 'and password:', password);
    // Redirect or show error based on login logic
    //history.push('/');
    return //<div>Login Page</div>; //
  };

  const navigateToHome = () => {
    navigate('/'); // Use history.push to navigate to homepage
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
        <button onClick={navigateToHome} className="navigate-home-button">Go to Home</button> {/* New button for navigation */}
      </div>
    </div>
  );
};

export default LoginPage;

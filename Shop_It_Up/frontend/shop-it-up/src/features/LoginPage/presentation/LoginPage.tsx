import React, { useState } from 'react';
import './LoginPage.css'; // Ensure the CSS file is correctly linked
import { Box, Button } from '@chakra-ui/react';
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
  };



  const navigateToGoogleAuth = () => {
    window.location.href = "http://localhost:3010/api/authorize/auth/google"; // Redirects to Google Auth
  };
  

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <img src={" ./images/transparent-logo.png"} alt="Form Logo" style={{ width: '150px', margin: '0 auto', display: 'block' }} />
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
          {/* Google Login Button */}
          <Button onClick={navigateToGoogleAuth} colorScheme="red" size="md" className="google-login-button">
            Google Login
          </Button>
          <Button  colorScheme="blue" size="md" className= "facebook-login-button" >
            Facebook Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

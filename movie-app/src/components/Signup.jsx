import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signUp.css'; 

const SignUp = () => {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      let responce = await axios.post("http://localhost:5000/user/register",{
        name,email,password
      })
      console.log(responce.data);
      alert("signup succesfully")
      navigate('/login')
    } catch (error) {
      console.error('Error during signup:', error.response?.data || error.message);
      //       alert(`Signup failed: ${error.response?.data?.message || 'Please try again.'}`);
    }
  }

  return (
    <div className="signup-container">
   <h2>Sign Up</h2>
    <form onSubmit={handleSubmit} className="signup-form">
     
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" className="btn btn-signup">Register</button>
    </form>
    </div>
  );
};

export default SignUp;
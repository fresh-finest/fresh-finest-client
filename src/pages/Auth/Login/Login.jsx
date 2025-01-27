import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import './Login.css';
import logo from '../../../assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../../../redux/user/userSlice';


const Login = () => {
  const [formData,setFormData] = useState({});

  const {loading,error} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      dispatch(signInStart);

      const res = await fetch("https://fresh-finest-server-dd57784051b3.herokuapp.com/api/auth/signin",{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(formData),
      });

      const data = await res.json();

      if(data.success === false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/dashboard");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }



    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Row>
            <Col md={12}>
              <Card className="p-5 shadow">
                <Card.Body className='login-container'>
                  <Card.Title className="text-center">
                    <img src={logo} alt="Fresh Finest" className="mb-4 logo" />
                  </Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter your email" id='email' onChange={handleChange} />
                    </Form.Group>
    
                    <Form.Group controlId="formBasicPassword" className="mt-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" id='password' onChange={handleChange} />
                    </Form.Group>
    
                    <Form.Group controlId="formBasicCheckbox" className="mt-3">
                      <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
    
                    <Button disabled={loading}  variant="success" type="submit" className="w-100 mt-3">
                      {loading? "Loading...":"Login"}
                    </Button>

                    <div className="text-center mt-3">
                      <a href="/forgot-password">Forgot password?</a>
                    </div>
                  </Form>
                  {error && <p className="text-red-500">{error}</p>}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );
};

export default Login;

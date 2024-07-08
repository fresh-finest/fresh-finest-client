import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import './Login.css';
import logo from '../../../assets/images/logo.png';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
            console.log('Login successful:', response.data);
            // Handle successful login, e.g., save token, redirect
        } catch (error) {
            setError('Login failed. Please check your credentials and try again.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Row>
            <Col md={12}>
              <Card className="p-5 shadow">
                <Card.Body className='login-container'>
                  <Card.Title className="text-center">
                    <img src={logo} alt="Fresh Finest" className="mb-4 logo" />
                  </Card.Title>
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="yourmail@mail.com" />
                    </Form.Group>
    
                    <Form.Group controlId="formBasicPassword" className="mt-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
    
                    <Form.Group controlId="formBasicCheckbox" className="mt-3">
                      <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
    
                    <Button variant="success" type="submit" className="w-100 mt-3">
                      Login
                    </Button>
    
                    <div className="text-center mt-3">
                      <a href="/forgot-password">Forgot password?</a>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );
};

export default Login;

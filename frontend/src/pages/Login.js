import React, { useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import {Container,Row,Col,Form,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";

function Login() {
  const [data,setData]=useState({email:"",password:""})
  const user=useSelector(state=>state.auth.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  // handleChange
const handleChange=(e)=>{
  setData({...data,[e.target.name]:e.target.value})
}
const handleSubmit=(e)=>{
  e.preventDefault()
  dispatch(loginUser(data))
}
useEffect(()=>{
if(user){
  navigate('/profile')
}
},[user,navigate])


  return (
    <Container className='mt-5'>
      <h2 className='shadow-sm p-3 m-5 text-center'>Login</h2>

      <Row>
        <Col lg={5} md={6} sm={12} className='p-5 m-auto shadow-sm rounded-lg'>
          <Form onSubmit={handleSubmit} >
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control
                type='email'
                placeholder='Enter email'
                name='email'
               onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
               onChange={handleChange}
              />
            </Form.Group>
            <Button variant='primary w-100 mb-3' type='submit'>
              Login
            </Button>
          </Form>
          <p>
            Don't have an account ? <Link to='/register'>Sign up</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;

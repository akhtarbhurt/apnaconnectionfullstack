import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Looter from './Looter';

export default function Login() {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('verified') === 'true') {
      message.success('Email verified successfully. You can now log in.');
    }
  }, [location]);

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/companyLogin', values);
      if (response.status === 200) {
        message.success('Login successful');
        navigate('/companyPanel');
      }
      // Redirect to another page or perform further actions here
    } catch (error) {
      console.error('Login error:', error); // Log the full error object
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Login failed: An unknown error occurred';
      message.error(errorMessage); // Show detailed error message
    }
  };

  return (
    <>
    <Navbar/>
    <div className=' max-w-7xl m-auto p-5  ' >
      <Form form={form} layout="vertical" className='shadow-md border p-2 mt-20 mb-20 ' onFinish={handleLogin}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className='bg-blue-500 text-white' htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <div className='w-full text-end capitalize' >
        <p> don't have an account <Link to={'/companyRegister'} className='text-blue-500' > Register Here   </Link> </p>
      </div>
    </div>
    <Looter/>
    </>
  );
}

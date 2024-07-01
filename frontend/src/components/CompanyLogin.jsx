import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import Navbar from "./Navbar";
import Looter from "./Looter";

export default function Login() {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("verified") === "true") {
      message.success("Email verified successfully. You can now log in.");
    }
  }, [location]);

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/api/v1/companyLogin`,
        values
      );
      if (response.status === 200) {
        message.success("Login successful");
        navigate("/companyPanel");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Login failed: An unknown error occurred";
      message.error(errorMessage);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/api/v1/request-password-reset`,
        { email }
      );
      message.success(response.data.message);
      setForgotPasswordVisible(false);
    } catch (error) {
      message.error(
        error.response?.data?.error || "Failed to send password reset email"
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl m-auto p-5">
        <Form
          form={form}
          layout="vertical"
          className="shadow-md border p-2 mt-20 mb-20"
          onFinish={handleLogin}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <div className='w-full text-end capitalize'>
          <Button type="link" onClick={() => setForgotPasswordVisible(true)}>
            Forgot Password?
          </Button>
        </div>
          <Form.Item>
            <Button
              type="primary"
              className="bg-blue-500 text-white"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="w-full text-end capitalize">
          <p>
            Don't have an account?{" "}
            <Link to={"/companyRegister"} className="text-blue-500">
              Register Here
            </Link>
          </p>
        </div>
      </div>
      <Looter />

      {/* Forgot Password Modal */}
      <Modal
        title="Request Password Reset"
        visible={forgotPasswordVisible}
        onCancel={() => setForgotPasswordVisible(false)}
        // onOk={handleForgotPassword}
        footer={[
          <Button
            type="primary"
            className="bg-blue-500 text-white"
            onClick={handleForgotPassword}
          >
            Submit
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width:"100%",
      height:"100%",
      paddingLeft:"700px",
      gap:"36px",
     
    }}>
    <Container>
      

      <Form>

        <Logo src="https://bluestock.in/static/assets/logo/logo.jpg" alt="Bluestock Logo" style={{
        width:"290px",
        height:"36px",
      }}/>

      <Title>Forgot Password?</Title>
      <Subtitle>Enter your email address to get the password reset link.</Subtitle>

        <Label>Email Address</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hello@bluestock.in" />
        <ResetButton onClick={handlePasswordReset} disabled={loading}>
          {loading ? "Sending..." : "Password Reset"}
        </ResetButton>

        {message && <Message>{message}</Message>}

        <BackToLogin onClick={() => (window.location.href = "/login")}>Back to login</BackToLogin>
      </Form>
    </Container>
    </div>
  );
};

export default Forgot;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
  text-align: center;
  font-family: "Arial", sans-serif;
  padding: 100px 20px;
`;

const Logo = styled.img`
  width: 140px;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  padding-left: 90px;
  line-height:40px;
  color:rgba(25, 29, 35, 1);
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: rgba(102, 102, 102, 1);
  margin-bottom: 20px;
`;

const Form = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  display: block;
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  margin-top: 15px;
  color: rgba(25, 29, 35, 1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid rgba(208, 213, 221, 1);
  border-radius: 8px;
  background: white;
`;

const ResetButton = styled.button`
  width: 100%;
  padding: 12px;
  background: rgba(93, 18, 210, 1);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 15px;
  cursor: pointer;

  &:hover {
    background: #5a4abf;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  font-size: 14px;
  color: green;
  margin-top: 10px;
`;

const BackToLogin = styled.p`
  font-size: 16px;
  margin-top: 15px;
  color: rgba(135, 135, 135, 1);
  cursor: pointer;
  font-weight : 600;
  line-height: 24px;
  // text-decoration: underline;

  &:hover {
    color: #333;
  }
`;

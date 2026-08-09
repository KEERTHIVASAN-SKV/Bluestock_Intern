import React, {useContext, useState} from 'react'
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../AuthProvider'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const userData = { username, password };

    try {
      // Updated API endpoint URL here
      const response = await axios.post('http://127.0.0.1:8000/api/token/', userData);
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      console.log("Login Successfully");
      setIsLoggedIn(true);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      alignItems: "center",
      paddingLeft: "700px",
    }}>
      <Container>
        <Form onSubmit={handleLogin}>
          <Logo src="https://bluestock.in/static/assets/logo/logo.jpg" alt="Bluestock Logo" />
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Label>Username</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />

          <Label>
            Password <ForgotPassword href="/forgot">Forgot Password?</ForgotPassword>
          </Label>
          <PasswordWrapper>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••••••••"
            />
            <EyeIcon>👁</EyeIcon>
          </PasswordWrapper>

          <CheckboxWrapper>
            <Checkbox
              type="checkbox"
              checked={keepSignedIn}
              onChange={() => setKeepSignedIn(!keepSignedIn)}
            />
            Keep me signed in
          </CheckboxWrapper>

          <LoginButton type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </LoginButton>

          <Divider>or sign in with</Divider>

          <GoogleButton>
            <GoogleIcon>
              <img
                src="https://th.bing.com/th/id/OIP.TqeyCH3WdV8fYko0lRlw4AHaHa?w=189&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                alt="Google"
                style={{ width: "24px", height: "24px" }}
              />
            </GoogleIcon>
            Continue with Google
          </GoogleButton>

          <CreateAccount href="/signup">Create an account</CreateAccount>
        </Form>
      </Container>
    </div>
  );
};

export default Login;

// Styled Components
const Container = styled.div`
  width: 350px;
  height : 400px;
  max-width: 400px;
  margin: auto;
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 20px;
  item-align: center ;
`;

const Logo = styled.img`
  width: 310px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  background:  ;
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
  color : rgba(25, 29, 35, 1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
  color: black;
`;

const PasswordWrapper = styled.div`
  position: relative;
  color:rgba(153, 157, 163, 1);
`;

const EyeIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 1px;
  cursor: pointer;
`;

const ForgotPassword = styled.a`
  float: right;
  font-size: 12px;
  color: rgba(99, 133, 255, 1);
  text-decoration: none;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  color:rgba(25, 29, 35, 1);
  font-size:16px;
  font-weight: 300;
`;

const Checkbox = styled.input`
  margin-right: 5px;
  color:blue;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background: rgba(104, 92, 255, 1);
  color: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 15px;
  cursor: pointer;

  &:hover {
    background: #5a4abf;
  }
`;

const Divider = styled.div`
  margin: 15px 0;
  text-align: center;
  font-size: 12px;
  color: #aaa;
  border-bottom: 1px solid #ddd;
  line-height: 0.1em;
  width: 100%;
  position: relative;
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #f1f1f1;
  color: rgba(75, 87, 104, 1);
  border: none;
  border-radius: 5px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background: #ddd;
  }
`;

const GoogleIcon = styled.span`
  margin-right: 8px;
`;

const CreateAccount = styled.a`
  display: block;
  text-align: center;
  font-size: 16px;
  margin-top: 15px;
  color: rgba(63, 82, 255, 1);
  text-decoration: none;
  font-weight : 600;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

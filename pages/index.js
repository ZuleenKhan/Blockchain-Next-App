"use client"
import React, { useState } from "react";
import { Form, Input, Button, Message, Container, Image } from "semantic-ui-react";
import factory from "../ethereum/factory";
import { useRouter } from "next/router";
import { isValidAddress } from "ethereumjs-util";
import "semantic-ui-css/semantic.min.css";
import logo from "../public/images/crowdfunding.png";
const LoginForm = () => {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // Fetch the User details for the entered address
      if (!isValidAddress(address)) {
        setError("Please enter a valid Ethereum address.");
        return;
      }
      const user = await factory.methods.users(address).call();
      if (user.walletAddress === address) {
        // Address matches, redirect or perform login action
        // You can handle login logic here
        router.push("/logini/log"); // Redirect to dashboard after successful login
      } else {
        setError("User does not exist. Please register.");
     
      }
    } catch (err) {
      // Handle errors
      console.error("Error:", err);
      setError("Error occurred. Please try again.");
    }
  };
function handleClick (){
     router.push("/logini/pp") ; 
}
  return (
    <div>
    <Container style={{marginTop:"150px", border: "solid 2px black", padding:"20px"}}>
      <h1>Login</h1>
      
    <Form error={Boolean(error)} onSubmit={handleLogin} style={{marginTop : "100px"
    }}>
      <Form.Field>
        <label>Enter Your Address:</label>
        <Input focus fluid 
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form.Field>
      <Button  style={{margin:"2px"}} color="black" fluid  type="submit" primary>
        Login
      </Button>
      <Message error header="Error" content={error} />
      
    </Form>
    <Button  style={{margin:"2px"}} fluid type="submit" primary  onClick={ handleClick }>
          Register
  </Button>
  </Container>
  </div>
  );
};

export default LoginForm;

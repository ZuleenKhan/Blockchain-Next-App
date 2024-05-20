"use client"
import React, { useState } from "react";
import { Form, Input, Button, Message, Container, Image } from "semantic-ui-react";
import factory from "../ethereum/factory";
import { useRouter } from "next/router";
import { isValidAddress } from "ethereumjs-util";
import "semantic-ui-css/semantic.min.css";


const LoginForm = () => {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError(""); // Clear any existing error

      // Validate the Ethereum address
      if (!isValidAddress(address)) {
        setError("Please enter a valid Ethereum address.");
        return;
      }

      // Fetch the user details for the entered address
      const user = await factory.methods.users(address).call();
      if (user.walletAddress === address) {
        // Address matches, redirect based on the user's role
        console.log(user.name);

        if (user.role === 0n) {
          // Redirect to main page for Manager
          router.push("/logini/log");
        } else if (user.role === 1n) {
          // Redirect to main page for Approver
          router.push("/logini/log");
        } else if (user.role === 2n) {
          // Redirect to vendor page for Vendor
          router.push("/logini/vendor");
        }
      } else {
        setError("User does not exist. Please register.");
      }
    } catch (err) {
      // Handle errors
      console.error("Error:", err);
      setError("Error occurred. Please try again.");
    }
  };

  const handleRegisterClick = () => {
    router.push("/logini/pp");
  };

  return (
    <div>
      <Container style={{ marginTop: "150px", border: "solid 2px black", padding: "20px" }}>
        <h1>Login</h1>
        <Form error={Boolean(error)} onSubmit={(e) => {
e.preventDefault(); handleLogin(); }} style={{ marginTop: "100px" }}>
          <Form.Field>
            <label>Enter Your Address:</label>
            <Input
              focus
              fluid
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Field>
          <Button style={{ margin: "2px" }} color="black" fluid type="submit" primary>
            Login
          </Button>
          <Message error header="Error" content={error} />
        </Form>
        <Button style={{ margin: "2px" }} fluid primary
onClick={handleRegisterClick}>
          Register
        </Button>
      </Container>
    </div>
  );
};

export default LoginForm;
import "semantic-ui-css/semantic.min.css";
import React, { useState } from 'react';
import { Form, Input, Button, Message, Select, Container } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import { useRouter } from 'next/router';
import { isValidAddress } from 'ethereumjs-util';


const roleOptions = [
  { key: 'm', value: 0, text: 'Manager' }, // Manager is 0
  { key: 'a', value: 1, text: 'Approver' }, // Approver is 1
  { key: 'v', value: 2, text: 'Vendor' }   // Vendor is 2
];
const RegisterForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      if (!isValidAddress(address)) {
        setError("Please enter a valid Ethereum address.");
        return;
      }
      await factory.methods.addUser(name, address, role).send({ from: address });
      
      // If no error and transaction succeeds
      router.push("/dashboard"); // Redirect to dashboard or confirmation page
    } catch (err) {
      console.error("Error:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container style={{marginTop:"150px", border: "solid 2px black", padding:"20px"}}> 
      <h1>Register</h1>
      <Form error={Boolean(error)} onSubmit={handleRegister} >
        <Form.Field>
          <label>Name:</label>
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Ethereum Address:</label>
          <Input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Role:</label>
          <Select
            placeholder="Select your role"
            options={roleOptions}
            onChange={(e, { value }) => setRole(value)}
          />
         
        </Form.Field>
        <Button type="submit" primary>
          Register
        </Button>
        <Message error header="Error" content={error} />
      </Form>
    </Container>
  );
};

export default RegisterForm;
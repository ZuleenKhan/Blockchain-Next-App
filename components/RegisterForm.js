"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, FormField, Button, Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("http://localhost:3000/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("https://blockchain-qo3satjh9-zuleenkhans-projects.vercel.app/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <Container style={{display:"flex", justifyContent: "center", alignContent: "center", border: "solid 2px grey", marginTop:"100px"}}>
      <div >
        <h1>Register</h1>
        <Form onSubmit={handleSubmit} style={{width: "600px"}}> 
        <FormField>
        <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
          />

        </FormField>

    <FormField>
      <label>Email</label>
      <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
    </FormField>
    <FormField>
      <label>Password</label>
      <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
    </FormField>
   
    <Button color="black" fluid type='submit'>Register</Button>
    {error && (
            <div>
              {error}
            </div>
          )}
          <Link href={"/"}>
            Already have an account? <span >Login</span>
          </Link>
  </Form>
        
    </div>
    </Container>
  );
}
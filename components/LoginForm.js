"use client"
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Form, FormField, Button,Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [manager, setManager] = useState("");
  const [vendor, setVendor] = useState("");
  const [contributor, setContributor] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    try {
      setLoading(true); 
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        setLoading(false);
        return;
      }
    //   if(manager)
       router.replace("/logini/log");
      //else if(vendor){}
      // else if(contributor){}
      
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h1>Login</h1>
    <Form onSubmit={handleSubmit} style={{width: "600px"}}> 
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
   
    <Button color="black" fluid type='submit'>
    {loading ? <Loader active inline size="small" /> : "Login"}
    </Button>
    {error && (
            <div>
              {error}
            </div>
          )}
          <Button style={{margin:"2px"}}color="black" fluid onClick={()=>{router.replace("/register")}}>
                      Register
          </Button>
  </Form>
      </div>
    </div>
  );
}

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegisterForm from "../../components/RegisterForm";
import { headers } from "next/headers";
import NextAuth from "next-auth";
export default  async function Register() {
  const headersList = headers();
  const path = headersList.get("x-pathname") ; 
  const session = await getServerSession(authOptions);
  if (session && path == "/register") { 
        redirect("/register"); 
      }

  return <RegisterForm/>
}



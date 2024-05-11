
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import RegisterForm from "../../components/RegisterForm";
import { headers } from "next/headers";
export default  async function Register() {
  const headersList = headers();
  const path = headersList.get("x-pathname") ; 
  const session = await getServerSession(authOptions);
  if (session && path == "/register") { 
        redirect("/register"); 
      }

  return <RegisterForm/>
}



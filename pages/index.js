import "semantic-ui-css/semantic.min.css";
const ethers = require("ethers") 

import { useEffect, useState } from 'react';
const {Web3} = require('web3') ; 
import { useRouter } from "next/router";
import { Container } from "semantic-ui-react";
import LoginForm from "../components/LoginForm";
//import { useLocalStorage } from "@uidotdev/usehooks";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

function Modal_Show(){
  useRouter().push("/logini/log");
}  
export default function CampaignLogin(){
   
   const [provider,setProvider] = useState(null) ; 
   const [account, setAccount] = useState(null) ;
   const [isConnected,setIsConnected] = useState(false) ;
   async function connectToMetamask(){
        if(window.ethereum){
        try{
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider) ; 
          await provider.send("eth_requestAccounts",[]) ;
           const signer = provider.getSigner() ; 
           const address = await signer.getAddress() ; 
           setAccount(address) ; 
           window.localStorage.setItem("account",JSON.stringify(address)) ;
           console.log("Metamask Connected : " + address) ; 
           setIsConnected(true) ; 
          } catch(err){
            console.log(err) ;
          }
        } else {
          console.log("Metamask is not detected in the browser")
        }
        
      }
   return (<div >
      <Container style={{display:"flex", justifyContent: "center", alignContent: "center", border: "solid 2px grey", marginTop:"100px"}}>
      <LoginForm/>
       </Container>
       </div >
   )
}


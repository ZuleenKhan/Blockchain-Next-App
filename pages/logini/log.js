"use client"
import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Card, Button, Icon, ButtonOr, Container } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Modal from "../../components/Modal";
import ShowAddress from "../../components/ShowAddress";
import { ethers } from "ethers";
import LandHeader from "../../components/LandHeader";
const {Web3} = require('web3') ; 
import {AuthProviders} from "../../app/Providers" ; 

const currDate = new Date().toLocaleDateString();
const currTime = new Date().toLocaleTimeString();
const currentDateTime = new Date();
const futureDateTime = new Date(currentDateTime);
futureDateTime.setFullYear(futureDateTime.getFullYear() + 2);
function CampaignIndex({ campaigns }) {
     
  
  const [vali,setVali] = useState("") ; 
  useEffect(()=>{  const t = window.localStorage.getItem("account") ; setVali(t); },[]) ; 
  const router = useRouter();
  console.log("campaigns", campaigns);
  
  const items = campaigns.map((campaignAddress) => {
    return {
      header:"Powering the Future: Energizing EV Cycles - Join Our Campaign to Fund Sustainable Batteries!",
      meta: (<strong style={{padding:"1px"}}>Our campaign aims to revolutionize transportation by funding eco-friendly batteries for
      electric cycles, reducing carbon footprint and promoting clean energy. 
      Together, let's pave the way for a greener tomorrow, one pedal at a time!</strong>
      ),
      description: (
        <div>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
      <p style={{color:'grey', marginTop:"5px" }}> Campaign Created at : <br/> {currDate} , {currTime} </p>  
      <div><p style={{color:'grey', paddingBottom:"4px"}}> Campaign Valid Upto : <br/> {futureDateTime.toLocaleString()}  <br/> 
         </p> 
        </div>
        </div>

        <Link legacyBehavior href={`/campaigns/${campaignAddress}`}>
          <a><br/>View campaign</a>
        </Link>
        </div>
      ),
      fluid: true,
    };
  });
  return (
    <>
    <Container>
      <LandHeader/>
        <div style= {{display:"flex"}}>
           <div
           >
        
        <Button
          icon
          color="teal"
          size="large"
          onClick={() => router.push("/campaigns/new")}
          style={{ marginBottom: "20px" }}
        >
          <Icon name="add circle" />
          {"   "}Create New Campaign
        </Button>
        </div>
        <div>
        <Modal/>
        </div>
        </div>
      <Card.Group items={items} centered />
      <Footer/>
      </Container>
      </>
  );
   
}

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
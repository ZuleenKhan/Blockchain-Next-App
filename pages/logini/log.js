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

function CampaignIndex({ campaigns }) {
     
  
  const [vali,setVali] = useState("") ; 
  useEffect(()=>{  const t = window.localStorage.getItem("account") ; setVali(t); },[]) ; 
  const router = useRouter();
  console.log("campaigns", campaigns);
  
  const items = campaigns.map((campaignAddress) => {
    console.log(campaignAddress);
    return {
      header: campaignAddress,
      description: (
        <Link legacyBehavior href={`/campaigns/${campaignAddress}`}>
          <a>View campaign</a>
        </Link>
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
import React from "react";
import Campaign from "../../ethereum/campaign";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Card, Button } from "semantic-ui-react";
import { useRouter } from "next/router";

const CampaignShow = ({
  campaignAddress,
  minimumContribution,
  balance,
  requestCount,
  approversCount,
  manager,
}) => {
  const router = useRouter();
  const items = [
    {
      header: "Campaign Owner",
      //meta:  `${manager}`,
      meta:"Maitray Jariwala",
      description:
        "The manager created this campaign and can create requests to withdraw this money",
      style: { overflowWrap: "break-word" },
    },
    {
      header: "Minimum Contribution",
      meta: `${minimumContribution} wei`,
      description:
        "The minimum amount to contribute to this campaign in wei to become an approver",
      style: { overflowWrap: "break-word" },
    },
    {
      header: "Camapaign Balance",
      meta: `${balance} wei = ${web3.utils.fromWei(balance, "ether")} eth`,
      description: "How much money this campaign has left to spend",
      style: { overflowWrap: "break-word" },
    },
    {
      header: "Number of requests",
      meta: requestCount,
      description:
        "A request tries to withdraw money from the account. Requests must be approved by a minimum 50% of approvers",
      style: { overflowWrap: "break-word" },
    },
    {
      header: "Number of Approvers",
      meta: approversCount,
      description:
        "The number of approvers that have already contributed to this campaign",
      style: { overflowWrap: "break-word" },
    },
  ];
  return (
    <Layout>
      <h1>Campaign Details</h1>
      <ContributeForm campaignAddress={campaignAddress} />
      <br />
      <Card.Group items={items}></Card.Group>
      <br />
      <Button
        onClick={() => router.push(`/campaigns/${campaignAddress}/requests`)}
        color="teal"
        size="large"
      >
        Show Requests
      </Button>
    </Layout>
  );
};

CampaignShow.getInitialProps = async (props) => {
  const campaignDetails = Campaign(props.query.campaignAddress);
  const summary = await campaignDetails.methods.getSummary().call();
  
  return {
        campaignAddress: props.query.campaignAddress,
        minimumContribution: BigInt(summary[0]).toString(),
        balance: BigInt(summary[1]).toString(),
        requestCount: BigInt(summary[2]).toString(),
        approversCount: BigInt(summary[3]).toString(),
        manager: (summary[4]),
  };
};

export default CampaignShow;
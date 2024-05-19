"use client"
import React, { useState, useEffect } from "react";
import { Button, Form, Input, Message, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import "semantic-ui-css/semantic.min.css";
import DateInputForm from "../../components/DateInputForm";

const INITIAL_TRANSACTION_STATE = {
  loading: "",
  error: "",
  success: "",
};

const CampaignNew = (props) => {
  const router = useRouter();
  const [minimumContribution, setMinimumContribution] = useState("");
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [campaignValidity, setCampaignValidity] = useState({
    year: "",
    month: "",
    day: ""
  });
  const [transactionState, setTransactionState] = useState(INITIAL_TRANSACTION_STATE);
const { loading, error, success } = transactionState;
  const onSubmit = async (event) => {
    event.preventDefault();

    setTransactionState({
      ...INITIAL_TRANSACTION_STATE,
      loading: "Transaction is processing....",
    });

    const accounts = await web3.eth.getAccounts();
    await factory.methods
      .createCampaign(minimumContribution)
      .send({
        from: accounts[0],
      })
      .then(async (res) => {
        const response = await fetch('/api/campaigns', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            campaignTitle,
            campaignDescription,
            campaignValidity,
          }),
        });

        if (response.ok) {
          setTransactionState({
            ...INITIAL_TRANSACTION_STATE,
            success: (
              <a
href={`https://sepolia.infura.io/v3/${res.transactionHash}`}
target="_blank">
                View the transaction on Etherscan
              </a>
            ),
          });
          router.push("/logini/log");
        } else {
          throw new Error("Error saving campaign data");
        }
      })
      .catch((err) => {
        setTransactionState({
          ...INITIAL_TRANSACTION_STATE,
          error: err.message,
        });
      });

    setMinimumContribution("");
  };

  const renderMessage = () => {
    return (
      <Message icon negative={Boolean(error)} success={Boolean(success)}>
        <Icon
          name={
            loading ? "circle notched" : error ? "times circle" : "check circle"
          }
          loading={Boolean(loading)}
        />
        <Message.Content>
          {Boolean(success) && (
            <Message.Header>Transaction Success!</Message.Header>
          )}
          {loading ? loading : error ? error : success}
        </Message.Content>
      </Message>
    );
  };
  return (
    <Layout>
      <h1>Create a Campaign</h1>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            focus
            type="number"
            min="0"
            disabled={Boolean(loading)}
            value={minimumContribution}
            onChange={(e) => setMinimumContribution(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Campaign Title</label>
          <Input
            placeholder="Enter Title for your Campaign"
            value={campaignTitle}
            onChange={(e) => setCampaignTitle(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Campaign Idea</label>
          <Input
            placeholder="Describe your Campaign"
            value={campaignDescription}
            onChange={(e) => setCampaignDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Campaign Validity</label>
          <Input
            placeholder="Year"
            type="number"
            value={campaignValidity.year}
            onChange={(e) => setCampaignValidity({...campaignValidity, year: e.target.value })}
          />
          </Form.Field>
          <Form.Field>
          <Input
            placeholder="Month"
            type="number"
            value={campaignValidity.month}
            onChange={(e) => setCampaignValidity({...campaignValidity, month: e.target.value })}
          />
          </Form.Field>
          <Form.Field>
          <Input
            placeholder="Day"
            type="number"
            value={campaignValidity.day}
            onChange={(e) => setCampaignValidity({...campaignValidity, day: e.target.value })}
          />
        </Form.Field>
        <Button color="teal" disabled={Boolean(loading)} style={{marginBottom: "10px" }}>
          Create!
        </Button>
      </Form>
      {Boolean(loading || error || success) && renderMessage()}
    </Layout>
  );
};

export default CampaignNew;
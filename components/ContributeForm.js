import React, { useState } from "react";
import { Form, Input, Button, Message, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import Medical from "../ethereum/campaign"; 
import web3 from "../ethereum/web3";
import "semantic-ui-css/semantic.min.css";

const INITIAL_TRANSACTION_STATE = {
  loading: "",
  error: "",
  success: "",
};

const ContributeForm = ({ campaignAddress }) => {
  const router = useRouter();
  const [contribution, setContribution] = useState("");
  const [transactionState, setTransactionState] = useState(
    INITIAL_TRANSACTION_STATE
  );
  const { loading, error, success } = transactionState;

  const onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Medical(campaignAddress);
    setTransactionState({
      ...INITIAL_TRANSACTION_STATE,
      loading: "Transaction is processing....",
    });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .contribute()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(contribution, "ether"),
        })
        .then((res) => {
          console.log(res);
          const etherscanLink = `https://sepolia.infura.io/v3/0b512c338495472c89f9d55f16f1e2bb`;
          setTransactionState({
            ...INITIAL_TRANSACTION_STATE,
            success: (
              <a href={etherscanLink} target="_blank">
                View the transaction on Etherscan
              </a>
            ),
          });
          router.replace(`/campaigns/${campaignAddress}`); //this will refresh the campaign stats on the page
        })
        .catch((err) => {
          console.log(err);
          setTransactionState({
            ...INITIAL_TRANSACTION_STATE,
            error: err.message,
          });
        });
      setContribution("");
    } catch (err) {
      console.log("some error", err);
      setTransactionState({
        ...INITIAL_TRANSACTION_STATE,
        error: err.message,
      });
    }
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
    <>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>{`Make Payment: ${campaignAddress}`}</label>
          <Input
            label="ether"
            labelPosition="right"
            placeholder={`Amount to be paid: ${campaignAddress}`}
            focus
            type="number" // enforce number only content
            step="any"
            min="0" //enforce positive numbers only
            disabled={Boolean(loading)} //disable input if loading
            value={contribution}
            onChange={(e) => setContribution(e.target.value)}
          />
        </Form.Field>
        <Button color="teal" disabled={Boolean(loading)} size="large">
          Make Payment
        </Button>
      </Form>
      {Boolean(loading || error || success) && renderMessage()}
    </>
  );
};

export default ContributeForm;
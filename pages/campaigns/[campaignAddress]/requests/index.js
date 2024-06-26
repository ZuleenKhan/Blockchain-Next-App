import React, { useState, useEffect } from "react";
import { Button, Table, Message, Icon, Modal, ModalHeader } from "semantic-ui-react";
import { useRouter } from "next/router";
import Layout from "../../../../components/Layout"     
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import "semantic-ui-css/semantic.min.css";
               
const INITIAL_TRANSACTION_STATE = {
  loading: "",
  error: "",
  success: "",
  //action: "",
};

const RequestIndex = ({
  campaignAddress,
  requests,
  requestCount,
  approversCount,
}) => {
  const router = useRouter();
  const [transactionState, setTransactionState] = useState(
    INITIAL_TRANSACTION_STATE
  );
  const [reviews,setReviews] = useState([]) ; 
  useEffect(()=>{
    async function fetchUsers(){
      try{
        const res = await fetch("/api/review",{cache : "no-store"})
        setReviews(await res.json()) ; 
      }catch(error){console.log(error.response.data) ; }
    }
    fetchUsers() ; 
  },[]); 
  const { Header, Row, Body, Cell, HeaderCell } = Table;
  const { loading, error, success } = transactionState;
  // const headers = ['ID', 'Description']
  console.log(campaignAddress, requests, approversCount, requestCount);
  const [open, setOpen] = React.useState(false);
  // move the 2 actions into one function really with state for approve or finalise
  const onApprove = async (id) => {
    const campaign = Campaign(campaignAddress);
    setTransactionState({
      ...INITIAL_TRANSACTION_STATE,
      loading: "Approval is processing....",
    });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .approveRequest(parseInt(id))
        .send({
          from: accounts[0],
        })
        .then((res) => {
          console.log(res);
          const etherscanLink = `https://rinkeby.etherscan.io/tx/${res.transactionHash}`;
          setTransactionState({
            ...INITIAL_TRANSACTION_STATE,
            success: (
              <a href={etherscanLink} target="_blank">
                View the transaction on Etherscan
              </a>
            ),
          });
          router.replace(`/campaigns/${campaignAddress}/requests`); //this will refresh the campaign stats on the page
        })
        .catch((err) => {
          console.log(err);
          setTransactionState({
            ...INITIAL_TRANSACTION_STATE,
            error: err.message,
          });
        });
    } catch (err) {
      console.log("some error", err);
      setTransactionState({
        ...INITIAL_TRANSACTION_STATE,
        error: err.message,
      });
    }
  };

  const onFinalise = async (id) => {
    const start = Date.now();
    const campaign = Campaign(campaignAddress);
    setTransactionState({
      ...INITIAL_TRANSACTION_STATE,
      loading: "Finalise request is processing....",
    });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .finalizeRequest(parseInt(id))
        .send({
          from: accounts[0],
        })
        .then((res) => {
          console.log(res);
          const etherscanLink = `https://rinkeby.etherscan.io/tx/${res.transactionHash}`;
          setTransactionState({
            ...INITIAL_TRANSACTION_STATE,
            success: (
              <a href={etherscanLink} target="_blank">
                View the transaction on Etherscan
              </a>
            ),
          });
          router.replace(`/campaigns/${campaignAddress}/requests`); //this will refresh the campaign stats on the page
        })
        .catch((err) => {
          console.log(err);
          setTransactionState({
            ...INITIAL_TRANSACTION_STATE,
            error: err.message,
          });
        });
    } catch (err) {
      console.log("some error", err);
      setTransactionState({
        ...INITIAL_TRANSACTION_STATE,
        error: err.message,
      });
    }
    const end = Date.now() ; 
    console.log("Start bhai ! ", start) ; 
    console.log(end) ;
  };
  const onCancel = async (id) => {
    const campaign = Campaign(campaignAddress);
    setTransactionState({
      ...INITIAL_TRANSACTION_STATE,
      loading: "Finalise request is processing....",
    });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .cancelRequest(parseInt(id))
        .send({
          from: accounts[0],
        })
        .then((res) => {
          console.log(res);
          const etherscanLink = `https://rinkeby.etherscan.io/tx/${res.transactionHash}`;
          setTransactionState({
            ...INITIAL_TRANSACTION_STATE,
            success: (
              <a href={etherscanLink} target="_blank">
                View the transaction on Etherscan
              </a>
            ),
          });
          router.replace(`/campaigns/${campaignAddress}/requests`); //this will refresh the campaign stats on the page
        })
        .catch((err) => {
          console.log(err);
          setTransactionState({
            ...INITIAL_TRANSACTION_STATE,
            error: err.message,
          });
        });
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
      <Message
        icon
        negative={Boolean(error)}
        success={Boolean(success)}
        style={{ overflowWrap: "break-word" }}
      >
        <Icon
          name={
            loading ? "circle notched" : error ? "times circle" : "check circle"
          }
          loading={Boolean(loading)}
        />
        <Message.Content>
          {Boolean(success) && (
            <Message.Header>Request Successful!</Message.Header>
          )}
          {loading ? loading : error ? error : success}
        </Message.Content>
      </Message>
    );
  };
  
  const renderRow = (
    { approvalCount, complete, description, recipient, value },
    index
  ) => {
    //tftguyhu
    return (
      <Row key={index} textAlign="center" disabled={complete}>
        <Cell>{index}</Cell>
        <Cell>{description}</Cell>
        <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
        <Cell>{recipient}</Cell>
        <Cell>
          {complete ? (
            "Approved"
          ) : complete >=  2 ? (
            "Quota met"
          ) : (
            <Button
              color="green"
              basic
              size="large"
              disabled={Boolean(loading)} // don't allow more clicks if loading
              onClick={() => onApprove(index)}
            >
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {complete ? (
            "Finalised"
          ) : (
            <Button
              color="pink"
              basic
              size="large"
              disabled={Boolean(loading)}
              onClick={() => onFinalise(index)}
            >
              Finalize
            </Button>
          )}
        </Cell>
        <Cell>
          {complete ? (
            "Cancelled"
          ) : (
            <Button
              color="pink"
              basic
              size="large"
              disabled={Boolean(loading)}
              onClick={() => onCancel(index)}
            >
              Cancel
            </Button>
          )}
        </Cell>
      </Row>
    );
  };

  return (
    <Layout>
      <h1>Requests</h1>
      <Button
        onClick={() =>
          router.push(`/campaigns/${campaignAddress}/requests/new`)
        }
        color="teal"
        size="large"
        floated="right"
        style={{ marginBottom: "20px" }}
      >
        Add Request
      </Button>
      <Table>
        <Header>
          <Row textAlign="center">
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount (eth)</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approved</HeaderCell>
            <HeaderCell>Finalized</HeaderCell>
            <HeaderCell>Cancel</HeaderCell>
          </Row>
        </Header>
        <Body>
          {/* Loop through all the requests to render them */}
          {requests ? (
            requests.map((request, index) => {
              return renderRow(request, index);
            })
          ) : (
            <Row>Something went wrong</Row>
          )}
        </Body>
      </Table>
      {Boolean(loading || error || success) && renderMessage()}
    
      <Modal style={{display:"flex",flexWrap:"wrap",overflowWrap:"break-word" }}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button color='teal'size="large" >  <Icon name="add user" />
      {"   "} Verify Vendor </Button>}
      >
      <ModalHeader>{ reviews?.review?.map((review) => ( <a key={review.id}> {review.description} </a>)) }</ModalHeader>
      </Modal>
    </Layout>
  );
};

RequestIndex.getInitialProps = async (props) => {
  const { campaignAddress } = props.query;
  const campaign = Campaign(campaignAddress);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );
  let approversCount = await campaign.methods.approversCount().call();
  return { campaignAddress, requests, requestCount, approversCount };
};

export default RequestIndex;
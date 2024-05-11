import Web3 from 'web3' ; 

let web3;

if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
    window.ethereum.request({method: "eth_requestAccounts"}) ; 
    web3 = new Web3(window.ethereum) ; 
} else {
    const provider = new Web3.providers.HttpProvider(
        'https://sepolia.infura.io/v3/0b512c338495472c89f9d55f16f1e2bb'
    ) ; 
    web3 = new Web3(provider) ; 
}
export default web3 ; 
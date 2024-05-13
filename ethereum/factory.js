import web3 from './web3' ; 
import CampaignFactory from './build/CampaignFactory.json' ; 

const instance =  new web3.eth.Contract(CampaignFactory.abi,
    '0xffcf7FBF914ab67f8f5488f5aeE5D11516B2de78') ; 

export default instance ; 
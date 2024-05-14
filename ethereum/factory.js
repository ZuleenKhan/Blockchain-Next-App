import web3 from './web3' ; 
import CampaignFactory from './build/CampaignFactory.json' ; 

const instance =  new web3.eth.Contract(CampaignFactory.abi,
    '0x275FbF92617b2DD8fc3F4D808f273fD24A71a84c') ; 

export default instance ; 
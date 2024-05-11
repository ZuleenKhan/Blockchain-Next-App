import {
  ListItem,
  ListHeader,
  ListContent,
  List,
} from 'semantic-ui-react'
// import bg from '../images/helen.jpg' ; 
import Review from './Review.jsx';
import "semantic-ui-css/semantic.min.css";

import React from 'react'
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Icon,
  Image,
  Modal,
} from 'semantic-ui-react'
import Link from 'next/link.js';
import Reviewform from './Reviewform.js';
function ModalScrollingExample() {
  const [open, setOpen] = React.useState(false)
  const [showMain, setShowMain] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const handleClick = () => {
     if(count%2!=0) {
     setShowMain(true);
     setCount(count+1) ;  
    }
     else { setShowMain(false) ; 
     setCount(count+1) ;  
    }
  };
  return (
    <Modal style={{display:"flex",flexWrap:"wrap",overflowWrap:"break-word" }}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button color='teal'size="large" >Show Manager Review</Button>}
    >
      <ModalHeader>Manager Review</ModalHeader>
      <ModalContent  style={{display:"flex",flexWrap:"wrap",overflowWrap:"break-word" }} image>
     
      <div style={{display:"flex",flexWrap:"wrap", padding : "10px"}}>
           <List divided horizontal size='massive'>
                 <ListItem>
               <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg'/> 
               <ListContent>
                 <ListHeader>Zuleen Khan </ListHeader>
              </ListContent>
             </ListItem>
           </List>
           </div>
        <ModalDescription style={{overflowWrap:"break-word" ,width:"fit-content" }}>
        
        <Review />
    
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <div>
        <Button fluid positive onClick={handleClick}>
          Add Review 
        </Button>
        <br/>
          {showMain && <Reviewform/>}
          </div>
      </ModalActions>
    </Modal>

  )
}

export default ModalScrollingExample

{/* <div className="App">
            <ButtonComponent handleClick={handleClick} />
            {showMain && <MainComponent />}
        </div> */}

"use client"
import { useRouter } from 'next/router'
import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import UserProfile from './UserProfile';

const trigger = (
  <span>
    <Icon name='user' /> 
  </span>
)

const DropdownRight = () => {
  const router = useRouter();
  function handleClick() {
     router.push("/logini/pp");
  }
  function takeback() {
    router.push("/");
 }
  const options = [
    {
      key: 'user',
      text: (
        <span>
          Signed in as <strong>
            </strong>
        </span>
      ),
      disabled: true,
    },
   
    { key: 'sign-out', text: 'Sign Out' , onClick: takeback},
  ];

  return (
    <Dropdown trigger={trigger} options={options} style={{paddingRight:"15px", paddingTop:"5px"}}/>
  );
};

export default DropdownRight;

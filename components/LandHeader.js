import React from 'react'
import { MenuMenu, Menu, MenuItem } from 'semantic-ui-react'
import DropdownRight from './DropdownRight';

const LandHeader = () => (
  <Menu style={{margin:"15px"}}>
    
    <MenuMenu position='left'>
     <MenuItem
          name='Home'
         
        />
    </MenuMenu>
    
    <MenuMenu position='right'>
      <DropdownRight direction='right'
      />
    </MenuMenu>
  </Menu>
)

export default LandHeader ; 
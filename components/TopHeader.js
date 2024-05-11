import React from 'react'
import { Menu, MenuItem } from 'semantic-ui-react'
import { useRouter } from 'next/router';


function TopHeader() {
    const router = useRouter();
    const handleItemClick = (event) => {
             event.preventDefault() ;
             router.push("/logini/log") ;  
    }
  return (
    <>
      < Menu style={{margin:"15px"}}>
      <MenuItem
          name='Home'
          onClick={handleItemClick}
        />
      </Menu>
    </>
  )
}

export default TopHeader;
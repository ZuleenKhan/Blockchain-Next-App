import React from 'react'
import { Container, Icon } from 'semantic-ui-react'
import TopHeader from './TopHeader'
import Footer from './Footer'


export default function Layout(props) {
  return (
    <Container>
        <TopHeader/>
      {props.children}
      <Footer/>
    </Container>
    
  )
}

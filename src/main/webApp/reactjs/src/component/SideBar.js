import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {
  Menu,
  Sidebar,
  Icon,
} from 'semantic-ui-react'


export default class VerticalSidebar extends Component{
  render(){
    return(
      <Sidebar
      as={Menu}
      animation="overlay"
      direction="left"
      icon='labeled'
      inverted
      vertical
      visible={this.props.visible}
      width='thin'
    >
      {this.props.items.map(({label,linkto,icon})=>{
        return(
          <Menu.Item as={Link} to={linkto}>
          <Icon name={icon}/>
            {label}
          </Menu.Item>
        )
      })}
      </Sidebar>
  
    );
  }
}


// so it actually access object method inside {} , then use map method to loop props

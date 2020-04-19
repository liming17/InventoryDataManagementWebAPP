import React from 'react';
import {Navbar,Nav,NavDropdown,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
export default class NavigationBar extends React.Component{
	constructor(props) {
		super(props);
		this.state = {};
	  }

	getNavItem(item){
		return(item.children == null ?
						<Link style={{ color: '#92A0AF' }}  to={item.url} className="nav-link">{item.name}</Link> :
						<NavDropdown style={{ color: '#92A0AF' }}  title={item.name} id="my-nav-dropdown">
							{
								item.children.map((item)=>this.getNavItem(item))
							}

						</NavDropdown>)
	}
	render(){
		return (
				<Navbar bg="dark" variant="dark">
				<Navbar.Brand onClick={this.props.viewAction}>NeoLife Boutique</Navbar.Brand>
				<Navbar.Collapse id="basic-navbar-nav">
			
					{
						this.props.navItems.map(this.getNavItem.bind(this))
					}
				
				</Navbar.Collapse>
				</Navbar>
         );
	}
}

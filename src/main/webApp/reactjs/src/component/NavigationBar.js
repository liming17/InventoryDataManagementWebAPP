import React from 'react';
import {Navbar,Nav,NavDropdown,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import {
	withRouter
  } from 'react-router-dom';

class NavigationBar extends React.Component{
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

	logOut =()=>{
		this.props.logOut();
		this.props.history.push('/');
	}
	render(){
		let LinkItems;
		if(this.props.auth){
			LinkItems = [
				<Button variant="info" onClick={this.logOut} style={{ marginLeft:"20rem" }}>
					<Icon name='sign-out' />
					Log Out</Button>
		  ];
		}else{
			LinkItems = [
				<Link to="/login" style={{ color: '#FFFFFF', marginLeft:"20rem" }}>
                 <Icon name="sign-in" />Sign In
				</Link>
			];
		}
		return (
				<Navbar bg="dark" variant="dark">
				<Navbar.Brand onClick={this.props.viewAction}>NeoLife Boutique</Navbar.Brand>
				<Navbar.Collapse id="basic-navbar-nav">
			
					{
						this.props.navItems.map(this.getNavItem.bind(this))
					}

					<Nav>
						{LinkItems}
					</Nav>
				</Navbar.Collapse>
				</Navbar>
         );
	}
}

export default withRouter(NavigationBar);

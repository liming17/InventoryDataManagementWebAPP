import React , {Component} from 'react';
import './App.css';
import {Navbar,Nav,NavDropdown,Button} from 'react-bootstrap';
import NavigationBar from './component/NavigationBar.js';
import Welcome from './component/Welcome.js';
import Foot from './component/Foot.js';
import VerticalSidebar from './component/SideBar.js';
import sideItems from './component/_sideBar.js';
import navList from './component/_nav.js';
import ViewProduct from './component/ViewProduct.js';
import OrderProduct from './component/OrderProduct.js';
import ViewEmployee from './component/ViewEmployee.js';
import AddNewEmployee from './component/AddNewEmployee.js';
import ImportSales from './component/ImportSales.js';
import AddNewProduct from './component/AddNewProduct.js';
import ViewBrand from './component/ViewBrand.js';
import AddNewBrand from './component/AddNewBrand.js';
import Login from './component/Login.js';


import {BrowserRouter as Router, Switch, Route,withRouter} from 'react-router-dom';
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { render } from '@testing-library/react';

export default class App extends Component {
    constructor(props) {
        super(props)

        // Bind the this context to the handler function
        this.viewSideBar = this.viewSideBar.bind(this);

        // Set some state
        this.state = {
			visible: false,
			auth: false
		};
		
		this.changeAuthState = this.changeAuthState.bind(this);
        this.logOut = this.logOut.bind(this);
    }


  async viewSideBar(){
	  this.setState({visible:!this.state.visible}); 
	  //window.alert(this.state.visible);
  }

  changeAuthState(){
	//let setState = !this.state.auth;
    this.setState({
		auth: true
	});
	//this.props.history.push('/');
  };

  logOut(){
	localStorage.removeItem("ACCESS_TOKEN");
	
	this.setState({
		auth:false
	});

  }

render(){
	return(
		<div className="App">
			<Router>
			<NavigationBar 
			viewAction={this.viewSideBar} 
			navItems={navList.items} 
			auth={this.state.auth}
			logOut={this.logOut}/>
			<Sidebar.Pushable>
			  <VerticalSidebar items={sideItems.items} visible={this.state.visible}/>
			  <Sidebar.Pusher dimmed={this.state.visible}>
	
			  <Switch>
				   <Route path="/" exact component={Welcome}/>
				   <Route path="/addProduct" exact component={AddNewProduct}/>
				   <Route path="/orderProduct" exact component={OrderProduct}/>
				   <Route path="/viewProduct" exact component={ViewProduct}/>
				   <Route path="/edit/:id" exact component={AddNewProduct}/>

				<Route path="/viewEmployee" exact component={ViewEmployee}/>
				<Route path="/addEmployee" exact component={AddNewEmployee}/>
				<Route path="/editEmployee/:id" exact component={AddNewEmployee}/>

				<Route path="/importSales" exact component={ImportSales}/>


				<Route path="/viewBrand" exact component={ViewBrand}/>
				<Route path="/addBrand" exact component={AddNewBrand}/>
				<Route path="/editBrand/:id" exact component={AddNewBrand}/>

				<Route path="/login" render={(props) => <Login {...props} changeAuth={this.changeAuthState}/>} />

			   </Switch>
	
			  </Sidebar.Pusher >
			</Sidebar.Pushable>
	  </Router>
	  <Foot/>
	  </div>
	  );
};
 
}



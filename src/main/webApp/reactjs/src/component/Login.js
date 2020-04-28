import React,{Component} from 'react';
import {Card,Form, Button, Col} from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
import {login,signUp} from "./CommonFunc.js";


export default class Login extends Component{
  constructor(props){
    super(props);
    this.state = this.initialState;
  }

  initialState = {
   username:'',
   password:'',
   action: 1 // 1 means login, 2 means signIn
  };
 // login func send request and set access token
   logInAction = (event)=>{
    event.preventDefault();
        const loginRequest = {
            username:this.state.username,
            password:this.state.password
        }
    login(loginRequest);
    this.props.changeAuth();
    this.props.history.push('/');
   }

   changeAction= () =>{
    this.setState({action : 2});
   }

    signUpAction = (event) =>{
        event.preventDefault();
        if(this.state.password.length>=6 && this.state.password.length<=20){
            const signupRequest = {
                username:this.state.username,
                password:this.state.password
            }
            signUp(signupRequest);
            this.setState({action : 1});
            this.resetForm();
        }else{
            alert("The length of password must between 6 to 20");
        }
    }

    resetForm = () =>{
        this.setState({
            username:'',
            password:''
        })
    }

    inputChange = event => {
        this.setState({
			[event.target.name]:event.target.value
		});
    }

    render(){
        return(
            <Card className="Light"  style={{ width: '30rem', marginLeft: '30rem',  marginTop: '10rem'}}>
					<Card.Header><Icon name='user plus' /> {this.state.action == 1 ? "Sign In" : "Sign Up"} </Card.Header>
					<Form onSubmit={this.state.action == 1  ? this.logInAction : this.signUpAction} id="logFormId">
					<Card.Body>
						<Form.Row>
						  <Form.Group as={Col} controlId="formGridName">
						    <Form.Label>User Name</Form.Label>
						    <Form.Control required autoComplete="off"
						    	type="text" 
						    	name="username" 
						    	value={this.state.username}
						    	onChange={this.inputChange}
						    	className={"bg-light"} 
						    	placeholder="Enter the user name" />
						  </Form.Group>
						</Form.Row>
						<Form.Row>
						  <Form.Group as={Col}  controlId="formGridBarcode">
						    <Form.Label>Password</Form.Label>
						    <Form.Control required autoComplete="off"
						    type="text" 
						    name="password"
						    value={this.state.password}
					    	onChange={this.inputChange}
						    className={"bg-light"} placeholder="Enter password" />
						  </Form.Group>
						</Form.Row>
						
					</Card.Body>
					<Card.Footer style={{"textAlign":"right"}}>
					  <Button size="sm" variant="success" type="submit">
						<Icon name='sign-in' /> {this.state.action == 1 ? "Sign In" : "Sign Up"}
					  </Button>{' '}
                      <Button size="sm" variant="info" onClick={this.changeAction} style={this.state.action == 1 ? {} : { display: 'none' }} >
						<Icon name='sign-in' /> Sign Up
					  </Button>
					</Card.Footer>
					</Form>
				</Card>
        );
    }
}
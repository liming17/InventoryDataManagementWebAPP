import React,{Component} from 'react';
import {Card,Form, Button, Col} from 'react-bootstrap';
import { Icon } from 'semantic-ui-react'
import axios from 'axios';

export default class AddNewBrand extends Component{
    constructor(props){
		super(props);
		this.state = this.initialState;
		this.brandChange = this.brandChange.bind(this);
        this.submitBrand = this.submitBrand.bind(this);
		this.resetBrand = this.resetBrand.bind(this);
		this.updateBrand = this.updateBrand.bind(this);
		this.brandList = this.brandList.bind(this);
    }
    
    initialState={
        id:'',brandCategory:'',brandName:'',brandCompany:'',brandDescription:''};
	
	componentDidMount(){
		const brandId = +this.props.match.params.id;
		if(brandId){
			axios.get("http://localhost:8082/rest/brands/"+brandId)
			.then(response => {
				this.setState({
					id: response.data.id,
					brandCategory: response.data.brandCategory,
					brandName: response.data.brandName,
					brandCompany: response.data.brandCompany,
					brandDescription: response.data.brandDescription
				});

			}).catch((error)=>{
				console.error("Error: " + error);
			});
		}
			
	}

    submitBrand = event => {
		event.preventDefault();
		
		const brand = {
            brandCategory: this.state.brandCategory, 
            brandName:this.state.brandName, 
            brandCompany:this.state.brandCompany, 
            brandDescription: this.state.brandDescription
		};
		
		axios.post("http://localhost:8082/rest/brands",brand)
		       .then(response => {
		    	   if(response.data != null){
		    		   this.setState(this.initialState);
		    		   alert("Brand saved successfully!");
		    	   }
		       }
		    		   
		    		   
		       );
	};
	
	updateBrand = event =>{
		event.preventDefault();
		const brand = {
            id:this.state.id,
            brandCategory: this.state.brandCategory, 
            brandName:this.state.brandName, 
            brandCompany:this.state.brandCompany, 
            brandDescription: this.state.brandDescription
		};
		axios.put("http://localhost:8082/rest/brands",brand)
		       .then(response => {
		    	   if(response.data != null){
		    		   this.setState(this.initialState);
		    		   setTimeout(()=> this.brandList(),1000);
		    	   }
		       }
		    		   
		    		   
		       );

	};

	brandList=()=>{
		return this.props.history.push("/viewBrand");
	};

    brandChange = event =>{
		this.setState({
			[event.target.name]:event.target.value
		});
	};

	
	resetBrand= () => {
		this.setState(this.initialState);
    };
    
    render(){
		return(
				<Card className="border border-light bg-light" style={{margin: "20px"}}>
					<Card.Header><Icon name='plus square' /> {this.state.id ? "Update" : "Save"} A New Brand</Card.Header>
					<Form onReset={this.resetBrand} onSubmit={this.state.id ? this.updateBrand : this.submitBrand} id="brandFormId">
					<Card.Body>
						<Form.Row>
						  <Form.Group as={Col} controlId="formGridName">
						    <Form.Label>Brand Category</Form.Label>
						    <Form.Control required autoComplete="off"
						    	type="text" 
						    	name="brandCategory" 
						    	value={this.state.brandCategory}
						    	onChange={this.brandChange}
						    	className={"bg-light"} 
						    	placeholder="Enter brand category: high-end, local designer..." />
						  </Form.Group>
						  <Form.Group as={Col} controlId="formGridColor">
						    <Form.Label>Brand Name</Form.Label>
						    <Form.Control required autoComplete="off" 
						    type="text" 
						    name="brandName"
						    value={this.state.brandName}
					    	onChange={this.brandChange}
						    className={"bg-light"} placeholder="Enter brand name" />
						  </Form.Group>
						</Form.Row>
						<Form.Row>
						  <Form.Group as={Col}  controlId="formGridBarcode">
						    <Form.Label>Brand Company</Form.Label>
						    <Form.Control required autoComplete="off"
						    type="text" 
						    name="brandCompany"
						    value={this.state.brandCompany}
					    	onChange={this.brandChange}
						    className={"bg-light"} placeholder="Enter brand company" />
						  </Form.Group>
						  <Form.Group as={Col} controlId="formGridPrimeCost">
						    <Form.Label>Brand Description</Form.Label>
						    <Form.Control required autoComplete="off"
						    type="text" 
						    name="brandDescription"
						    value={this.state.brandDescription}
					    	onChange={this.brandChange}
						    className={"bg-light"} placeholder="Enter brand description" />
						  </Form.Group>
						</Form.Row>
						
					</Card.Body>
					<Card.Footer style={{"textAlign":"right"}}>
					  <Button size="sm" variant="success" type="submit">
						<Icon name='save' /> {this.state.id ? "Update" : "Save"}
					  </Button>{" "}
					  <Button size="sm" variant="info" type="reset">
					  <Icon name='repeat' /> Reset
					  </Button>
					</Card.Footer>
					</Form>
				</Card>
				
		);
	}

    



}
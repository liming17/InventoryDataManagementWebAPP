import React,{Component} from 'react';
import {Card,Form, Button, Col} from 'react-bootstrap';
import { Icon } from 'semantic-ui-react'
import axios from 'axios';

export default class AddNewProduct extends Component{
    constructor(props){
		super(props);
		this.state = this.initialState;
		this.productChange = this.productChange.bind(this);
        this.submitProduct = this.submitProduct.bind(this);
		this.resetProduct = this.resetProduct.bind(this);
		this.updateProduct = this.updateProduct.bind(this);
		this.productList = this.productList.bind(this);
		this.brandChange = this.brandChange.bind(this);
    }
    
    initialState={
        id:'',name:'',color:'',barcode:'',prime_cost:'',sale_price:'',brand:'',size:'',category:'',style:'',total_amount:''
	}
	
	componentDidMount(){
		const productId = +this.props.match.params.id;
		if(productId){
			axios.get("http://localhost:8082/rest/products/"+productId)
			.then(response => {
				this.setState({
					id: response.data.id,
					name: response.data.name,
					color: response.data.color,
					barcode: response.data.barcode,
					prime_cost: response.data.prime_cost,
					sale_price: response.data.sale_price,
					brand:response.data.brand_id,
					size: response.data.size,
					category: response.data.category,
					style: response.data.style,
					total_amount:response.data.total_amount

				});

			}).catch((error)=>{
				console.error("Error: " + error);
			});
		}
			
	}

    submitProduct = event => {
		event.preventDefault();
		
		const product = {
            name: this.state.name, 
            color:this.state.color, 
            barcode:this.state.barcode, 
            prime_cost: this.state.prime_cost, 
            sale_price:this.state.sale_price,
            brand:this.state.brand,
            size:this.state.size,
            category:this.state.category,
            style:this.state.style,
            total_amount:this.state.total_amount
		};
		
		axios.post("http://localhost:8082/rest/products/"+this.state.brand+"/product",product)
		       .then(response => {
		    	   if(response.data != null){
		    		   this.setState(this.initialState);
		    		   alert("Product saved successfully!");
		    	   }
		       }
		    		   
		    		   
		       );
	};
	
	updateProduct = event =>{
		event.preventDefault();
		const product = {
			id: this.state.id,
            name: this.state.name, 
            color:this.state.color, 
            barcode:this.state.barcode, 
            prime_cost: this.state.prime_cost, 
            sale_price:this.state.sale_price,
            brand:this.state.brand,
            size:this.state.size,
            category:this.state.category,
            style:this.state.style,
            total_amount:this.state.total_amount
		};
		axios.put("http://localhost:8082/rest/products/"+this.state.brand+"/product",product)
		       .then(response => {
		    	   if(response.data != null){
		    		   this.setState(this.initialState);
		    		   setTimeout(()=> this.productList(),1000);
		    	   }
		       }
		    		   
		    		   
		       );

	};

	productList=()=>{
		return this.props.history.push("/viewProduct");
	};

    productChange = event =>{
		this.setState({
			[event.target.name]:event.target.value
		});
	};

	brandChange = event =>{
		this.setState({
			[event.target.name]:event.target.value
		});
	};
	
	resetProduct= () => {
		this.setState(this.initialState);
    };
    
    render(){
		return(
				<Card className="border border-light bg-light" style={{margin: "20px"}}>
					<Card.Header><Icon name='plus square' /> {this.state.id ? "Update" : "Save"} A New Product Into Product List</Card.Header>
					<Form onReset={this.resetProduct} onSubmit={this.state.id ? this.updateProduct : this.submitProduct} id="productFormId">
					<Card.Body>
						<Form.Row>
						  <Form.Group as={Col} controlId="formGridName">
						    <Form.Label>Name</Form.Label>
						    <Form.Control required autoComplete="off"
						    	type="text" 
						    	name="name" 
						    	value={this.state.name}
						    	onChange={this.productChange}
						    	className={"bg-light"} 
						    	placeholder="Enter product name" />
						  </Form.Group>
						  <Form.Group as={Col} controlId="formGridColor">
						    <Form.Label>Color</Form.Label>
						    <Form.Control required autoComplete="off" 
						    type="text" 
						    name="color"
						    value={this.state.color}
					    	onChange={this.productChange}
						    className={"bg-light"} placeholder="Enter product color" />
						  </Form.Group>
						</Form.Row>
						<Form.Row>
						  <Form.Group as={Col}  controlId="formGridBarcode">
						    <Form.Label>Barcode</Form.Label>
						    <Form.Control required autoComplete="off"
						    type="text" 
						    name="barcode"
						    value={this.state.barcode}
					    	onChange={this.productChange}
						    className={"bg-light"} placeholder="Enter product barcode" />
						  </Form.Group>
						  <Form.Group as={Col} controlId="formGridPrimeCost">
						    <Form.Label>Prime Cost</Form.Label>
						    <Form.Control required autoComplete="off"
						    type="text" 
						    name="prime_cost"
						    value={this.state.prime_cost}
					    	onChange={this.productChange}
						    className={"bg-light"} placeholder="Enter product prime cost" />
						  </Form.Group>
						</Form.Row>
						<Form.Row>
						  <Form.Group as={Col} controlId="formGridSalePrice">
						    <Form.Label>Sale Price</Form.Label>
						    <Form.Control required autoComplete="off"
						    type="text"
						    name="sale_price"
						    value={this.state.sale_price}
					    	onChange={this.productChange}
						    className={"bg-light"} placeholder="Enter product sale price" />
						  </Form.Group>
						  <Form.Group as={Col} controlId="formGridBrandId">
						    <Form.Label>Brand Id</Form.Label>
						    <Form.Control required autoComplete="off"
						    type="text"
						    name="brand"
						    value={this.state.brand}
					    	onChange={this.brandChange}
						    className={"bg-light"} placeholder="Enter Brand ID, this will be changed into brand name list in the future" />
						  </Form.Group>
						</Form.Row>
                        <Form.Row>
						  <Form.Group as={Col} controlId="formGridSize">
						    <Form.Label>Size</Form.Label>
						    <Form.Control required autoComplete="off"
						    type="text"
						    name="size"
						    value={this.state.size}
					    	onChange={this.productChange}
						    className={"bg-light"} placeholder="Enter product size" />
						  </Form.Group>
						  <Form.Group as={Col} controlId="formGridCategory">
						    <Form.Label>Category</Form.Label>
						    <Form.Control required autoComplete="off"
						    type="text"
						    name="category"
						    value={this.state.category}
					    	onChange={this.productChange}
						    className={"bg-light"} placeholder="Enter product category: high-end, woman..." />
						  </Form.Group>
						</Form.Row>
                        <Form.Row>
						  <Form.Group as={Col} controlId="formGridStyle">
						    <Form.Label>Style</Form.Label>
						    <Form.Control required autoComplete="off"
						    type="text"
						    name="style"
						    value={this.state.style}
					    	onChange={this.productChange}
						    className={"bg-light"} placeholder="Enter product style: travel bag and weekender..." />
						  </Form.Group>
						  <Form.Group as={Col} controlId="formGridCategory">
						    <Form.Label>Total Amount</Form.Label>
						    <Form.Control required autoComplete="off"
						    type="text"
						    name="total_amount"
						    value={this.state.total_amount}
					    	onChange={this.productChange}
						    className={"bg-light"} placeholder="Enter product total amount, this will be set 0 in future" />
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
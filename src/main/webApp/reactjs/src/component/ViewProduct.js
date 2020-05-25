import React, {Component} from 'react';
import {Card, Table, ButtonGroup, Button,InputGroup, FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { CardFooter } from 'reactstrap';
import axios from 'axios';

export default class ViewProduct extends Component{
	constructor(props){
		super(props);
		this.state={
				products:[],
				page:1,
				size:5,
				totalPage:0
		};
	}
	componentDidMount(){
		this.findAllProducts(this.state.page);
	}
	
	findAllProducts(page){
		page-=1;
		axios.get("http://localhost:8082/rest/products"+"?page="+page+"&size="+this.state.size)
		.then(response => response.data)
		.then((data)=>{
			this.setState({
				products:data.content,
				totalPage:data.totalPages,
			    page:data.number+1,
			    totalElement:data.totalElements});
            //console.log("get data from server");
            //console.log(data);
		});
	};

	deleteProduct = (productId)=>{
		axios.delete("http://localhost:8082/rest/products/"+productId)
		.then(response => {
            if(response.data != null){
				alert("product delete Successfully");
				this.setState({
					products: this.state.products.filter(product => product.id !== productId)
				});
			}
		});

	};

	changePage = event => {
		let targetPage = parseInt(event.target.value);
		this.findAllProducts(targetPage);
		this.setState({
			[event.target.name]:targetPage
		});
	};

	firstPage = () =>{
       if(this.state.page > 1){
		this.findAllProducts(1);
	   }
	};

	prevPage = () =>{
		if(this.state.page > 1){
			let prevPage=this.state.page-1;
			this.findAllProducts(prevPage);
		}
	};

	nextPage = () =>{
		if(this.state.page < Math.ceil(this.state.totalElement/this.state.size)){
			this.findAllProducts(this.state.page+1);
		}
	};

	lastPage = () =>{
		let lastPage = this.state.totalPage
		if(this.state.page < lastPage){
			this.findAllProducts(lastPage);
		}
	};
	
	render(){
			const pageCss={
				width:"45px",
				border:"1px solid #9FC2E8",
				textAlign:"center",
				fontWeight:"bold"
			}
		return(
			<Card className="border border-light bg-light" style={{margin: "20px"}}>
				<Card.Header>Product List </Card.Header>
					<Card.Body>
						<Table bordered hover striped responsive="xl">
						<thead>
					    <tr>
					      <th>Name</th>
					      <th>Color</th>
					      <th>Barcode</th>
					      <th>Purchase Price</th>
					      <th>Sale Price</th>
					      <th>Brand</th>
                          <th>Size</th>
                          <th>Category</th>
                          <th>Style</th>
                          <th>Total Amount</th>
						  <th>Modify Product</th>
					    </tr>
					  </thead>
					  <tbody>
					   
					  {this.state.products.length === 0 ? 
							  <tr align="center">
					           <td colSpan="11"> 0 product avaliable. </td>
					          </tr> :
					        this.state.products.map((product) => (
					        		<tr key={product.id}>
                                      <td>{product.name}</td>
					        		  <td>{product.color}</td>
					        		  <td>{product.barcode}</td>
					        		  <td>{product.prime_cost}</td>
					        		  <td>{product.sale_price}</td>
					        		  <td>{product.brand_name}</td>
                                      <td>{product.size}</td>
                                      <td>{product.category}</td>
                                      <td>{product.style}</td>
                                      <td>{product.total_amount}</td>
									  <td>
									  <Button variant="danger" onClick={this.deleteProduct.bind(this,product.id)}>Delete Product</Button> 
									  <Link to={"edit/"+product.id} className="btn btn-info">Edit Product</Link>
									  
										  </td>
					        		  
					        		</tr>
					        		))
					  
					  }
					  
					  </tbody>
						</Table>
					
					</Card.Body>
					<CardFooter>
						<div style={{"float":"left"}}>
                             Showing Page {this.state.page} of {this.state.totalPage}
						</div>
						<div style={{"float":"right"}}>
                             <InputGroup size="sm">
							   <InputGroup.Prepend>
							     <Button type="button" variant="outline-info" disabled={this.state.page === 1 ? true:false}
								   onClick={this.firstPage}>
									 First
								 </Button>
								 <Button type="button" variant="outline-info" disabled={this.state.page === 1 ? true:false}
								   onClick={this.prevPage}>
									 Prev
								 </Button>
							   </InputGroup.Prepend>

							   <FormControl style={pageCss} name="page" value={this.state.page}
							     onChange={this.changePage}/>

							   <InputGroup.Append>
							   <Button type="button" variant="outline-info" disabled={this.state.page === this.state.totalPage ? true:false}
							     onClick={this.nextPage}>
									 Next
								 </Button>
								 <Button type="button" variant="outline-info" disabled={this.state.page === this.state.totalPage ? true:false}
								 onClick={this.lastPage}>
									 Last
								 </Button>
							   </InputGroup.Append>
							 
							 </InputGroup>
						</div>
					</CardFooter>
			</Card>
				
		);
	}
}

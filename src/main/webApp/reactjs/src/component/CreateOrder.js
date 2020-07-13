import React, {Component} from 'react';
import {Card, Table, Button,InputGroup, FormControl} from 'react-bootstrap';
import { CardFooter } from 'reactstrap';

import {connect} from 'react-redux';
import {fetchProduct,changeProductAmount,subProductAmount,addProductAmount} from '../services/order/OrderActions';

class CreateOrder extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
        this.props.fetchProduct(this.props.productData.page,this.props.productData.size);
    }
    


	changePage = event => {
		let targetPage = parseInt(event.target.value);
        this.props.fetchProduct(targetPage,this.props.productData.size);
	};

	firstPage = () =>{
       if(this.props.productData.page > 1){
        this.props.fetchProduct(1,this.props.productData.size);
	   }
	};

	prevPage = () =>{
		if(this.props.page > 1){
			let prevPage=this.props.productData.page-1;
            this.props.fetchProduct(prevPage,this.props.productData.size);
		}
	};

	nextPage = () =>{
        let lastPage = this.props.productData.totalPage;
		if(this.props.productData.page < lastPage){
            this.props.fetchProduct(this.props.productData.page+1,this.props.productData.size);
		}
	};

	lastPage = () =>{
		let lastPage = this.props.productData.totalPage;
		if(this.props.productData.page < lastPage){
            this.props.fetchProduct(this.props.productData.page+1,this.props.productData.size);
		}
    };


    changeProductAmount = (id,event) =>{
        let amount = event.target.value;
        if(amount >= 0){
            this.props.changeAmount(id,amount);
        }else{
            alert("The product amount can't be less than 0");
        }
    }

    subOne = (id) =>{
       this.props.substractAmount(id);
    }

    addOne = (id)=>{
        this.props.addAmount(id);
    }


    confirmOrder = () =>{
        setTimeout(()=> {this.props.history.push("/viewOrder")},1000);
    }

    getAmount = (id) =>{
        let product = this.props.productData.addedProducts.find(p=>p.id == id);
        if(product){
            return product.amount;
        }else{
            return 0;
        }

    }
	
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
						  <th>Select Product</th>
					    </tr>
					  </thead>
					  <tbody>
					   
					  {this.props.productData.products.length === 0 ? 
							  <tr align="center">
					           <td colSpan="11"> 0 product avaliable. </td>
					          </tr> :
					        this.props.productData.products.map((product) => (
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
							<InputGroup size="sm">
							   <InputGroup.Prepend>
							     <Button type="button" variant="outline-info" disabled={this.getAmount(product.id) === 0 ? true:false}
								   onClick={()=>{this.subOne(product.id)}}>
									 -
								 </Button>
							   </InputGroup.Prepend>

							   <FormControl style={pageCss} name="amount" value={this.getAmount(product.id)}
							     onChange={(event) => this.changeProductAmount(product.id,event)}/>

							   <InputGroup.Append>
							   <Button type="button" variant="outline-info" onClick={()=>{this.addOne(product.id)}}>
									+
								 </Button>
								 
							   </InputGroup.Append>
							 
							 </InputGroup>
									  
										  </td>
					        		  
					        		</tr>
					        		))
					  
					  }
					  
					  </tbody>
						</Table>
					
					</Card.Body>
					<CardFooter>
						<div style={{"float":"left"}}>
                             Showing Page {this.props.productData.page} of {this.props.productData.totalPage}
						</div>
						<div style={{"float":"right"}}>
                             <InputGroup size="sm">
							   <InputGroup.Prepend>
							     <Button type="button" variant="outline-info" disabled={this.props.productData.page === 1 ? true:false}
								   onClick={this.firstPage}>
									 First
								 </Button>
								 <Button type="button" variant="outline-info" disabled={this.props.productData.page === 1 ? true:false}
								   onClick={this.prevPage}>
									 Prev
								 </Button>
							   </InputGroup.Prepend>

							   <FormControl style={pageCss} name="page" value={this.props.productData.page}
							     onChange={this.changePage}/>

							   <InputGroup.Append>
							   <Button type="button" variant="outline-info" disabled={this.props.productData.page === this.props.productData.totalPage ? true:false}
							     onClick={this.nextPage}>
									 Next
								 </Button>
								 <Button type="button" variant="outline-info" disabled={this.props.productData.page === this.props.productData.totalPage ? true:false}
								 onClick={this.lastPage}>
									 Last
								 </Button>
							   </InputGroup.Append>
							 
							 </InputGroup>

                             <Button type="button" variant="outline-info" 
								   onClick={this.confirmOrder}>
									 Checkout the Order
							</Button>
						</div>
					</CardFooter>
			</Card>
				
		);
	}
}

const mapStateToProps = state => {
   return {
        productData : state.getProduct
   }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProduct: (page,size) =>{
            dispatch(fetchProduct(page,size))
        },
        changeAmount : (id,amount) =>{
            dispatch(changeProductAmount(id,amount))
        },
        substractAmount : (id) =>{
            dispatch(subProductAmount(id))
        },
        addAmount : (id) =>{
            dispatch(addProductAmount(id))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateOrder);

import React, {Component} from 'react';
import {Card, Table, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { CardFooter } from 'reactstrap';

export default class ViewBrand extends Component{
	constructor(props){
		super(props);
		this.state={
				brands:[],
				currentPage:1,
				itemPerPage:5,
				search:""
		};
	}
	componentDidMount(){
		this.findAllBrands();
	}
	
	findAllBrands(){
		axios.get("http://localhost:8082/rest/brands")
		.then(response => response.data)
		.then((data)=>{
            this.setState({brands:data});
            //console.log("get data from server");
            //console.log(data);
		});
	};

	deleteBrand = (brandId)=>{
		axios.delete("http://localhost:8082/rest/brands/"+brandId)
		.then(response => {
            if(response.data != null){
				alert("brand delete Successfully");
				this.setState({
					brands: this.state.brands.filter(brand => brand.id !== brandId)
				});
			}
		});

	};

	changePage = event => {
		this.setState({
			[event.target.name]:parseInt(event.target.value)
		});
	};

	firstPage = () =>{
       if(this.state.currentPage > 1){
		   this.setState({
			currentPage:1
		   });
	   }
	};

	prevPage = () =>{
		if(this.state.currentPage > 1){
			this.setState({
			 currentPage: this.state.currentPage-1
			});
		}
	};

	nextPage = () =>{
		if(this.state.currentPage < Math.ceil(this.state.brands.length/this.state.itemPerPage)){
			this.setState({
			 currentPage: this.state.currentPage+1
			});
		}
	};

	lastPage = () =>{
		if(this.state.currentPage < Math.ceil(this.state.brands.length/this.state.itemPerPage)){
			this.setState({
			 currentPage: Math.ceil(this.state.brands.length/this.state.itemPerPage)
			});
		}
	};

	searchChange = event =>{
		this.setState({
			[event.target.name]:event.target.value
		});
	};

	cancelSearch = ()=>{
      this.setState({
		  search:""
	  });
	  this.findAllBrands();
	};

	searchBrand =()=>{
		axios.get("http://localhost:8082/rest/brands/searchBrandCatagory/"+this.state.search)
		.then(response => response.data)
		.then((data)=>{
			this.setState({brands:data});
		});
	};

	
	render(){
		const lastInd = this.state.currentPage*this.state.itemPerPage;
		const firstInd = lastInd - this.state.itemPerPage;
		const currentItems = this.state.brands.slice(firstInd,lastInd);
		const totalPage = Math.ceil(this.state.brands.length/this.state.itemPerPage);
			const pageCss={
				width:"45px",
				border:"1px solid #9FC2E8",
				textAlign:"center",
				fontWeight:"bold"
			}

		return(
			<Card className="border border-light bg-light" style={{margin: "20px"}}>
				<Card.Header>
                   <div style={{"float":"left"}}>
                        Brand
				   </div>

				   <div style={{"float":"right"}}>
                        <InputGroup size="sm">
						<FormControl placeholder="Search" name="search" value={this.state.search}
						onChange={this.searchChange}/>
						<InputGroup.Append>
						  <Button size='sm' onClick={this.searchBrand}>
                              Search
						  </Button>
						  <Button size='sm' onClick={this.cancelSearch}>
                             Cancel
						  </Button>
						</InputGroup.Append>
						
						</InputGroup>
				   </div>

				</Card.Header>
					<Card.Body>
						<Table bordered hover striped responsive="xl">
						<thead>
					    <tr>
					      <th>Brand Category</th>
					      <th>Brand Name</th>
					      <th>Brand Company</th>
					      <th>Brand Description</th>
                          <th>Modify Brand</th>
					    </tr>
					  </thead>
					  <tbody>
					   
					  {this.state.brands.length === 0 ? 
							  <tr align="center">
					           <td colSpan="5"> 0 brand avaliable. </td>
					          </tr> :
					        currentItems.map((brand) => (
					        		<tr key={brand.id}>
                                      <td>{brand.brandCategory}</td>
					        		  <td>{brand.brandName}</td>
					        		  <td>{brand.brandCompany}</td>
					        		  <td>{brand.brandDescription}</td>
					        		  
									  <td>
									  <Button variant="danger" onClick={this.deleteBrand.bind(this,brand.id)}>Delete Brand</Button> 
									  <Link to={"editBrand/"+brand.id} className="btn btn-info">Edit Brand</Link>
									  
										  </td>
					        		  
					        		</tr>
					        		))
					  
					  }
					  
					  </tbody>
						</Table>
					
					</Card.Body>
					<CardFooter>
						<div style={{"float":"left"}}>
                             Showing Page {this.state.currentPage} of {totalPage}
						</div>
						<div style={{"float":"right"}}>
                             <InputGroup size="sm">
							   <InputGroup.Prepend>
							     <Button type="button" variant="outline-info" disabled={this.state.currentPage === 1 ? true:false}
								   onClick={this.firstPage}>
									 First
								 </Button>
								 <Button type="button" variant="outline-info" disabled={this.state.currentPage === 1 ? true:false}
								   onClick={this.prevPage}>
									 Prev
								 </Button>
							   </InputGroup.Prepend>

							   <FormControl style={pageCss} name="currentPage" value={this.state.currentPage}
							     onChange={this.changePage}/>

							   <InputGroup.Append>
							   <Button type="button" variant="outline-info" disabled={this.state.currentPage === totalPage ? true:false}
							     onClick={this.nextPage}>
									 Next
								 </Button>
								 <Button type="button" variant="outline-info" disabled={this.state.currentPage === totalPage ? true:false}
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

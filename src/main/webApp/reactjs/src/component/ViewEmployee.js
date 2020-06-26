import React, {Component} from 'react';
import {Card, Table, ButtonGroup, Button,InputGroup, FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { CardFooter } from 'reactstrap';
import axios from 'axios';

export default class ViewEmployee extends Component{
    constructor(props){
        super(props);
        this.state = {
            employees:[],
            page:1,
            size:5,
            totalPage:0
        };
    }

    componentDidMount(){
        this.findAllEmployee(this.state.page);
    }

    findAllEmployee(page){
       page-=1;;
       axios.get("http://localhost:8082/rest/employee"+"?page="+page+"&size="+this.state.size)
       .then(response=>response.data)
       .then((data)=>{
           this.setState({
            employees:data.content,
            totalPage:data.totalPages,
            page:data.number+1,
            totalElement:data.totalElements
           });
       });
    }

    deleteEmployee = (EmployeeId)=>{
        axios.delete("http://localhost:8082/rest/employee/"+EmployeeId)
        .then(response=>{
            if(response.data != null){
                alert("product delete Successfully");
                this.setState({
                    employees:this.state.employees.filter(employee => employee.id != EmployeeId)
                });
            }
        });

    }

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
				<Card.Header>Employee List </Card.Header>
					<Card.Body>
						<Table bordered hover striped responsive="xl">
						<thead>
					    <tr>
					      <th>Employee ID</th>
					      <th>Last Name</th>
					      <th>First Name</th>
					      <th>SIN</th>
					      <th>Phone Number</th>
					      <th>Email</th>
                          <th>Pay Grade</th>
                          <th>Status</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Modify Info</th>
					    </tr>
					  </thead>
					  <tbody>
					   
					  {this.state.employees.length === 0 ? 
							  <tr align="center">
					           <td colSpan="11"> 0 employee avaliable. </td>
					          </tr> :
					        this.state.employees.map((employee) => (
					        		<tr key={employee.id}>
                                      <td>{employee.id}</td>
					        		  <td>{employee.lname}</td>
					        		  <td>{employee.fname}</td>
					        		  <td>{employee.sinNum}</td>
					        		  <td>{employee.phoneNum}</td>
					        		  <td>{employee.email}</td>
                                      <td>{employee.payGrade}</td>
                                      <td>{employee.status}</td>
                                      <td>{employee.startDate}</td>
                                      <td>{employee.endDate}</td>
									  <td>
									  <Button variant="danger" onClick={this.deleteEmployee.bind(this,employee.id)}>Delete Info</Button> 
									  <Link to={"editEmployee/"+employee.id} className="btn btn-info">Edit Info</Link>
									  
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
import React,{Component} from 'react';
import {Card,Form, Button, Col} from 'react-bootstrap';
import { Icon } from 'semantic-ui-react'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class AddNewEmployee extends Component{
  constructor(props){
     super(props);
     this.state = this.initialState;
  }

  initialState = {
    id:'', lname:'', fname:'', sinNum:'', phoneNum:'', email:'', payGrade:'', status:'', startDate:new Date(), endDate: new Date() 
  };

  componentDidMount(){
      const employeeId = +this.props.match.params.id;
      if(employeeId){
        axios.get("http://localhost:8082/rest/employee/"+employeeId)
        .then(response =>{
            this.setState({
                id: response.data.id,
                lname: response.data.lname,
                fname: response.data.fname,
                sinNum: response.data.sinNum,
                phoneNum: response.data.phoneNum,
                email: response.data.email,
                payGrade: response.data.payGrade,
                status: response.data.status,
                startDate: response.data.startDate,
                endDate: response.data.endDate
            });
        }).catch((error)=>{
            console.error("Error: " + error);
        });
      }
  }

  submitEmployee = event =>{
    event.preventDefault();

    const employeeInfo = {
        fname: this.state.fname,
        lname: this.state.lname,
        sinNum: this.state.sinNum,
        phoneNum: this.state.phoneNum,
        email: this.state.email,
        payGrade: this.state.payGrade,
        status: this.state.status,
        startDate: this.state.startDate,
        endDate: this.state.endDate
    };


    axios.post("http://localhost:8082/rest/employee",employeeInfo)
    .then(response=>{
        if(response.data != null){
            this.setState(this.initialState);
            alert("Employee Info saved successfully!");
        }
    });
  }

  updateEmployee = event =>{
      event.preventDefault();
      const employeeInfo = {
        id: this.state.id,
        lname: this.state.lname,
        fname: this.state.fname,
        sinNum: this.state.sinNum,
        phoneNum: this.state.phoneNum,
        email: this.state.email,
        payGrade: this.state.payGrade,
        status: this.state.status,
        startDate: this.state.startDate,
        endDate: this.state.endDate
    };
    axios.put("http://localhost:8082/rest/employee",employeeInfo)
    .then(response=>{
        if(response.data != null){
            this.setState(this.initialState);
            setTimeout(()=> this.employeeList(),1000);
        }
    });
  }

  employeeList = ()=>{
      return this.props.history.push("/viewEmployee");
  }

  InfoChange = event =>{
    this.setState({
        [event.target.name]:event.target.value
    });
  };

  handleStartDateChange = sDate =>{
      this.setState({
          startDate:sDate
      });
  }

  handleEndDateChange = eDate =>{
    this.setState({
        endDate:eDate
    });
}

  resetInfo= () => {
    this.setState(this.initialState);
  }; 


  render(){
    return(
        <Card className="border border-light bg-light" style={{margin: "20px"}}>
            <Card.Header><Icon name='plus square' /> {this.state.id ? "Update" : "Save"} A New Employee Into Employee List</Card.Header>
            <Form onReset={this.resetInfo} onSubmit={this.state.id ? this.updateEmployee : this.submitEmployee} id="employeeFormId">
            <Card.Body>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridLName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required autoComplete="off"
                        type="text" 
                        name="lname" 
                        value={this.state.lname}
                        onChange={this.InfoChange}
                        className={"bg-light"} 
                        placeholder="Enter employee's last name" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridFName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required autoComplete="off" 
                    type="text" 
                    name="fname"
                    value={this.state.fname}
                    onChange={this.InfoChange}
                    className={"bg-light"} placeholder="Enter employee's first name" />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}  controlId="formGridSIN">
                    <Form.Label>SIN</Form.Label>
                    <Form.Control required autoComplete="off"
                    type="text" 
                    name="sinNum"
                    value={this.state.sinNum}
                    onChange={this.InfoChange}
                    className={"bg-light"} placeholder="Enter SIN" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridPrimePhoneNum">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control required autoComplete="off"
                    type="text" 
                    name="phoneNum"
                    value={this.state.phoneNum}
                    onChange={this.InfoChange}
                    className={"bg-light"} placeholder="Enter Phone Number" />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control autoComplete="off"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.InfoChange}
                    className={"bg-light"} placeholder="Enter email" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridPayGrade">
                    <Form.Label>Pay Grade</Form.Label>
                    <Form.Control required autoComplete="off"
                    type="text"
                    name="payGrade"
                    value={this.state.payGrade}
                    onChange={this.InfoChange}
                    className={"bg-light"} placeholder="Enter pay grade" />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control required autoComplete="off"
                    type="text"
                    name="status"
                    value={this.state.status}
                    onChange={this.InfoChange}
                    className={"bg-light"} placeholder="Enter Status: part-time, full-time..." />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridSDate">
                    <Form.Label>Start Date</Form.Label>
                    <DatePicker
                     selected={this.state.startDate}
                     onChange={this.handleStartDateChange}
                     />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridEDate">
                    <Form.Label>End Date</Form.Label>
                    <DatePicker
                     selected={this.state.endDate}
                     onChange={this.handleEndDateChange}
                     />
                  </Form.Group>
                </Form.Row>
            </Card.Body>
            <Card.Footer style={{"textAlign":"right"}}>
              <Button size="sm" variant="success" type="submit">
                <Icon name='save' /> {this.state.id ? "Update" : "Save"}
              </Button>{" "}
              {!this.state.id && 
              <Button size="sm" variant="info" type="reset">
              <Icon name='repeat' /> Reset
              </Button>} 
             
            </Card.Footer>
            </Form>
        </Card>
        
);
  }
}
import React,{Component} from 'react';
import {Card,Form, Button, Col} from 'react-bootstrap';
import { Icon } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {connect} from 'react-redux';
import {submitOrder} from '../services/order/OrderActions';

import axios from 'axios';

import * as moment from 'moment';


class OrderProduct extends Component{
    constructor(props){
        super(props);
        this.state = this.initialState;
    }
    initialState = {
        id:'', date:new Date(), c_date:new Date(), order_type:'purchase', order_status:'pending', empId:''
    };

    componentDidMount(){
       
    }

    submitOrder = event =>{
        event.preventDefault();
        // const order={
        //     id:this.state.id,
        //     date:moment(this.state.date).format("YYYY-MM-DD"),
        //     c_date:moment(this.state.c_date).format("YYYY-MM-DD"),
        //     order_type:this.state.order_type,
        //     order_status:this.state.order_status,
        //     empId:this.state.empId,
        //     addedProducts:[
        //         {id:1, amount: 5},
        //         {id:2, amount: 5}
        //     ]
        // };
        const order={
            id:this.state.id,
            date:this.state.date,
            c_date:this.state.c_date,
            order_type:this.state.order_type,
            order_status:this.state.order_status,
            empId:this.state.empId
        };



        // axios.post("http://localhost:8082/rest/orderInfo/saveOrderInfo",order)

        this.props.submitOrder(order);

        setTimeout(()=> this.goToSelectProduct(),1000);
    }

    goToSelectProduct=()=>{
		return this.props.history.push("/createOrder");
	};

    resetOrder = () =>{
        this.setState(this.initialState);
    }
    
    infoChange = event =>{
        event.preventDefault();
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleStartDateChange = sDate =>{
        this.setState({
            date:sDate
        });

    }
  
    handleEndDateChange = eDate =>{
      this.setState({
            c_date:eDate
      });
   }




    render(){
        return(
            <Card className="border border-light bg-light" style={{margin: "20px"}}>
                <Card.Header><Icon name='plus square' /> Create An Order</Card.Header>
                <Form onReset={this.resetOrder} onSubmit={this.submitOrder} id="orderFormId">
                <Card.Body>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Order Type</Form.Label>
                            <Form.Control as="select"
                            name="order_type" 
                            onChange={this.infoChange}>
                                <option value="purchase">purchase</option>
                                <option value="sale">sale</option>
                                <option value="outbound">outbound</option>
                            </Form.Control>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridColor">
                        <Form.Label>Order Status</Form.Label>
                        <Form.Control as="select"
                            name="order_status" 
                            onChange={this.infoChange}>
                                <option value="pending">pending</option>
                                <option value="complete">complete</option>
                            </Form.Control>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridSDate">
                        <Form.Label style={{marginRight: "20px"}}>Issue Date: </Form.Label>
                        <DatePicker
                        selected={this.state.date}
                        onChange={this.handleStartDateChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEDate">
                        <Form.Label style={{marginRight: "20px"}}>Complete Date: </Form.Label>
                        <DatePicker
                        selected={this.state.c_date}
                        onChange={this.handleEndDateChange}
                        />
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridSalePrice">
                        <Form.Label>Employee ID</Form.Label>
                        <Col sm="5">
                        <Form.Control required autoComplete="off"
                        type="text"
                        name="empId"
                        value={this.state.empId}
                        onChange={this.infoChange}
                        className={"bg-light"} placeholder="Enter your employee id" />
                        </Col>
                      </Form.Group>
                    </Form.Row>
                </Card.Body>
                <Card.Footer style={{"textAlign":"right"}}>
                  <Button size="sm" variant="success" type="submit">
                    <Icon name='save' /> Save
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

const mapStateToProps = state => {
    return {
        
    }
 }

 const mapDispatchToProps = dispatch => {
    return {
       submitOrder : (order) =>{
            dispatch(submitOrder(order))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderProduct);
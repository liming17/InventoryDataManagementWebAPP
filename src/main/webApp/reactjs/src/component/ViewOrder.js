import React, {Component} from 'react';
import {Card,Form,Col,Row,Table, Button,InputGroup, FormControl} from 'react-bootstrap';
import DatePicker from "react-datepicker";

import { CardFooter } from 'reactstrap';


import {connect} from 'react-redux';
import {changeProductAmount,subProductAmount,addProductAmount} from '../services/order/OrderActions';


class ViewOrder extends Component{
    constructor(props){
        super(props);
        this.state = this.initialOrderState;
    }

    initialOrderState = {
       date:new Date(), c_date:new Date(), order_type:'purchase', order_status:'pending', empId:''
    };
    
    componentDidMount(){
      this.setState({
        date:this.props.productData.order.date,
        c_date:this.props.productData.order.c_date,
        order_type:this.props.productData.order.order_type,
        order_status:this.props.productData.order.order_status,
        empId:this.props.productData.order.empId
      });
    }

    postOrder = ()=>{
        // need to post the order info first and then in redux post daste to DB then clear the info in the  reducer
    }

    changeProductAmount = (id,event) =>{
        let amount = event.target.value;
        if(amount >= 0){
            this.props.changeAmount(id,amount);
        }else{
            alert("The product amount can't be less than 0");
        }
    }

    substractAmount = (id)=>{
        this.props.substractAmount(id);
    }

    addAmount = (id)=>{
        this.props.addAmount(id);
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
        const pageCss={
            width:"45px",
            border:"1px solid #9FC2E8",
            textAlign:"center",
            fontWeight:"bold"
        }
    return(

        <Card className="border border-light bg-light" style={{margin: "20px"}}>
            <Card.Header>Review Order Info </Card.Header>
                <Card.Body>
                <Form>
                <Form.Row>
                      <Form.Group as={Col} controlId="formGridName" style={{marginLeft: "5px",fontWeight:"bold"}}>
                        <Form.Label>Order Type :</Form.Label>
                        <Form.Control as="select"
                            name="order_type" 
                            value={this.state.order_type}
                            onChange={this.infoChange}>
                                <option value="purchase">purchase</option>
                                <option value="sale">sale</option>
                                <option value="outbound">outbound</option>
                            </Form.Control>      
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridColor" style={{marginLeft: "5px",fontWeight:"bold"}}>
                        <Form.Label>Order Status :</Form.Label>
                        <Form.Control as="select"
                            name="order_status" 
                            value={this.state.order_status}
                            onChange={this.infoChange}>
                                <option value="pending">pending</option>
                                <option value="complete">complete</option>
                            </Form.Control>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridSDate">
                        <Form.Label style={{marginRight: "20px",fontWeight:"bold"}}>Issue Date: </Form.Label>
                        <DatePicker
                        selected={this.state.date}
                        onChange={this.handleStartDateChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEDate" >
                        <Form.Label style={{marginRight: "20px",fontWeight:"bold"}}>Complete Date: </Form.Label>
                        <DatePicker
                        selected={this.state.c_date}
                        onChange={this.handleEndDateChange}
                        />
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Row} controlId="formGridSalePrice" style={{marginLeft: "5px",fontWeight:"bold"}}>
                        <Form.Label>Employee ID :</Form.Label>
                            <Col sm={10}>
                               <Form.Control required autoComplete="off"
                        type="text"
                        name="empId"
                        value={this.state.empId}
                        onChange={this.infoChange}
                        className={"bg-light"}/> 
                            </Col>
                      </Form.Group>
                    </Form.Row>
                </Form>


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
                      <th>Order Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                   
                  {this.props.productData.addedProducts.length === 0 ? 
                          <tr align="center">
                           <td colSpan="11"> 0 product added. </td>
                          </tr> :
                        this.props.productData.addedProducts.map((product) => (
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
                                  <td>
                                  <InputGroup size="sm">
                           <InputGroup.Prepend>
                             <Button type="button" variant="outline-info" disabled={product.amount === 0 ? true:false}
                               onClick={()=>{this.substractAmount(product.id)}}>
                                 -
                             </Button>
                           </InputGroup.Prepend>

                           <FormControl style={pageCss} name="amount" value={product.amount}
                             onChange={(event) => {this.changeAmount(product.id,event)}}/>

                           <InputGroup.Append>
                           <Button type="button" variant="outline-info" onClick={()=>{this.addAmount(product.id)}}>
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
                    <div style={{"float":"right"}}>
                         <Button type="button" variant="outline-info" 
                               onClick={this.postOrder}>
                                 Confirm
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

       //TODO POST ORDER

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

export default connect(mapStateToProps,mapDispatchToProps)(ViewOrder);
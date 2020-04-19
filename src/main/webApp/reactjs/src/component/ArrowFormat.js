import React from 'react';
import {Card,Container,Row,Col} from 'react-bootstrap';
import { Chart } from "react-google-charts";

export default class ArrowFormat extends React.Component{
    render(){
        return(
    <Card bg='light'>
      <Card.Body>
      <Container>
        <Row>
          <Col>     
           <Chart
  chartType="Table"
  loader={<div>Loading Chart</div>}
  data={[
    ['Employee', 'Bounus Change'],
    ['Liu Xiao', { v: 12, f: '12.0%' }],
    ['Huan Qing', { v: -7.3, f: '-7.3%' }],
    ['Yuan Ding', { v: 0, f: '0%' }],
    ['Lei Lei', { v: -2.1, f: '-2.1%' }],
    ['Feng Hua', { v: 22, f: '22.0%' }],
  ]}
  formatters={[
    {
      type: 'ArrowFormat',
      column: 1,
    },
  ]}
  options={{
    allowHtml: true,
    showRowNumber: true,
  }}

/></Col>
          <Col>
          <Chart
  chartType="Table"
  loader={<div>Loading Chart</div>}
  data={[
    ['Category', 'Sales Amount Change'],
    ['Shoes-Woman', { v: 12, f: '12.0%' }],
    ['Shoes-Man', { v: -7.3, f: '-7.3%' }],
    ['Bag-Woman', { v: 10, f: '10%' }],
    ['Bag-Man', { v: -2.1, f: '-2.1%' }],
    ['Accessory', { v: 22, f: '22.0%' }],
  ]}
  formatters={[
    {
      type: 'ArrowFormat',
      column: 1,
    },
  ]}
  options={{
    allowHtml: true,
    showRowNumber: true,
  }}

/>
          </Col>
          <Col>
          <Chart
  chartType="Table"
  loader={<div>Loading Chart</div>}
  data={[
    ['Category', 'Profit Change'],
    ['Shoes-Woman', { v: 12, f: '12.0%' }],
    ['Shoes-Man', { v: -7.3, f: '-7.3%' }],
    ['Bag-Woman', { v: 0, f: '0%' }],
    ['Bag-Man', { v: -2.1, f: '-2.1%' }],
    ['Accessory', { v: 2, f: '2.0%' }],
  ]}
  formatters={[
    {
      type: 'ArrowFormat',
      column: 1,
    },
  ]}
  options={{
    allowHtml: true,
    showRowNumber: true,
  }}

/>
          </Col>
        </Row>
      </Container>
      
    </Card.Body>
    </Card>
    
    
        );}
    }
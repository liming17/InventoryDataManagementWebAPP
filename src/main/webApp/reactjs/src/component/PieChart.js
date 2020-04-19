import React from 'react';
import {Card} from 'react-bootstrap';
import { Chart } from "react-google-charts";

export default class PieChart extends React.Component{
    render(){
        return(
    <Card bg='light'>
      <Card.Body>
      <Chart
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Category', 'Profit'],
    ['Bag-woman', 11],
    ['Backpack', 2],
    ['Shoes-woman', 2],
    ['Shoes-man', 2],
    ['Bag-men', 7],
  ]}
  options={{
    title: 'Annual Profit',
    // Just add this option
    pieHole: 0.4,
  }}
/>
    </Card.Body>
    </Card>
    
    
        );}
    }
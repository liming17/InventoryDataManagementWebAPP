import React from 'react';
import {Card} from 'react-bootstrap';
import { Chart } from "react-google-charts";

export default class LineChart extends React.Component{
    render(){
        return(
    <Card bg='light' style={{marginBottom: "40px"}}>
      <Card.Body>
      <Chart
  chartType="LineChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['x', 'Bag', 'Shoes'],
    [0, 14, 10],
    [1, 10, 5],
    [2, 23, 15],
    [3, 17, 9],
    [4, 18, 10],
    [5, 9, 5],
    [6, 11, 3],
    [7, 27, 19],
  ]}
  options={{
    hAxis: {
      title: 'Month',
    },
    vAxis: {
      title: 'Profit',
    },
    series: {
      1: { curveType: 'function' },
    },
  }}
/>
    </Card.Body>
    </Card>
    
    
        );}
    }
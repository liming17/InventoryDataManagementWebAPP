import React from 'react';
import {Card} from 'react-bootstrap';
import { Chart } from "react-google-charts";

export default class BarChart extends React.Component{
render(){
    return(
<Card bg='light'>
  <Card.Body>
    <Chart
  chartType="Bar"
  loader={<div>Loading Chart</div>}
  data={[
    ['Year', 'Sales', 'Expenses', 'Profit'],
    ['2014', 1000, 400, 200],
    ['2015', 1170, 460, 250],
    ['2016', 660, 1120, 300],
    ['2017', 1030, 540, 350],
  ]}
  options={{
    // Material design options
    chart: {
      title: 'Company Performance',
      subtitle: 'Sales, Expenses, and Profit: 2014-2017',
    },
  }}
/>
</Card.Body>
</Card>


    );}
}
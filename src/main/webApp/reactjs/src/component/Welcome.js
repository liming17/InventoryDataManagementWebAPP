import React from 'react';
import BarChart from './BarChart.js';
import LineChart from './LineChart.js';
import ArrowFormat from './ArrowFormat.js';
import PieChart from './PieChart.js';

import {Container,Row,Col,Card} from 'react-bootstrap';

export default class Welcome extends React.Component{
	render(){
		return(		
			<Container>
				<Row>
					<Col style={{marginTop:"20px"}}>
						<Card  border="light">
						<Card.Title>Neo Life Boutique Sales Data Report</Card.Title>
						</Card>
					</Col>
				</Row>
				<Row>
					<Col style={{marginTop:"20px"}}><BarChart/></Col>
					<Col style={{marginTop:"20px"}}><PieChart/></Col>
				</Row>
				<Row>
					<Col style={{marginTop:"20px"}}><ArrowFormat/></Col>
				</Row>
				<Row>
					<Col style={{marginTop:"20px"}}><LineChart/></Col>
				</Row>
            </Container>
				
		);
	}
}

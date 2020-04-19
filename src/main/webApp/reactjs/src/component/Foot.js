import React from 'react';
import {Navbar,Container,Col} from 'react-bootstrap';
export default class Foot extends React.Component {
	render(){
		let fullYear = new Date().getFullYear();
		return(
				<Navbar fixed="bottom" bg="light">
			    <Container>
			        <Col lg={12} className="text-center text-muted">
			          <div>{fullYear}-{fullYear+1}, Designed by Aura</div>
			       </Col>
			    </Container>
				</Navbar>
				
		);
	}
	
}


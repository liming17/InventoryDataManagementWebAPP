package com.store.Neo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import com.store.Neo.entity.Employee;
import com.store.Neo.entity.OrderInfo;
import com.store.Neo.repository.EmployeeRepository;
import com.store.Neo.service.OrderInfoServiceImpl;

@RestController
@RequestMapping("/rest/orderInfo")
@CrossOrigin(origins="http://localhost:3000")
public class OrderInfoController implements Resource<OrderInfo>{
	
	@Autowired
	private OrderInfoServiceImpl orderInfoService;
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	 @GetMapping
		public ResponseEntity<Page<OrderInfo>> findAll(Pageable pageable) {
			return new ResponseEntity<>(orderInfoService.findAll(pageable),HttpStatus.OK);
		}

		@Override
		public ResponseEntity<OrderInfo> findById(Long id) {
			return new ResponseEntity<>(orderInfoService.findById(id),HttpStatus.OK);
		}

		@RequestMapping(value = "/{empId}/orderInfo", method = RequestMethod.POST)
		public ResponseEntity<OrderInfo> save(@PathVariable(value = "empId") Long empId, @RequestBody OrderInfo orderInfo) {
			Employee emp = employeeRepository.findById(empId).get();
			orderInfo.setEmployee(emp);
			return new ResponseEntity<>(orderInfoService.saveOrUpdate(orderInfo),HttpStatus.CREATED);
		}
		
		@RequestMapping(value = "/{empId}/orderInfo", method = RequestMethod.PUT)
		public ResponseEntity<OrderInfo> update(@PathVariable(value = "empId") Long empId, @RequestBody OrderInfo orderInfo) {
			Employee emp = employeeRepository.findById(empId).get();
			orderInfo.setEmployee(emp);
			return new ResponseEntity<>(orderInfoService.saveOrUpdate(orderInfo),HttpStatus.CREATED);
		}

		@Override
		public ResponseEntity<OrderInfo> update(OrderInfo t) {
			return new ResponseEntity<>(orderInfoService.saveOrUpdate(t),HttpStatus.OK);
		}

		@Override
		public ResponseEntity<String> deleteById(Long id) {
			return new ResponseEntity<>(orderInfoService.deleteById(id),HttpStatus.OK);
		}

		@Override
		public ResponseEntity<OrderInfo> save(OrderInfo t) {
			// TODO Auto-generated method stub
			return null;
		}

}

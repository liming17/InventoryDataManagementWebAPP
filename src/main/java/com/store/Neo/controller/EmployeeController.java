package com.store.Neo.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.Neo.entity.Employee;
import com.store.Neo.service.EmployeeServiceImpl;

@RestController
@RequestMapping("/rest/employee")
@CrossOrigin(origins="http://localhost:3000")
public class EmployeeController implements Resource<Employee>{
	
	@Autowired
	EmployeeServiceImpl employeeServiceImpl;
	
	@GetMapping
	public ResponseEntity<Page<Employee>> findAll(Pageable pageable) {
		return new ResponseEntity<>(employeeServiceImpl.findAll(pageable),HttpStatus.OK);
	}
	
	@Override
	public ResponseEntity<Employee> findById(Long id) {
		// TODO Auto-generated method stub
		return new ResponseEntity<>(employeeServiceImpl.findById(id),HttpStatus.OK);
	}
	
	@Override
	public ResponseEntity<Employee> save(Employee t) {
		// TODO Auto-generated method stub
		return new ResponseEntity<>(employeeServiceImpl.saveOrUpdate(t),HttpStatus.CREATED);
	}
	
	@Override
	public ResponseEntity<Employee> update(Employee t) {
		// TODO Auto-generated method stub
		return new ResponseEntity<>(employeeServiceImpl.saveOrUpdate(t),HttpStatus.CREATED);
	}
	
	@Override
	public ResponseEntity<String> deleteById(Long id) {
		// TODO Auto-generated method stub
		return new ResponseEntity<>(employeeServiceImpl.deleteById(id),HttpStatus.OK);
	}
}

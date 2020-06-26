package com.store.Neo.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import com.store.Neo.entity.Employee;
import com.store.Neo.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements IService<Employee>{
	@Autowired
	EmployeeRepository employeeRepository;


	public Page<Employee> findAll(Pageable pageable) {
		// TODO Auto-generated method stub		
		return employeeRepository.findAll(pageable);
	}

	@Override
	public Employee findById(Long id) {
		// TODO Auto-generated method stub
		return employeeRepository.findById(id).get();
	}

	@Override
	public Employee saveOrUpdate(Employee t) {
		// TODO Auto-generated method stub
		return employeeRepository.save(t);
	}

	@Override
	public String deleteById(Long id) {
		// TODO Auto-generated method stub
		employeeRepository.deleteById(id);
		return "success";
	}
}

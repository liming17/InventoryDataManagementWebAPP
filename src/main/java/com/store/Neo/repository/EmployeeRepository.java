package com.store.Neo.repository;


import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.store.Neo.entity.Employee;


@Repository
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long>{

}

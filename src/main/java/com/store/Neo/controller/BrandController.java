package com.store.Neo.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.store.Neo.entity.Brand;
import com.store.Neo.service.BrandServiceImpl;

@RestController
@RequestMapping("/brands")
@CrossOrigin(origins="http://localhost:3000")
public class BrandController implements Resource<Brand> {
	
	@Autowired
	BrandServiceImpl brandServiceImpl;
	
	

	@GetMapping
	public ResponseEntity<Collection<Brand>> findAll() {
		// TODO Auto-generated method stub
		return new ResponseEntity<>(brandServiceImpl.findAll(),HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Brand> findById(Long id) {
		// TODO Auto-generated method stub
		return new ResponseEntity<>(brandServiceImpl.findById(id),HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Brand> save(Brand t) {
		// TODO Auto-generated method stub
		return new ResponseEntity<>(brandServiceImpl.saveOrUpdate(t),HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<Brand> update(Brand t) {
		// TODO Auto-generated method stub
		return new ResponseEntity<>(brandServiceImpl.saveOrUpdate(t),HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<String> deleteById(Long id) {
		// TODO Auto-generated method stub
		return new ResponseEntity<>(brandServiceImpl.deleteById(id),HttpStatus.OK);
	}
	
	@RequestMapping(value = "/searchBrandCatagory/{searchText}", method = RequestMethod.GET)
	public ResponseEntity<Collection<Brand>> findBrandByCatagory(@PathVariable(value = "searchText") String searchText){
		return new ResponseEntity<>(brandServiceImpl.findBrandByCatagory(searchText),HttpStatus.OK);
	}

}

package com.store.Neo.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.Neo.controller.Resource;
import com.store.Neo.entity.Product;
import com.store.Neo.repository.ProductRepository;
import com.store.Neo.service.IService;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins="http://localhost:3000")
public class ProductController implements Resource<Product> {
	
	@Autowired
	private IService<Product> productService;
	
	@Autowired
	private ProductRepository productRepository;
	
	@RequestMapping("/test/{id}")
	public Product test(@PathVariable(name="id") Long id) {
		Product product = productRepository.findById(id).get();
		productService.deleteById(id);
		System.out.println(product.getName());
		return product;
	}

	@Override
	public ResponseEntity<Collection<Product>> findAll() {
		return new ResponseEntity<>(productService.findAll(),HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Product> findById(Long id) {
		return new ResponseEntity<>(productService.findById(id),HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Product> save(Product t) {
		return new ResponseEntity<>(productService.saveOrUpdate(t),HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<Product> update(Product t) {
		return new ResponseEntity<>(productService.saveOrUpdate(t),HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteById(Long id) {
		return new ResponseEntity<>(productService.deleteById(id),HttpStatus.OK);
	}
  
}


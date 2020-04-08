package com.store.Neo.controller;

import java.awt.PageAttributes.MediaType;
import java.util.Collection;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.store.Neo.controller.Resource;
import com.store.Neo.entity.Brand;
import com.store.Neo.entity.Product;
import com.store.Neo.repository.BrandRepository;
import com.store.Neo.repository.ProductRepository;
import com.store.Neo.service.BrandServiceImpl;
import com.store.Neo.service.IService;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins="http://localhost:3000")
public class ProductController implements Resource<Product> {
	
	@Autowired
	private IService<Product> productService;
	
	@Autowired
	BrandRepository brandRepository;

	@Override
	public ResponseEntity<Collection<Product>> findAll() {
		return new ResponseEntity<>(productService.findAll(),HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Product> findById(Long id) {
		return new ResponseEntity<>(productService.findById(id),HttpStatus.OK);
	}

	@RequestMapping(value = "/{brandId}/product", method = RequestMethod.POST)
	public ResponseEntity<Product> save(@PathVariable(value = "brandId") Long brandId, @RequestBody Product product) {
		Brand brand = brandRepository.findById(brandId).get();
		product.setBrand(brand);
		return new ResponseEntity<>(productService.saveOrUpdate(product),HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/{brandId}/product", method = RequestMethod.PUT)
	public ResponseEntity<Product> update(@PathVariable(value = "brandId") Long brandId, @RequestBody Product product) {
		Brand brand = brandRepository.findById(brandId).get();
		product.setBrand(brand);
		return new ResponseEntity<>(productService.saveOrUpdate(product),HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<Product> update(Product t) {
		return new ResponseEntity<>(productService.saveOrUpdate(t),HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteById(Long id) {
		return new ResponseEntity<>(productService.deleteById(id),HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Product> save(Product t) {
		// TODO Auto-generated method stub
		return null;
	}
  
}


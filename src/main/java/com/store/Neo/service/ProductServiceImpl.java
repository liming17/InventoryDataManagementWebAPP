package com.store.Neo.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.Neo.entity.Product;
import com.store.Neo.repository.ProductRepository;
import com.store.Neo.service.IService;

@Service
public class ProductServiceImpl implements IService<Product> {
	
	@Autowired
	private ProductRepository productRepository;

	@Override
	public Collection<Product> findAll() {
		return productRepository.findAll();
	}

	@Override
	public Product findById(Long id) {
		return productRepository.findById(id).get();
	}

	@Override
	public Product saveOrUpdate(Product t) {
		return productRepository.saveAndFlush(t);
	}

	@Override
	public String deleteById(Long id) {
		productRepository.deleteById(id);
		return "Success";
	}

}

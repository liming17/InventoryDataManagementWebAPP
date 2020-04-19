package com.store.Neo.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.store.Neo.entity.Product;
import com.store.Neo.repository.ProductRepository;
import com.store.Neo.service.IService;

@Service
public class ProductServiceImpl implements IService<Product> {
	
	@Autowired
	private ProductRepository productRepository;


	public Page<Product> findAll(Pageable pageable) {
		return productRepository.findAll(pageable);
	}

	@Override
	public Product findById(Long id) {
		return productRepository.findById(id).get();
	}

	@Override
	public Product saveOrUpdate(Product t) {
		return productRepository.save(t);
	}

	@Override
	public String deleteById(Long id) {
		productRepository.deleteById(id);
		return "Success";
	}

}

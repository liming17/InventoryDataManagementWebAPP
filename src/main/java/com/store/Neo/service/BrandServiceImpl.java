package com.store.Neo.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.Neo.entity.Brand;
import com.store.Neo.repository.BrandRepository;

@Service
public class BrandServiceImpl implements IService<Brand> {
	@Autowired
	BrandRepository brandRepository;


	public Collection<Brand> findAll() {
		// TODO Auto-generated method stub		
		return brandRepository.findAll();
	}

	@Override
	public Brand findById(Long id) {
		// TODO Auto-generated method stub
		return brandRepository.findById(id).get();
	}

	@Override
	public Brand saveOrUpdate(Brand t) {
		// TODO Auto-generated method stub
		return brandRepository.saveAndFlush(t);
	}

	@Override
	public String deleteById(Long id) {
		// TODO Auto-generated method stub
		brandRepository.deleteById(id);
		return "success";
	}
	
	public Collection<Brand> findBrandByCatagory(String searchText){
		return brandRepository.findBrandByCatagory(searchText);
	}
		
	

}

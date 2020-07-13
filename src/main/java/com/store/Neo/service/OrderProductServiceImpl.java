package com.store.Neo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.store.Neo.entity.OrderProduct;
import com.store.Neo.entity.OrderProductKey;
import com.store.Neo.repository.OrderProductRepository;

@Service
public class OrderProductServiceImpl implements IService<OrderProduct>{
	
	@Autowired
	OrderProductRepository orderProductRepository;

	public Page<OrderProduct> findAll(Pageable pageable) {
		return orderProductRepository.findAll(pageable);
	}
	
	public OrderProduct findById(OrderProductKey id) {
		return orderProductRepository.findById(id).get();
	}
	
	public List<OrderProduct> findByOrderId(Long orderId) {
		return orderProductRepository.findAllById_OrderId(orderId);
	}

	@Override
	public OrderProduct saveOrUpdate(OrderProduct t) {
		return orderProductRepository.save(t);
	}
	
	public String deleteById(OrderProductKey id) {
		orderProductRepository.deleteById(id);
		return "success";
	}
	
	public String deleteByOrderId(Long orderId) {
		orderProductRepository.deleteById_OrderId(orderId);
		return "success";
	}

	@Override
	public String deleteById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public OrderProduct findById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

}

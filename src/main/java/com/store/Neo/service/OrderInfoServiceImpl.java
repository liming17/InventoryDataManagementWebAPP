package com.store.Neo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.store.Neo.entity.OrderInfo;
import com.store.Neo.repository.OrderInfoRepository;

@Service
public class OrderInfoServiceImpl implements IService<OrderInfo>{
	@Autowired
	private OrderInfoRepository orderInfoRepository;


	public Page<OrderInfo> findAll(Pageable pageable) {
		return orderInfoRepository.findAll(pageable);
	}

	@Override
	public OrderInfo findById(Long id) {
		return orderInfoRepository.findById(id).get();
	}

	@Override
	public OrderInfo saveOrUpdate(OrderInfo t) {
		return orderInfoRepository.save(t);
	}

	@Override
	public String deleteById(Long id) {
		orderInfoRepository.deleteById(id);
		return "Success";
	}
}

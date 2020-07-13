package com.store.Neo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.store.Neo.entity.OrderProduct;
import com.store.Neo.entity.OrderProductKey;
import com.store.Neo.entity.Product;
import com.store.Neo.service.OrderProductServiceImpl;

@RestController
@RequestMapping("/rest/orderProduct")
@CrossOrigin(origins="http://localhost:3000")
public class OrderProductController{
	@Autowired
	OrderProductServiceImpl orderProductService;
	
	@GetMapping
	public ResponseEntity<Page<OrderProduct>> findAll(Pageable pageable) {
		return new ResponseEntity<>(orderProductService.findAll(pageable),HttpStatus.OK);
	}

	@GetMapping("{id}")
	public ResponseEntity<List<OrderProduct>> findByOrderId(@PathVariable Long id) {
		return new ResponseEntity<>(orderProductService.findByOrderId(id),HttpStatus.OK);
	}

	@RequestMapping(value = "/save/{orderId}/{productId}", method = RequestMethod.POST)
	public ResponseEntity<OrderProduct> save(@PathVariable(value = "orderId") Long orderId,
			@PathVariable(value = "productId") Long productId,
			@RequestBody OrderProduct t) {
		OrderProductKey key = new OrderProductKey(orderId, productId);
		t.setId(key);
		return new ResponseEntity<>(orderProductService.saveOrUpdate(t),HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/batchsave/{orderId}", method = RequestMethod.POST)
	public ResponseEntity<OrderProduct> batchSave(@PathVariable(value = "orderId") Long orderId,
			@RequestBody List<OrderProduct> t) {
		for(OrderProduct p : t) {
			OrderProductKey key = new OrderProductKey(orderId, p.getProductId());
			p.setId(key);
			orderProductService.saveOrUpdate(p);
		}
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@RequestMapping(value = "/update/{orderId}/{productId}", method = RequestMethod.PUT)
	public ResponseEntity<OrderProduct> update(@PathVariable(value = "orderId") Long orderId,
			@PathVariable(value = "productId") Long productId,
			@RequestBody OrderProduct t) {
		OrderProductKey key = new OrderProductKey(orderId, productId);
		t.setId(key);
		return new ResponseEntity<>(orderProductService.saveOrUpdate(t),HttpStatus.CREATED);
	}

	@DeleteMapping("/deletethisorder/{id}")
	public ResponseEntity<String> deleteByOrderId(@PathVariable Long id) {
		return new ResponseEntity<>(orderProductService.deleteByOrderId(id),HttpStatus.OK);
	}
	
	@DeleteMapping("/deletethisproduct/{orderId}/{productId}")
	public ResponseEntity<String> deleteById(@PathVariable(value = "orderId") Long orderId,
			@PathVariable(value = "orderId") Long productId) {
		OrderProductKey key = new OrderProductKey(orderId, productId);
		return new ResponseEntity<>(orderProductService.deleteById(key),HttpStatus.OK);
	}
	
	
}

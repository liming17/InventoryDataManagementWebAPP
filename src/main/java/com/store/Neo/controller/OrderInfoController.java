package com.store.Neo.controller;

import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import com.store.Neo.entity.Employee;
import com.store.Neo.entity.OrderInfo;
import com.store.Neo.entity.OrderProduct;
import com.store.Neo.entity.OrderProductKey;
import com.store.Neo.entity.Product;
import com.store.Neo.repository.EmployeeRepository;
import com.store.Neo.repository.OrderProductRepository;
import com.store.Neo.repository.ProductRepository;
import com.store.Neo.service.OrderInfoServiceImpl;

@RestController
@RequestMapping("/rest/orderInfo")
@CrossOrigin(origins="http://localhost:3000")
public class OrderInfoController implements Resource<OrderInfo>{
	
	@Autowired
	private OrderInfoServiceImpl orderInfoService;
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	OrderProductRepository orderProductRepository;
	
	 @GetMapping
		public ResponseEntity<Page<OrderInfo>> findAll(Pageable pageable) {
			return new ResponseEntity<>(orderInfoService.findAll(pageable),HttpStatus.OK);
		}

		@Override
		public ResponseEntity<OrderInfo> findById(Long id) {
			return new ResponseEntity<>(orderInfoService.findById(id),HttpStatus.OK);
		}

		@RequestMapping(value = "/{empId}/orderInfo", method = RequestMethod.POST)
		public ResponseEntity<OrderInfo> save(@PathVariable(value = "empId") Long empId, @RequestBody OrderInfo orderInfo) {
			Employee emp = employeeRepository.findById(empId).get();
			orderInfo.setEmployee(emp);
			return new ResponseEntity<>(orderInfoService.saveOrUpdate(orderInfo),HttpStatus.CREATED);
		}
		
		@RequestMapping(value = "/saveOrderInfo", method = RequestMethod.POST)
		public ResponseEntity<String> saveWithProducts(@RequestBody Map<String, Object> payload) {
			
			// first grab data from post
			OrderInfo orderInfo = new OrderInfo();
			Long empId = Long.valueOf(payload.get("empId").toString());			
			Employee emp = employeeRepository.findById(empId).get();
			orderInfo.setEmployee(emp);
			
			orderInfo.setOrder_status(payload.get("order_status").toString());
			orderInfo.setOrder_type(payload.get("order_type").toString());
			
//			Date date = Date.valueOf(payload.get("date").toString());
//			Date c_date = Date.valueOf(payload.get("c_date").toString());
			
			Date date = Date.valueOf("2020-09-02");
			Date c_date = Date.valueOf("2020-09-05");
			
 

			orderInfo.setDate(date);
			orderInfo.setC_date(c_date);
			
//			System.out.println("The date value before save: "+orderInfo.getDate());  
//			System.out.println("The C-date value before save: "+orderInfo.getC_date());
			
			orderInfoService.saveOrUpdate(orderInfo);
			
			Long orderId = orderInfo.getId();
			OrderInfo savedOrderInfo = orderInfoService.findById(orderId);
			
//			System.out.println("The date value after save: "+savedOrderInfo.getDate());  
//			System.out.println("The C-date value after save: "+savedOrderInfo.getC_date());
			
			List<Map<String, Object>> addedProducts = (List<Map<String, Object>>) payload.get("addedProducts");
			for (Map<String, Object> item : addedProducts) {
		        OrderProduct p = new OrderProduct();
		        Long productId = Long.valueOf(item.get("id").toString());
		        
		        Product product = productRepository.findById(productId).get();
		        p.setProduct(product);
		        p.setOrderInfo(savedOrderInfo);
		        OrderProductKey key = new OrderProductKey(orderId,productId);
		        p.setId(key);
		        
		        int amount = Integer.valueOf(item.get("amount").toString());		        
		        p.setAmount(amount);
//		        orderInfo.addOrderProduct(p);
		        
//		        p.setOrderInfo(orderInfo);
//		        orderInfo.getOrderProducts().add(p);
		        orderProductRepository.save(p);
		        
		    }
			
			return new ResponseEntity<>("save a new order",HttpStatus.OK);
		}
		
		@RequestMapping(value = "/{empId}/orderInfo", method = RequestMethod.PUT)
		public ResponseEntity<OrderInfo> update(@PathVariable(value = "empId") Long empId, @RequestBody OrderInfo orderInfo) {
			Employee emp = employeeRepository.findById(empId).get();
			orderInfo.setEmployee(emp);
			return new ResponseEntity<>(orderInfoService.saveOrUpdate(orderInfo),HttpStatus.CREATED);
		}

		@Override
		public ResponseEntity<OrderInfo> update(OrderInfo t) {
			return new ResponseEntity<>(orderInfoService.saveOrUpdate(t),HttpStatus.OK);
		}

		@Override
		public ResponseEntity<String> deleteById(Long id) {
			return new ResponseEntity<>(orderInfoService.deleteById(id),HttpStatus.OK);
		}

		@Override
		public ResponseEntity<OrderInfo> save(OrderInfo t) {
			// TODO Auto-generated method stub
			return null;
		}

}

package com.store.Neo.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.store.Neo.entity.OrderProduct;
import com.store.Neo.entity.OrderProductKey;


@Repository
public interface OrderProductRepository  extends PagingAndSortingRepository<OrderProduct, OrderProductKey> {
   List<OrderProduct> findAllById_OrderId(Long orderId);// in OrderProduct, the embeddedId name is id
   void deleteById_OrderId(Long orderId);
}

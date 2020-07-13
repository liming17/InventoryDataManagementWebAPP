package com.store.Neo.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.store.Neo.entity.OrderInfo;

@Repository
public interface OrderInfoRepository extends PagingAndSortingRepository<OrderInfo, Long>{

}

package com.store.Neo.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.store.Neo.entity.Product;
@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {
  Product findByBrandId(Long id); // in order to get product with brand id
}

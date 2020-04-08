package com.store.Neo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.store.Neo.entity.Product;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
  Product findByBrandId(Long id); // in order to get product with brand id
}

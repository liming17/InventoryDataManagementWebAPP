package com.store.Neo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.store.Neo.entity.Brand;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {

}

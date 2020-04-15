package com.store.Neo.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.store.Neo.entity.Brand;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
   @Query(value="SELECT * FROM BRAND B "
   		+ "WHERE B.BRAND_CATEGORY LIKE CONCAT('%',:searchText,'%') "
   		+ "OR B.BRAND_NAME LIKE CONCAT('%',:searchText,'%') "
   		+ "OR B.BRAND_COMPANY LIKE CONCAT('%',:searchText,'%') OR "
   		+ "B.BRAND_DESCRIPTION LIKE CONCAT('%',:searchText,'%')",nativeQuery = true)
   Collection<Brand> findBrandByCatagory(@Param("searchText") String searchText);
}

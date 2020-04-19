package com.store.Neo.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="PRODUCT_LIST")
@Data
public class Product implements Serializable{
	
	public Product(String name,String color, String barcode,int prime_cost,int sale_price,Brand brand,String size,String category,String style,int total_amount ) {
		this.name = name;
		this.color = color;
		this.barcode = barcode;
		this.prime_cost = prime_cost;
		this.sale_price = sale_price;
		this.brand = brand;
		this.size = size;
		this.category = category;
		this.style = style;
		this.total_amount = total_amount;
	}
	
	public Product() {
		
	}
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="PRODUCT_ID") 
	private Long id;
	
	@Column(name="PRODUCT_NAME")
	@NotNull
	private String name;
	
	@Column(name="COLOUR")
	@NotNull
	private String color;
	
	@Column(name="BARCODE") 
	private String barcode;
	
	@Column(name="PRIME_COST")
	@NotNull
	private double prime_cost;
	
	@Column(name="SALE_PRICE")
	@NotNull
	private double sale_price;
	

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="BRAND_ID")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Brand brand;
	
	@Column(name="PRODUCT_SIZE")
	@NotNull
	private String size;
	
	@Column(name="PRODUCT_CATEGORY")
	@NotNull
	private String category;
	
	@Column(name="PRODUCT_STYLE")
	@NotNull
	private String style;
	
	@Column(name="TOTAL_AMOUNT")
	@NotNull
	private int total_amount;
	
    //getter method to retrieve the brandId
    public Long getBrand_id(){
        return brand.getId();
    }
	
    @JsonIgnore
    public Brand getBrand() {
        return this.brand;
    }

    @JsonIgnore
    public void setBrand(Brand brand) {
        this.brand = brand;
    }
	

}

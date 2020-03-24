package com.store.Neo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="PRODUCT")
@Data
public class Product {
	
	public Product(String name,String color, String barcode,int prime_cost,int sale_price,int brand_id,String size,String category,String style,int total_amount ) {
		this.name = name;
		this.color = color;
		this.barcode = barcode;
		this.prime_cost = prime_cost;
		this.sale_price = sale_price;
		this.brand_id = brand_id;
		this.size = size;
		this.category = category;
		this.style = style;
		this.total_amount = total_amount;
	}
	
	public Product() {
		
	}
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id") 
	private Long id;
	
	@Column(name="name")
	@NotNull
	private String name;
	
	@Column(name="color")
	@NotNull
	private String color;
	
	@Column(name="barcode")
	@NotNull 
	private String barcode;
	
	@Column(name="prime_cost")
	@NotNull
	private double prime_cost;
	
	@Column(name="sale_price")
	@NotNull
	private double sale_price;
	
	@Column(name="brand_id")
	@NotNull
	private int brand_id;
	
	@Column(name="size")
	@NotNull
	private String size;
	
	@Column(name="category")
	@NotNull
	private String category;
	
	@Column(name="style")
	@NotNull
	private String style;
	
	@Column(name="total_amount")
	@NotNull
	private int total_amount;
	

}

package com.store.Neo.entity;

import java.sql.Date;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name="ORDER_PRODUCT")
@Data
public class OrderProduct {
	
	@EmbeddedId
	private OrderProductKey id;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@MapsId("orderId")
	@JoinColumn(name="ORDER_ID")
	private OrderInfo orderInfo;
	
	
	@ManyToOne(fetch=FetchType.EAGER)
	@MapsId("productId")
	@JoinColumn(name="PRODUCT_ID")
	private Product product;
	
	@Column(name="AMOUNT")
	@NotNull
	private int amount;
	
	public OrderProduct() {}
	
	public OrderProduct(OrderProductKey id, int amount) {
		this.id = id;
		this.amount = amount;
	}
	
	@JsonIgnore
	public Product getProduct() {
		return this.product;
	}
	
	
	public String getProductName() {
		return this.product.getName();
	}
	
	public Long getProductId() {
		return this.product.getId();
	}
	
	

}

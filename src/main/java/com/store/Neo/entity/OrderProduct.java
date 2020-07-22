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
	
	@ManyToOne(fetch=FetchType.LAZY)
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
	
	@JsonIgnore
	public OrderInfo getOrderInfo() {
		return this.orderInfo;
	}
	
	
	public String getProductName() {
		return this.product.getName();
	}
	
	public Long getProductId() {
		return this.product.getId();
	}
	// Since we cannot rely on a natural identifier for equality checks, we need to use the entity identifier instead for the equals method. 
	@Override
	public boolean equals(Object o) {
		if(this == o) return true;
		if(!(o instanceof OrderProduct)) return false;
		OrderProduct that = (OrderProduct) o;
		return id!=null && id.equals(that.getId());
	}
	
	@Override
	public int hashCode() {
		return 31;
	}
	
	
	

}

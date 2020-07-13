package com.store.Neo.entity;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Embeddable
@Data
public class OrderProductKey implements Serializable {
	
	@Column(name="ORDER_ID")
	private Long orderId;
	
	@Column(name="PRODUCT_ID") 
	private Long productId;
	
	public OrderProductKey() {}
	
	public OrderProductKey(Long order_id, Long product_id) {
		this.orderId = order_id;
		this.productId = product_id;
	}
	
	@Override
	public boolean equals(Object o) {
		if(this == o) return true;
		if(!(o instanceof OrderProductKey)) return false;
		OrderProductKey that = (OrderProductKey) o;
		return Objects.equals(getOrderId(), that.getOrderId())&&Objects.equals(getProductId(), that.getProductId());
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(getOrderId(),getProductId());
	}
	

}

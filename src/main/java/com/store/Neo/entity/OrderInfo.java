package com.store.Neo.entity;

import java.io.Serializable;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name="ORDER_INFO")
@Data
public class OrderInfo implements Serializable{
	public OrderInfo() {}
	public OrderInfo(Date date, Date c_date, Employee employee, 
			String order_type, String order_status,
			OrderProduct ...orderProducts) {
		this.date = date;
		this.c_date = c_date;
		this.employee = employee;
		this.order_type = order_type;
		this.order_status = order_status;
		for(OrderProduct orderProduct:orderProducts) orderProduct.setOrderInfo(this);
		this.orderProducts = Stream.of(orderProducts).collect(Collectors.toSet());
	}
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ORDER_ID") 
	private Long id;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="EMP_ID")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Employee employee;
	
	@OneToMany(mappedBy = "orderInfo", cascade = CascadeType.ALL)
    private Set<OrderProduct> orderProducts = new HashSet<OrderProduct>();
	
	@Column(name="ORDER_ISSUE_DATE")
	@NotNull
	private Date date;
	
	@Column(name="ORDER_COMPLETE_DATE")
	private Date c_date;
	
	@Column(name="ORDER_TYPE")
	@NotNull
	private String order_type;
	
	@Column(name="ORDER_STATUS")
	@NotNull
	private String order_status="pending";
	
	
	public String getEmpFName() {
		return this.employee.getFName();
	}
	
	public String getEmpLName() {
		return this.employee.getLName();
	}
	
	public Long getEmpId() {
		return this.employee.getId();
	}
	
	
	@JsonIgnore
	public Employee getEmployee() {
		return this.employee;
	}
	
	@JsonIgnore
	public Set<OrderProduct> getOrderProducts() {
		return this.orderProducts;
	}
	// synchronize both sides of the bidirectional association
	public void addOrderProduct(OrderProduct order) {
		this.orderProducts.add(order);
		order.setOrderInfo(this);
	}
	
	public void removeOrderProduct(OrderProduct order) {
		this.orderProducts.remove(order);
		order.setOrderInfo(null);
	}

	

}

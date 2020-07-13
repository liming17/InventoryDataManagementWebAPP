package com.store.Neo.entity;

import java.io.Serializable;
import java.sql.Date;

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

@Entity
@Table(name="ORDER_INFO")
@Data
public class OrderInfo implements Serializable{
	public OrderInfo() {}
	public OrderInfo(Date date, Employee employee, String order_type) {
		this.date = date;
		this.employee = employee;
		this.order_type = order_type;
	}
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ORDER_ID") 
	private Long id;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="EMP_ID")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Employee employee;
	
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
	public void setEmployee(Employee e) {
		this.employee = e;
	}
	

}

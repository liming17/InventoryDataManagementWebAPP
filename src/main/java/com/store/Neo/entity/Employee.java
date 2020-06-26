package com.store.Neo.entity;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Entity
@Table(name="EMPLOYEE")
@Data
public class Employee implements Serializable{
	public Employee() {};
	public Employee(String fName, String lName, String sinNum, 
			String phoneNum, String email, String payGrade, String status, Date startDate, Date endDate) {
		this.fName = fName;
		this.lName = lName;
		this.sinNum = sinNum;
		this.phoneNum = phoneNum;
		this.email = email;
		this.payGrade = payGrade;
		this.startDate = startDate;
		this.endDate = endDate;
		this.status = status;
	};
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="EMP_ID")
	private Long id;
	
	@Column(name="EMP_FNAME")
	@NotNull
	private String fName;
	
	@Column(name="EMP_LNAME")
	@NotNull
	private String lName;
	
	@Column(name="EMP_SIN")
	@NotNull
	private String sinNum;
	
	@Column(name="EMP_PHONE")
	@NotNull
	private String phoneNum;
	
	@Column(name="EMP_EMAIL")
	private String email;
	
	@Column(name="EMP_PAYGRADE")
	@NotNull
	private String payGrade;
	
	@Column(name="EMP_STATUS")
	@NotNull
	private String status;
	
	@Column(name="EMP_STARTDATE")
	private Date startDate;
	
	@Column(name="EMP_ENDDATE")
	private Date endDate;

}

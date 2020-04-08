package com.store.Neo.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="BRAND")
@Data
public class Brand  implements Serializable{
	public Brand() {};
	public Brand(Long id,String brandCategory,String brandName,String brandDescription) {
		this.id=id;
		this.brandCategory=brandCategory;
		this.brandName=brandName;
		this.brandDescription=brandDescription;
	};
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="BRAND_ID") 
	private Long id;
	
	@Column(name="BRAND_CATEGORY")
	private String brandCategory;
	
	@Column(name="BRAND_NAME")
	@NotNull
	private String brandName;
	
	@Column(name="BRAND_COMPANY")
	private String brandCompany;
	
	@Column(name="BRAND_DESCRIPTION")
	private String brandDescription;
	
	  @OneToMany(mappedBy = "brand", fetch = FetchType.LAZY)
	    private Set<Product> product = new HashSet<Product>();
	  
	  @JsonIgnore
	    public Set<Product> getProduct() {
	        return this.product;
	    }

	    @JsonIgnore
	    public void setProduct(Set<Product> product) {

	    }
	
	

}

package com.store.Neo.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.sun.istack.NotNull;

import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@NotNull
    @Size(max = 15)
    private String username;
	
	@NotNull
	@Size(max = 100)
	private String password;
	
	@ManyToMany
	@JoinTable(name="user_roles",joinColumns= @JoinColumn(name = "user_id"),
	inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();
	
	public User() {}
    
	public User(String username, String pswd) {
		this.username = username;
		this.password = pswd;
	}

}

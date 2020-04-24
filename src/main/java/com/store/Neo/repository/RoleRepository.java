package com.store.Neo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.Neo.entity.Role;
import com.store.Neo.entity.RoleName;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(RoleName roleName);
}

package com.sist.web.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sist.web.entity.*;

@Repository
public interface CookieSuitDAO extends JpaRepository<SuitEntity, Integer> {
	Optional<SuitEntity> findByNo(int no);
}
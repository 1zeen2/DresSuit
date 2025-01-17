package com.sist.web.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sist.web.entity.DressEntity;

@Repository
public interface CookieDressDAO extends JpaRepository<DressEntity, Integer> {
	Optional<DressEntity> findByNo(int no);
}

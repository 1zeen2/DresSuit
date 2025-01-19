package com.sist.web.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sist.web.entity.DsBoardEntity;

@Repository
public interface DsBoardDAO extends JpaRepository<DsBoardEntity, Integer> {
	@Query(value = "SELECT * FROM DSBoard "
			+ "ORDER BY no DESC "
			+ "LIMIT :start, 10", nativeQuery = true)
	public List<DsBoardEntity> boardListData(@Param("start") int start);

	public DsBoardEntity findByNo(int no);
}

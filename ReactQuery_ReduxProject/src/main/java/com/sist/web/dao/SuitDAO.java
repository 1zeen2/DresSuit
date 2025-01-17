package com.sist.web.dao;

import java.util.*;
import com.sist.web.entity.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SuitDAO extends JpaRepository<SuitEntity, Integer> {
		@Query(value = "SELECT no, image, subject, price, wish, content, subcontent "
				+ "FROM suit ORDER BY wish DESC "
				+ "LIMIT 0, 4", nativeQuery = true)
		public List<SuitVO> suitTop4();
		
		// 수트 리스트 출력
		@Query(value = "SELECT no, image, subject, price, wish, subcontent "
				+ "FROM suit ORDER BY no ASC "
				+ "LIMIT :start, 12", nativeQuery = true)
		public List<SuitVO> suitListData(@Param("start") int start);
		
		// 수트 no값 찾기
		public SuitEntity findByNo(int no);
		
		// 수트 검색 기능
		@Query(value = "SELECT no, image, subject, price, wish, content, subcontent "
				+ "FROM suit WHERE subject LIKE CONCAT('%', :subject, '%') ORDER BY no ASC "
				+ "LIMIT :start, 12", nativeQuery = true)
		public List<SuitVO> suitFindData(@Param("start") int start, @Param("subject") String subject);
		
		// 수트 검색 총 페이지 기능
		@Query(value = "SELECT CEIL(count(*)/12.0) "
				+ "FROM suit "
				+ "WHERE subject LIKE CONCAT('%', :subject, '%')")
		public int suitFindTotalPage(@Param("subject") String subject);
}

package com.sist.web.dao;

import java.util.*;
import com.sist.web.entity.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DressDAO extends JpaRepository<DressEntity, Integer> {
	// 나중에 드레스 + 슈트 해서 탑9만 DESC로 변경해야 함.
	@Query(value = "SELECT no, image, subject, price, wish, content, subcontent "
			+ "FROM dress ORDER BY wish DESC "
			+ "LIMIT 0, 5", nativeQuery = true)
	public List<DressVO> dressTop5();
	
	// 드레스 리스트 출력
	@Query(value = "SELECT no, image, subject, price, wish, subcontent "
			+ "FROM dress ORDER BY no ASC "
			+ "LIMIT :start, 12", nativeQuery = true)
	public List<DressVO> dressListData(@Param("start") int start);
	
	// 드레스 no값 찾기
	public DressEntity findByNo(int no);
	
	// 드레스 검색 기능
	@Query(value = "SELECT no, image, subject, price, wish, content, subcontent "
			+ "FROM dress WHERE subject LIKE CONCAT('%', :subject, '%') ORDER BY no ASC "
			+ "LIMIT :start, 12", nativeQuery = true)
	public List<DressVO> dressFindData(@Param("start") int start, @Param("subject") String subject);
	
	// 드레스 검색 총 페이지 기능
	@Query(value = "SELECT CEIL(count(*)/12.0) "
			+ "FROM dress "
			+ "WHERE subject LIKE CONCAT('%', :subject, '%')")
	public int dressFindTotalPage(@Param("subject") String subject);
}

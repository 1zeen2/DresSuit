package com.sist.web.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sist.web.entity.DsMemberEntity;

@Repository
public interface DsMemberDAO extends JpaRepository<DsMemberEntity, Long> {

	@Query(value = "SELECT COUNT(*) FROM ds_member "
			+ "WHERE `user_id` = :userId", nativeQuery = true)
	public long countByUserId(@Param("userId") String userId);

	default boolean existsByUserId(String userId) {
        return countByUserId(userId) > 0;
    }

	public DsMemberEntity findByUserId(String userId);

/*
	no bigint AI PK
	userId varchar(255)
	userName varchar(255)
	userPwd varchar(255)
	gender enum('male','female','other')
	addr1 varchar(255)
	addr2 varchar(255)
	phone varchar(255)
	email varchar(255)
	created_at timestamp
	updated_at timestamp
	status enum('active','inactive','suspended')
	last timestamp
	profile_image varchar(255)
	role enum('user','admin')
	date date
	verification enum('Y','N')
	post varchar(255)
*/
/*
	 Hibernate가 변수 못찾으면 아래 주석을 풀어 nativeQuery로 직접 매칭 사용
	@Modifying
	@Query(value = "INSERT INTO ds_member(userId, userName, userPwd, gender, addr1, addr2, phone, email, "
			+ "status, profile_image, role, birth, verification, post) "
			+ "VALUES (:member.userId, :member.userName, :member.userPwd, :member.gender, :member.addr1, :member.addr2, :member.phone, :member.email, "
			+ "'ACTIVE', :profile_image, 'USER', :member.birth, 'N', :member.post)", nativeQuery = true)
*/
	@Override
	public DsMemberEntity save(DsMemberEntity member);
}
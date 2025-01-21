package com.sist.web.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
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
	birth date
	verification enum('Y','N')
	post varchar(255)
*/

@Entity
@Table(name = "ds_member")
@Data
public class DsMemberEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;

	@Column(name = "user_id", unique = true)
	private String userId;

	@Column(name = "user_name")
	private String userName;
	
	@Column(name = "user_pwd")
	private String userPwd;
	
	private String post, addr1, addr2, email, phone;

	private LocalDate birth;

	@Column(name = "profile_image")
	private String profileImage;

	@Enumerated(EnumType.STRING)
	private Gender gender;
	public enum Gender {
		MALE, FEMALE, OTHER;
	}

	@Enumerated(EnumType.STRING)
	private Role role = Role.USER;
	public enum Role {
		USER, ADMIN;
	}

	@Enumerated(EnumType.STRING)
	private Status status = Status.ACTIVE;
	public enum Status {
		ACTIVE, INACTIVE, SUSPENDED;
	}

	@Enumerated(EnumType.STRING)
	private Verification verification = Verification.N;
	public enum Verification {
		Y, N;
	}

	@CreationTimestamp
	private LocalDateTime created_at;

	@UpdateTimestamp
	private LocalDateTime updated_at;

	@UpdateTimestamp
	private LocalDateTime last;
}
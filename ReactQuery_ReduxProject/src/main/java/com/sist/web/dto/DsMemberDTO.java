package com.sist.web.dto;

import java.time.LocalDate;

import com.sist.web.entity.DsMemberEntity.Gender;

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
@Data
public class DsMemberDTO {
	private long no;
	private String userId;
	private String userPwd;
	private String userName;
	private Gender gender;
	private String addr1;
	private String addr2;
	private String phone;
	private String email;
	private LocalDate birth;
	private String post;
	private String profileImage;
}

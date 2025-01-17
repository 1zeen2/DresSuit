package com.sist.web.entity;

/*
 * 	NO int 
	image varchar(1000) 
	subject varchar(500) 
	price varchar(10) 
	content text 
	delivery varchar(2000) 
	d_image varchar(2000) 
	address varchar(500) 
	hour varchar(50) 
	dayoff varchar(30) 
	d_image2 varchar(2000) 
	d_image3 varchar(2000) 
	re_exchange text 
	WISH int 
 */

import java.util.*;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity(name = "dress")
@Data
public class DressEntity {
	@Id
	private int no;
	private int wish;
	private String image, subject, price, content, delivery, address, hour, dayoff, d_image, d_image2, d_image3, re_exchange;
	private String subcontent;
}

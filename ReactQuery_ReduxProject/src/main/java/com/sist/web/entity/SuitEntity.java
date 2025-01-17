package com.sist.web.entity;

/*
 * 	no int 
	image varchar(2000) 
	subject varchar(1000) 
	price varchar(10) 
	delivery varchar(1000) 
	re_exchange varchar(1000) 
	d_image varchar(2000) 
	content text 
	address varchar(100) 
	hour varchar(100) 
	dayoff varchar(100) 
	d_image2 varchar(2000) 
	d_image3 varchar(2000) 
	d_image4 varchar(2000) 
	d_image5 varchar(2000) 
	WISH int
 */

import java.util.*;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity(name = "suit")
@Data
public class SuitEntity {
	@Id
	private int no;
	private int wish;
	private String image, subject, price, delivery, re_exchange, content, address, hour, dayoff, d_image, d_image2, d_image3, d_image4, d_image5;
	private String subcontent;
}

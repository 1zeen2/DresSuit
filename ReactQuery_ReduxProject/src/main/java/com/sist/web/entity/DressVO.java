package com.sist.web.entity;

/*
 * 	NO int
	image varchar(1000)
	subject varchar(500)
	price varchar(10)
	WISH int
	hit int
 */

public interface DressVO {
	public int getNo();
	public int getWish();
	public String getImage();
	public String getSubject();
	public String getPrice();
	public String getSubcontent();
}

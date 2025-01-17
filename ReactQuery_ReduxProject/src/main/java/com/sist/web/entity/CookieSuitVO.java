package com.sist.web.entity;

import lombok.Data;

@Data
public class CookieSuitVO {
	private int no;
	private String image;
	private String subject;
	
	public CookieSuitVO(int no, String image, String subject) {
		this.no = no;
		this.image = image;
		this.subject = subject;
	}
}

package com.sist.web.entity;

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

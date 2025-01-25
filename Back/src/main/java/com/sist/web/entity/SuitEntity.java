package com.sist.web.entity;

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

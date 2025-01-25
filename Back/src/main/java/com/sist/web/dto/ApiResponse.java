package com.sist.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse {
	private boolean succ;
	private String msg;
	private int errCode;
}

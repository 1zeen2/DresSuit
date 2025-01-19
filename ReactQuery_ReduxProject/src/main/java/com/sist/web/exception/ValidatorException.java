package com.sist.web.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Getter;

@Getter
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ValidatorException extends RuntimeException {
	private String errCode;
	private Object rejectedValue;

	public ValidatorException(String msg) {
		super(msg);
	}

	public ValidatorException(String msg, String errCode) {
		super(msg);
		this.errCode = errCode;
	}

	public ValidatorException(String msg, String errCode, Object rejectedValue) {
		super(msg);
		this.errCode = errCode;
		this.rejectedValue = rejectedValue;
	}
}
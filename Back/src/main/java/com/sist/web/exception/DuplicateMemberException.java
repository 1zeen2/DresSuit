package com.sist.web.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Data;

@Data
@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateMemberException extends RuntimeException {
	private String duplicatedId;

	public DuplicateMemberException(String duplicatedId) {
        super("이미 존재하는 아이디입니다: " + duplicatedId);
        this.duplicatedId = duplicatedId;
    }
}

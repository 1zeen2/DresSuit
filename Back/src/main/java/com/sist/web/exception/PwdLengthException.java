package com.sist.web.exception;

import lombok.Getter;

@Getter
public class PwdLengthException extends ValidatorException {
    private int minLength;
    private int maxLength;

    public PwdLengthException(int minLength, int maxLength) {
        super(String.format("비밀번호는 %d자 이상, %d자 이하여야 합니다.", minLength, maxLength), "PASSWORD_LENGTH_INVALID");
        this.minLength = minLength;
        this.maxLength = maxLength;
    }
}

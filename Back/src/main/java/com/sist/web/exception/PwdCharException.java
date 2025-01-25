package com.sist.web.exception;

public class PwdCharException extends ValidatorException {
    private String characterType;

    public PwdCharException(String characterType) {
        super(String.format("비밀번호는 %s를 포함해야 합니다.", characterType), "PASSWORD_MISSING_CHAR");
        this.characterType = characterType;
    }
}
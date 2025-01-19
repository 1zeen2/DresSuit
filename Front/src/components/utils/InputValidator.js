/*
    마이 페이지 => 개인 정보 변경에서 재사용하기 위해
    유효성 검사와 메시지 출력을 분리하여 코드 작성.
*/ 

// 비밀번호 길이 유효성 검사
export const isPasswordLengthValid = (password) => {
    return password.length >= 8 && password.length <= 16;
};

// 비밀번호 영문 포함 여부 유효성 검사
export const isPasswordAlphaValid = (password) => {
    return /[a-zA-Z]/.test(password);
};

// 비밀번호 특수 문자 포함 여부 유효성 검사
export const isPasswordSpecialValid = (password) => {
    const passwordRegex = new RegExp("^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])");
    return passwordRegex.test(password);
};

// 비밀번호 유효성 검사 메시지 생성
export const getPasswordValidationMessage = (password) => {
    if (!password) return '';

    let message = '';
    if (!isPasswordLengthValid(password)) message += '8~16자리, ';
    if (!isPasswordAlphaValid(password)) message += '영문 포함, ';
    if (!isPasswordSpecialValid(password)) message += '특수문자 포함, ';

    if (message) {
        message = '비밀번호는 ' + message.slice(0, -2) + '이어야 합니다.';
    }
    return message;
};

// 이메일 유효성 검사
export const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};

// 전화번호 유효성 검사
export const validatePhone = (phone) => {
    const phoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    return phoneRegex.test(phone);
};
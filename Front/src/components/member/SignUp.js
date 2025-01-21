import { Fragment, useState, memo, useRef } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import apiClient from '../../http-commons';
import Postcode from "../utils/PostCode";
import MaskedInput from 'react-text-mask';
import * as InputValidator from "../utils/InputValidator";

// 함수 외부에서 const로 정의하는 것이 point
const fieldMessages = {
    userId: '아이디',
    userPwd: '비밀번호',
    userPwd2: '비밀번호 확인',
    userName: '이름',
    gender: '성별',
    post: '우편번호',
    addr1: '주소',
    addr2: '상세주소',
    phone: '전화번호',
    email: '이메일',
    birth: '생년월일'
};

// 비밀번호 유효성 검사
const validatePassword = (password) => {
    if (!password) {
        return null; // 빈 값일 경우 메시지 없음
    }

    if (password.length < 8 || password.length > 16) {
        return "비밀번호는 8 ~ 16자리여야 합니다.";
    }

    if (!/[a-zA-Z]/.test(password)) {
        return "비밀번호는 영문자를 포함해야 합니다.";
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return "비밀번호는 특수문자를 포함해야 합니다.";
    }

    if (!/[0-9]/.test(password)) {
        return "비밀번호는 숫자를 포함해야 합니다.";
    }

    return null; // 모든 조건 만족 시 null 반환 (오류 없음)
};

// React.memo로 감싸서 props 변경이 없으면 렌더링을 하지 않게 하는 것이 point
// 불필요한 렌더링 방지
const SignUp = memo(() => {
    const navigate = useNavigate(); // 페이지 이동을 위한 Hook
    const userIdRef = useRef(null);
    const [formData, setFormData] = useState({ // 폼 데이터 상태 관리
        userId: '',
        userPwd: '',
        userPwd2: '',
        userName: '',
        gender: '',
        post: '',
        addr1: '',
        addr2: '',
        phone: '',
        email: '',
        birth: '',
    });

    // 아이디 중복, 비밀번호 일치, 확인 메시지 함수
    const [formErrors, setFormErrors] = useState({});
    const [idCheckSucc, setIdCheckSucc] = useState('');
    const [idCheckErr, setIdCheckErr] = useState('');
    const [pwdMatchMessage, setPwdMatchMessage] = useState('');

    const [apiError, setApiError] = useState(null);

    // 회원 가입 Mutation => react-query
    const { mutate: signUpMutation } = useMutation(
        async (member) => { // API 요청 함수
            const response = await apiClient.post('/member/signUp', member);
            return response.data;
        },
        {
            onSuccess: (data) => { // 성공 시
                alert(data.msg);
                navigate("/");
            },
            onError: (err) => { // 실패 시
                setApiError(err.response?.data?.msg || "회원 가입에 실패했습니다.");
                console.error("회원 가입 오류:", err);
            },
        }
    );

    // 아이디 중복 확인 함수
    const handleIdCheck = async () => {
        if (!formData.userId) {
            setIdCheckErr("아이디를 입력해주세요.");
            return;
        }

        try {
            const response = await apiClient.get(`/member/check-id/${formData.userId}`);
            if (response && response.data && response.data.succ) { // response, response.data가 존재하는지 확인
                setIdCheckSucc(response.data.msg);
                setIdCheckErr("");
            } else {
                setIdCheckErr(response.data?.msg || "알 수 없는 오류"); // optional chaining 사용
                setIdCheckSucc("");
            }
        } catch (error) {
            setIdCheckErr(error.response?.data?.msg || error.message || "아이디 중복 확인 중 에러가 발생했습니다."); // optional chaining 사용 및 error.message 추가
            console.error(error);
        }
    };

    // Input의 요소가 바뀔 때 마다 호출되어 formData의 상태를 업데이트
    // => name 속성에 해당하는 value(유효성 검사) 메시지를 출력
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        let newErrors = { ...formErrors };

        // 모든 필드에 대한 빈 값 검사
        if (!value) {
            newErrors[name] = `${fieldMessages[name]}를 입력해주세요.`;
        } else {
            delete newErrors[name]; // 값이 있으면 오류 제거
        }

        if (name === "userPwd") {
            // 비밀번호 유효성 검사 결과를 formErrors에 직접 저장
            newErrors.userPwd = validatePassword(value);
        }

        // 비밀번호 확인 실시간 검사 로직 개선
        if (name === "userPwd2") {
            if (!formData.userPwd) {
                setPwdMatchMessage("비밀번호를 먼저 입력해주세요.");
            } else if (formData.userPwd === value) {
                setPwdMatchMessage("비밀번호가 일치합니다.");
            } else {
                setPwdMatchMessage("비밀번호가 일치하지 않습니다.");
            }
        }

                if (name === "email") {
            if (value && !InputValidator.validateEmail(value)) {
                newErrors.email = "유효한 이메일 주소를 입력하세요.";
            } else {
                delete newErrors.email;
            }
        } else if (name === "phone") {
            if (value && !InputValidator.validatePhone(value)) {
                newErrors.phone = "전화번호의 형식이 올바르지 않습니다.";
            } else {
                delete newErrors.phone;
            }
        }

        setFormErrors(newErrors);
    };

    // 회원 가입 폼 제출 핸들러
    const handleSignUp = (e) => {
        e.preventDefault(); // 기본 제출 동작 방지

        const errors = {};
        // 모든 폼에 대한 유효성 검사
        for (const key in fieldMessages) {
            if (!formData[key]) {
                errors[key] = `${fieldMessages[key]}를 입력해주세요.`;
            }
        }

        // 비밀번호 유효성 검사 결과를 errors에 추가 (handleInputChange에서 이미 검사했으므로 중복 최소화)
        if (formErrors.userPwd) {
            errors.userPwd = formErrors.userPwd;
        }

        // 비밀번호 일치 여부 최종 확인
        if (formData.userPwd && formData.userPwd2 && formData.userPwd !== formData.userPwd2) {
            setPwdMatchMessage("비밀번호가 일치하지 않습니다.");
        } else {
            setPwdMatchMessage(""); // 일치하면 메시지 초기화
        }

        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            return; // 오류가 있으면 제출 중단
        }

        // formData에서 필요한 데이터를 추출하고, API 요청에 필요한 형태로 데이터를 가공함
        // => 비밀번호 확인 필드 제거
        const { userPwd2, ...memberData } = formData;
        // react-query의 signUpMutation을 호출하여 실제 API 요청을 보냄
        signUpMutation({...memberData}); // 이렇게 수정
    };

    return (
        <Fragment>
            <div className="breadcumb-area" style={{ backgroundImage: "url('../img/bg-img/breadcumb.jpg')"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>회원가입</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="breadcumb-nav">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            
                        </div>
                    </div>
                </div>
            </div>

            <section className="single_blog_area section_padding_20" id="joinApp">
                <div className="container"/>
                    <div className="row justify-content-center">
                        <form onSubmit={handleSignUp} method="post">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th className="text-right" width="30%">아이디</th>
                                        <td width="80%">
                                            <input
                                                type="text"
                                                size="15"
                                                className="input-sm"
                                                name="userId"
                                                placeholder=" 아이디"
                                                value={formData.userId}
                                                onChange={handleInputChange}
                                                ref={userIdRef}
                                            />
                                            &nbsp;&nbsp;
                                            <button type="button" onClick={handleIdCheck} className="btn btn-sm btn-outline-success">
                                                중복 체크
                                            </button>
                                            {idCheckSucc && <p style={{color: "green"}}>{idCheckSucc}</p>}
                                            {idCheckErr && <p style={{color: "red"}}>{idCheckErr}</p>}
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <th className="text-right" width="30%" id="pwd1-container">비밀번호</th>
                                        <td width="80%">
                                            <input
                                                type="password"
                                                name="userPwd"
                                                onChange={handleInputChange}
                                                value={formData.userPwd}
                                                size="15"
                                                className="input-sm"
                                                placeholder=" 비밀번호"
                                            />
                                            {formErrors.userPwd && <p style={{ color: "red" }}>{formErrors.userPwd}</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className='text-right' width="30%" id='pwd2-container'>비밀번호 확인</th>
                                        <td>
                                            <input 
                                                type="password"
                                                name="userPwd2"
                                                onChange={handleInputChange}
                                                value={formData.userPwd2}
                                                size="15"
                                                className="input-sm"
                                                placeholder=" 비밀번호 재입력"
                                            />
                                            {pwdMatchMessage && (
                                                <p style={{ color: pwdMatchMessage === "비밀번호가 일치합니다." ? "green" : "red" }}>
                                                    {pwdMatchMessage}
                                                </p>
                                            )}
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <th className="text-right" width="30%">이름</th>
                                        <td width="80%">
                                        <input
                                            type="text"
                                            size="15"
                                            className="input-sm"
                                            name="userName"
                                            placeholder=" 이름"
                                            value={formData.userName}
                                            onChange={handleInputChange}
                                        />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <th className="text-right" width="30%">성별</th>
                                        <td width="80%">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="MALE"
                                                checked={formData.gender === 'MALE'}
                                                onChange={handleInputChange}
                                            />
                                            남자&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="FEMALE"
                                                checked={formData.gender === "FEMALE"}
                                                onChange={handleInputChange}
                                            />
                                            여자&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="OTHER"
                                                checked={formData.gender === "OTHER"}
                                                onChange={handleInputChange}
                                            />
                                            기타 (혹은 그 외)
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <th className="text-right" width="30%">생년월일</th>
                                        <td width="80%">
                                            <input
                                                type="date"
                                                size="20"
                                                className="input-sm"
                                                name="birth"
                                                placeholder=" 생년월일"
                                                value={formData.birth}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <th className="text-right" width="30%">이메일</th>
                                        <td width="80%">
                                            <input
                                                type="email"
                                                size="50"
                                                className="input-sm"
                                                name="email"
                                                placeholder=" 이메일을 입력해주세요"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <th className="text-right" width="30%">우편번호</th>
                                        <td width="80%">
                                            <Postcode setFormData={setFormData} formData={formData} /> {/* Postcode 컴포넌트 사용 */}
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <th className="text-right" width="30%">주소</th>
                                        <td width="80%">
                                            <input
                                                type="text"
                                                size="50"
                                                className="input-sm"
                                                name="addr1"
                                                placeholder=" 주소를 입력해주세요"
                                                value={formData.addr1}
                                                readOnly
                                            />
                                            <input
                                                type="text"
                                                size="50"
                                                className="input-sm"
                                                name="addr2"
                                                placeholder=" 상세주소를 입력해주세요"
                                                value={formData.addr2}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th className="text-right" width="30%">전화번호</th>
                                        <td width="80%">
                                            <MaskedInput
                                                mask={[/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                placeholder="전화번호를 입력해주세요"
                                                guide={false}
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="input-sm"
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="2" className="text-center">
                                            <button 
                                                type="submit" 
                                                value="회원 가입"
                                                className="btn-sm btn-outline-primary ml-2"
                                            >
                                                회원 가입
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-sm btn-outline-danger ml-2"
                                                onClick={() => navigate(-1)}
                                            >
                                                취소
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
            </section>
        </Fragment>
    );
});

export default SignUp
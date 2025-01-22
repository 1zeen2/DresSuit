import { Fragment, useState, useRef } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../http-commons";

function Header() {
    const [ userId, setUserId ] = useState('')
    const [ userPwd, setUserPwd ] = useState('')
    const userIdRef = useRef(null)
    const userPwdRef = useRef(null)
    const [ signIn, setSignIn ] = useState(false)
    const [ signInError, setSignInError ] = useState(null);

    const memberSignIn = async () => {
        if (userId.trim() === "") {
            userIdRef.current.focus();
            return;
        } else if (userPwd.trim() === "") {
            userPwdRef.current.focus();
            return;
        }
    
        try {
            const response = await apiClient.post('/member/signIn', { userId, userPwd });
    
            if (response && response.status === 200 && response.data && response.data.msg === 'OK') {
                window.sessionStorage.setItem('userId', response.data.userId);
                window.sessionStorage.setItem('userName', response.data.userName);
                window.sessionStorage.setItem('gender', response.data.gender);
                setSignIn(true);
            } else if (response && response.status === 401 && response.data) {
                const errorMessage = response.data.msg === 'NOID' ? "아이디가 존재하지 않습니다." : "비밀번호가 일치하지 않습니다.";
                alert(errorMessage);
                setUserId('');
                setUserPwd('');
                userIdRef.current.focus();
            } else {
                console.error("Invalid response:", response);
                setSignInError(`로그인 처리 중 서버 오류가 발생했습니다. 상태 코드: ${response ? response.status : '알 수 없음'}. 서버 상태를 확인해주세요.`);
            }
        } catch (error) {
            if (error.response) {
                console.error("Server error:", error.response); // 서버 오류 상세 정보 출력
                setSignInError(`로그인 중 서버 오류가 발생했습니다. 상태 코드: ${error.response.status}. 서버 응답 내용을 확인해주세요.`);
            } else if (error.request) {
                console.error("Network error:", error.request); // 네트워크 오류 상세 정보 출력
                setSignInError("로그인 중 네트워크 연결 오류가 발생했습니다. 네트워크 연결 상태를 확인해주세요.");
            } else {
                console.error("Request setup error:", error); // 요청 설정 오류 상세 정보 출력
                setSignInError(`로그인 요청 중 오류가 발생했습니다.`);
            }
        }
    };

    const memberLogout = () => {
        window.sessionStorage.clear()
        setUserId('')
        setUserPwd('')
        setSignIn(false)
    }

    return (
        <Fragment>
            <div className="top_header_area">
                <div className="container">
                    <div className="row">
                        <div className="col-5 col-sm-6">
                            <div className="top_social_bar">
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                    <i className="fa fa-facebook" aria-hidden="true"></i>
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <i className="fa fa-twitter" aria-hidden="true"></i>
                                </a>
                                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                                </a>
                                <a href="https://www.skype.com" target="_blank" rel="noopener noreferrer">
                                    <i className="fa fa-skype" aria-hidden="true"></i>
                                </a>
                                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
                                    <i className="fa fa-dribbble" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>

                        <div className="col-7 col-sm-6">
                            <div className="signup-search-area d-flex align-items-center justify-content-end">
                                <div className="login_register_area d-flex">
                                    {
                                        !signIn &&
                                        <div className="login">
                                            <input type={"text"} size={"15"} className={"input-sm"}
                                                value={userId}
                                                ref={userIdRef}
                                                placeholder=" 아이디"
                                                onChange={(e)=>setUserId(e.target.value)}
                                            />
                                            &nbsp;
                                            <input type={"password"} size={"15"} className={"input-sm"}
                                                value={userPwd}
                                                ref={userPwdRef}
                                                placeholder=" 비밀번호"
                                                onChange={(e)=>setUserPwd(e.target.value)}
                                            />
                                            &nbsp;&nbsp;&nbsp;
                                            <button className={"btn-sm btn-outline-success"} onClick={memberSignIn}>
                                                로그인
                                            </button>
                                            &nbsp;
                                            <Link to="/member/signup">
                                                <button className={"btn-sm btn-outline-primary"}>
                                                    회원가입
                                                </button>
                                            </Link>
                                        </div>
                                    }
                                    {
                                        signIn &&
                                        <div className="login">
                                            {window.sessionStorage.getItem("userId")}님 반갑습니다.^^&nbsp;
                                            <button className={"btn-sm btn-outline-danger"} onClick={memberLogout}>
                                                로그아웃
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <header className="header_area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="logo_area text-center">
                                <Link to={"/"} className="yummy-logo">DresSuit</Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-lg">
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#yummyfood-nav" aria-controls="yummyfood-nav" aria-expanded="false"
                                        aria-label="Toggle navigation">
                                    <i className="fa fa-bars" aria-hidden="true"></i>
                                    Menu
                                </button>
                                <div className="collapse navbar-collapse justify-content-center" id="yummyfood-nav">
                                    <ul className="navbar-nav" id="yummy-nav">
                                        <li className="nav-item active">
                                            <Link className="nav-link" to={"/"}>
                                                Home<span className="sr-only">(current)</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="yummyDropdown"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                DresS
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="yummyDropdown">
                                                <Link className="dropdown-item" to={"/dress/list"}>List</Link>
                                                <Link className="dropdown-item" to={"/dress/find"}>Search</Link>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="yummyDropdown"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                Suit
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="yummyDropdown">
                                                <Link className="dropdown-item" to={"/suit/list"}>List</Link>
                                                <Link className="dropdown-item" to={"/suit/find"}>Search</Link>
                                            </div>
                                        </li>
                                        {/* <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="yummyDropdown"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                Info
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="yummyDropdown">
                                                <a className="dropdown-item" href={"#"}>Location</a>
                                                <a className="dropdown-item" href={"#"}>보류</a>
                                                <a className="dropdown-item" href={"#"}>보류</a>
                                            </div>
                                        </li> */}
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/board/list"}>Board</Link>
                                        </li>
                                        {/* <li className="nav-item">
                                            <Link className="nav-link" to={"/board2/list"}>보류</Link>
                                        </li> */}
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    )
}

export default Header
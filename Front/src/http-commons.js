import axios from "axios";

// axios 인스턴스를 함수로 정의하여 공통 모듈로 설정
export default axios.create({
    baseURL: "http://localhost",
    headers: {
        "Content-Type": "application/json",
    }
});

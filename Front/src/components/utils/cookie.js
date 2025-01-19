import {Cookies} from "react-cookie";

const cookies = new Cookies();

// 쿠키 저장
export const setCookie = (name, value, options) => {
    return cookies.set(name, value, {...options});
}
// 쿠키 한개 읽기
export const getCookie = (name) => {
    return cookies.get(name);
}
// 쿠키 전체 읽기
export const getAll = () => {
    return cookies.getAll()
}
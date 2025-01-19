import { Fragment, useEffect, useState } from "react";
import apiClient from "../../http-commons"
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Map,MapMarker } from "react-kakao-maps-sdk";
import { setCookie } from "../utils/cookie";

/* global kakao */

const MapLocation = (props) => {
    const [state,setState] = useState({
        // 위도, 경도
        center:{lat:null, lng:null},
        isShow:true // 지도를 이동할때 부드럽게 출력
    })
    useEffect(() => {
        // 일반 주소를 위도.경도를 출력
        const geocoder = new kakao.maps.services.Geocoder();
        // 주소 입력 => 좌표 변환
        let callback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                // 변환이 가능한 주소가 들어 온 경우
                const newSearch = result[0];
                setState({
                    center:{lat:newSearch.y, lng:newSearch.x}
                })
            }
        }
        geocoder.addressSearch(`${props.address}`, callback)
        // 주소를 위도/경도를 찾아주는 역할
    }, []);
    return (
        <div>
            <Map center = {state.center} isPanto = {state.isShow} style = {{width:"700px", height:"600px", borderRadius:'20px'}}>
                <MapMarker position = {state.center} style={{ border: 'transparent' }}>
                    <div
                        style = {{
                            color: 'black',
                            fontSize: '19px',
                            fontWeight: '700',
                            padding: '3px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            width: '150px',
                            height: '30px',
                        }}
                    >
                        {props.name}
                    </div>
                </MapMarker>
            </Map>
        </div>
    )
}

function SuitDetail() {

    const {no} = useParams() // request.getParameter()
    const {isLoading,isError,error,data} = useQuery(
        ['suit-detail', no],
        async () => {
            return await apiClient.get(`/suit/detail/${no}`)
        }
    )
    if (isLoading)
        return <h1 className={"text-center"}>데이터 로딩중입니다</h1>
    if (isError)
        return <h1 className={"text-center"}>{error}</h1>
    // 쿠키 저장 => 기간 options
    setCookie("suit_" + no, data.data.image)
    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage" : "url('/img/bg-img/wedding-hall.png')"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2> Details </h2>
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
            <section className="single_blog_area section_padding_80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-8">
                            <div className="row no-gutters">
                                <div className="col-12 col-sm-12">
                                    <div className="related-post-area section_padding_50">
                                        <div className="related-post-slider owl-carousel">
                                        </div>
                                    </div>
                                    <table className="table">
                                        <tbody>
                                        <tr>
                                            <td width="30%" className="text-center" rowSpan="6">
                                                <img src={data.data && data.data.image} style={{"width": "100%", "height" : "334px"}} alt=""/>
                                            </td>
                                            <td colSpan="2">
                                                <h3>{data.data.subject}</h3>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">가격</td>
                                            <td width="55%">{data.data.price}</td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">배송비</td>
                                            <td width="55%">{data.data.delivery}</td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">제품 설명</td>
                                            <td width="55%">{data.data.content}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table className="table">
                                        <tbody>
                                        <tr>
                                        <td className="text-center"
                                                style={{"fontSize": "30px", "fontWeight": "bold"}}>상품 상세 보기
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src={data.data.d_image} alt="Suit Image Error"
                                                     style={{width: '800px', height: 'auto'}}/>
                                                <img src={data.data.d_image2} alt="Suit Image Error"
                                                     style={{width: '800px', height: 'auto'}}/>
                                                <img src={data.data.d_image3} alt="Suit Image Error"
                                                     style={{width: '800px', height: 'auto'}}/>
                                                <img src={data.data.d_image4} alt="Suit Image Error"
                                                style={{width: '800px', height: 'auto'}}/>
                                                <img src={data.data.d_image5} alt="Suit Image Error"
                                                style={{width: '800px', height: 'auto'}}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div>
                                                    <MapLocation address={data.data.address} name={'제이진슈트'}/>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table className="table">
                                        <tbody>
                                        <tr>
                                            <td width="15%" className="text-center">휴무일 :</td>
                                            <td width="55%">{data.data.dayoff}</td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">영업시간 :</td>
                                            <td width="55%">{data.data.hour}</td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">환불 정책 :</td>
                                            <td width="55%">{data.data.re_exchange}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table className="table">
                                        <tbody>
                                        <tr>
                                            <td className="text-center">
                                                <Link to = "/suit/list" className="btn btn-xs btn-warning">목록</Link>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default SuitDetail;

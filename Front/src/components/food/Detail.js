import {Fragment, useEffect, useState} from "react";
import apiClient from "../../http-commons"
import {Link, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {Map,MapMarker} from "react-kakao-maps-sdk";
import {setCookie,getCookie} from "../util/cookie";
/* global kakao */
// 맵능 출력하는 함수
/*
      state : 데이터가 변경이 될때마다 HTML에 적용
              useState() => VueJS (data(){})
              useQuery() => state변수외 동일한 역할

              *** 일반 React => 요청시마다 서버를 연결를 연결해서 데이터를 읽어 온다
                      React-Query => 서버에서 읽어오는 데이터는 저장 (데이터 캐싱)
                                     같은 데이터면 저장된 데이터를 전송
                                                 ============
                           | 서버 상태 관리
                           | 사전에 서버 에러부분을 감지 할 수 있다
                           | 가장 최신 기술
                           | => state변수를 관리 => recoil
         props : 속성변수 => 불변 (상수)
         => 모든 함수는 props 변수를 필요시에 사용이 가능
         지역변수 => 기능 처리만 가능 => HTML에 적용이 안되는 변수
         let / const => ES6

         function Aaa(props)
         {
             props.name
             props.age
         }

         => 호출 <Aaa name="aaa" age="20"/>
                          ====== 객체 {} , 배열 [] , function
         단점
          function A()
          {
             const [name,setName]=useState('홍길동')
             return (
               <B name={name}/>
             )
          }
          function B(props)
          {
              return (
                <C name={props.name}/> => 함수를 호출 방법
                        ============ 매개변수 전송
                C(name) => 오류 발생
              )
          }
          function C(props)
          {
             return {
               값출력 {props.name}
             }
          }

          자바 웹
                     요청 (request)
          클라이언트 ======== 서버
                     응답 (response)
                          |
                       전송 : HTML / Cookie => 서버에서 응답은 1번만 사용이 가능
                       => cookie => http://localhost
          React : 자바스크립트
                  => 전송이 아니라 저장  => 브라우저에 저장
                       => cookie => http://localhost:3000
 */
const MapLocation=(props)=>{
    const [state,setState] = useState({
        // 위도 / 경도
        center:{lat:null,lng:null},
        isShow:true // 지도를 이동할때 부드럽게 출력
    })
    useEffect(() => {
        // 일반 주소를 위도.경도를 출력
        const geocoder = new kakao.maps.services.Geocoder();
        // 주소 입력 => 좌표 변환
        let callback=function(result,status){
            if(status==kakao.maps.services.Status.OK){
                // 변환이 가능한 주소가 들어 온 경우
                const newSearch=result[0];
                setState({
                    center:{lat:newSearch.y,lng:newSearch.x}
                })
            }
        }
        geocoder.addressSearch(`${props.address}`,callback)
        // 주소를 위도/경도를 찾아주는 역할
    }, []);
    return (
        <div>
            <Map center={state.center}
                 isPanto={state.isShow}
                 style={{
                     width:"600px",
                     height:"500px",
                     borderRadius:'20px'
                 }}
            >
                <MapMarker position={state.center}
                           style={{border:'transparent'}}
                >
                    <div
                        style={{
                            color:'gray',
                            fontSize:'19px',
                            fontWeight:'700',
                            border:'4px solid gray',
                            borderRadius:'10px',
                            padding:'2px'
                        }}
                    >
                        {props.name}
                    </div>
                </MapMarker>
            </Map>
        </div>
    )
}
function FoodDetail(){

    const {fno}=useParams() // request.getParameter()
    const {isLoading,isError,error,data} = useQuery(['food-detail',fno],
        async ()=>{
            return await apiClient.get(`/food/detail/${fno}`)
        }
    )
    if(isLoading)
        return <h1 className={"text-center"}>데이터 로딩중입니다</h1>
    if(isError)
        return <h1 className={"text-center"}>{error}</h1>
    // 쿠키 저장 => 기간 options
    setCookie("food_"+fno,data.data.poster)
    return (

        <Fragment>

            <div className="breadcumb-area" style={{"backgroundImage": "url(../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>맛집 상세보기</h2>
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

                                            {/*<c:forTokens items="${vo.images }" delims="^" var="img">
                                                <div className="single-post">

                                                    <div className="post-thumb">
                                                        <img src="http://www.menupan.com${img }" alt="">
                                                    </div>
                                                </div>
                                            </c:forTokens>*/}
                                        </div>
                                    </div>
                                    <table className="table">
                                        <tbody>
                                        <tr>
                                            <td width="30%" className="text-center" rowSpan="6">
                                                <img src={data.data && "http://www.menupan.com"+data.data.poster } style={{"width": "100%"}}/>
                                            </td>
                                            <td colSpan="2">
                                                <h3>{data.data.name }&nbsp;<span style={{"color":"orange"}}>{data.data.score }</span></h3>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">주소</td>
                                            <td width="55%">{data.data.address }</td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">전화</td>
                                            <td width="55%">{data.data.phone }</td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">음식종류</td>
                                            <td width="55%">{data.data.type }</td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">주차</td>
                                            <td width="55%">{data.data.parking }</td>
                                        </tr>
                                        <tr>
                                            <td width="15%" className="text-center">영업시간</td>
                                            <td width="55%">{data.data.time }</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table className="table">
                                        <tbody>
                                        <tr>
                                            <td>{data.data.theme }</td>
                                        </tr>
                                        <tr>
                                            <td>{data.data.content }</td>
                                        </tr>
                                        <tr>
                                            <td className="text-right">
                                                <Link to="/food/list" className="btn btn-xs btn-warning">목록</Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div>
                                                    {/* 함수의 매개변수 전송 : props = child
                                                        react의 단점 => 단방향
                                                    */}
                                                    <MapLocation address={data.data.address} name={data.data.name}/>
                                                </div>
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
export default FoodDetail;

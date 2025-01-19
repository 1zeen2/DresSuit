import { useState, Fragment } from "react";
import { useQuery } from "react-query";
import apiClient from "../../http-commons"
import { Link } from "react-router-dom";

function SuitFind() {
    const [curpage, setCurpage] = useState(1);
    const [subject, setSubject] = useState("블랙");
    const {isLoading, isError, error, data, refetch:suitFindData} = useQuery(
        ["suit_find", curpage],
        async () => {
            return await apiClient.get(`/suit/find/${curpage}/${subject}`)
        }
    )

    if (isLoading)
        return <h1 className={"text-center"}>데이터 로딩 중 입니다.</h1>

    if (isError)
        return <h1 className={"text-center"}>{error}</h1>

    console.log(data)

    const pageChange = (page) => {
        setCurpage(page)
    }

    const prev = () => {
        setCurpage(data.data.startPage - 1)
    }

    const next = () => {
        setCurpage(data.data.endPage + 1)
    }

    const find = (e) => {
        setSubject(e.target.value)
    }

    const findBtn = () => {
        suitFindData();
    }

    let pageArr = []

    for (let i = data.data.startPage; i <= data.data.endPage; i++) {
        if (curpage === i) {
            pageArr.push (
                <li className="page-item active">
                    <button className="page-link" onClick={() => pageChange(i)}>
                        {i}
                    </button>
                </li>
            )
        } else {
            pageArr.push (
                <li className="page-item">
                    <button className="page-link" onClick={() => pageChange(i)}>
                        {i}
                    </button>
                </li>
            )
        }
    }
    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(../img/bg-img/wedding-hall.png)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2> Search for your Suit </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="breadcumb-nav">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">
                                <div style={{"height":"10px"}}></div>
                                <input type={"text"} size={"20px"} style={{"paddingBottom":"5px", "borderRadius" : ".2rem"}} className={"input-sm"}
                                       onChange={find} value={subject}
                                />
                                <button className="btn-sm btn-outline-success" onClick={findBtn}>검색</button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <section className="archive-area section_padding_80" id="listApp">
                <div className="container">
                    <div className="row">
                        {
                            data.data.sList && data.data.sList.map((svo) =>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="single-post wow fadeInUp" data-wow-delay="0.1s">

                                        <div className="post-thumb">
                                            <Link to={'/suit/detail/' + svo.no}>
                                                <img src={svo.image}
                                                     style={{"width": "350px", "height": "200px"}}/>
                                            </Link>
                                        </div>

                                        <div className="post-content">
                                            <div className="post-meta d-flex">
                                                <div className="post-author-date-area d-flex">

                                                    <div className="post-author">
                                                        <a href="#">{svo.subject}</a>
                                                    </div>

                                                    {/* 추후 평점 기능 구현시 출력 코드.
                                                    <div className="post-date">
                                                        <a href="#" style={{"color": "orange"}}>{svo.score}</a>
                                                    </div>*/}
                                                </div>

                                                <div className="post-comment-share-area d-flex">

                                                    <div className="post-favourite">
                                                        <a href="#"><i className="fa fa-heart-o"
                                                                       aria-hidden="true"></i> {svo.wish}</a>
                                                    </div>

                                                    {/* 댓글 기능 구현 시 출력 코드
                                                    <div className="post-comments">
                                                        <a href="#"><i className="fa fa-comment-o"
                                                                       aria-hidden="true"></i> {svo.hit}</a>
                                                    </div>*/}

                                                    <div className="post-share">
                                                        <a href="#"><i className="fa fa-share-alt"
                                                                       aria-hidden="true"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link to={'/dress/detail/' + svo.no}>
                                                <h4 className="post-headline">{svo.price}</h4>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                        <div className="col-12">
                            <div className="pagination-area d-sm-flex mt-15">
                                <nav aria-label="#">
                                    <ul className="pagination">
                                        {
                                            data.data.startPage && data.data.startPage > 1 &&
                                            <li className="page-item">
                                                <button className="page-link" onClick={prev}>이전
                                                    <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                                                </button>
                                            </li>
                                        }
                                        {pageArr}
                                        {
                                            data.data.endPage && data.data.endPage < data.data.totalpage &&
                                            <li className="page-item">
                                                <button className="page-link" onClick={next}>
                                                    <i className="fa fa-angle-double-right" aria-hidden="true"></i>다음
                                                </button>
                                            </li>
                                        }
                                    </ul>
                                </nav>
                                <div className="page-status">
                                    <p>{data.data.curpage} page / {data.data.totalpage} pages</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default SuitFind
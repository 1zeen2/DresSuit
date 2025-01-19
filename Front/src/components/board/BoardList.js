import { useQuery } from "react-query";
import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../http-commons"

function BoardList() {
    const [curpage, setCurpage] = useState(1);
    const { isLoading, isError, error, data, refetch:loadingNotExecute } = useQuery(
        ['board-list', curpage],
        async () => {
            return await apiClient.get(`/board/list/${curpage}`)
        }
    )

    useEffect(() => {
        loadingNotExecute()
    }, [isLoading])
    
    const prev = () => {
        setCurpage(curpage > 1 ? curpage - 1 : curpage)
    }
    const next = () => {
        setCurpage(data.data.totalpage && curpage < data.data.totalpage ? curpage + 1 : curpage)
    }

    if (isLoading)
        return <h1 className={"text-center"}>서버에서 데이터 전송이 지연되고 있습니다..</h1>
    if (isError)
        return <h1 className={"text-center"}>{error}</h1>

    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>자유 게시판</h2>
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
                                <ol className="breadcrumb">

                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <section className="archive-area section_padding_80" id="listApp">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <table className={"table"}>
                                <tbody>
                                    <td>
                                        <Link to={"/board/insert"} className={"btn btn-sm btn-primary"}>새글</Link>
                                    </td>
                                </tbody>
                            </table>
                            <table className={"table table-striped"}>
                                <thead>
                                    <tr>
                                        <th className={"text-center"} width={"10%"}>번호</th>
                                        <th className={"text-center"} width={"45%"}>제목</th>
                                        <th className={"text-center"} width={"15%"}>작성자</th>
                                        <th className={"text-center"} width={"20%"}>작성일</th>
                                        <th className={"text-center"} width={"10%"}>조회수</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {data.data.bList && data.data.bList.map((bvo)=>
                                        <tr>
                                            <td className={"text-center"} width={"10%"}>{bvo.no}</td>
                                            <td width={"45%"}>
                                                <Link to={"/board/detail/"+bvo.no}>{bvo.subject}</Link>&nbsp;
                                            </td>
                                            <td className={"text-center"} width={"15%"}>{bvo.name}</td>
                                            <td className={"text-center"} width={"20%"}>{bvo.regdate}</td>
                                            <td className={"text-center"} width={"10%"}>{bvo.hit}</td>
                                        </tr>
                                    )
                                }
                                <tr>
                                    <td colSpan={5} className={"text-center"}>
                                        <button className={"btn btn-sm btn-outline-success"} onClick={prev}>이전</button>
                                            &nbsp;&nbsp;{data.data.curpage} page / {data.data.totalpage} pages
                                            &nbsp;&nbsp;
                                        <button className={"btn btn-sm btn-outline-primary"} onClick={next}>다음</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
export default BoardList
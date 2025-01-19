import { useState, useRef, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import apiClient from "../../http-commons"

function BoardInsert() {
    const nav = useNavigate()
    const nameRef = useRef(null)
    const subjectRef = useRef(null)
    const contentRef = useRef(null)
    const pwdRef = useRef(null)

    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const [pwd, setPwd] = useState('')
    const [result, setResult] = useState('')

    const {isLoading, mutate:insert} = useMutation(
        async () => {
            return await apiClient.post(`/board/insert`, {
                name: name,
                subject: subject,
                content: content,
                pwd: pwd
            }
        )},
        {
            onSuccess: (res) => {
                if (res.data.msg === 'yes') {
                    nav('/board/list')
                }
            },
            onError: (err) => {
                console.log(err)
                setResult('게시글 작성 실패. 다시 시도해주세요.')
            }
        }
    )

    const boardInsert = () => {
        if (name.trim() === '') {
            nameRef.current.focus()
            return
        } else if (subject.trim() === '') {
            subjectRef.current.focus()
            return
        } else if (content.trim() === '') {
            contentRef.current.focus()
            return
        } else if (pwd.trim() === '') {
            pwdRef.current.focus()
            return
        }

        insert()
    }

    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>게시물 작성</h2>
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
                                <tr>
                                    <th className={"text-center"} width={"15%"}>작성자</th>
                                    <td width={"85%"}>
                                        <input type={"text"} 
                                               size={"20"} 
                                               className={"input-sm"}
                                               ref={nameRef}
                                               onChange={(e) => setName(e.target.value)}
                                               value={name}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th className={"text-center"} width={"15%"}>제목</th>
                                    <td width={"85%"}>
                                        <input type={"text"} 
                                               size={"60"} 
                                               className={"input-sm"}
                                               ref={subjectRef}
                                               onChange={(e) => setSubject(e.target.value)}
                                               value={subject}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th className={"text-center"} width={"15%"}>내용</th>
                                    <td width={"85%"}>
                                        <textarea rows={"10"}
                                                  cols={"62"}
                                                  ref={contentRef}
                                                  onChange={(e) => setContent(e.target.value)}
                                                  value={content}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th className={"text-center"} width={"15%"}>비밀번호</th>
                                    <td width={"85%"}>
                                        <input type={"password"}
                                               size={"10"}
                                               className={"input-sm"}
                                               ref={pwdRef}
                                               onChange={(e) => setPwd(e.target.value)}
                                               value={pwd}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={"2"} className={"text-center"}>
                                        <button className={"btn-sm btn-outline-success"} onClick={boardInsert}>작성</button>
                                        &nbsp;&nbsp;&nbsp;
                                        <button className={"btn-sm btn-outline-danger"} onClick={() => nav(-1)}>취소</button>
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

export default BoardInsert
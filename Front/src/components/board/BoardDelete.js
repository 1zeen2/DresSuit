import { useState, useRef, Fragment } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../http-commons"

function BoardDelete() {
    const { no } = useParams()
    const nav = useNavigate()
    const pwdRef = useRef(null)
    const [pwd, setPwd] = useState('');

    const { isLoading, mutate:boardDelete } = useMutation(
        async () => {
            return await apiClient.delete(`/board/delete/${no}/${pwd}`)
        },
        {
            onSuccess: (res) => {
                if (res.data.msg === 'yes') {
                    nav('/board/list')
                } else {
                    alert('비밀번호가 다릅니다.')
                    setPwd('')
                    pwdRef.current.focus()
                }
            }
        },
        {
            onError: (res) => {
                console.log(res.response)
            }
        }
    )
    const boardDeleteOk = () => {
        if (pwd.trim() === '') {
            pwdRef.current.focus()
            return
        }
        boardDelete()
    }

    return (
        <Fragment>
           <div className="breadcumb-area" style={{"backgroundImage": "url(../img/bg-img/breadcumb.jpg)"}}>
               <div className="container h-100">
                   <div className="row h-100 align-items-center">
                       <div className="col-12">
                           <div className="bradcumb-title text-center">
                               <h2>게시물 삭제</h2>
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
                           {/*화면 출력*/}
                           <table className={"table"}>
                               <tbody>
                               <tr>
                                   <td className={"text-center"}>
                                        <input type={"password"} className={"input-sm"} size={"25"}
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={pwd}
                                            ref={pwdRef}
                                            placeholder=" 비밀번호를 입력해주세요."
                                   />
                                   &nbsp;&nbsp;
                                       <button className={"btn-sm btn-outline-danger"} onClick={boardDeleteOk}>삭제</button>
                                       &nbsp;
                                       <button className={"btn-sm btn-outline-info"} onClick={() => nav(-1)}>취소</button>
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
export default BoardDelete
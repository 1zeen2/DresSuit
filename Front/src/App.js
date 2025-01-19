import {Fragment} from "react";
import {CookiesProvider} from "react-cookie";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Header from "./components/main/Header";
import SignUp from "./components/member/SignUp";
import Home from "./components/main/Home";
import Footer from "./components/main/Footer";
import DressList from "./components/dress/DressList";
import DressFind from "./components/dress/DressFind";
import DressDetail from "./components/dress/DressDetail";
import SuitList from "./components/suit/SuitList";
import SuitFind from "./components/suit/SuitFind";
import SuitDetail from "./components/suit/SuitDetail";
import BoardList from "./components/board/BoardList";
import BoardInsert from "./components/board/BoardInsert";
import BoardDetail from "./components/board/BoardDetail";
import BoardUpdate from "./components/board/BoardUpdate";
import BoardDelete from "./components/board/BoardDelete";

function App() {
    return (
        <Fragment>
            <Router>
                <Header login={false}/>
                <Routes>
                    <Route path="/member/signup" element={<SignUp/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/dress/list" element={<DressList/>}/>
                    <Route path="/dress/find" element={<DressFind/>}/>
                    <Route path="/dress/detail/:no" element={<DressDetail/>}/>
                    <Route path="/suit/list" element={<SuitList/>}/>
                    <Route path="/suit/find" element={<SuitFind/>}/>
                    <Route path="/suit/detail/:no" element={<SuitDetail/>}/>
                    <Route path="/board/list" element={<BoardList/>}/>
                    <Route path="/board/insert" element={<BoardInsert/>}/>
                    <Route path="/board/detail/:no" element={<BoardDetail/>}/>
                    <Route path="/board/update/:no" element={<BoardUpdate/>}/>
                    <Route path="/board/delete/:no" element={<BoardDelete/>}/>
                </Routes>
                <Footer/>
            </Router>
        </Fragment>
    )
}

export default App;
import { Fragment } from "react"
import apiClient from "../../http-commons"
import { useQuery, useQueries } from "react-query"
import { getAll } from "../utils/cookie"
import { Link } from "react-router-dom"

function Home() {
    const cookies = getAll()

    const cookieData = Object.keys(cookies)
        .reverse()
        .filter(key => key.startsWith('dress_') || key.startsWith('suit_'))
        .slice(0, 4)
        .map(key => {
            try {
                const type = key.startsWith('dress_') ? 'dress' : 'suit'
                const id = parseInt(key.replace('dress_', '').replace('suit_', ''))
                return { type, id }
            } catch (error) {
                console.error("Error parsing id:", key, error)
                return null
            }
        }).filter(item => item !== null)

    const productQueries = useQueries(
        cookieData.map(product => ({
            queryKey: [`product-detail-${product.type}-${product.id}`], // 템플릿 리터럴 수정
            queryFn: async () => {
            const response = await apiClient.get(`/cookie${product.type.charAt(0).toUpperCase() + product.type.slice(1)}/${product.id}`)
            return response.data
            },
            onError: (error) => {
            console.error(`Error fetching product ${product.type} ${product.id}:`, error)
            },
        }))
    )

    const { isLoading, isError, error, data } = useQuery(["main-data"], async () => {
        return await apiClient.get('/main')
    })

    if (isLoading) return <h1 className="text-center">데이터 로딩중입니다</h1>
    if (isError) return <h1 className="text-center">{error.message}</h1>

    return (
        <Fragment>
            <section className="categories_area clearfix" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="single_catagory wow fadeInUp" data-wow-delay=".3s">
                                <img src="/img/catagory-img/MainHomeDress.jpg" alt=""
                                    style={{"width": "350px", "height": "253px"}}
                                />
                                <div className="catagory-title">
                                    <Link to="/dress/list">
                                        <h5>Dress</h5>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="single_catagory wow fadeInUp" data-wow-delay=".6s">
                                <img src="/img/catagory-img/MainHomeSuit.png" alt=""
                                    style={{"width": "350px", "height": "253px"}}
                                />
                                <div className="catagory-title">
                                    <Link to="/suit/list">
                                        <h5>Suit</h5>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="single_catagory wow fadeInUp" data-wow-delay=".9s">
                                <img
                                    src="/img/catagory-img/MainBoard.jpg"
                                    alt=""
                                    style={{
                                        width: "350px",
                                        height: "253px",
                                    }}
                                />
                                <div className="catagory-title">
                                    <Link to="/board/list">
                                        <h5>Board</h5>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog_area section_padding_0_80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-8">
                            <div className="row">
                            <div className="col-12">
                                <div className="single-post wow fadeInUp" data-wow-delay=".2s">
                                    <div className="post-thumb">
                                        <Link to={`/dress/detail/${data.data.oneData.no}`}>
                                        <img
                                            src={data.data.oneData && data.data.oneData.image}
                                            style={{ width: "800px", height: "330px" }}
                                            alt=""
                                        />
                                        </Link>
                                    </div>
                                    <div className="post-content">
                                        <div className="post-meta d-flex">
                                            <div className="post-author-date-area d-flex">
                                                <Link to={`/dress/detail/${data.data.oneData.no}`}>
                                                <div className="post-author" style={{ color: "black" }}>
                                                    {data.data.oneData && data.data.oneData.subject}
                                                </div>
                                                </Link>
                                            </div>
                                            <div className="post-comment-share-area d-flex">
                                                <div className="post-favourite">
                                                    <a href="#"><i className="fa fa-heart-o" aria-hidden="true"></i>{" "}
                                                        {data.data && data.data.oneData.wish}
                                                    </a>
                                                </div>
                                                <div className="post-share">
                                                    <a href="#"><i className="fa fa-share-alt" aria-hidden="true"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="#"><h2 className="post-headline">{data.data && data.data.oneData.price}</h2></a>
                                        <p>{data.data && data.data.oneData.content}</p>
                                    </div>
                                </div>
                            </div>
                            {/* {data.data.twoData && (
                                <div className="col-12">
                                    {data.data.twoData.map((dress, index) => (
                                        <div className="col-12 col-md-6" key={dress.id || index}>
                                            <div className="single-post wow fadeInUp" data-wow-delay=".6s">
                                                <Link to={`/dress/detail/${dress.no}`}>
                                                <div className="post-thumb">
                                                    <img src={dress.image} style={{ width: "350px", height: "200px" }} alt="" />
                                                </div>
                                                </Link>
                                                <div className="post-content">
                                                    <div className="post-meta d-flex">
                                                        <div className="post-author-date-area d-flex">
                                                            <Link to={`/dress/detail/${dress.no}`}>
                                                                <div className="post-author" style={{ color: "black" }}>
                                                                    {dress.subject}
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        <div className="post-comment-share-area d-flex">
                                                            <div className="post-favourite">
                                                                <a href="#"><i className="fa fa-heart-o" aria-hidden="true"></i>{" "}{dress.wish}</a>
                                                            </div>
                                                            <div className="post-share">
                                                                <a href="#"><i className="fa fa-share-alt" aria-hidden="true"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a href="#">
                                                        <h4 className="post-headline">{dress.price}</h4>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )} */}
                            {data.data.threeData && (
                                <div className="col-12">
                                    {data.data.threeData.map((suit, index) => (
                                        <div className="col-12" key={suit.id || index}>
                                            <div className="list-blog single-post d-sm-flex wow fadeInUpBig" data-wow-delay=".2s">
                                                <div className="post-thumb">
                                                    <Link to={`/suit/detail/${suit.no}`}>
                                                        <img src={suit.image} style={{ width: "350px", height: "220px" }} />
                                                    </Link>
                                                </div>
                                                <div className="post-content">
                                                    <div className="post-meta d-flex">
                                                        <div className="post-author-date-area d-flex">
                                                            <Link to={`/suit/detail/${suit.no}`}>
                                                                <div className="post-author" style={{ color: "black" }}>
                                                                {suit.subject}
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        <div className="post-comment-share-area d-flex">
                                                            <div className="post-favourite">
                                                                <a href="#"><i className="fa fa-heart-o" aria-hidden="true"></i> {suit.wish}</a>
                                                            </div>
                                                            <div className="post-share">
                                                                <a href="#"><i className="fa fa-share-alt" aria-hidden="true"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>{suit.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                            <div className="blog-sidebar mt-5 mt-lg-0">
                                {/* Popular Posts */}
                                <div className="single-widget-area popular-post-widget">
                                {/* Replace with your data fetching logic */}
                                {/*
                                {data.data.rList &&
                                    data.data.rList.map((recipe) => (
                                    <div className="single-populer-post d-flex" key={recipe.id}>
                                        <img
                                        src={recipe.poster}
                                        style={{ width: "180px", height: "150px" }}
                                        alt=""
                                        />
                                        <div className="post-content">
                                        <a href="#">
                                            <h6>{recipe.title}</h6>
                                        </a>
                                        <p>{recipe.chef}</p>
                                        </div>
                                    </div>
                                    ))}
                                */}
                                </div>

                                {/* Add Widget */}
                                <div className="single-widget-area add-widget text-center">
                                <div className="add-widget-area">
                                    <img src="/img/sidebar-img/6.jpg" alt="" />
                                    <div className="add-text">
                                        <div className="yummy-table">
                                            <div className="yummy-table-cell">
                                                <iframe
                                                    width="350"
                                                    height="200"
                                                    src="https://www.youtube.com/embed/klrnAna9p74"
                                                    title="Youtube Player"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Recently Viewed Products */}
                            <div className="single-widget-area newsletter-widget">
                                <div className="widget-title text-center">
                                    <h6>최근 본 상품</h6>
                                </div>
                                {cookieData.map((cData, index) => {
                                    const productQuery = productQueries[index]
                                    if (productQuery.isLoading) return <p key={index}>로딩중...</p>
                                    if (productQuery.isError) {
                                        console.error("Error fetching product:", productQuery.error)
                                        return <p key={index}>정보를 불러올 수 없습니다.</p>
                                    }
                                    const productData = productQuery.data
                                    return (
                                        <Link to={`/${cData.type}/detail/${cData.id}`} key={index}>
                                            <img
                                                src={productData.image}
                                                style={{ width: "350px", height: "200px", marginTop: "8px" }}
                                                alt={productData.subject || "최근 본 상품"}
                                            />
                                            <p>{productData.subject}</p>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Fragment>
    )
}
export default Home
import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import '../css/main.css'
import '../css/linearicons.css'
import '../css/font-awesome.min.css'
import '../css/themify-icons.css'
import '../css/bootstrap.css'
import '../css/nice-select.css'
import '../css/nouislider.min.css'
import '../css/ion.rangeSlider.css'
import '../css/ion.rangeSlider.skinFlat.css'
import '../css/magnific-popup.css'

 class CardAllProduct extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            response: [],
            categories: [],
            category: "",
            productName: ""

        }
    }

    componentDidMount() {
        this.loadProduct()
        this.loadCategory()
    }

    setParam = (event) => {
        this.setState({ category: event.target.value }
            , this.loadProductByCate)
        console.log("da vao set param")

    }

    setProductName = (event) => {
        this.setState({ productName: event.target.value }
            , this.loadProductByName)

    }

    // loadProductByName = async () => {
    //     if (this.state.productName != null || this.state.productName != "") {
    //         var requestOptions = {
    //             method: 'GET',
    //             redirect: 'follow'
    //         };

    //         try {
    //             let response = await fetch("http://localhost:5000/product/getbyname/" + this.state.productName, requestOptions)
    //             if (response.ok) {
    //                 let result = await response.json()
    //                 console.log(result)
    //                 if (response.ok) {
    //                     this.setState({ response: result })
    //                 }
    //             }

    //         } catch (error) {
    //             console.log(error)

    //         }
    //     }
    // }


    loadProductByCate = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:5000/product/getbycate/" + this.state.category, requestOptions)
            if (response.ok) {
                let result = await response.json()
                console.log(this.state.category)
                console.log(result)
                if (response.ok) {
                    this.setState({ response: result })
                }
            }

        } catch (error) {
            console.log(error)

        }
    }

    loadCategory = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:5000/category", requestOptions)
            if (response.ok) {
                let result = await response.json()
                this.setState({ categories: result })
            }


        } catch (error) {
            console.log(error)
        }
    }

    loadProduct = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:5000/product", requestOptions)
            let result = await response.json()
            if (response.ok) {
                this.setState({ response: result })
            }
        } catch (error) {
            console.log(error)

        }
    }

    addToCart = async (id) => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:5000/product/" + id, requestOptions)
            if (response.ok) {
                let result = await response.json()

                let cart = localStorage.getItem("cart")
                if (cart == null) {

                    localStorage.setItem("cart",
                        JSON.stringify([
                            { id: id, name: result.name, price: result.price, buyQuantity: 1, image: result.image }
                        ])
                    )

                    this.props.history.push("/cart")
                } else {
                    let cartParse = JSON.parse(localStorage.getItem("cart"))
                    let i = 0
                    let newCart = cartParse.map(item => {
                        if (item.id == id) {
                            i++
                            return { id: item.id, name: result.name, price: result.price, buyQuantity: Number(item.buyQuantity) + 1, image: result.image };
                        }
                        return item
                    }

                    )
                    if (i == 0) {
                        newCart.push({ id: id, name: result.name, price: result.price, buyQuantity: 1, image: result.image })
                    }
                    localStorage.setItem("cart", JSON.stringify(newCart));
                }
                this.props.history.push("/cart")
            }

        } catch (error) {
            console.log(error)
        }

    }

    render() {
        return <div className="container">
            <div className="row">
                {/* find by name */}
                <div className="col-md-5">
                    {/* <div className="sidebar-categories">
                        <div className="head">Find By Product Name</div>
                        <ul className="main-categories" value={this.state.category} >
                            <form className="row contact_form">
                                <div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="productName" placeholder="Enter product name " onChange={this.setProductName} />
                                    </div>
                                </div>
                            </form>

                        </ul>
                    </div> */}

                    {/* Find by category */}
                    <div className="sidebar-categories">
                        <div className="head">Browse Categories</div>
                        <ul className="main-categories" value={this.state.category} >
                            {/* {this.state.categories.map((category) => {
                                return <li className="main-nav-list" ><button style={{ margin: "auto" }} className="primary-btn" onClick={this.setParam} name="category" key={category._id} value={category._id} >{category.name}</button></li>
                            })} */}

                            {this.state.categories.map((category) => {
                                return <li className="main-nav-list"><a><button style={{ margin: "auto" }} onClick={this.setParam} name="category" key={category._id} value={category._id} >{category.name}</button></a></li>
                            })}

                        </ul>
                    </div>

                </div>

                <div className="col-md-7">

                    <div className="filter-bar d-flex flex-wrap align-items-center">
                        <div className="sorting">
                        </div>
                        <div className="sorting mr-auto">
                        </div>
                    </div>
                    <div >
                        <div className="row">
                            {this.state.response && this.state.response.map(item => {
                                return <div key={item._id} className="col-lg-4 col-md-6">
                                    <div className="single-product">
                                        <img className="img-fluid" src={"http://localhost:5000/open_image?imageName=" + item.image.slice(64, item.image.length)} />
                                        <div className="product-details">
                                            <h6>{item.name}</h6>
                                            <div className="price">
                                                <h6>$ {item.price}</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <div className="prd-bottom">
                                                <a onClick={() => { this.addToCart(item._id) }} className="social-info">
                                                    <span className="ti-bag"></span>
                                                    <p className="hover-text">add to bag</p>
                                                </a>
                                                <Link to={"/product_detail/" + item._id} className="social-info">
                                                    <span className="lnr lnr-move"></span>
                                                    <p className="hover-text">view more</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}

                        </div>
                    </div>
                    <div className="filter-bar d-flex flex-wrap align-items-center">
                        <div className="sorting">
                        </div>
                        <div className="sorting mr-auto">
                        </div>
                    </div>

                </div>
            </div>
        </div>


    }



}

export default withRouter(CardAllProduct)
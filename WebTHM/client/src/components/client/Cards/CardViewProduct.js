import React from 'react'
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

import '../css/main.css'
import '../css/linearicons.css'
import '../css/font-awesome.min.css'
import '../css/themify-icons.css'
import '../css/bootstrap.css'
import '../css/owl.carousel.css'
import '../css/nice-select.css'
import '../css/nouislider.min.css'
import '../css/ion.rangeSlider.css'
import '../css/ion.rangeSlider.skinFlat.css'
import '../css/magnific-popup.css'

class CardViewProduct extends React.Component {
    constructor(props) {
        super(props)

        let { match } = this.props
        let { id } = match.params

        this.state = {
            id: id,
            name: "",
            price: "",
            quantity: "",
            description: "",
            image: "",
            category: "",
            buyQuantity: 1,
            categoryName: "",

            commentArray: [],
            content: ""
        }

    }

    componentDidMount() {
        this.loadProduct()
        this.loadComment()

    }

    addComment = async () => {
        if (localStorage.getItem("accessToken") != null) {
            let userId = JSON.parse(localStorage.getItem("user")).id
            console.log(userId)

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "productId": this.state.id,
                "userId": userId,
                "content": this.state.content
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            try {
                let response = await fetch("http://localhost:5000/comment", requestOptions)
                if (response.ok) {
                    this.loadComment()
                }
            } catch (error) {
                console.log(error)
            }
        }else{
            let a = window.confirm("You are not login ! Do you wanna login now?")
            if(a == true){
                this.props.history.push("/login")
            }
        }

    }

    loadComment = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        try {
            let response = await fetch("http://localhost:5000/comment/getbyproductId/" + this.state.id, requestOptions)
            let result = await response.json()
            if (response.ok) {
                this.setState({ commentArray: result })
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    loadCategory = async (id) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:5000/category/" + id, requestOptions)
            let result = await response.json()
            this.setState({ categoryName: result.name })
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
            let response = await fetch("http://localhost:5000/product/" + this.state.id, requestOptions)
            let result = await response.json()
            this.setState({
                name: result.name,
                price: result.price,
                quantity: result.quantity,
                description: result.description,
                category: result.category,
                image: result.image

            })

            this.loadCategory(result.category)
        } catch (error) {
            console.log(error)
        }
    }

    setParam = (event) => {
        if(event.target.value < this.state.quantity){
            this.setState({ [event.target.name]: event.target.value })
        }else{
            alert("Exceeded the number of items in stock!")
            this.setState({ [event.target.name]: this.state.quantity })
        }
        
    }

    setParams = (event) => {
            this.setState({ [event.target.name]: event.target.value })   
    }

    addToCart = async () => {
        let cart = localStorage.getItem("cart")

        if (cart == null) {

            localStorage.setItem("cart",
                JSON.stringify([
                    { id: this.state.id, name: this.state.name, price: this.state.price, buyQuantity: this.state.buyQuantity, image: this.state.image }
                ])
            )
            this.props.history.push("/cart")
        } else {
            let cartParse = JSON.parse(localStorage.getItem("cart"))
            let i = 0
            let newCart = cartParse.map(item => {
                if (item.id == this.state.id) {
                    i++
                    return { id: item.id, name: this.state.name, price: this.state.price, buyQuantity: Number(item.buyQuantity) + Number(this.state.buyQuantity), image: this.state.image };
                }
                return item
            }

            )
            if (i == 0) {
                newCart.push({ id: this.state.id, name: this.state.name, price: this.state.price, buyQuantity: this.state.buyQuantity, image: this.state.image })
            }
            localStorage.setItem("cart", JSON.stringify(newCart))

            this.props.history.push("/cart")

        }
    }

    up = () => {
        if (this.state.quantity > this.state.buyQuantity) {
            this.setState({ buyQuantity: this.state.buyQuantity + 1 })
            console.log(this.state.buyQuantity)
        }
    }

    down = (event) => {
        let value = this.state.buyQuantity
        if (value > 1) {
            this.setState({ buyQuantity: this.state.buyQuantity - 1 })
            console.log(this.state.buyQuantity)
        }
    }

    render() {
        return <div key={this.state.id}>
            <div className="product_image_area">
                <div className="container">
                    <div className="row s_product_inner">
                        <div className="col-lg-6">
                            <div >
                                <div className="single-prd-item">
                                    <img className="img-fluid" src={"http://localhost:5000/open_image?imageName=" + this.state.image.slice(64, this.state.image.length)} alt="" />
                                </div>
                            </div>



                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <div className="s_product_text">
                                <h3>{this.state.name}</h3>
                                <h2>${this.state.price}</h2>
                                <ul className="list">
                                    <li><a className="active" href="#"><span>Category </span>: {this.state.categoryName}</a></li>
                                    <li><a href="#"><span>Availibility</span> : In Stock</a></li>
                                </ul>
                                <p>{this.state.description}</p>
                                <div className="product_count">
                                    <label>Quantity:</label>
                                    {/* <input type="text" value={this.state.buyQuantity} onChange={this.setParam} name="buyQuantity" id="sst" maxLength="12" title="Quantity:" className="input-text qty" /> */}
                                    <input type="text" value={this.state.buyQuantity} onChange={this.setParam} name="buyQuantity" id="sst" maxLength="12" title="Quantity:" className="input-text qty" />
                                    <button onClick={this.up}
                                        className="increase items-count" type="button"><i className="lnr lnr-chevron-up"></i></button>
                                    <button onClick={this.down}
                                        className="reduced items-count" type="button"><i className="lnr lnr-chevron-down"></i></button>
                                </div>
                                <div className="card_area d-flex align-items-center">
                                    <a className="primary-btn" onClick={this.addToCart}>Add to Cart</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">

                            <div class="comment-form">
                                <h4>Leave a Reply</h4>
                                <form>
                                    <div class="form-group">
                                        <input type="text" name="content" class="form-control" placeholder="Your Comment" onChange={this.setParams} />
                                    </div>
                                    <a class="primary-btn submit_btn" onClick={this.addComment}>Comment</a>
                                </form>
                            </div>
                        </div>

                        {/* hien thi comment */}
                        <div className="col-lg-6">
                            <div className="comments-area">
                                <h4>Comments</h4>
                                {this.state.commentArray.map(item => {
                                    return <div>
                                        <br />
                                        <div className="comment-list" key={item._id}>
                                            <div className="single-comment justify-content-between d-flex">
                                                <div className="user justify-content-between d-flex">
                                                    <div className="thumb">

                                                    </div>
                                                    <div className="desc">
                                                        <h5><a href="#">{item.userName}</a></h5>
                                                        <p className="comment">
                                                            {item.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }

                                )}

                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <br />
            <br />



        </div>
    }

}

export default withRouter(CardViewProduct)
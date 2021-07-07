import React from 'react'
import { withRouter } from "react-router-dom";

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

class CardCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            total: 0,
            newCarts: [],
            code: "",
            discountPersent: 0,
            i: 0
        }
    }

    componentDidMount() {
        this.loadCart()
    }

    loadCart = () => {
        if (localStorage.getItem("cart")) {
            let productArray = JSON.parse(localStorage.getItem("cart"))
            var tong = 10
            for (let i = 0; i < productArray.length; i++) {
                tong = tong + productArray[i].price * productArray[i].buyQuantity
            }
        }

        this.setState({ products: JSON.parse(localStorage.getItem("cart")) })
        this.setState({ total: tong })
        
    }

    setParams = (event, id) => {
        if (event.target.value > 0) {
            let products = this.state.products.map(item => {
                if (item.id == id) {
                    return { ...item, buyQuantity: event.target.value };
                }
                else {
                    return item;
                }
            })

            localStorage.setItem("cart", JSON.stringify(products))

            this.setState({ products: JSON.parse(localStorage.getItem("cart")) })

            let productArray = JSON.parse(localStorage.getItem("cart"))
            var tong = 10
            for (let i = 0; i < productArray.length; i++) {
                tong = tong + productArray[i].price * productArray[i].buyQuantity
            }

            this.setState({ total: tong })

        }
    }



    deleteProduct = (id) => {
        if (localStorage.getItem("cart")) {
            let carts = JSON.parse(localStorage.getItem("cart"));

            let products = carts.filter(item => item.id != id);

            localStorage.setItem("cart", JSON.stringify(products));

            this.setState({ products: JSON.parse(localStorage.getItem("cart")) })

            let productArray = JSON.parse(localStorage.getItem("cart"))
            var tong = 10
            for (let i = 0; i < productArray.length; i++) {
                tong = tong + productArray[i].price * productArray[i].buyQuantity
            }

            this.setState({ total: tong })

        }
    }

    setCouponParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addCoupon = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            if (this.state.i == 0) {
                let response = await fetch("http://localhost:5000/coupon/getbycode/" + this.state.code, requestOptions)
                if (response.ok) {
                    let result = await response.json()
                    console.log(result)
                    if (result.status == "ENABLE") {
                        let total = (this.state.total * (100 - result.discountPersent)) / 100       
                        this.setState({
                            discountPersent: result.discountPersent,
                            total: total
                        })

                        this.setState({ i: 1 })

                        alert("Coupon Success!")

                        console.log(this.state.code)
                        console.log(this.state.discountPersent)
                    } else {
                        alert("Coupon Disable!")
                        this.setState({ code: "" })
                    }

                } else {
                    this.setState({ code: "" })
                    alert("Can not find this coupon!")
                }
            } else {
                alert("You just use coupon one time!")
                // this.setState({code:""})
            }

        } catch (error) {
            console.log(error)
        }
    }

    billProduct = async (i, result, productArray) => {

        console.log(productArray[i].buyQuantity)
        console.log(result._id)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "unitPrice": productArray[i].price,
            "quantity": productArray[i].buyQuantity,
            "billId": result._id,
            "productId": productArray[i].id,
            "productName": productArray[i].name
        });



        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            let response2 = await fetch("http://localhost:5000/billproduct", requestOptions)
            if (response2.ok) {
                let result2 = await response2.json()


            }
        } catch (error2) {
            console.log(error2)

        }

    }

    proceedCheckout = async () => {
        let jwt = localStorage.getItem("accessToken")
        if (jwt != null) {
            let user = JSON.parse(localStorage.getItem("user"))

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "buyerId": user.id,
                "status": "Wait for confirmation",
                "priceTotal": this.state.total,
                "couponName": this.state.code,
                "discountPercent": this.state.discountPersent
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            try {
                let response = await fetch("http://localhost:5000/bill", requestOptions)
                if (response.ok) {
                    let result = await response.json()
                    console.log("Bill Id :" + result._id)
                    console.log(result)


                    let productArray = JSON.parse(localStorage.getItem("cart"))

                    for (let i = 0; i < productArray.length; i++) {

                        console.log(productArray[i].name)

                        this.billProduct(i, result, productArray)

                    }

                    for (let i = 0; i < productArray.length; i++) {

                        this.updateProduct(i,productArray)

                    }

                    //send Email
                    this.sendEmail(result._id, JSON.parse(localStorage.getItem("user")).email)

                    localStorage.removeItem("cart")
                    localStorage.setItem("billId", result._id)
                    this.props.history.push("/bill_detail")

                }
            } catch (error) {
                console.log(error)

            }
        } else {
            this.props.history.push("/login")
        }
    }

    sendEmail = async (billId, email) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "billId": billId,
            "email": email
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:5000/sendEmailtoUser", requestOptions)
            if (response.ok) {
                let result = await response.json()
                console.log(result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    updateProduct = async (i,productArray) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "productId": productArray[i].id,
            "buyQuantity": productArray[i].buyQuantity
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:5000/product/updatewhenbuydone", requestOptions)
            if (response.ok) {
                let result = await response.json()
                console.log(result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return <div>
            <section className="cart_area">
                <div className="container">
                    <div className="cart_inner">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.products && this.state.products.map((item, index) => {
                                        return <tr key={index}>
                                            <td>
                                                <div className="media">
                                                    <div className="d-flex">
                                                        <img src={"http://localhost:5000/open_image?imageName=" + item.image.slice(64, item.image.length)} width={"150px"} height={"100px"} alt="" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h5>${item.price}</h5>
                                            </td>
                                            <td>
                                                <div className="product_count">
                                                    <input type="number" onChange={(event) => this.setParams(event, item.id)} name="buyQuantity" maxLength="12" defaultValue={item.buyQuantity}
                                                        className="input-text qty" />
                                                </div>
                                            </td>
                                            <td>
                                                <h5>$ {Number(item.buyQuantity) * Number(item.price)}</h5>
                                            </td>
                                            <td>
                                                <button onClick={() => { this.deleteProduct(item.id) }}><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    }
                                    )

                                    }


                                    <tr className="bottom_button">
                                        <td>
                                            <button className="gray_btn" >Update Cart</button>
                                        </td>
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            <div className="cupon_text d-flex align-items-center" style={{ margin: "auto" }}>
                                                <input type="text" onChange={this.setCouponParams} name="code" placeholder="Coupon Code" />
                                                <button className="primary-btn" onClick={this.addCoupon}>Apply</button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr className="shipping_area">
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            <h5>Shipping</h5>
                                        </td>
                                        <td>
                                            <div className="shipping_box">
                                                <ul className="list">
                                                    <li className="active"><a href="#">Ship Cost Default: $10.00</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            <h5>Subtotal</h5>
                                        </td>
                                        <td>
                                            <h5>$ {this.state.total}</h5>
                                        </td>
                                    </tr>


                                    <tr className="out_button_area">
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            <div className="checkout_btn_inner " style={{ margin: "auto" }}>
                                                <a onClick={this.proceedCheckout} className="primary-btn">Proceed to checkout</a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    }
}

export default withRouter(CardCart)
import React from 'react'
import { Component } from 'react';

export default class CardDetailBill extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "billId": "",
            "total": "",
            "discountPersent": "",
            response: []
        }
    }

    componentDidMount() {
        this.loadBill()
    }

    loadBill = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:5000/bill/" + localStorage.getItem("billId"), requestOptions)
            if (response.ok) {
                let result = await response.json()
                this.setState({ "billId": result._id, "total": result.priceTotal, "discountPersent": result.discountPercent })
                localStorage.removeItem("billId")
                this.loadBillProduct()

            }
        } catch (error) {
            console.log(error)

        }

    }

    loadBillProduct = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        try {
            let response = await fetch("http://localhost:5000/billproduct/getlistbybillid/" + this.state.billId, requestOptions)
            let result = await response.json()
            this.setState({
                response: result
            })

        } catch (error) {
            console.log(error)
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
            if(response.ok){
                let result = await response.json()
                console.log(result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return <div>
            <section className="order_details section_gap">
                <div className="container">
                    <h3 className="title_confirmation">Thank you. Your order has been received.</h3>
                    {/* <div className="row order_d_inner">
                        <div className="col-lg-4">
                            <div className="details_item">
                                <h4>Order Info</h4>
                                <ul className="list">
                                    <li><a href="#"><span>Order number</span> : 60235</a></li>
                                    <li><a href="#"><span>Date</span> : Los Angeles</a></li>
                                    <li><a href="#"><span>Total</span> : USD 2210</a></li>
                                    <li><a href="#"><span>Payment method</span> : Check payments</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="details_item">
                                <h4>Billing Address</h4>
                                <ul className="list">
                                    <li><a href="#"><span>Street</span> : 56/8</a></li>
                                    <li><a href="#"><span>City</span> : Los Angeles</a></li>
                                    <li><a href="#"><span>Country</span> : United States</a></li>
                                    <li><a href="#"><span>Postcode </span> : 36952</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="details_item">
                                <h4>Shipping Address</h4>
                                <ul className="list">
                                    <li><a href="#"><span>Street</span> : 56/8</a></li>
                                    <li><a href="#"><span>City</span> : Los Angeles</a></li>
                                    <li><a href="#"><span>Country</span> : United States</a></li>
                                    <li><a href="#"><span>Postcode </span> : 36952</a></li>
                                </ul>
                            </div>
                        </div>
                    </div> */}



                    <div className="order_details_table">
                        <h2>Order Details</h2>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.response.map(item => {
                                        return <tr key={item._id}>
                                            <td>
                                                <p>{item.productName}</p>
                                            </td>
                                            <td>
                                                <h5>x {item.quantity}</h5>
                                            </td>
                                            <td>
                                                <p>${item.quantity * item.unitPrice}</p>
                                            </td>
                                        </tr>
                                    })}
                                    <tr>
                                        <td>
                                            <h4>Shipping</h4>
                                        </td>
                                        <td>
                                            <h5></h5>
                                        </td>
                                        <td>
                                            <p>Flat rate: $10.00</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Discount Persent</h4>
                                        </td>
                                        <td>
                                            <h5></h5>
                                        </td>
                                        <td>
                                            <p>{this.state.discountPersent}%</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Total</h4>
                                        </td>
                                        <td>
                                            <h5></h5>
                                        </td>
                                        <td>
                                            <p>${this.state.total}</p>
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
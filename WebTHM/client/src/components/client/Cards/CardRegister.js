import React from 'react'
import { Link } from 'react-router-dom'
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

class CardRegister extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "name": "",
            "age": "",
            "role": "ROLE_MEMBER",
            "username": "",
            "password": "",
            "address": "",
            "gender": "",
            "phone": "",
            "email": ""
        }
    }

    setParam = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addUser = async () => {
        if(this.state.username.length >= 6 && this.state.password.length >= 6){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({
                "name": this.state.name,
                "username": this.state.username,
                "password": this.state.password,
                "age": this.state.age,
                "role": this.state.role,
                "address": this.state.address,
                "gender": this.state.gender,
                "phone": this.state.phone,
                "email": this.state.email
            });
    
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
    
            try {
                let response = await fetch("http://localhost:5000/user", requestOptions)
                if (response.ok) {
                    alert("You are in the system.Thank you so muck!")
                    this.props.history.push("/login")
                }
            } catch (error) {
                console.log(error)
            }
        }else{
            alert("Username or Password are less than six characters!")
        }



    }

    render() {
        return <div>
            <section className="checkout_area section_gap">
                <div className="container">
                    <div className="billing_details">
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-10">
                                <h3>Register For User</h3>
                                <form className="row contact_form" >
                                    <div className="col-md-6 form-group p_star">
                                        <input type="text" onChange={this.setParam} className="form-control" name="name" placeholder="Your Name" />

                                    </div>
                                    <div className="col-md-6 form-group p_star">
                                        <input type="number" onChange={this.setParam} className="form-control" name="age" placeholder="Your Age" />

                                    </div>
                                    <div className="col-md-6 form-group p_star">
                                        <input type="text" onChange={this.setParam} className="form-control" name="phone" placeholder="Your Phone" />

                                    </div>
                                    <div className="col-md-6 form-group p_star">
                                        <input type="text" onChange={this.setParam} className="form-control" name="email" placeholder="Your Email" />

                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <select className="country_select" name="gender" onChange={this.setParam}>
                                            <option value="">---***---</option>
                                            <option value="MALE">MALE</option>
                                            <option value="FEMALE">FEMALE</option>
                                        </select>
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input type="text" onChange={this.setParam} className="form-control" name="username" placeholder="Your Username" />

                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input type="text" onChange={this.setParam} className="form-control" name="password" placeholder="Your Password" />

                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input type="text" onChange={this.setParam} className="form-control" name="address" placeholder="Your Address" />

                                    </div>

                                    <div className="checkout_btn_inner " style={{ margin: "auto" }}>
                                        <a onClick={this.addUser} className="primary-btn">Register</a>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-1"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    }
}

export default withRouter(CardRegister)
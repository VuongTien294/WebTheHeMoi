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

class CardLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "username": "",
            "password": ""
        }
    }

    setParam = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }



    login = async () => {
        if (this.state.username.length >= 6 && this.state.password.length >= 6) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "username": this.state.username,
                "password": this.state.password
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            try {
                let response = await fetch("http://localhost:5000/login-user", requestOptions)
                if (response.ok) {
                    let result = await response.json()
                    localStorage.setItem("username", this.state.username)
                    localStorage.setItem("accessToken", result.accessToken)
                    this.props.history.push("/")
                }else{
                    alert("Username,Password wrong!")
                }
            } catch (error) {
                alert("Username,Password wrong!")
                console.log(error)
            }
        } else {
            alert("Username,Password are less than six characters!")
        }

    }

    register = () => {
        this.props.history.push("/register")
    }

    render() {
        return <div>
            <section className="login_box_area section_gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login_box_img">
                                <img className="img-fluid" src={require("../img/login.jpg").default} alt="" />
                                <div className="hover">
                                    <h4>Do not have a acount?</h4>
                                    <p>Join with us by create your own acounts</p>
                                    <a className="primary-btn" onClick={this.register}>Create an Account</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login_form_inner">
                                <h3>Log in to enter</h3>
                                <form className="row login_form" method="post">
                                    <div className="col-md-12 form-group">
                                        <input type="text" className="form-control" onChange={this.setParam} name="username" placeholder="Username" />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input type="password" className="form-control" onChange={this.setParam} name="password" placeholder="Password" />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <button type="button" onClick={this.login} value="submit" className="primary-btn">Log In</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    }

}

export default withRouter(CardLogin)
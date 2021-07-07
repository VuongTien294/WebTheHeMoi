
import React from 'react'
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
import { Link } from 'react-router-dom'
import { Route, withRouter } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            productName:""
        }

    }

    logout = () => {
        if (localStorage.getItem("accessToken") != null) {
            localStorage.removeItem("user")
            localStorage.removeItem("accessToken")
            localStorage.removeItem("billId")
            localStorage.removeItem("cart")
            alert("Logout Success!")
            this.props.history.push("/")
        } else {
            alert("You are not Login!")
            this.props.history.replace("/login")

        }
    }

    search =()=>{
        this.props.history.push("/product/searchbyname/"+this.state.productName)
    }

    setParam = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return <>
            <header className="header_area sticky-header">
                <div className="main_menu">
                    <nav className="navbar navbar-expand-lg navbar-light main_box">
                        <div className="container">
                            <Link className="navbar-brand logo_h" to="/"><img src={require("../img/logo.png").default} alt="" /></Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>

                            <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                                <form className="row contact_form" style={{ marginLeft: "50px" }}>
                                    <div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="productName" placeholder="Enter product name " onChange={this.setParam} />
                                        </div>
                                    </div>
                                </form>
                                <span style={{marginLeft :"20px"}} class="input-group-btn">
                                    <button class="btn btn-default" type="button" onClick={this.search}><i class="lnr lnr-magnifier"></i></button>
                                </span>
                                <ul className="nav navbar-nav menu_nav ml-auto">
                                    <li className="nav-item active"><Link className="nav-link" to="/">Home</Link></li>
                                    <li className="nav-item active"><Link className="nav-link" to="/product/search">Shop</Link></li>
                                    <li className="nav-item active"><Link className="nav-link" to="/contact">Contact</Link></li>
                                    {/* <li className="nav-item active"><Link className="nav-link" to="/blog">Blog</Link></li> */}
                                    <li className="nav-item active"><Link className="nav-link" to="/order-tracking">Order Tracking</Link></li>
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    <li className="nav-item"><Link to="/cart" className="cart"><span className="ti-bag"></span></Link></li>
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    <li className="nav-item"><Link to="/login" className="nav-link" >Login</Link></li>
                                    <li className="nav-item"><Link onClick={this.logout} className="nav-link">Logout</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

        </>
    }
}

export default withRouter(Header)
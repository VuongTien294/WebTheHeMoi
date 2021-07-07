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

export default class Banner extends React.Component {
    render() {
        return <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <section  >
                <div className="container" >
                    <div className="row fullscreen align-items-center justify-content-start">
                        <div className="col-lg-12">
                            <div>
                                <div className="row single-slide align-items-center d-flex">
                                    <div className="col-lg-5 col-md-6">
                                        <div className="banner-content">
                                            <h1>Nike New <br />Collection!</h1>
                                            <p>If you want to find the best shoes. Come to us. We will give you the best, most professional experience you get.
                                             Don't forget our founder.Tiendeptrai1234.The most handsome and polite in the world</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="banner-img" >
                                            <img className="img-fluid" src={require("../img/banner/banner-img.png").default} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    }
}
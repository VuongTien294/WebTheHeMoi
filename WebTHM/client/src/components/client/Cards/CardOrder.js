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

 class CardOrder extends React.Component {
    constructor(props){
        super(props)
        this.state={
            "billId":""
        }
        
    }

    setParam = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    setBillId=()=>{
        localStorage.setItem("billId",this.state.billId)
        this.props.history.push("/bill_detail")
    }

    render() {
        return <div>
            <section className="tracking_box_area section_gap">
                <div className="container">
                    <div className="tracking_box_inner">
                        <p>To track your order please enter your Order ID in the box below and press the "Track" button. This
                    was given to you on your bill that you has buy</p>
                        <form className="row tracking_form">
                            <div className="col-md-12 form-group">
                                <input type="text" class="form-control" name="billId" value={this.state.billId} onChange={this.setParam} placeholder="Order ID" />
                            </div>
                            <div className="col-md-12 form-group">
                                <button onClick={this.setBillId} type="button" className="primary-btn">Track Order</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    }
}

export default withRouter(CardOrder)

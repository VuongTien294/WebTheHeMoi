import React from "react";
import { withRouter } from 'react-router-dom';

// components

class CardUpdateCategory extends React.Component {
    constructor(props) {
        super(props)

        let { match } = this.props
        let { id } = match.params

        console.log(id)

        this.state = {
            "id": id,
            "discountPercent": "",
            "couponName": "",
            "buyerId": "",
            "status": "",
            "priceTotal": ""
        }
    }

    componentDidMount() {
        if (this.state.id) {
            this.loadBill()
        }

    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    loadBill = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:5000/bill/" + this.state.id, requestOptions)
            let result = await response.json()
            this.setState({ ...result })

        } catch (error) {
            console.log('error', error)
        }
    }

    updateBill = async () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "discountPercent": this.state.discountPercent,
            "couponName": this.state.couponName,
            "buyerId": this.state.buyerId,
            "status": this.state.status,
            "priceTotal": this.state.priceTotal
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/bill/" + this.state.id, requestOptions)
            .then(response => {
                if (response.ok) {

                    alert("Update Status Success")
                    window.location.reload()
                    // let { history } = this.props
                    // history.goBack()
                   
                }
            })
            .then(result => console.log(result))
            .catch(error => {
                alert("SomeThing Wrong!")
                console.log('error', error);
            })
    }

    render() {
        return <>

            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Bill</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Update Bill Status
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Bill Status
                                    </label>

                                    <input
                                        type="radio" name="status" onChange={this.setParams} value="Wait for confirmation"

                                    />
                                    <span className="ml-1">Wait for confirmation</span>&emsp;
                                    <input
                                        type="radio" name="status" onChange={this.setParams} value="Delivered"

                                    />
                                    <span className="ml-1">Delivered</span>&emsp;

                                    <input
                                        type="radio" name="status" onChange={this.setParams} value="Paid"

                                    />
                                    <span className="ml-1">Paid</span>

                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button" onClick={this.updateBill}
                            >
                                Update Category
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    }
}

export default withRouter(CardUpdateCategory)
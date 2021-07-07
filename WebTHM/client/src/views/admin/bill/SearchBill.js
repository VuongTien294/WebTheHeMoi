import CardSearchBill from 'components/admin/Cards/CardSearchBill';
// import CardSearchProduct from 'components/admin/Cards/CardSearchProduct';
import React, { Component } from 'react'

export default class SearchProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buyerId: "",
            response: []
        }
    }

    setParam = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loadBill = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:5000/bill/getbillbyuser/" + this.state.buyerId, requestOptions)
            if (response.ok) {
                let result = await response.json()
                this.setState({ response: result })
            }
        } catch (error) {
            console.log(error)
        }
    }

    delete = async (id) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:5000/bill/" + id, requestOptions)
            if (response.ok) {
                alert("Xoa thanh cong!")
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }

    }

    render() {
        return <>
            <div className="flex flex-wrap mt-4">

                <div className="w-full mb-12 px-4">
                    <GetUser setParam={this.setParam} getBill={this.loadBill} /><br />
                    <CardSearchBill dataProperties={this.state.response} deleteProperties={this.delete} /><br />
                </div>
            </div>
        </>
    }
}


class GetUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            users: []
        }

    }

    componentDidMount() {
        this.loadUser()
    }

    loadUser = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:5000/user", requestOptions)
            if (response.ok) {
                let result = await response.json()
                this.setState({ users: result })
            }
        } catch (error) {
            console.log(error)
        }

    }

    render() {
        return <div>
            <label>Search Form</label>
            <form>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                User Select
                </label>
                            <div className="relative inline-block w-full text-gray-700">

                                <select name="buyerId" value={this.state.buyerId} onChange={this.props.setParam} className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="Regular input">
                                    <option value="">---***---</option>
                                    {this.state.users.map((user) => {
                                        return <option key={user._id} value={user._id}>{user.name}</option>
                                    })}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button" onClick={this.props.getBill}
                    >
                        Load Bill
          </button>
                </div>
            </form>
        </div>
    }

}

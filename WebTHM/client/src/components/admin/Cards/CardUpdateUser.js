import React from "react";
import { withRouter } from "react-router";

class CardUpdateUser extends React.Component {
    constructor(props) {
        super(props)

        let { match } = this.props
        let { id } = match.params

        this.state = {
            id: id,
            name: "",
            age: "",
            role: "",
            username: "",
            password: "",
            address: "",
            gender: "",
            phone: "",
            email: ""
        }

    }

    componentDidMount() {
        if (this.state.id) {
            this.loadUser()
        }
    }

    setParam = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    loadUser = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:5000/user/" + this.state.id, requestOptions)
            let result = await response.json()
            this.setState({
                "name": result.name,
                "age": result.age,
                "username": result.username,
                "password": result.password,
                "role": result.role,
                "gender": result.gender,
                "phone": result.phone,
                "email": result.email,
                "address": result.address
            })
        } catch (error) {
            console.log(error)
        }
    }

    updateUser = async () => {
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
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        try {
            let response = await fetch("http://localhost:5000/user/" + this.state.id, requestOptions)
            if (response.ok) {
                alert("Update Success!")

                let { history } = this.props
                history.goBack()

                return
            }


        } catch (error) {
            console.log(this.state)
            console.log(error)
        }

    }

    render() {
        return <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">User</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Add User
          </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Name
                </label>
                                    <input
                                        type="text" name="name" onChange={this.setParam} value={this.state.name}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Age
                </label>
                                    <input
                                        type="number" name="age" onChange={this.setParam} value={this.state.age}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Role
                </label>
                                    <select className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" name="role" onChange={this.setParam} value={this.state.role}>
                                        <option value="">---***---</option>
                                        <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                                        <option value="ROLE_MEMBER">ROLE_MEMBER</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Username
                </label>
                                    <input
                                        type="text" name="username" onChange={this.setParam} value={this.state.username}
                                        className="w-full h-16 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Address
                </label>
                                    <input
                                        type="text" name="address" onChange={this.setParam} value={this.state.address}
                                        className="w-full h-16 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Gender
                </label>
                                    <input
                                        type="radio" name="gender" onChange={this.setParam} value="MALE"

                                    />
                                    <span className="ml-1">Male</span>&emsp;

                                     <input
                                        type="radio" name="gender" onChange={this.setParam} value="FEMALE"

                                    />
                                    <span className="ml-1">Female</span>

                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Phone
                </label>
                                    <input
                                        type="text" name="phone" onChange={this.setParam} value={this.state.phone}
                                        className="w-full h-16 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Email
                </label>
                                    <input
                                        type="text" name="email" onChange={this.setParam} value={this.state.email}
                                        className="w-full h-16 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button" onClick={this.updateUser}
                            >
                                Update User
          </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    }


}
export default withRouter(CardUpdateUser)
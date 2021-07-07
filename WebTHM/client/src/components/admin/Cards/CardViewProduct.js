import React from "react";

import { withRouter } from "react-router";
// import { useHistory } from "react-router";

// components

class CardViewProduct extends React.Component {
    constructor(props) {
        super(props)


        let { match } = this.props
        let { id } = match.params


        this.state = {
            id: id,
            name: "",
            price: "",
            quantity: "",
            description: "",
            categoryId: "",
            imageFile: null

        }

    }

    componentDidMount() {
        this.loadProduct()
    }

    loadProduct = async () => {
        var myHeaders = new Headers();


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        try {
            let response = await fetch("http://localhost:8080/api/product/" + this.state.id, requestOptions)
            let result = await response.json()
            console.log(result)
            this.setState({
                name: result.name,
                price: result.price,
                quantity: result.quantity,
                description: result.description,
                categoryId: result.categoryId,
                imageFile: result.images
            })

        } catch (error) {
            console.log(error)
        }
    }

    updateProduct = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));


        var formdata = new FormData();
        formdata.append("id", this.state.id);
        formdata.append("name", this.state.name);
        formdata.append("price", this.state.price);
        formdata.append("quantity", this.state.quantity);
        formdata.append("description", this.state.description);
        formdata.append("categoryId", this.state.categoryId);
        formdata.append("imageFile", this.state.imageFile, this.state.imageFile.name);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:8080/api/admin/product/update", requestOptions)
            if (response.ok) {
                alert("Thanh cong!")
                let { history } = this.props
                history.goBack()
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
                        <h6 className="text-blueGray-700 text-xl font-bold">Product</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            View Product
          </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Product Name
                </label>
                                    <input
                                        type="text" name="name" value={this.state.name} readOnly
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
                                        Product Price
                </label>
                                    <input
                                        type="number" name="price" value={this.state.price} readOnly
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
                                        Product Quantity
                </label>
                                    <input
                                        type="number" name="quantity" value={this.state.quantity} readOnly
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
                                        Product description
                </label>
                                    <textarea
                                        type="text" name="description" value={this.state.description} readOnly
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
                                        Category Id
                </label>
                                    <input
                                        type="number" name="categoryId" readOnly value={this.state.categoryId}
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
                                        Product Image
                </label>
                                    {this.state.id && <img alt="description of image" src={"http://localhost:8080/image/" + this.state.imageFile} width={"100"} />}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    }


}
export default withRouter(CardViewProduct)
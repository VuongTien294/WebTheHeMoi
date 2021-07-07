import React from "react";

export default class CardAddProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            price: "",
            quantity: "",
            description: "",
            category: "",
            image: null,
            categories: []
        }

    }

    componentDidMount() {
        this.loadCategory()
    }

    setParam = (event) => {
        console.log(this.state.category)
        this.setState({ [event.target.name]: event.target.value })
    }

    setFile = (event) => {
        let file = event.target.files[0]
        if (file != null) {
            this.setState({ image: file })
        }
    }


    loadCategory = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        try {
            let response = await fetch("http://localhost:5000/category", requestOptions)
            let result = await response.json()
            this.setState({ categories: result })
        } catch (error) {
            console.log('error', error)
        }
    }

    addProduct = async () => {

        var formdata = new FormData();
        formdata.append("name", this.state.name);
        formdata.append("price", this.state.price);
        formdata.append("quantity", this.state.quantity);
        formdata.append("description", this.state.description);
        formdata.append("category", this.state.category);
        formdata.append("image", this.state.image, this.state.image.name);


        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:5000/product", requestOptions)
            if (response.ok) {
                alert("Add Product Sucess!")
                let result = await response.json()

                console.log(result)
                // window.location.reload()
            }
        } catch (error) {
            alert("SomeThing Wrong!")
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
                            Add Product
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
                                        type="text" name="name" onChange={this.setParam}
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
                                        type="number" name="price" onChange={this.setParam}
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
                                        type="number" name="quantity" onChange={this.setParam}
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
                                        type="text" name="description" onChange={this.setParam}
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
                                        Category Select
                </label>
                                    <div className="relative inline-block w-full text-gray-700">
                                        <select name="category" value={this.state.category} onChange={this.setParam} className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="Regular input">
                                        <option  value="">---***---</option>
                                            {this.state.categories.map((category) => {
                                                return <option key={category._id} value={category._id}>{category.name}</option>
                                            })}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                        </div>
                                    </div>
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
                                    <input type="file" onChange={this.setFile} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button" onClick={this.addProduct}
                            >
                                Add Product
          </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    }


}

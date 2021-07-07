import React from "react";
import { withRouter } from "react-router";


// components

 class CardUpdateProduct extends React.Component {
    constructor(props) {
        super(props)

        let { match } = this.props
        let { id } = match.params

        this.state = {
            id:id,
            name: "",
            price: "",
            quantity: "",
            description: "",
            category: "",
            image: null
 
        }

    }

    componentDidMount() {
        this.loadProduct()
    }

    setParam = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    setFile = (event) => {
        let file = event.target.files[0]
        console.log("Chuoi file :"+event.target.files[0])
        if (file != null) {
            this.setState({ image: file })
        }
    }


    loadProduct = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

        try {
            let response = await fetch("http://localhost:5000/product/" + this.state.id, requestOptions)
            let result = await response.json()
            // console.log(result.image)
            this.setState({
                name: result.name,
                price:result.price,
                quantity:result.quantity,
                description:result.description,
                category:result.category,
                // image:result.image
            })

        //   console.log(this.state.image)

        } catch (error) {
            console.log(error)
        }
    }

    updateProduct = async () => {

        if(this.state.image != null){
            var formdata = new FormData();
            // formdata.append("id", this.state.id);
            formdata.append("name", this.state.name);
            formdata.append("price", this.state.price);
            formdata.append("quantity", this.state.quantity);
            formdata.append("description", this.state.description);
            formdata.append("category", this.state.category);
            formdata.append("image", this.state.image, this.state.image.name);
    
            var requestOptions = {
                method: 'PUT',
                body: formdata,
                redirect: 'follow'
            };
    
            try {
                let response = await fetch("http://localhost:5000/product/"+this.state.id, requestOptions)
                if (response.ok) {
                    alert("Update Success!")
                    let {history} = this.props
                    history.goBack()
                    console.log(this.state)
                }
            } catch (error) {
                console.log(this.state)
                console.log(error)
            }
        }else{
            alert("You need to pick a picture!")
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
                            Update Product
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
                                        Product Price
                </label>
                                    <input
                                        type="number" name="price" onChange={this.setParam} value={this.state.price}
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
                                        type="number" name="quantity" onChange={this.setParam} value={this.state.quantity}
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
                                        type="text" name="description" onChange={this.setParam} value={this.state.description}
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
                                        Category
                </label>
                                    <input
                                        type="text" name="category" onChange={this.setParam} readOnly value={this.state.category}
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
                                    <input type="file" onChange={this.setFile} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button" onClick={this.updateProduct}
                            >
                                Update Product
          </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    }


}
export default withRouter(CardUpdateProduct)
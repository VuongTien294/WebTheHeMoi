import CardSearchProduct from 'components/admin/Cards/CardSearchProduct';
import React, { Component } from 'react'

export default class SearchProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: "",
            response: []
        }
    }

    setParam = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state.category)
    }

    loadProduct = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:5000/product/getbycate/" + this.state.category, requestOptions)
            let result = await response.json()
            if (response.ok) {
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
            let response = await fetch("http://localhost:5000/product/" + id, requestOptions)
            if (response.ok) {
                alert("Delete Success!")
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
                    <GetCategory setParam={this.setParam} getProduct={this.loadProduct} /><br />
                    <CardSearchProduct dataProperties={this.state.response} deleteProperties={this.delete} /><br />
                </div>
            </div>

        </>
    }

}


class GetCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }

    }

    componentDidMount() {
        this.loadCategory()
    }

    loadCategory = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:5000/category", requestOptions)
            if (response.ok) {
                let result = await response.json()
                this.setState({ categories: result })
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
                                Category Select
                </label>
                            <div className="relative inline-block w-full text-gray-700">
                                <select name="category" value={this.state.category} onChange={this.props.setParam} className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="Regular input">
                                    <option value="">---***---</option>
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

                <div>
                    <button
                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button" onClick={this.props.getProduct}
                    >
                        Load Product
          </button>
                </div>
            </form>
        </div>
    }

}

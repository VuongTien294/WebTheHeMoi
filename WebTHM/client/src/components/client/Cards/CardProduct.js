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
import { Link, withRouter } from 'react-router-dom'


 class CardProduct extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			response:[]
		}
	}

	componentDidMount() {
		this.loadProduct()
	}

	loadProduct = async () => {
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		  };

		try {
			let response = await fetch("http://localhost:5000/product", requestOptions)
			let result = await response.json()
			if (response.ok) {
				this.setState({ response: result })
			}
		} catch (error) {
			console.log(error)

		}
	}

	addToCart = async (id) => {
		
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		};

		try {
			let response = await fetch("http://localhost:5000/product/" + id, requestOptions)
			if (response.ok) {
				let result = await response.json()

				let cart = localStorage.getItem("cart")
				if (cart == null) {
					
					localStorage.setItem("cart",
						JSON.stringify([
							{ id: id, name: result.name, price: result.price, buyQuantity: 1, image: result.image }
						])
					)

                this.props.history.push("/cart")

				} else {
					let cartParse = JSON.parse(localStorage.getItem("cart"))
					let i = 0
					let newCart = cartParse.map(item => {
						if (item.id == id) {
							i++
							return { id: item.id, name: result.name, price: result.price, buyQuantity: Number(item.buyQuantity) + 1, image: result.image };
						}
						return item
					}

					)
					if (i == 0) {
						newCart.push({ id: id, name: result.name, price: result.price, buyQuantity: 1, image: result.image })
					}
					localStorage.setItem("cart", JSON.stringify(newCart));
				}
 
				this.props.history.push("/cart")

			}

		} catch (error) {
			console.log(error)
		}

	}

	render() {
		return <section>
			<div className="single-product-slider">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-6 text-center">
							<h2>Best Seller Of This Month</h2>
						</div>
					</div>
					<br />
					<div className="row">
						{this.state.response.map(item => {
							return <div key={item._id} className="col-lg-3 col-md-6">
								<div className="single-product">
									<img className="img-fluid" src={"http://localhost:5000/open_image?imageName=" + item.image.slice(64,item.image.length)}  alt="" />
									<div className="product-details">
										<h6>{item.name}</h6>
										<div className="price">
											<h6>$ {item.price}</h6>
											<h6 style={{ color: "orange" }}>In Stock</h6>
										</div>
										<div className="prd-bottom" >

											<a onClick={() => { this.addToCart(item._id) }} className="social-info">
												<span className="ti-bag"></span>
												<p className="hover-text">add to bag</p>
											</a>
											<Link className="social-info" to={"/product_detail/" + item._id}>
												<span className="lnr lnr-move"></span>
												<p className="hover-text">view more</p>
											</Link>

										</div>
									</div>
								</div>
							</div>
						}
						)
						}

					</div>
				</div>
			</div>
		</section>
	}
}

export default withRouter(CardProduct)
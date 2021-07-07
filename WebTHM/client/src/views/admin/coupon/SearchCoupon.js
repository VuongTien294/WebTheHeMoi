import React from "react";
import CardSearchCoupon from "../../../components/admin/Cards/CardSearchCoupon";

export default class SearchCoupon extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      response: []
    }
  }

  componentDidMount() {
    this.loadCoupon()
  }

  loadCoupon = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    try {
      let response = await fetch("http://localhost:5000/coupon", requestOptions)
      if (response.ok) {
        let result = await response.json()//mang doi tuong json tra ve
        this.setState({ response: result })
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  delete = async(id) => {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    try {
      let response = await fetch("http://localhost:5000/coupon/" + id, requestOptions)
      if(response.ok){
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
          <CardSearchCoupon dataProperties={this.state.response} deleteProperties={this.delete} />
        </div>
      </div>
    </>
  }
}

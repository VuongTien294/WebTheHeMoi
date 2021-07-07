import React from "react";
// import CardSearchCategory from "components/Cards/CardSearchCategory.js";
import CardSearchContact from "../../../components/admin/Cards/CardSearchContact";

export default class SearchContact extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      response: []
    }
  }

  componentDidMount() {
    this.loadContact()
  }


  loadContact = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    try {
      let response = await fetch("http://localhost:5000/contact", requestOptions)
      if (response.ok) {
        let result = await response.json()
        this.setState({ response: result })
      }


    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSearchContact dataProperties={this.state.response} />
        </div>
      </div>
    </>
  }


}

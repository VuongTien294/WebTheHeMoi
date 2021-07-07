import React from "react";
// import CardSearchCategory from "components/Cards/CardSearchCategory.js";
import CardSearchCategory from "../../../components/admin/Cards/CardSearchCategory";

export default class SearchCategory extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      response: []
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
        this.setState({ response: result })
      }


    } catch (error) {
      console.log(error)
    }
  }

  setSelectedId = (id) => {
    this.setState({ selectedId: id })
  }

  reset = () => {
    this.setState({
      response: []
    }, this.loadCategory)
  }

  delete = async (id) => {

    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
    try {
       let response = await fetch("http://localhost:5000/category/" + id, requestOptions)
       if(response.ok){
         alert("Delete Success!")
         this.reset()
         return
       }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSearchCategory dataProperties={this.state.response} deleteProperties={this.delete} />
        </div>
      </div>
    </>
  }


}

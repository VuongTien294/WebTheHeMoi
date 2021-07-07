import CardSearchBillProduct from 'components/admin/Cards/CardSearchBillProduct';
import React from 'react'
import { withRouter } from 'react-router';

 class ViewBill extends React.Component {
    constructor(props) {
        super(props)

        let { match } = this.props
        let { id } = match.params

        this.state = {
            "billId": id,
            response:[]
        }
    }

    componentDidMount() {
        this.loadBillProduct()
    }

    loadBillProduct = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

        try {
            let response = await fetch("http://localhost:5000/billproduct/getlistbybillid/"+this.state.billId, requestOptions)
            let result = await response.json()
            this.setState({
               response:result
            })

        } catch (error) {
            console.log(error)
        }
    }

    delete = async (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));


        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        try {
            let response = await fetch("http://localhost:8080/api/billproduct/delete?id=" + id, requestOptions)
            if (response.ok) {
                alert("Delete Success!")
                this.reset()
            }
        } catch (error) {
            console.log(error)
        }

    }

    render() {
        return <>
          
                <div className="flex flex-wrap mt-4">
                    <div className="w-full mb-12 px-4">
                    <CardSearchBillProduct dataProperties={this.state.response} deleteProperties={this.delete} id={this.setSelectedId} /><br />
                    </div>
                </div>
           
        </>
    }
}

export default withRouter(ViewBill)


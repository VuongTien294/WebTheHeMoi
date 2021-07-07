import React from 'react'
import Banner from 'components/client/Banner/Banner.js'
import Feature from 'components/client/Features/Feature'
import CardProduct from 'components/client/Cards/CardProduct'
import Exclusive from 'components/client/Exclusive deal/Exclusive'
import BrandArea from 'components/client/Brand Area/BrandArea'
import DealOfWeek from 'components/client/Deal of week/DealOfWeek'


export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            name: "",
            phone: "",
            email: "",
            address: ""
        }
    }

    setUser = async () => {
        let username = localStorage.getItem("username")
        if (username != null) {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "username": username
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            try {
                let response = await fetch("http://localhost:5000/getuserbyusername", requestOptions)
                if (response.ok) {
                    let result = await response.json()
                    this.setState({
                        id: result._id,
                        name: result.name,
                        phone: result.phone,
                        email: result.email,
                        address:result.address
                    })
                    console.log(result)
                    localStorage.setItem("user", JSON.stringify(this.state))
                    localStorage.removeItem("username")
                }
            } catch (error) {
                console.log(error)
            }

        }
    }

    componentDidMount() {
        this.setUser()
    }

    render() {
        return <div>
            <Banner />
            <Feature />
            <Exclusive />
            <CardProduct />
            <BrandArea />
            {/* <DealOfWeek /> */}
        </div>
    }
}
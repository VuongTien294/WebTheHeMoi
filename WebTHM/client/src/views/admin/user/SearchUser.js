import CardSearchUser from 'components/admin/Cards/CardSearchUser';
import React from 'react'

export default class SearchUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            response:[ ]
        }
    }

    componentDidMount() {
        this.loadUser()
    }

    loadUser = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

        try {
            let response = await fetch("http://localhost:5000/user", requestOptions)
            if(response.ok){
                let result = await response.json()
                this.setState({response : result})
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
            let response = await fetch("http://localhost:5000/user/" + id, requestOptions)
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
                    <CardSearchUser dataProperties={this.state.response} deleteProperties={this.delete} />
                </div>
            </div>

        </>
    }

}

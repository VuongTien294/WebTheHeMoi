import Banner from 'components/client/Banner/Banner'
import CardRegister from 'components/client/Cards/CardRegister'
import React from 'react'


export default class Register extends React.Component{
    render(){
        return<div>
            <Banner/>
           <CardRegister/>
        </div>
    }

}
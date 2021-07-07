import CardOrder from 'components/client/Cards/CardOrder'
import React from 'react'

import Banner from '../../../components/client/Banner/Banner'
import DealOfWeek from '../../../components/client/Deal of week/DealOfWeek'

export default class OrderTracking extends React.Component {
    render() {
        return<div>
           <Banner/>
           <CardOrder/>
        </div>
    }
}
/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import CS_ExcahangeDetails from './CS_ExcahangeDetails'
import CustomerPrintTags from './CustomerPrintTags'
import IntrestRates from './IntrestRates'

export default class Financial extends Component {
    render() {
        return (
            <>
                <CS_ExcahangeDetails/>
                <IntrestRates/>
                <CustomerPrintTags/>
            </>
        )
    }
}

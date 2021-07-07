import React from "react";
import Home from "../views/client/Home";
import { Route, Switch } from "react-router-dom";

import Footer from "components/client/Footer/Footer";
import Header from "components/client/Header/Header";

import DetailProduct from "../views/client/product/DetailProduct"
import SearchProduct from "../views/client/product/SearchProduct"
import SearchByName from "../views/client/product/SearchByName"
import Contact from "../views/client/contact/Contact";
import Blog from "../views/client/blog/Blog";
import ViewCart from "views/client/cart/ViewCart";
import LoginMember from "views/client/auth/LoginMember";
import MemberInfo from "views/client/auth/MemberInfo";
import ViewBill from "views/client/bill/ViewBill";
import OrderTracking from "views/client/order/OrderTracking";
import Register from "views/client/auth/Register";


export default function Index() {
    return (
        <>
            <Header />
                <Switch>
                    <Route path="/product/search"  render={()=>{return<SearchProduct/>}} /> 
                    <Route path="/product/searchbyname/:productName"  render={()=>{return <SearchByName/>}} /> 
                    <Route path="/product_detail/:id"  render={()=>{return<DetailProduct/>}} />
                    <Route path="/cart"  render={()=>{return<ViewCart/>}} />
                    <Route path="/bill_detail"  render={()=>{return<ViewBill/>}} />
                    <Route path="/contact" render={()=>{return<Contact/>}}/>
                    <Route path="/order-tracking" render={()=>{return<OrderTracking/>}}/>
                    <Route path="/register" render={()=>{return<Register/>}}/>
                    <Route path="/login" render={()=>{return<LoginMember/>}}/>
                    <Route path="/member" render={()=>{return<MemberInfo/>}}/>
                    <Route path="/" component={Home} />

                </Switch>       
            <Footer />
        </>
    );
}
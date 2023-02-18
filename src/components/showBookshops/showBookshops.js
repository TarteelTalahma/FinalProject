import axios from "axios";
import React, { Component } from "react";
import Navbar from '../navbar/navbar'
import './showBookshops.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
class showBookshops extends Component{

    constructor(){
        super();
        this.state={
            bookshops:[]
        }
        axios.get("http://localhost:3000/bookshops").then((Result)=>{
            this.setState({bookshops:Result.data});
    })
    }

    render(){
        return(
            <div>
              {localStorage.getItem("isAdmin")? <AdminNavbar/>: <Navbar/>}
              <div>{this.state.bookshops.map((e)=>{
                return(
                    <div>
                    <h3>{e.bookShopeID}</h3>
                    <h3>{e.bookShopeName}</h3>
                    <h3>{e.address}</h3>
                    <h3>{e.phoneNumber}</h3>
                    <h3>{e.email}</h3>
                    </div>
                )
              })}
                </div> 
            </div> 
        )
    }

}
export default showBookshops;

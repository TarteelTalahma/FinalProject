import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Routes, NavLink} from "react-router-dom";
import Navbar from '../navbar/navbar'
import './adminHomePage.css'
class adminHomePage extends Component{
    constructor(){
        super();
            this.state = {
                adminData: "",
            }
         }

    componentDidMount(){
        fetch("http://localhost:3000/adminData",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("adminToken"),
            })
        }).then((res) => res.json()).then((data) => {
                console.log(data, "userData")
                this.setState({adminData: data.data})
        })
    }     

    render(){
        return(
            <div>
              <div>
                <Navbar/>
                </div>  
                <div><Link className="a" to="/addAdmin">ADD NEW ADMIN</Link></div>
                <div><Link className="a" to="/addBook">ADD NEW BOOK</Link></div>
                <div><Link className="a" to="/addBookshop">ADD NEW BOOKSHOP</Link></div>
                <div><Link className="a" to="/showUsers">SHOW ALL USERS</Link></div>
                <div><Link className="a" to="/showBookshops">SHOW ALL BOOKSHOPS</Link></div>
                <div><Link className="a" to="/deleteBook">DELETE SPICIFIC BOOK</Link></div>
            </div> 
        )
    }

}
export default adminHomePage;

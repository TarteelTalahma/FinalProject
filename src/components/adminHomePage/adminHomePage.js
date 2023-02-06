import React, { Component } from "react";
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
           
            <div><h1>admin home page</h1></div>
            </div> 
        )
    }

}
export default adminHomePage;

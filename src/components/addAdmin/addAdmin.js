import React, { Component } from "react";
import "./addAdmin.css"
import Navbar from "../navbar/navbar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
class addAdmin extends Component{

  constructor(props){
    super(props)
    this.state={
        email: "",
        password: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const {email, password} = this.state;
    console.log(email, password);
    fetch("http://localhost:3000/addAdmin",{
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            email,
            password,
        })
    }).then((res) => res.json()).then((data) => {
        console.log(data, "ADMIN ADDED")
            alert("Added Successful");
    })
}

    render(){
        return(
            <div>
                <div>
                {localStorage.getItem("isAdmin")? <AdminNavbar/>: <Navbar/>}
                </div>
            <div className="container">
               <form className="form" onSubmit={this.handleSubmit}>
                <h2>ADD ADMIN</h2>
                    <input type="email"
                    className="box" 
                    placeholder="Enter email"
                    onChange={(e)=>this.setState({email: e.target.value})}/>

                    <input type="password" 
                    className="box" 
                    placeholder="Enter password"
                    onChange={(e)=>this.setState({password: e.target.value})}/>
   
                    <button type="submit" 
                    id="submit">ADD ADMIN</button>

            </form>
            </div>
            </div>
        )
    }
}
export default addAdmin;
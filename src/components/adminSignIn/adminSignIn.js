import React, { Component } from "react";
import "./adminSignIn.css"
import adminHomePage from '../adminHomePage/adminHomePage'
class adminSginIN extends Component{

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
    fetch("http://localhost:3000/adminLoginUser",{
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
        console.log(data, "adminSginIN")
            alert("Login Successful");
            window.localStorage.setItem("adminToken", data.data);
            window.location.href = "adminHomePage"
    })
}

    render(){
        return(
            <div className="container">
               <form className="form" onSubmit={this.handleSubmit}>

                <h2>ADMIN SIGN IN</h2>
                    <input type="email"
                    className="box" 
                    placeholder="Enter email"
                    onChange={(e)=>this.setState({email: e.target.value})}/>

                    <input type="password" 
                    className="box" 
                    placeholder="Enter password"
                    onChange={(e)=>this.setState({password: e.target.value})}/>
   
                    <button type="submit" 
                    id="submit">sign in</button>
            </form>
            <div className="side">
             <img className="img" src="" alt="logo" />    
            </div>
            
            </div>
        )
    }
}
export default adminSginIN;
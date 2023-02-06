import React, { Component } from "react";
import "./StyleSignIn.css"
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import userHomePage from '../UserHomePage/userHomePage'

class signIn extends Component{

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
    fetch("http://localhost:3000/loginUser",{
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
        console.log(data, "userSginIN")
            alert("Login Successful");
            window.localStorage.setItem("token", data.data);
            window.location.href = "userHomePage"
        
    })
}

    render(){
        return(
            <div>
            <Link className="a" to="/adminSignIn">admin SignIn</Link>
            <div className="container">
               <form className="form" onSubmit={this.handleSubmit}>
                <h2>USER SIGN IN</h2>
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

                    <span>Don't have an account?</span>
                    <Link className="a" to="/signUp">Sign up</Link>
            </form>
            <div className="side">
             <img className="img" src="" alt="logo" />    
            </div>
            </div>
            </div>
        )
    }
}
export default signIn;
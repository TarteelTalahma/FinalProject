import React, { Component } from "react";
import "./StyleSignUp.css"
import signIn from "../signIn/signIn";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

class signUp extends Component{

    constructor(props){
        super(props)
        this.state={
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const {firstName, lastName, email, password} = this.state;
        console.log(firstName, lastName, email, password);
        fetch("http://localhost:3000/register",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            })
        }).then((res) => res.json()).then((data) => {
            console.log(data, "userRegister")
            alert("Signup Successful");
            window.location.href = "signIn"
        })
    }

    render(){
        return(
            <div className="container">
            <form className="form" onSubmit={this.handleSubmit}>
                <h2>Sign Up</h2>
                    <input type="text" 
                    className="box" 
                    placeholder="First name"
                    onChange={(e)=>this.setState({firstName: e.target.value})}/>

                    <input type="text" 
                    className="box" 
                    placeholder="Last name"
                    onChange={(e)=>this.setState({lastName: e.target.value})}/>

                    <input type="email" 
                    className="box" 
                    placeholder="Enter email"
                    onChange={(e)=>this.setState({email: e.target.value})}/>

                    <input type="password"
                    className="box" 
                    placeholder="Enter password"
                    onChange={(e)=>this.setState({password: e.target.value})}/>

                    <button type="submit" 
                    id="submit">sign up</button>

                    <span>Have an account?</span>
                    <Link className="a" to="/signIn">Sign in</Link>
            </form>
            <div className="side">
             <img className="img"
                  src=""
                  alt="logo" />    
            </div>
            </div>
            
        )
    }
}
export default signUp;
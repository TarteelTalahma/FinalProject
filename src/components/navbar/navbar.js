import React, { Component } from "react";
import "./navbar.css"
import { BrowserRouter as Router, Route, Link, NavLink} from "react-router-dom";
import Search from "../search/search";
class navbar extends Component{

 

    logOut=()=>{
        window.localStorage.clear();
        window.location.href="signIn"
    }

    render(){
        return(
            <nav className="nav">
                <a href='#' className="nav__brand">Ramallah Bookshops</a>
                <ul className="nav__menu">
                <li className="nav__item"><Search/></li>
                    <li className="nav__item"><Link to='/userHomePage' className="nav__link">Home</Link></li>
                    <li className="nav__item"><Link to='/Categories' className="nav__link" state={this.props.email}>Categories</Link></li>
                    <li className="nav__item"><Link to='/about' className="nav__link">About</Link></li>
                    <li className="nav__item"><Link to="/contact" className="nav__link">Contact</Link></li>
                </ul>
                <div className="nav__toggler"> 
                <div className="line1"></div>
                <div className="line2">
                    <ul className="nav__menu">
                        <li className="nav__item">
                          <a  className="nav__link" onClick={this.logOut}>Log out</a>  
                        </li>
                    </ul></div>
                <div className="line3"></div>
                </div>
            </nav>
        )
    }
}
export default navbar;
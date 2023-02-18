import axios from "axios";
import { Query } from "mongoose";
import React, { Component } from "react";
import Navbar from '../navbar/navbar'
import Footer from "../Footer/Footer";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
//import {useLocation } from "react-router-dom";


class userHomePage extends Component{

    constructor(props){
        super(props);
        this.state={
            categories:[],
            email: localStorage.getItem("email")
        }
      //  this.location = useLocation();
        //this.propsData = location.state;
        axios.get("http://localhost:3000/categories").then((Result)=>{
            this.setState({categories:Result.data});
    })
    }



   render(){
    console.log(this.state.email)
        return(
          <div>
            <div>
              {localStorage.getItem("isAdmin")? <AdminNavbar/>: <Navbar/>}
            </div>
            <div className="container">
             {this.state.categories.map((e) => {
                let id = e._id;
                  return (<Link to={{pathname: `/booksForCategories/`+id, query: {id}}}>
                    <div className="categories">{e._id}</div></Link> 
                  );
                  })}
            </div>
            </div>
            )
    }
}
export default userHomePage;
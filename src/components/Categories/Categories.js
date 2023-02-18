import axios from "axios";
import { Query } from "mongoose";
import React, { Component } from "react";
import Navbar from '../navbar/navbar'
import Footer from "../Footer/Footer";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

class userHomePage extends Component{
    constructor(props){
        super(props);
        this.state={
            categories:[],

        }

        axios.get("http://localhost:3000/categories").then((Result)=>{
            this.setState({categories:Result.data});
    })
    }



   render(){
    
        return(
          <div>
            <div>
              <Navbar/>
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
import axios from "axios";
import React, { Component } from "react";
import Navbar from '../navbar/navbar'
import './deleteBook.css'
class deleteBook extends Component{

    constructor(){
        super();
        this.state={
            books:[]
        }
        axios.get("http://localhost:3000/books").then((Result)=>{
            this.setState({books:Result.data});
    })
    }

    render(){
        return(
            <div>
              <div>
                <Navbar/>
                </div> 
                <h1>DELETE BOOK</h1> 
            </div> 
        )
    }

}
export default deleteBook;

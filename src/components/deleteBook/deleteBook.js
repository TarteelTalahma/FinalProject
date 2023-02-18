import axios from "axios";
import React, { Component } from "react";
import Navbar from '../navbar/navbar'
import './deleteBook.css'
import AdminNavbar from "../AdminNavbar/AdminNavbar";
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


    delete = (id) => {
        axios.delete("http://localhost:3000/deleteBook/"+id)};

    render(){
        return(
            <div>
              <div>
              {localStorage.getItem("isAdmin")? <AdminNavbar/>: <Navbar/>}
                </div > 
                <div className="container">
                {this.state.books.map((e)=>{ 
                     return(<div className="books">
                     <h1>{e.bookName}</h1>
                     <h1>{e.category}</h1>
                     <h1>{e.publisher}</h1>
                     <h1>{e.author}</h1>
                     <button onClick={(event) => {this.delete(e._id); }}>deleteBook</button>
                     </div>)
            })}
            </div>   
            </div> 
        )
    }

}
export default deleteBook;

import axios from "axios";
import React, { Component } from "react";
import "./StyleBookForCategories.css"
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import libraryDetails from "../libraryDetails/libraryDetails"
import Footer from "../Footer/Footer";
import Navbar from '../navbar/navbar'
import AdminNavbar from "../AdminNavbar/AdminNavbar";
class booksForCategories extends Component{
    constructor(){
        super();
            this.state = {
                books:[],
                email: localStorage.getItem("email")
            }

            
    }

    componentDidMount=()=>{
        axios.get("http://localhost:3000/categories/"+this.props.match.params.id).then((Result)=>{
            this.setState({books: Result.data})})
    }

    

    render(){
        return(
        <div> 
            <div>
            {localStorage.getItem("isAdmin")? <AdminNavbar/>: <Navbar/>}
            </div>
        <div className="container">
            {this.state.books.map((e)=>{
                let id = e.bookName;
                return( <div className="books">
                 <h3>{e.bookName}</h3>
                 <h3>{e.category}</h3>
                 <h3>{e.publisher}</h3>
                 <h3>{e.author}</h3>
                 <Link to={{pathname: `/libraryDetails/`+e.bookShopeID+"/"+e.category+"/"+this.state.email}} ><span>See libraryDetails</span></Link>  
                 </div>)})}
                 </div>
                </div> 
                 )
                 
    }
}
export default booksForCategories;
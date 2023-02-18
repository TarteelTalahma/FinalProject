import axios from "axios";
import React, { Component } from "react";
import "./StyleBookForCategories.css"
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import libraryDetails from "../libraryDetails/libraryDetails"
import Footer from "../Footer/Footer";
import Navbar from '../navbar/navbar'
class booksForCategories extends Component{
    constructor(){
        super();
            this.state = {
                books:[],
                userData: ""
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
                <Navbar/>
            </div>
        <div className="container">
            {this.state.books.map((e)=>{
                let id = e.bookName;
                return( <div className="books">
                 <h3>{e.bookName}</h3>
                 <h3>{e.category}</h3>
                 <h3>{e.publisher}</h3>
                 <h3>{e.author}</h3>
                 <Link to={{pathname: `/libraryDetails/`+id}} ><span>See library details</span> </Link> 
                 </div>)})}
                 </div>
                 <div>
                    <Footer/>
                 </div>
                </div> 
                 )
                 
    }
}
export default booksForCategories;
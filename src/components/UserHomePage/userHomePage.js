import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import './UserHomePage.css'
import Navbar from '../navbar/navbar'
class userHomePage extends Component{
    constructor(){
        super();

            this.state = {
                books:[],
                userData: "",
            }
            axios.get("http://localhost:3000/books").then((Result)=>{
                this.setState({books: Result.data})
        })

    }

    componentDidMount(){
        fetch("http://localhost:3000/userData",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            })
        }).then((res) => res.json()).then((data) => {
                console.log(data, "userData")
                this.setState({userData: data.data})
        })
    }
   
    render(){
        console.log(this.state.books)
        return(
            <div>
                <div>
                    <Navbar/>
                </div>
            <div className="container">
                {this.state.books.map((e)=>{ 
                    return(<div className="books">
                        <h1>{e.bookName}</h1>
                        <h1>{e.category}</h1>
                        <h1>{e.publisher}</h1>
                        <h1>{e.author}</h1>
                        <Link to={{pathname: `/libraryDetails/`+e.bookShopeID}} ><span>See libraryDetails</span></Link> 
                        </div>)
            })}</div>
            </div>

        )
    }
}
export default userHomePage;
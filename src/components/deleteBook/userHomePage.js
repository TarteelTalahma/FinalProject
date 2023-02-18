import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import './UserHomePage.css'
import Recommendation from '../recommendation/recommendation'
import Categories from '../Categories/Categories'
import Navbar from '../navbar/navbar'
import Search from "../search/search";
import Footer from "../Footer/Footer";
class userHomePage extends Component{
    constructor(){
        super();
            this.state = {
                books:[],
                userData: "",
                searchInput: "",
                flag: false,
                categories: []
            }

            axios.get("http://localhost:3000/categories").then((Result)=>{
                this.setState({categories: Result.data})})
            axios.get("http://localhost:3000/books").then((Result)=>{
                this.setState({books: Result.data})})
    }




    setInputValue = (string) => {
        this.setState({ searchInput: string });
      };

      updateinputText = (event) => {
        this.setInputValue(event.target.value);
      };

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
                this.setState({flag: true})
                this.setState({userData: data.data})
        })
    }
   
    render(){
        return(
            <div>
                <div>
                    <Navbar/>
                </div>
                <div>
                    {this.state.flag?<Recommendation props={{email: this.state.userData.email}}/> : null}
                </div>
                 
                       
                <div className="container">
                <h1>اللغة العربية والأدب</h1>    
                {this.state.books.filter((i)=>{return i.category=="اللغة العربية والأدب"}).map((e)=>{ 
                     return(<div className="books">
                     <h1>{e.bookName}</h1>
                     <h1>{e.category}</h1>
                     <h1>{e.publisher}</h1>
                     <h1>{e.author}</h1>
                     <Link to={{pathname: `/libraryDetails/`+e.bookShopeID+"/"+e.category+"/"+this.state.userData.email}} ><span>See libraryDetails</span></Link> 
                     </div>)
            })}
            </div> 
            </div>

        )
    }
}
export default userHomePage;
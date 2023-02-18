import React, { Component } from "react";
import "./addBook.css"
import Navbar from "../navbar/navbar";
class addBook extends Component{

    constructor(props){
        super(props)
        this.state={
            bookName: "", 
            category: "", 
            publisher: "", 
            author: "", 
            bookShopeID: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const {bookName, category, publisher, author, bookShopeID} = this.state;
        console.log(bookName, category, publisher, author, bookShopeID);

        fetch("http://localhost:3000/addBook",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                bookName, 
                category, 
                publisher, 
                author, 
                bookShopeID,
            })
        }).then((res) => res.json()).then((data) => {
            console.log(data, "Book added")
            alert("BOOK ADEDD NOW")
        })
    }

    render(){
        return(
            <div>
                <div>
                    <Navbar/>
                </div>
            <div className="container">
            <form className="form" onSubmit={this.handleSubmit}>
                <h2>ADD NEW BOOK</h2>
                    <input type="text" 
                    className="box" 
                    placeholder="Book Name"
                    onChange={(e)=>this.setState({bookName: e.target.value})}/>

                    <input type="text" 
                    className="box" 
                    placeholder="Category"
                    onChange={(e)=>this.setState({category: e.target.value})}/>

                    <input type="text" 
                    className="box" 
                    placeholder="Publisher"
                    onChange={(e)=>this.setState({publisher: e.target.value})}/>

                    <input type="text"
                    className="box" 
                    placeholder="Author"
                    onChange={(e)=>this.setState({author: e.target.value})}/>

                    <input type="text"
                    className="box" 
                    placeholder="bookShopeID"
                    onChange={(e)=>this.setState({bookShopeID: e.target.value})}/>

                    <button type="submit" 
                    id="submit">ADD</button>
            </form>
            </div>
            </div>
        )
    }
}
export default addBook;
import React, { Component } from "react";
import "./addBookshop.css"
import Navbar from "../navbar/navbar";
class addBookshop extends Component{

    constructor(props){
        super(props)
        this.state={
            bookShopeID: "", 
            bookShopeName: "", 
            address: "", 
            phoneNumber: "", 
            email: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const {bookShopeID, bookShopeName, address, phoneNumber, email} = this.state;
        console.log(bookShopeID, bookShopeName, address, phoneNumber, email);
        fetch("http://localhost:3000/addBookshop",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                bookShopeID, 
                bookShopeName, 
                address, 
                phoneNumber, 
                email,
            })
        }).then((res) => res.json()).then((data) => {
            console.log(data, "Bookshop added")
            alert("BOOKSHOP ADEDD NOW")
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
                <h2>ADD NEW BOOKSHOP</h2>
                    <input type="text" 
                    className="box" 
                    placeholder="BookShope ID "
                    onChange={(e)=>this.setState({bookShopeID: e.target.value})}/>

                    <input type="text" 
                    className="box" 
                    placeholder="BookShope Name"
                    onChange={(e)=>this.setState({bookShopeName: e.target.value})}/>

                    <input type="text" 
                    className="box" 
                    placeholder="Address"
                    onChange={(e)=>this.setState({address: e.target.value})}/>

                    <input type="text"
                    className="box" 
                    placeholder="Phone Number"
                    onChange={(e)=>this.setState({phoneNumber: e.target.value})}/>

                    <input type="email"
                    className="box" 
                    placeholder="Email"
                    onChange={(e)=>this.setState({email: e.target.value})}/>

                    <button type="submit" 
                    id="submit">ADD</button>
            </form>
            </div>
            </div>
        )
    }
}
export default addBookshop;
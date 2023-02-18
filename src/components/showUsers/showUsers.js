import axios from "axios";
import React, { Component } from "react";
import Navbar from '../navbar/navbar'
import './showUsers.css'
import AdminNavbar  from '../AdminNavbar/AdminNavbar'
class showUsers extends Component{

    constructor(){
        super();
        this.state={
            users:[]
        }
        axios.get("http://localhost:3000/users").then((Result)=>{
            this.setState({users:Result.data});
    })
    }

    render(){
        return(
            <div>
              <div>
              {localStorage.getItem("isAdmin")? <AdminNavbar/>: <Navbar/>}
                </div>  
                <div>
                    {this.state.users.map((e)=>{
                        return(<div>
                         <h1>user</h1>
                         <h3>{e.firstName}  {e.lastName}</h3>
                         <h3>{e.email}</h3>
                        </div>)
                    })}
                </div>
            </div> 
        )
    }

}
export default showUsers;

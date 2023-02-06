import axios from "axios";
import React, { Component } from "react";
import "./StyleLibraryDetails.css"
import Navbar from '../navbar/navbar'
class libraryDetails extends Component{

    constructor(){
        super()
        this.state={
            libraryDetails:[]
        }
    }

    componentDidMount=()=>{
        axios.get("http://localhost:3000/libraryOfBook/"+this.props.match.params.id).then((Result)=>{
            this.setState({libraryDetails: Result.data})
    })
    }

    render(){
        return(<div>
            <div><Navbar/></div>
            {this.state.libraryDetails.map((e)=>{
      return(<div><h1>libraryDetails</h1>
                    <h1>{e.bookShopeName}</h1>
                    <h1>{e.address}</h1>
                    <h1>{e.phoneNumber}</h1>
                    <h1>{e.email}</h1>
            </div>)
            })}
           
            </div>)
    }
}
export default libraryDetails;

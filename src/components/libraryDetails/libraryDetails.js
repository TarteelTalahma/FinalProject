import axios from "axios";
import React, { Component } from "react";
import "./StyleLibraryDetails.css"
import Navbar from '../navbar/navbar'
import userDetails from "../signIn/userDetails";
import Footer from "../Footer/Footer";
class libraryDetails extends Component{

    constructor(){
        super()
        this.state={
            libraryDetails:[],
            DetailsUser:[]
        }
    }

    componentDidMount=()=>{
        axios.get("http://localhost:3000/libraryOfBook/"+this.props.match.params.id).then((Result)=>{
            console.log(this.props.match.params.category)
            this.setState({libraryDetails: Result.data})
    })

    console.log(this.props.match.params.email)
    const obj ={email:this.props.match.params.email,categoryName:this.props.match.params.category}


    axios.get(`http://localhost:3000/recommendation?email=${this.props.match.params.email}&categoryName=${this.props.match.params.category}`).then((Result)=>{
    console.log(this.props.match.params.category)
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

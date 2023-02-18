import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Navbar from '../navbar/navbar'
import './recommendation.css'
class recommendation extends Component{

    constructor(props){
        super(props);
        this.state={
            RecommendedBooks:[],
            email: props.props.email
        }
        console.log(this.state.email)
        axios.get(`http://localhost:3000/recommendedBooks/${this.state.email}`).then((Result)=>{
            this.setState({RecommendedBooks: Result.data.recommendation});
            console.log(Result.data);

    })
    }

    render(){
        return(
            <div>           
            <div>
                <h1>Recommended books for you</h1>
            </div>
            <div className="container">
                {this.state.RecommendedBooks.map((e)=>{
                    return(
                        <div className="books"> 
                            <h3>{e.bookName}</h3>
                            <h3>{e.category}</h3>
                            <h3>{e.publisher}</h3>
                            <h3>{e.author}</h3>
                            <Link to={{pathname: `/libraryDetails/`+e.bookShopeID+"/"+e.category+"/"+this.state.email}} ><span>See libraryDetails</span></Link> 
                        </div>
                    )
                })}
            </div>
            </div> 
        )
    }

}
export default recommendation;

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, NavLink} from "react-router-dom";
import Search from "../search/search";
import Navbar from "../navbar/navbar";
class searchOutput extends Component{

constructor(){
    super();
    this.state={
        searchResults: []
    }
}

componentDidMount(){
    this.setState({searchResults: JSON.parse(localStorage.getItem("searchResult"))})
}
    render(){
        console.log(this.state.searchResults[0])
        return(
            <div>
           <div>
            <Navbar/>
           </div>
           <div>
           {this.state.searchResults.length > 0 && (
        <ul>
          {this.state.searchResults.map(result => (
            <li key={result.id}>{result.bookName}</li>
          ))}
        </ul>
      )}
           </div>
 </div>
        )
    }
}
export default searchOutput;
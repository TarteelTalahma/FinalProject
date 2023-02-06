import React, { Component } from "react";
import Navbar from '../navbar/navbar'
import './contact.css'
class contact extends Component{
    render(){
        return(
            <div>
              <div>
                <Navbar/>
                </div>  
           
            <div>
                email:<h1>ramallah-Bookshops@gamil.com</h1>
                phone:<h1>12345679</h1>
            </div>
            </div> 
        )
    }

}
export default contact;

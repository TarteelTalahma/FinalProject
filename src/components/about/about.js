import React, { Component } from "react";
import Navbar from '../navbar/navbar'
import './about.css'
class about extends Component{
    render(){
        return(
            <div>
              <div>
                <Navbar/>
                </div>  
           <div className="about-section">
            <p className="about-info">About us We are a group of Birzeit University students which conducted a graduation project on a special website
                 that acts as a mediator between citizens and libraries by cooperation with many libraries and by supporting Ramallah 
                 Municipalit. The website was created to serve many citizens in terms of the municipality's social responsibility
                  towards citizens. The idea of ​ the site is based on facilitating communication between citizens and libraries
                   within the city of Ramallah and finding the books looking for more easily through the recommendation systems
                    since the books that are expected to be of interest to the reading who visits the site will appear on
                     the home page of the site</p>

                     <img  className="about-image" src="https://images.theconversation.com/files/361577/original/file-20201005-18-lmf7w7.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop" alt="logo" />         
            </div> 
            </div>
        )
    }

}
export default about;

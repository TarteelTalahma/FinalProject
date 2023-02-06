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
           
            <div>About us We are a group of Birzeit University students which conducted a graduation project on a special website
                 that acts as a mediator between citizens and libraries by cooperation with many libraries and by supporting Ramallah 
                 Municipalit. The website was created to serve many citizens in terms of the municipality's social responsibility
                  towards citizens. The idea of ​ the site is based on facilitating communication between citizens and libraries
                   within the city of Ramallah and finding the books looking for more easily through the recommendation systems
                    since the books that are expected to be of interest to the reading who visits the site will appear on
                     the home page of the site</div>
            </div> 
        )
    }

}
export default about;

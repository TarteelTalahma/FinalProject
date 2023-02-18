import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Routes, NavLink} from "react-router-dom";
import './App.css';
import signIn from './components/signIn/signIn';
import userDetails from './components/signIn/userDetails'
import signUp from './components/signUp/signUp';
import Categories from './components/Categories/Categories';
import booksForCategories from './components/bookForCategories/booksForCategories'
import libraryDetails from './components/libraryDetails/libraryDetails'
import userHomePage from './components/UserHomePage/userHomePage'
import adminSignIn from './components/adminSignIn/adminSignIn'
import about from "./components/about/about";
import contact from "./components/contact/contact";
import adminHomePage from "./components/adminHomePage/adminHomePage";
import showUsers from "./components/showUsers/showUsers";
import addBook from "./components/addBook/addBook";
import addAdmin from "./components/addAdmin/addAdmin";
import addBookshop from "./components/addBookshop/addBookshop";
import showBookshops from "./components/showBookshops/showBookshops";
import deleteBook from "./components/deleteBook/deleteBook";
import recommendation from "./components/recommendation/recommendation";
import search from "./components/search/search";
import Footer from "./components/Footer/Footer";
class App extends Component {

  constructor(){
    super();
    this.state={
      textSearch: ""

    }
  }

  handleSearch = (e) => {
    console.log(this.state.textSearch);
    this.setState({ textSearch: e.target.value });
  };
  render(){
      return (   
      <Router>
      <div className='App'>
        <div className='auth-wrapper'>
          <div className='auth-inner'>
              <Route exact path='/' component={signIn}/>
              <Route exact path='/signIn' component={signIn}/>
              <Route exact path='/signUp' component={signUp}/>
              <Route exact path='/Categories' component={Categories}/>
              <Route exact path='/booksForCategories/:id'component={booksForCategories}/>
              <Route exact path='/libraryDetails/:id/:category/:email'  component={libraryDetails}/>
              <Route exact path='/userHomePage' component={userHomePage}/>
              <Route exact path='/adminSignIn' component={adminSignIn}/>
              <Route exact path='/userDetails' component={userDetails}/>
              <Route exact path='/about' component={about}/>
              <Route exact path='/contact' component={contact}/>
              <Route exact path='/adminHomePage' component={adminHomePage}/>
              <Route exact path='/showUsers' component={showUsers}/>
              <Route exact path='/addBook' component={addBook}/>
              <Route exact path='/addAdmin' component={addAdmin}/>
              <Route exact path='/addBookshop' component={addBookshop}/>
              <Route exact path='/showBookshops' component={showBookshops}/>
              <Route exact path='/deleteBook' component={deleteBook}/>
              <Route exact path='/recommendation' component={recommendation}/>
              <Route exact path='/search' component={search}/>
              <Route exact path='/Footer' component={Footer}/>
          </div>
        </div>
      </div>
      </Router>
      )
  }
}

export default App;

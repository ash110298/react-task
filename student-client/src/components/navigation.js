import React, { Component } from 'react'
import { Menu, Segment,Input } from 'semantic-ui-react'
import  './../css/navigation.css';
import { Link } from 'react-router-dom'

class Navigationbar extends Component{
  render() {
     return (
              <div className="border">
                 <ul>
                   <div className="qname">
                       <li>TUNICA</li>
                   </div>
                   <div className="bell">
                       <i class="bell icon"></i>
                   </div>
                   <div className="user">
                       <i class="user icon"></i>
                   </div>
                   <div className="uname">
                        {window.localStorage.getItem("name")}
                   </div>
                   <div className="log">
                        <Link to="/login"> <button  className="addbutton">Sign In</button> </Link>
                   </div>
                 </ul>
               </div>
              )
           }
      }

 export default Navigationbar;

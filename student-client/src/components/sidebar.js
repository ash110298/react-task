import React, { Component } from 'react'
import { Menu, Segment,Input,Icon, Link } from 'semantic-ui-react'
import './../css/sidebar.css';

class Sidebar extends Component{
  render() {
    return (
            <div class="sidebar">
                  <ul>
                     <a href="/">View student</a>
                  </ul>
                  <ul className="sul">
                     <a href="/estudents12">Add student</a>
                  </ul>
            </div>

            )
         }
     }
export default Sidebar;

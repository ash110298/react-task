import React, { Component } from 'react';
import Navigationbar from './../components/navigation';
import Sidebar from './../components/sidebar';
import Enrollstudent from './../components/enrollstudent1'
import  './../css/enrollstudent.css';
class Estudents extends Component {


  render () {
    return (
             <div>
                <div> <Navigationbar /> </div>
                <div className="abcd">
                      <Sidebar/>
                  <div className="w1"><Enrollstudent student_id={this.props.match.params.id} push={this.props}/></div>
                </div>
             </div>

           )
       }
   }

export default Estudents;

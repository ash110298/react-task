 import React, { Component } from 'react'
 import { Icon, Label, Menu, Table , Dropdown, Pagination } from 'semantic-ui-react'
import  './../css/table.css';
import { useParams} from "react-router-dom";
import {Schoolnames , Divisionnames, standardnames} from './content.js'
import axios from 'axios';
class TableExamplePagination extends Component {
  state = {
      childrens: [],
      emp_arr: []
    }

    componentDidMount () {
      axios.get('http://localhost:4005/students')
        .then(
          response => { console.log(response.data)
            this.setState(prevState => {
              return {...this.state, childrens: response.data, emp_arr: response.data}
              console.log(this.state.emp_arr)
            })
          }
        )
    }

    componentWillReceiveProps (nextValue, oldValue) {

      if (nextValue.data.Fullname === '' && nextValue.data.school === ''  && nextValue.data.standards === '' && nextValue.data.division === '' ) {
        this.setState({...this.state, emp_arr: this.state.childrens})
      } else {
          let emp_arr = this.state.childrens.filter(child => {

            return child.Fullname === nextValue.data.Fullname ||
                   child.school === nextValue.data.school ||
                   child.standards === nextValue.data.standards ||
                   child.division === nextValue.data.division
          });

          this.setState(prevState => {
            return {...this.state, emp_arr: emp_arr}
          })
      }

    }

    update(id) {
      console.log(id)
      window.location.assign('/estudents1/edit/'+id)
    }

    remove (id) {
      if (window.confirm('Aure you sure')) {
        axios.delete('http://localhost:4005/students/' + id)
          .then(
            response => {
              console.log(response)
              window.location.reload()
            }
          ).catch(
            error => {
              console.log(error.response)
            }
          )
      }
    }

  render(){
    return(
      <div>
           <div className="aligntable">
               <Table celled>
                  <Table.Header>
                      <Table.Row>
                            <Table.HeaderCell>Sr.no</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>School</Table.HeaderCell>
                            <Table.HeaderCell>DOB</Table.HeaderCell>
                            <Table.HeaderCell>Class</Table.HeaderCell>
                            <Table.HeaderCell>DIvision</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell> </Table.HeaderCell>
                     </Table.Row>
                 </Table.Header>
                 <Table.Body>
                  {
                       this.state.emp_arr.map((child, index) => {
                         return (
                      <Table.Row key={index}>
                            <Table.Cell>{index + 1}</Table.Cell>
                            <Table.Cell>{child.Fullname}</Table.Cell>
                            <Table.Cell>{child.school}</Table.Cell>
                            <Table.Cell>{child.dob.split("T")[0]}</Table.Cell>
                            <Table.Cell>{child.standards}</Table.Cell>
                            <Table.Cell>{child.division}</Table.Cell>
                            <Table.Cell>{child.status === true ? 'Active' : 'In active'}</Table.Cell>
                            <Table.Cell> <button className='col' onClick={() => this.update(child._id)}>Edit</button> <br/> <button className='col1' onClick={() => this.remove(child._id)}>Delete</button> </Table.Cell>
                      </Table.Row>
                                 )
                             })
                  }
               </Table.Body>
            </Table>
        <center><Pagination boundaryRange={0} defaultActivePage={1} ellipsisItem={null} firstItem={null} lastItem={null} siblingRange={1} totalPages={10}/> </center>
      </div>
   </div>
  )
 }
}
export default TableExamplePagination

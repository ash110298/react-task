import React, { Component } from 'react';
import { Button, Checkbox, Form ,Dropdown, Menu, Grid, Header, Message } from 'semantic-ui-react'
import  './../css/enrollstudent1.css';
import {Schoolnames , Divisionnames, standardnames} from './content.js'
import axios from 'axios';
class Enrollstudent extends Component {
  constructor(props) {
      super(props);
         this.state = {
          Fullname: '',
          school: '',
          standards: '',
          division: '',
          status: '',
          dob: '',
          output1: ''
        }
      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
      this.handleDropdown = this.handleDropdown.bind(this)
    }

    onChange(e){
      this.setState({...this.state, [e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        if (!this.props.student_id) {
          axios.post('http://localhost:4005/students', this.state)
             .then(
               response =>  {
                 this.setState({output1: response.data})
               }
             ).catch(
               error => {
                 console.log(error)
             },
             setTimeout(() => {
             this.setState({
               output1: ''
             });
           }, 5000)
             );
             e.preventDefault();
             this.setState({Fullname: '',
             school: '',
             standards: '',
             division: '',
             status: '',
             dob: ''})

        } else {
          axios.put('http://localhost:4005/students/' + this.props.student_id, this.state)
             .then(
               response =>  {
                 this.props.push.history.push('/')
               }
             ).catch(
               error=> {
                 console.log(error.response)
               }
             )
        }
    }

    handleDropdown(e, {name, value}){
      console.log(value)
      this.setState(prevState =>  {
        return {...this.state, [name]: value}
      })
    }

    componentDidMount () {
      if (this.props.student_id) {
        axios.get('http://localhost:4005/students/' + this.props.student_id)
          .then(
            response => {
              console.log(response.data.Fullname)
              let update1 = response.data
              console.log(update1)
              this.setState(prevState => {
                return {
                  ...prevState,
                  Fullname: update1.Fullname,
                  school: update1.school,
                  standards: Number(update1.standards),
                  division: update1.division,
                  status: String(update1.status),
                  dob: update1.dob.split('T')[0],
                 }
              })
            }
          ).catch(
            error => {
              console.log(error)
            }
          )
      }
    }

  render () {
    return (

<div className="addstud">
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
       <Grid.Column style={{ maxWidth: 450 }}>
           <Header as='h2' color='teal' textAlign='center'>
              Enroll Students
           </Header>
                 <Form size='large' onSubmit = {this.onSubmit}>
                     <Form.Field>
                         <label>Full Name</label>
                            <input placeholder='Full Name' name="Fullname" value={this.state.Fullname} onChange={this.onChange}/>
                     </Form.Field>
                     <Form.Field>
                         <label>Date of Birth</label>
                            <input type="date" name="dob" value={this.state.dob} onChange={this.onChange} />
                     </Form.Field>
                <div className="drop">
                     <Form.Field>
                         <label>School</label>
                            <Menu compact> <Dropdown className="drop" name="school"  options={Schoolnames} simple item placeholder='Select School' value= {this.state.school} onChange={this.handleDropdown}  /> </Menu>
                     </Form.Field>
                     <Form.Field>
                         <label>class</label>
                            <Menu compact> <Dropdown className="drop" name="division"  options={Divisionnames} simple item placeholder='Select Division' value= {this.state.division} onChange={this.handleDropdown}  /> </Menu>
                     </Form.Field>
                     <Form.Field>
                         <label>standard</label>
                            <Menu compact> <Dropdown className="drop" name="standards"  options={standardnames} simple item placeholder='Select Standards' value= {this.state.standards} onChange={this.handleDropdown}  /> </Menu>
                     </Form.Field>
                     <Form.Field>
                         <label>status</label>
                            <Form.Group inline>
                                  <Form.Radio label='Active' name='status' value="true" checked={this.state.status === 'true'} onChange={this.handleDropdown}/>
                                  <Form.Radio label='Inactive' name='status' value="false" checked={this.state.status === 'false'} onChange={this.handleDropdown}/>
                            </Form.Group>
                     </Form.Field>
                </div>
                <div className="but">
                     <button type='submit'>Submit</button>
                </div>
               <br />
               {this.state.output1 &&
                    <Message positive>
                       <Message.Header>Success:</Message.Header>
                           <p>{this.state.output1}</p>
                    </Message>
                }
               </Form>
      </Grid.Column>
    </Grid>
</div>
           )
       }
   }

export default Enrollstudent;

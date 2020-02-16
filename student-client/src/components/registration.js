import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import './../css/registration.css'
import axios from 'axios';
import PropTypes from 'prop-types'

class RegistrationForm extends Component{
 constructor(props){
   super(props);
   this.state = {
     Fullname:"",
     email: "",
     password: "",
     phone: "",
     res1: ""
   }
   this.onChange = this.onChange.bind(this)
   this.onSubmit = this.onSubmit.bind(this)
 }
onChange(e){
   this.setState({...this.state, [e.target.name]: e.target.value});
 }
onSubmit(e){
  e.preventDefault();
   axios.post('http://localhost:4005/users', this.state)
      .then(
        res =>  {
          console.log(res.data)
         this.setState({res1: res.data})
        }
      ).catch(
        error => {
          console.log(error)
      },
      setTimeout(() => {
      this.setState({
        res1: ''
      });
    }, 5000)
      );
      e.preventDefault();
      this.setState({Fullname: '',
      email: '',
      password: '',
      phone: ''})

}
 render(){
    return(
           <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
               <Grid.Column style={{ maxWidth: 450 }}>
                  <Header as='h2' color='teal' textAlign='center'> Create a new accoun</Header>
                     <Form size='large' onSubmit = {this.onSubmit}>
                          <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Fullname' type="Fullname"  value={this.state.Fullname} onChange={this.onChange}/>
                            <Form.Input fluid icon='envelope' iconPosition='left' placeholder='E-mail address' name="email" value={this.state.email} onChange={this.onChange}/>
                            <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password'   name="password"value={this.state.password} onChange={this.onChange}/>
                            <Form.Input fluid icon='phone' iconPosition='left' placeholder='Phone' name="phone" value={this.state.phone}  onChange={this.onChange}  pattern="[0-9]{10}"  />
                            <button type="submit" className = "btn btn-primary btn-lg" > Submit </button>
                            {this.state.res1 &&
                            <Message positive>
                              <Message.Header>Success:</Message.Header>
                               <p>{this.state.res1}</p>
                            </Message>
                            }
                          </Segment>
                    </Form>
               </Grid.Column>
          </Grid>
          )
       }
  }
export default RegistrationForm;

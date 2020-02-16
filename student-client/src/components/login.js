import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import './../css/login.css'
import axios from 'axios';
import PropTypes from 'prop-types'

class LoginForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      error1:""
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

}
onChange(e){
  this.setState({...this.state, [e.target.name]: e.target.value});
}
onSubmit(e){
  e.preventDefault();
     axios.post('http://localhost:4005/users/signin', this.state)
        .then(
          response =>  {
            console.log(response.data.data)
            window.localStorage.setItem('name', response.data.data)
            this.props.history.push('/')
          }
        ).catch(
          error => {
            this.setState({error1: error.response.data})
        },
        setTimeout(() => {
        this.setState({
          error1: ''
        });
      }, 5000)
        )
        e.preventDefault();
        this.setState({email: '',
        password: ''})
    }

    componentDidMount() {
      window.localStorage.removeItem("name")
}
  render(){
    return(
       <div>
          <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
             <Grid.Column style={{ maxWidth: 450 }}>
               <Header as='h2' color='teal' textAlign='center'>
                  Login to your account
               </Header>
                 <Form size='large' onSubmit = {this.onSubmit}>
                    <Segment stacked>
                      <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name="email" value={this.state.email} onChange={this.onChange}/>
                      <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' name="password" value={this.state.password} onChange={this.onChange}/>
                      <Button color='teal' fluid size='large'> Submit </Button>
                      <br/>
                      {this.state.error1 &&
                         <Message negative>
                           <Message.Header>Login Error:</Message.Header>
                              <p>{this.state.error1}</p>
                         </Message>
                      }
                    </Segment>
                 </Form>
                      <Message>
                         New to us? <a href='/register'>Register</a>
                      </Message>
               </Grid.Column>
           </Grid>
      </div>
    )
  }
}


export default LoginForm;

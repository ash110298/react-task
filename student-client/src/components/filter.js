import React, { Component } from 'react'
import { Icon, Label, Menu, Table , Dropdown } from 'semantic-ui-react'
import  './../css/filter.css';
import {Schoolnames , Divisionnames, standardnames} from './content.js'
class Filter extends Component {
  constructor(props){
      super(props);
      this.state = {

          name: '',
          school: '',
          standards: '',
          division: '',
          status: ''
      }

      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
      this.handleDropdown = this.handleDropdown.bind(this)
    }

    onChange(e){
      this.setState({...this.state, [e.target.name]: e.target.value});
    }

    onSubmit(e){
      e.preventDefault()
      this.props.handleFilter(this.state)
      e.preventDefault();
      this.setState({name: '',
      school: '',
      standards: '',
      division: '',
      status: ''})

    }

    handleDropdown(e, {name, value}){
      this.setState(prevState =>  {
        return {...this.state, [name]: value}
      })
    }

 render(){
   return(
     <div className="fil">
             <form onSubmit = {this.onSubmit} >
                  <input className="sname" type="text" name="name" placeholder="Name" value= {this.state.name} onChange = {this.onChange}/>
                  <Dropdown className="sschool" name="school" placeholder='Select School' options={Schoolnames} value= {this.state.school} onChange={this.handleDropdown} />
                  <Dropdown className="sclass" name="standards" placeholder='Select Class' options={standardnames} value= {this.state.standards} onChange={this.handleDropdown}/>
                  <Dropdown className="sdiv" name="division" placeholder='Select Division' options={Divisionnames}  value= {this.state.division} onChange={this.handleDropdown}/>
                  <button type="submit" className="searchb" > Search </button>
            </form>
     </div>
        )
    }
}

export default Filter;

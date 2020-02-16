import React, { Component } from 'react';
import Navigationbar from './../components/navigation';
import Sidebar from './../components/sidebar';
import TableExamplePagination from './../components/table';
import Filter from './../components/filter';
// import Sidebar from './../components/sidebar';
// import Segment1 from './../components/segment';
import "./../css/main.css"
class Main1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Fullname: '',
        school: '',
        standards: '',
        division: ''
      }

      this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter (data){
    console.log('students data', data)
    this.setState(prevState => {
      return {
        ...this.state,
        Fullname:data.Fullname,
        school: data.school,
        standards: data.standards,
        division: data.division
      }
    })
  }
  render(){
    return(
      <div>
      <div> <Navigationbar /> </div>
      <div className="abc">
           <Sidebar/> <Filter handleFilter={this.handleFilter}/>
      <div className="table1">
            <TableExamplePagination  data={this.state}/>
      </div>
      </div>
      </div>
)
  }
}

export default Main1

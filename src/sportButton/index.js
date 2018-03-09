import React, { Component } from 'react';
import App from '../App';

export default class Form extends Component {
	constructor(props) {
    super(props);
    this.state = {sport: '', location: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePlace = this.handleChangePlace.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
    	console.log("sport picked");
    	this.setState({sport: event.target.value});
  }
      handleChangePlace(event) {
    	console.log("place picked");
    	this.setState({location: event.target.value});
  }
  handleSubmit(event){
    const loc=event.value
    const l=this.state.location;
    const s=this.state.sport;
    console.log("handling submit for"+l);
    this.setState({
      showComponent: true,
    });
  }
    
	render(){
		return (
		<div>
		    {this.state.showComponent ?
            <App location ={this.state.location} /> 
            :
                <div className="mainwindow">
				<form onSubmit = {this.handleSubmit}>
					<table><tbody>
					<tr>
					<th colSpan="3">
					<label>
						Location <input type="text"  id ="location" onChange = {this.handleChangePlace}/>
					</label>
					</th>
					</tr>
					<tr>
					<td><input type="button" value="Sail" id ="sport" onClick={this.handleChange}/></td>
					<td><input type="button" value="Surf" id ="sport" onClick={this.handleChange}/></td>
					<td><input type="button" value="Swim" id ="sport" onClick={this.handleChange}/></td>
					</tr>
					<tr>
					<td><input type="button" value="Scuba" id ="sport" onClick={this.handleChange}/></td>
					<td><input type="button" value="Row" id ="sport" onClick={this.handleChange}/></td>
					<td><input type="button" value="Windsurf" id ="sport" onClick={this.handleChange}/></td>
					</tr>
					<tr>
					<td colSpan="3"><input type="submit" value="Submit"/></td>
					</tr>
					</tbody></table>
				</form>
				</div>
			}
			</div>
		);
		
	}
}

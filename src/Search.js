import React, { Component } from 'react';
import App from './App';
import './Search.css';
import Button from './Button';
import Form from './sportButton';
import style from './style.less';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      location: ''
    };
    this._onButtonClick = this._onButtonClick.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
  }

  componentDidMount() {
     this.setState({location: this.props.location});
  }

  changeLocation = (e) => {
    this.setState({location: e.target.value});
  }

    _onButtonClick() {
    this.setState({
      showComponent: true,
    });
  }

/*
render() {
    	return (
			<div className="container">
			<div className = "topbar"> our logo</div>

				    <Form className={ "form" }/ >

			<div className = "footer"> some other crap</div>
			</div>
		);

    */



  render() {
    return (
      <div className="appSearch">


           <div className="locationSearch">



           Select Location
           <br></br>
           <input value={this.state.location} onChange={this.changeLocation}/>
           </div>

           <div className="activitySearch">
           Choose Your Activity
             <div className = "activityForm">
                  <form onSubmit = {this.handleSubmit}>
                  <table align = "center"><tbody>
                  <tr>
                  <th colSpan="3">
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

                  </tbody></table>
                </form>
              </div>
           </div>

           <div className="prefsSearch">
           Remember My Preferences
           </div>

           <div className="checkSearch">
           <Button id="weather" onClick={this._onButtonClick}/>
        {this.state.showComponent ?
           <App location={this.state.location}/> :
           null}
           </div>
      </div>

    );
  }

}

export default Search;

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



render() {
    	return (
			<div className="container">
			<div className = "topbar"> our logo</div>
                
				    <Form className={ "form" }/ >

			<div className = "footer"> some other crap</div>
			</div>
		);
/*
  render() {
    return (
      <div classname = "app">
        <input value={this.state.location} onChange={this.changeLocation}/>
        <Button onClick={this._onButtonClick}/>
        {this.state.showComponent ?
           <App location={this.state.location}/> :
           null
        }
      </div>
    );
*/
  }
}

export default Search;
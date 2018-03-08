import React, { Component } from 'react';
import Button from './Button'
import './App.css';

const WUNDERGROUND_KEY = "b56f2c0800fdf6e4";

const ICON_SET = {
    chancesleet: "snowy",
    chancesnow: "snowy",
    clear: "sunny",
    flurries: "snowy",
    fog: "cloudy",
    hazy: "cloudy",
    rain: "rainy",
    chancerain: "rainy",
    sleet: "snowy",
    snow: "snowy",
    chanceflurries: "snowy",
    tstorms: "stormy",
    chancetstorms: "stormy",
    sunny: "sunny",
    mostlysunny: "sunny",
    partlysunny: "sunny",
    partlycloudy: "cloudy",
    mostlycloudy: "cloudy",
    cloudy: "cloudy"
};

const SUPPORTED_LANGUAGES = [
    "AF", "AL", "AR", "HY", "AZ",
    "EU", "BY", "BU", "LI", "MY",
    "CA", "CN", "TW", "CR", "CZ",
    "DK", "DV", "NL", "EN", "EO",
    "ET", "FA", "FI", "FR", "FC",
    "GZ", "DL", "KA", "GR", "GU",
    "HT", "IL", "HI", "HU", "IS",
    "IO", "ID", "IR", "IT", "JP",
    "JW", "KM", "KR", "KU", "LA",
    "LV", "LT", "ND", "MK", "MT",
    "GM", "MI", "MR", "MN", "NO",
    "OC", "PS", "GN", "PL", "BR",
    "PA", "RO", "RU", "SR", "SK",
    "SL", "SP", "SI", "SW", "CH",
    "TL", "TT", "TH", "TR", "TK",
    "UA", "UZ", "VU", "CY", "SN",
    "JI", "YI"
];

function getIcon(icon) {
    return ICON_SET[icon];
}

function getTemp (text) {
    return (text.match(/(\-?[0-9]+)/) || [])[1];
}


class App extends Component {

  constructor (props) {
      super(props);
      this.state = {
        dest: ''
      };

      var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
      };

      /*if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(pos => {
              this.setState({
                  coordinates: pos.coords
              });
              this.check();
          }, () => {
              this.check();
          }, options);
      }*/

      this.check();

      setInterval(() => this.check(), 10 * 60 * 1000);
      this.changeLocation = this.changeLocation.bind(this);
  }

  check () {



      fetch("https://ipinfo.io/json")
        .then(res => res.json())
        .then(ip => {
            let lang = ip.country;
            if (!SUPPORTED_LANGUAGES.includes(lang)) {
                lang = "EN";
            }
            let crd = this.state.dest;
            var response = fetch("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyA_wOxjHNfPhmKu2zBo8N5HXsEpewgIQF0");
            //.then(response => response.json())
            if (crd['status'] != 'OK'){
                crd = crd || {
                    latitude: "39.9042",
                    longitude: "116.4074"
                }
            }else{
                crd = crd || {
                   latitude: crd['results'][0]['geometry']['location']['lat'],
                   longitude: crd['results'][0]['geometry']['location']['lng']
                }
            }
            const query = [crd.latitude, crd.longitude].join(",");
            const WUNDERGROUND_URL = `https://api.wunderground.com/api/${WUNDERGROUND_KEY}/forecast/lang:${lang}/q/${query}.json`;
            return fetch(WUNDERGROUND_URL)
        })
        .then(c => c.json())
        .then(forecast => {
            this.setState({
                forecast
            });
        });
  }

  renderWeatherToday () {
      const today = this.state.forecast.forecast.txt_forecast.forecastday[0];
      const temp = getTemp(today.fcttext_metric);

      const day = this.state.forecast.forecast.simpleforecast.forecast[0];


      let icon = getIcon(today.icon);
      let hours = new Date().getHours();
      if ((icon === "sunny" || icon === "clear") && (hours > 20 || hours < 7)) {
          icon = "starry";
      }


      if (temp) {
          var tempElm = <div className="big-temp">{temp}</div>;
      }

      return (
          <div className="weather-today">
            <div className="icon-wrapper">
                <div className={`icon-big ${icon}`}>
                </div>
                {tempElm}
            </div>
            <p className="icon-description">{today.fcttext_metric}</p>
          </div>
      );
  }

  renderDay (day, index) {
      const temp = getTemp(day.fcttext_metric);
      if (temp) {
          var tempElm = <div className="small-temp">{temp}</div>;
      }

      return (
            <div className="day" key={index}>
                <div className="day-description">
                    {day.fcttext_metric}
                </div>
                <div className="icon-wrapper">
                    <div className={`icon-small ${getIcon(day.icon)}`}>
                    </div>
                    {tempElm}
                </div>
            </div>
      );
  }

  renderNextDays () {
      const nextDays = []
          , data = this.state.forecast.forecast.txt_forecast.forecastday
          ;

      for (var i = 2; i < data.length; i += 2) {
        nextDays.push(data[i])
      }

      return (
          <div className="weather-next-days">
            {nextDays.map((c, i) => this.renderDay(c, i))}
          </div>
      );
  }

  componentDidMount() {
       this.setState({dest: this.props.dest});
    }

    changeLocation = (e) => {
      this.setState({dest: e.target.value});
    }

  renderWeather () {
      if (!this.state.forecast) {
          return (
            <div className="weather-container">
                <p>Loading...</p>
            </div>
          );
      }
      return (
        <div className="weather-container">
            {this.renderWeatherToday()}
            {this.renderNextDays()}
        </div>
      );
  }

  render() {
    return (
        <div>
            <div {...this.props} className="app">
                {this.state.dest = this.props.location}
                {this.renderWeather()}
            </div>
            <button onChange={this.changeLocation}>{this.state.dest = this.props.location}</button>
            <button>{this.state.dest}</button>
        </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import InfoWindowEx from './Info_window'; 
import stylesArray from './mapStyles';
import marker1 from '../../public/img/person_pin_circle.svg';
import marker2 from '../../public/img/baseline-location_on.svg';



const mapStyle = {
	width: '100wh',
	height: 'calc(100vh - 257px)'
};
export class MapContainer extends React.Component {
	constructor(props){
		super(props)
	}

	state = {
		showingInfoWindow: false,  //Hides or the shows the infoWindow
		activeMarker: {},          //Shows the active marker upon click
		selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
		};

	  onMarkerClick = (props, marker, e) => {
	  this.setState({
		selectedPlace: props,
		activeMarker: marker,
		showingInfoWindow: true
	  });
	};
  
	onClose = props => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			});
		}
	};

	//FUNCTION to change state of toggle
	// onInfoWindowClick =() => {
	// 	console.log('this is the function for the onclick event')
	// }

	showDetails = place => {
		this.props.changeState(1,place.title);
	  };


 thing = (data) => 	{

	const allPoints = data.map((merchant, index) => {
		return (<Marker
			title={merchant.name} 
			name={merchant.name} 
			position={{lat: merchant.lat, lng: merchant.lng}}
			key={index}
			icon= {marker2}	
			onClick={this.onMarkerClick}	
			/>)
	});
	return allPoints
}
	
	componentDidMount() {

	}
		
	render() {	

    return (

			<div className="row">
				<div className='col s12 m9'>
					<Map
						google={this.props.google}
						zoom={16}
						
						streetViewControl= {false}
						mapTypeControl= {false}
						initialCenter={{lat: this.props.dealsState.userLat, lng: this.props.dealsState.userLng}}
						styles= {stylesArray}>
						{this.thing(this.props.dealsState.merchantInfo)}
						<Marker
							position={{lat: this.props.dealsState.userLat, lng: this.props.dealsState.userLng}}	
							onClick={this.onMarkerClick}
							icon= {marker1}
							title={'You are here'}	
							name={<div>You are here</div>}		
							/>
							<InfoWindowEx
							marker={this.state.activeMarker}
							visible={this.state.showingInfoWindow}
							>
							<div>
								<h3>{this.state.selectedPlace.name}</h3>
								<button
								className="btn btn-tiny waves-effect waves-light" 
								type="button"
								onClick={this.showDetails.bind(this,this.state.selectedPlace)}>Show Deals
								</button>
							</div>
							</InfoWindowEx>

						</Map>
				</div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyCLiHJCWYlYrsX5kbjQQ65xIZXulYpAEiI')
})(MapContainer)


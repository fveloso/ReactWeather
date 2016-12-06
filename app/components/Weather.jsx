var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var ErrorModal = require('ErrorModal');
var openWeatherMap = require('openWeatherMap');

var Weather = React.createClass({
    getInitialState: function () {
        return {
            isLoading: false
        }
    },
    componentDidMount: function () {
        //from react-router
        var location = this.props.location.query.location;

        if (location && location.length > 0) {
            this.handleSearch(location);
            window.location.hash = '#/';
        }
    },
    componentWillReceiveProps: function (newProps) {
        //from react-router
        var location = newProps.location.query.location;

        if (location && location.length > 0) {
            this.handleSearch(location);
            window.location.hash = '#/';
        }
    },
    handleSearch: function (location) {
        var self = this;
        self.setState({
            isLoading: true,
            errorMessage: undefined,
            location: undefined,
            temp: undefined
        });

        openWeatherMap.getTemp(location).then(function (temp) {
            self.setState({
                location: location,
                temp: temp,
                isLoading: false
            });
        }, function (e) {
            self.setState({
                isLoading: false,
                errorMessage: e.message
            });
        });
    },
    render: function () {
        var {isLoading, temp, location, errorMessage} = this.state;

        function renderMessage () {
            if(isLoading) {
                return <h3 className="text-center">Fetching Weather...</h3>;
            } else if(temp && location) {
                return <WeatherMessage location={location} temp={temp} />;
            }
        }

        function renderError() {
            if (errorMessage) {
                return (
                    <ErrorModal message={errorMessage} />
                )
            }
        }

        return (
            <div>
                <h1 className="text-center page-title">Get Weather!</h1>
                <WeatherForm onSearch={this.handleSearch} />
                {renderMessage()}
                {renderError()}
            </div>
        );
    }
});

module.exports = Weather;
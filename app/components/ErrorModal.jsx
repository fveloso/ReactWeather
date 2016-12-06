var React = require("react");
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');

var ErrorModal = React.createClass({
    getDefaultProps: function () {
        return {
            title: 'Error'
        }
    },
    propTypes: {
        title: React.PropTypes.string,
        message: React.PropTypes.string.isRequired
    },
    componentDidMount: function () {
        var {title, message} = this.props;

        //https://www.udemy.com/the-complete-react-web-app-developer-course/learn/v4/t/lecture/4795570
        var modalMarkup = (
            <div className="reveal tiny text-center" id="error-modal" data-reveal>
                <h4>{title}</h4>
                <p>{message}</p>
                <p>
                    <button className="button hollow" data-close="">
                        Okay
                    </button>
                </p>
            </div>
        );

        var $modal = $(ReactDOMServer.renderToString(modalMarkup));
        $(ReactDOM.findDOMNode(this)).html($modal);

        var modal = new Foundation.Reveal($('#error-modal'));
        modal.open();


    },
    render: function () {
        return (
            <div></div>
        );
    }
});

module.exports = ErrorModal;
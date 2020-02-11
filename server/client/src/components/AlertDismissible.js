import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

class AlertDismissible extends Component {
  constructor(props) {
    super(props);

    this.setShow = this.setShow.bind(this);

    this.state = {
      show: true
    };
  }

  setShow(show) {
    this.setState({ show });
  }

  render() {
    const { title, message, variant } = this.props;
    const { show } = this.state;

    if (show) {
      return (
        <Alert
          className="text-left"
          variant={variant}
          onClose={() => this.setShow(false)}
          dismissible
        >
          <Alert.Heading>{title}</Alert.Heading>
          <p>{message}</p>
        </Alert>
      );
    }
    return false;
  }
}

AlertDismissible.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark'
  ])
};

AlertDismissible.defaultProps = {
  variant: 'success'
};

export default AlertDismissible;

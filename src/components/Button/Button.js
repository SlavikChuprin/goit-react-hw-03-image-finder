import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  static propTypes = {
    onPageChange: PropTypes.func.isRequired,
  };
  changePage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    this.props.onPageChange();
  };

  render() {
    return (
      <button type="button" className="Button" onClick={this.changePage}>
        Load more
      </button>
    );
  }
}

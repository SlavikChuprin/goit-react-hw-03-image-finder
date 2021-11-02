import { Component } from 'react';

export default class Button extends Component {
  state = {
    page: 1,
  };

  changePage = () => {
    const counter = this.state.page + 1;
    this.setState({ page: counter });
    console.log(this.state);
    window.scrollTo({
      bottom: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    this.props.onPageChange(this.state.page);
    console.log(counter);
  };

  render() {
    return (
      <button type="button" className="Button" onClick={this.changePage}>
        Load more
      </button>
    );
  }
}

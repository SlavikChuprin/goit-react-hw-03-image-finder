import { Component } from 'react';

export default class Button extends Component {
  state = {
    pageNum: 2,
  };

  changePage = () => {
    const counter = this.state.pageNum + 1;
    this.setState({ pageNum: counter });
    console.log(this.state);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    this.props.onPageChange(this.state.pageNum);
  };

  render() {
    return (
      <button type="button" className="Button" onClick={this.changePage}>
        Load more
      </button>
    );
  }
}

import { Component } from 'react';

export default class Button extends Component {
  state = {
    page: 2,
  };

  changePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    this.props.onPageChange(this.state.page);
    console.log(this.state);
  };

  render() {
    return (
      <button type="button" className="Button" onClick={this.changePage}>
        Load more
      </button>
    );
  }
}

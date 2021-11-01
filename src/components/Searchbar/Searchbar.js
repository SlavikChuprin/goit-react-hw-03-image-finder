import { Component } from 'react';
import '../styles.css';

class Searchbar extends Component {
  state = {
    searchTag: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchTag);
  };
  handleNameChange = event => {
    this.setState({ searchTag: event.currentTarget.value.toLowerCase() });
  };
  render() {
    const { searchTag } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={searchTag}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;

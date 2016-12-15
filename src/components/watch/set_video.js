import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';

class setTerm extends Component {
  handleFormSubmit({searchTerm}){
    localStorage.setItem('term', searchTerm);
    browserHistory.push('/watch');
  }

  render() {
    const { handleSubmit, fields: {searchTerm}} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <h2>type a key word to add relative videos</h2>
        <fieldset className="form-group">
          <label>Search for: </label>
          <input {...searchTerm} className="form-control"/>
        </fieldset>
        <button action="submit" className="btn btn-primary">Search</button>
      </form>
    );
  };
};

export default reduxForm({
  form: 'setTerm',
  fields: ['searchTerm']
}, null, null)(setTerm);

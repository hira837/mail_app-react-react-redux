import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";

import { showMails, deleteMails, putMails } from "../actions";

class mailboxShow extends Component {
  constructor(props) {
    console.log('mailboxShow')
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field

    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    )
  }

  async onSubmit(values) {
    // await this.props.createMails(values);
    this.props.history.push("/");
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props

    console.log(submitting)
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label="Title" name="title" tyle="text" component={this.renderField} /></div>
        <div><Field label="Body" name="body" tyle="text" component={this.renderField} /></div>
        
        <div>
          <input type="submit" value="Submit" disabled={pristine} />
          <Link to="/" >Cancel</Link>
        </div>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}

  if(!values.title) errors.title = "Enter a title, please. "
  if(!values.body) errors.body = "Enter a body, please. "

  return errors
}

// const mapDispatchToProps = { showMails };

export default connect(null, null)(
  reduxForm({ validate, form: 'createMailsForm' })(mailboxShow)
)
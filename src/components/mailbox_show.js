import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";

import { getMail, deleteMail, putMails } from "../actions";

class mailboxShow extends Component {
  constructor(props) {
    console.log('mailboxShow')
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (id) this.props.getMail(id)
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

  async onDeleteClick() {
    const { id } = this.props.match.params
    // await this.props.deleteMails(id)
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
          <Link to="/" onClick={this.onDeleteClick}>Delete</Link>
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

const mapStateToProps = (state, ownProps) => {
  const mail = state.mails[ownProps.match.params.id]
  return { initialValues: mail, mail }
}

const mapDispatchToProps = { deleteMail, getMail };

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ validate, form: 'showMailsForm', enableReinitialize: true })(mailboxShow)
)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { getMail, deleteMail, putMail } from '../actions'

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
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        fullWidth={true}
      />
    );
  }

  async onSubmit(values) {
    await this.props.putMail(values);
    this.props.history.push("/");
  }

  async onDeleteClick() {
    const { id } = this.props.match.params
    await this.props.deleteMail(id)
    this.props.history.push("/");
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props
    const style = { margin: 12 }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label="Title" name="title" tyle="text" component={this.renderField} /></div>
        <div><Field label="Body" name="body" tyle="text" component={this.renderField} /></div>
        
        <div>
          <RaisedButton label="Submit" style={style} type="submit" disabled={pristine || submitting || invalid}/>
          <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />} />
          <RaisedButton label="Delete" onClick={this.onDeleteClick} />
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

const mapDispatchToProps = { deleteMail, getMail, putMail };

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ validate, form: 'showMailsForm', enableReinitialize: true })(mailboxShow)
)
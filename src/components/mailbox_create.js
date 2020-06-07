import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SaveIcon from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'

import { createMails } from '../actions'

class mailboxCreate extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
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
    )
  }

  async onSubmit(values) {
    await this.props.createMails(values);
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
          <RaisedButton label="Send" style={style} type="submit" disabled={pristine || submitting || invalid} />
          <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />} />
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
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

const mapDispatchToProps = { createMails };

export default connect(null, mapDispatchToProps)(
  reduxForm({ validate, form: 'createMailsForm' })(mailboxCreate)
)
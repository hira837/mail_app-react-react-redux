import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete"
import TextField from "@material-ui/core/TextField";

import { getMail, deleteMail, putMail } from '../actions'

class mailboxShow extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (id) this.props.getMail(id)
  }

  renderTitle(field) {
    const { input, label, type, meta: { touched, error } } = field

    return (
      <TextField
        fullWidth
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        label="Subject"
        multiline
        rowsMax="4"
        style={{marginBottom: "15px"}}
      />
    );
  }
  renderBody(field) {
    const { input, label, type, meta: { touched, error } } = field

    return (
      <TextField
        fullWidth
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        multiline
        variant="outlined"
        label="Body"
        rows="4"
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
    const { handleSubmit } = this.props
    const style = { margin: 12 }

    return (
      <form style={style} onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field 
            label="Subject" 
            name="subject" 
            type="text" 
            component={this.renderTitle} 
          />
        </div>
        <div>
          <Field 
            label="Body" 
            name="body" 
            type="text" 
            component={this.renderBody} 
            />
        </div>
        
        <div>
          <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />} />
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={this.onDeleteClick}
          >
            Delete
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

const mapStateToProps = (state, ownProps) => {
  const mail = state.mails[ownProps.match.params.id]
  return { initialValues: mail, mail }
}

const mapDispatchToProps = { deleteMail, getMail, putMail };

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ validate, form: 'showMailsForm', enableReinitialize: true })(mailboxShow)
)
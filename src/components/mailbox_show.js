import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete"
// import TextField from "@material-ui/core/TextField";

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
        fullWidth={true}
      />
      // <TextField
      //   id="standard-multiline-flexible"
      //   label="Multiline"
      //   multiline
      //   rowsMax={4}
      // />
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
        fullWidth={true}
      />
      // <TextField
      //   id="outlined-multiline-static"
      //   label="Multiline"
      //   multiline
      //   rows={4}
      //   defaultValue="Default"
      //   variant="outlined"
      // />
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
          {/* <RaisedButton label="Submit" style={style} type="submit" disabled={pristine || submitting || invalid}/> */}
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
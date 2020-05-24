import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import { increment, decrement, readMails } from '../actions'

class MailboxIndex extends Component {
  componentDidMount() {
    this.props.readMails()
  }

  renderEvents() {
    return _.map(this.props.mails, (mail) => (
      <tr key={mail.id}>
        <td>{mail.id}</td>
        <td>
          <Link to={`/mailbox/${mail.id}`}>
          {mail.title}
          </Link>
        </td>
        <td>{mail.body}</td>
      </tr>
    ))
  }
  
  render() {
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>{this.renderEvents()}</tbody>
        </table>
        {/* <div>{console.log(props.mails)}</div> */}
        <Link to="/mailbox/create">Create a New Mail</Link>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => ({ value: state.count.value })
const mapStateToProps = state => ({ mails: state.mails })
const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
  readMails: () => dispatch(readMails())
})
// const mapDispatchToProps = ({ increment, decrement, readMailss })

export default connect(mapStateToProps, mapDispatchToProps)(MailboxIndex)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { increment, decrement, readMails } from '../actions'

class MailboxIndex extends Component {
  componentDidMount() {
    this.props.readMails()
  }

  renderEvents() {
    return _.map(this.props.mails, (mail) => (
      <TableRow key={mail.id}>
        <TableRowColumn>{mail.id}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/mailbox/${mail.id}`}>
          {mail.title}
          </Link>
        </TableRowColumn>
        <TableRowColumn>{mail.body}</TableRowColumn>
      </TableRow>
    ))
  }
  
  render() {
    const style = {
      position: 'fixed',
      right: 12,
      bottom: 12
    }
    return (
      <React.Fragment>
        <FloatingActionButton
          containerElement={<Link to="/mailbox/create"></Link>}
          style = {style}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Body</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.renderEvents()}
          </TableBody>
        </Table>
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
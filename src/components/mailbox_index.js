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
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { purple } from "@material-ui/core/colors";
import Button from '@material-ui/core/Button'

import { readMails, sortByDate } from '../actions'

class MailboxIndex extends Component {
  componentDidMount() {
    this.props.readMails()
  }

  renderEvents() {
    return _.map(this.props.mails, (mail) => (
      <TableRow key={mail.id}>
        <TableRowColumn>{mail.from}</TableRowColumn>
        <TableRowColumn>{mail.to}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/mailbox/${mail.id}`}>
          {mail.subject}
          </Link>
        </TableRowColumn>
        <TableRowColumn>{mail.date}</TableRowColumn>
      </TableRow>
    ))
  }

  returnMailsLength() {
    return _.size(this.props.mails)
  }

  async orderByDate() {
    await this.props.sortByDate()
  }
  
  render() {
    const style = {
      position: 'fixed',
      right: 12,
      bottom: 12,
      maincolor: purple
    }
    return (
      <React.Fragment>
        <div style={{ fontWeight: 700 }}>Results: {this.returnMailsLength()} mails</div>
        <Button onClick={this.props.sortByDate}>日付並び替え</Button>
        {/* <Button>日付並び替え</Button> */}
        <FloatingActionButton
          containerElement={<Link to="/mailbox/create"></Link>}
          style={style}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>From</TableHeaderColumn>
              <TableHeaderColumn>To</TableHeaderColumn>
              <TableHeaderColumn>Subject</TableHeaderColumn>
              <TableHeaderColumn>Date</TableHeaderColumn>
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
// const mapDispatchToProps = dispatch => ({
//   readMails: () => dispatch(readMails())
// })
const mapDispatchToProps = ({ readMails, sortByDate })

export default connect(mapStateToProps, mapDispatchToProps)(MailboxIndex)
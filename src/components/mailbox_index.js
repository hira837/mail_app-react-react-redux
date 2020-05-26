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
import Button from '@material-ui/core/Button'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { makeStyles } from '@material-ui/core/styles'

import { readMails, sortByAsc, sortByDesc } from '../actions'

class MailboxIndex extends Component {
  constructor(props) {
    super(props)
    this.orderByDate = this.orderByDate.bind(this)
    this.state = { sorted: true }
  }
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
    await this.setState((prevState) => ({
      sorted: !prevState.sorted
    }))
    if(this.state.sorted) {
      this.props.sortByDesc()
    } else {
      this.props.sortByAsc()
    }
  }
  
  render() {
    const style = {
      position: 'fixed',
      right: 12,
      bottom: 12,
    }
    const useStyles = makeStyles((theme) => ({
      root: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        "& > *": {
          margin: theme.spacing(1),
        },
      },
    }));
    const ascButton = <ArrowDropUpIcon />,
          descButton = <ArrowDropDownIcon />;
    return (
      <React.Fragment>
        <div style={{ fontWeight: 700 }}>
          Results: {this.returnMailsLength()} mails
        </div>
        <Button onClick={this.orderByDate}>日付並び替え</Button>
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
              <TableHeaderColumn className={useStyles.root}>
                <div>Date</div>
                {this.state.sorted ? ascButton : descButton}
              </TableHeaderColumn>
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
const mapDispatchToProps = ({ readMails, sortByAsc, sortByDesc })

export default connect(mapStateToProps, mapDispatchToProps)(MailboxIndex)
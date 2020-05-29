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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { green } from '@material-ui/core/colors';

// Date Picker
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { Calendar } from 'react-date-range'

import { readMails, sortByAsc, sortByDesc } from '../actions'

function toShapeDate(date) {
  const YYYY = date.getFullYear(),
    MM = date.getMonth() + 1,
    DD = date.getDate();
  return YYYY + '/' + MM + '/' + DD
}

class CalendarInput extends Component {
  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect(date) {
    this.props.onDateChange(date)
  }

  render() {
    const startDate = this.props.startDate
    return (
      <Calendar
        date={startDate}
        onChange={this.handleSelect}
      />
    )
  }
}

class MailboxIndex extends Component {
  constructor(props) {
    super(props);
    this.orderByDate = this.orderByDate.bind(this);
    this.calendarOpenClick = this.calendarOpenClick.bind(this)
    this.handleSetDate = this.handleSetDate.bind(this)
    this.doneSetDate = this.doneSetDate.bind(this)
    this.state = {
      sorted: true,
      calendarIsOpen: false,
      startDate: new Date(),
      // endDate: addDays(new Date(), 7),
      // key: 'selection'
    };
  }
  componentDidMount() {
    this.props.readMails();
  }

  renderEvents() {
    return _.map(this.props.mails, (mail) => (
      <TableRow key={mail.id}>
        <TableRowColumn>{mail.from}</TableRowColumn>
        <TableRowColumn>{mail.to}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/mailbox/${mail.id}`}>{mail.subject}</Link>
        </TableRowColumn>
        <TableRowColumn>{mail.date}</TableRowColumn>
      </TableRow>
    ));
  }

  returnMailsLength() {
    return _.size(this.props.mails);
  }

  async orderByDate() {
    await this.setState((prevState) => ({
      sorted: !prevState.sorted,
    }));
    if (this.state.sorted) {
      this.props.sortByDesc();
    } else {
      this.props.sortByAsc();
    }
  }

  async handleSetDate(date) {
    await this.setState({startDate: date})
    console.log(this.state.startDate)
  }

  doneSetDate() {
    this.calendarOpenClick()
  }

  calendarOpenClick() {
    this.setState((prevState) => ({
      calendarIsOpen: !prevState.calendarIsOpen
    }))
  }

  render() {
    const style = {
      position: "fixed",
      right: 12,
      bottom: 12,
    };
    const useStyles = makeStyles({
      root: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row"
      },
      addButton: {
        position: "fixed",
        right: 12,
        bottom: 12,
      }
    });
    const ascButton = <ArrowDropUpIcon onClick={this.orderByDate} />,
      descButton = <ArrowDropDownIcon onClick={this.orderByDate} />;

    const resultDate = this.state.startDate
    const startDate = resultDate

    const calendarElement = 
      <div style={{ position: "absolute", zIndex: 2 }}>
        <CalendarInput 
          startDate={startDate}
          onDateChange={this.handleSetDate}
        />
        <Button variant="contained" color="secondary" onClick={this.doneSetDate}>Done</Button>
      </div>
    const modalOverlay = 
      <div className="bg" style={{ position: "fixed", zIndex: 1, top: 0, left: 0, width: "100%", height: "120%", backgroundColor: "rgba(0,0,0,0.75)" }} onClick={this.calendarOpenClick}></div>
    
    return (
      <React.Fragment>
        <div style={{ position: "relative" }}>
          {this.state.calendarIsOpen ? calendarElement : null}
        </div>
        {this.state.calendarIsOpen ? modalOverlay : null}
        
        <fieldset onClick={this.calendarOpenClick}>
          <legend>startDate</legend>
          <input value={startDate} onChange={this.handleSetDate}/>
        </fieldset>

        <div style={{ fontWeight: 700 }}>
          Results: {this.returnMailsLength()} mails
        </div>
        
        <FloatingActionButton
          containerElement={<Link to="/mailbox/create"></Link>}
          styles={useStyles.addButton}
        >
          <ContentAdd />
        </FloatingActionButton>

        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>From</TableHeaderColumn>
              <TableHeaderColumn>To</TableHeaderColumn>
              <TableHeaderColumn>Subject</TableHeaderColumn>
              <TableHeaderColumn styles={useStyles.root}>
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
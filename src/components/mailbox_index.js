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
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import brown from '@material-ui/core/colors/brown'
import grey from '@material-ui/core/colors/grey'
import lightBlue from '@material-ui/core/colors/lightBlue'
import logo from '../img/logo.png'
import clip from '../img/icon_clip.svg'

// Date Picker
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { Calendar } from 'react-date-range'

import { readMails, sortByAsc, sortByDesc, filterByDate } from '../actions'

const styles = theme => ({
  tableHead: {
    backgroundColor: brown[50],
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    height: "50px",
    color: grey[700],
    borderTop: "1px solid #ddd",
    borderBottom: "1px solid #ddd"
  },
  tableItem: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "10px"
  },
  addButton: {
    position: "fixed",
    right: 12,
    bottom: 12,
  }
});

function toDoubleDigits(num) {
  num += '';
  if (num.length === 1) {
    num = '0' + num
  }
  return num;
}

function toLocaleString(date) {
  return [
    date.getFullYear(),
    toDoubleDigits(date.getMonth() + 1),
    date.getDate()
  ].join('-')
}

// function filterByDate(date1, date2, date3) {
//   const jsonDate = new Date(date1),
//   startDate = new Date(date2),
//   endDate = new Date(date3)
//   return startDate < jsonDate && jsonDate < endDate
// }

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
      <div key={mail.id} style={{ display: "flex", justifyContent: "space-around", alignItems: "center", height: "50px", borderBottom: "1px solid #ddd" }}>
        <div style={{
          display: "flex", justifyContent: "flex-start", alignItems: "center", width: "18%",
          padding: "10px"}}>{mail.from}</div>
        <div style={{
          display: "flex", justifyContent: "flex-start", alignItems: "center", width: "18%",
          padding: "10px" }}>{mail.to}</div>
        <div style={{width: "4%", padding: "10px"}}>
          <div style={{ backgroundColor: "#616161", color: "#fff", borderRadius: "5px", textAlign: "center"}}>{mail.unread === 0 ? "" : `+${mail.unread}`}</div>
        </div>
        <div style={{
          display: "flex", justifyContent: "flex-start", alignItems: "center", width: "45%",
          padding: "10px" }}>
          <Link to={`/mailbox/${mail.id}`} style={{ color: "#0288d1"}}>{mail.subject}</Link>
        </div>
        <div style={{width: "5%"}}>{mail.attachedfile ? <img style={{width: "25px"}} src={clip} /> : ""}</div>
        <div style={{
          display: "flex", justifyContent: "flex-start", alignItems: "center", width: "10%",
          padding: "10px" }}>{mail.date}</div>
      </div>
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
    await this.setState({startDate: toLocaleString(date)})
    // console.log(`string型: ${this.state.startDate}`)
    // console.log(`date型: ${filterByDate('2020-05-24', date, '2020-07-01')}`)
  }

  doneSetDate() {
    this.props.filterByDate(this.state.startDate)
    this.calendarOpenClick()
  }

  calendarOpenClick() {
    this.setState((prevState) => ({
      calendarIsOpen: !prevState.calendarIsOpen
    }))
  }

  render() {
    const { classes } = this.props;
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
        <div>
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
            className={classes.addButton}
          >
            <ContentAdd />
          </FloatingActionButton>

          <div>
            <div className={classes.tableHead}>
              <div className={classes.tableItem} style={{width: "20%"}}>From</div>
              <div className={classes.tableItem} style={{width: "20%"}}>To</div>
              <div className={classes.tableItem} style={{width: "50%"}}>Subject</div>
              <div className={classes.tableItem} style={{width: "10%"}}>
                <div>Date</div>
                <div>{this.state.sorted ? ascButton : descButton}</div>
              </div>
            </div>
      
            {this.renderEvents()}

          </div>

        </div>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => ({ value: state.count.value })
const mapStateToProps = state => ({ 
  mails: state.mails,
  startDate: state.startDate
})
const mapDispatchToProps = (dispatch) => ({
  readMails: () => dispatch(readMails()),
  sortByAsc: () => dispatch(sortByAsc()),
  sortByDesc: () => dispatch(sortByDesc()),
  filterByDate: (props) => dispatch(filterByDate(props)),
})
// const mapDispatchToProps = ({ readMails, sortByAsc, sortByDesc, filterByDate(startDate) })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MailboxIndex))
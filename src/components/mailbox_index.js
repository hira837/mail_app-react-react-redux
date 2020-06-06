import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { withStyles } from '@material-ui/core/styles'
import { commonStyles } from '../assets/style'
import Button from '@material-ui/core/Button'
import logo from '../img/logo.png'
import clip from '../img/icon_clip.svg'
import calendar from '../img/icon_calender.svg'
import search from '../img/icon_search.svg'

// Date Picker
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import Calendar from "react-date-range-calendar";

import { readMails, sortByAsc, sortByDesc, filterByDate } from '../actions'

function replaceToSlash(date) {
  const regrex = /-/gi
  return date.replace(regrex, '/')
}

class CalendarInput extends Component {
  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect(startDate, endDate, validDateRange) {
    this.props.onDateChange(startDate, endDate, validDateRange)
  }

  render() {
    return (
      <Calendar
        onSelect={(startDate, endDate, validDateRange) => this.handleSelect(startDate, endDate, validDateRange)}
      />
    );
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
      startDate: '',
      endDate: '',
      validDateRange: [],
      key: 'selection',
      breakPoint: 600
    };
  }
  componentDidMount() {
    this.props.readMails();
  }

  renderEvents() {
    const { classes } = this.props;
    return _.map(this.props.mails, (mail) => (
      <div key={mail.id} className={classes.tableInnerRow}>
        <div className={classes.tableInnerItem + " " + classes.innerItemFrom}>{mail.from}</div>
        <div className={classes.tableInnerItem + " " + classes.innerItemTo}>
          {mail.to.length >= 2 
          ? <div className={classes.toItem}>
              <div>{mail.to[0] + ", ..."}</div>
              <div className={classes.unreadItem}>+{mail.to.length}</div>
            </div>
          : mail.to}
        </div>
        <div className={classes.tableInnerItem + " " + classes.innerItemSubject}>
          <Link to={`/mailbox/${mail.id}`} style={{ color: "#0288d1"}}>{mail.subject}</Link>
        </div>
        <div className={classes.tableInnerItem + " " + classes.innerItemDate}>
          {mail.attachedfile ? <div className={classes.innerItemClip}><img src={clip} /></div> : ""}
          {mail.date}
        </div>
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

  async handleSetDate(startDate, endDate, validDateRange) {
    await this.setState({
      startDate: startDate,
      endDate: endDate,
      validDateRange: validDateRange
    })
  }

  doneSetDate() {
    this.props.filterByDate(this.state.startDate, this.state.endDate, this.state.validDateRange)
    this.calendarOpenClick()
  }

  calendarOpenClick() {
    this.setState((prevState) => ({
      calendarIsOpen: !prevState.calendarIsOpen
    }))
  }

  render() {
    const { classes } = this.props;
    const ascButton = <ArrowDropUpIcon fontSize="small" onClick={this.orderByDate} />,
      descButton = <ArrowDropDownIcon fontSize="small"　onClick={this.orderByDate} />;

    const startDate = this.state.startDate,
    endDate = this.state.endDate

    const calendarElement = 
      <div style={{ position: "absolute", zIndex: 2 }}>
        <CalendarInput 
          onDateChange={this.handleSetDate}
        />
        <Button variant="contained" color="secondary" onClick={this.doneSetDate}>Done</Button>
      </div>
    const modalOverlay = 
      <div className={classes.modalBg} onClick={this.calendarOpenClick}></div>
    
    return (
      <React.Fragment>
        <div className={classes.root}>
          <div style={{ position: "relative" }}>
            {this.state.calendarIsOpen ? calendarElement : null}
          </div>
          {this.state.calendarIsOpen ? modalOverlay : null}

          <div style={{display: "flex"}}>
            <div className={classes.calendarInput} onClick={this.calendarOpenClick}>
              <div><img src={calendar} className={classes.calendarIcon} /></div>
              <div className={classes.calendarItem}>{replaceToSlash(startDate)}</div>
              <div>-</div>
              <div className={classes.calendarItem}>{replaceToSlash(endDate)}</div>
            </div>
            <div className={classes.searchIcon}>
              <img src={search} style={{width: "25px", heigt: "25px"}} />
            </div>
          </div>
          

          <div style={{ fontWeight: 700, marginBottom: "5px" }}>
            Results: {this.returnMailsLength() <= 1 ? this.returnMailsLength() + "mail" : this.returnMailsLength() + "mails" }
          </div>
          
          <FloatingActionButton
            containerElement={<Link to="/mailbox/create"></Link>}
            className={classes.addButton}
          >
            <ContentAdd />
          </FloatingActionButton>

          <div>
            <div className={classes.titleRow}>
              <div className={classes.titleItem + " " + classes.titleFrom}>From</div>
              <div className={classes.titleItem + " " + classes.titleTo}>To</div>
              <div className={classes.titleItem + " " + classes.titleSubject}>Subject</div>
              <div className={classes.titleItem + " " + classes.titleDate}>
                <div>Date</div>
                <div className={classes.titleItemIcon}>{this.state.sorted ? ascButton : descButton}</div>
              </div>
            </div>
      
            {this.returnMailsLength() > 0 ? this.renderEvents() : <div className={classes.logo}><img src={logo} /></div>}

          </div>

        </div>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => ({ value: state.count.value })
const mapStateToProps = state => ({ 
  mails: state.mails,
  startDate: state.startDate,
  endDate: state.endDate,
  validDateRange: state.validDateRange
})
const mapDispatchToProps = (dispatch) => ({
  readMails: () => dispatch(readMails()),
  sortByAsc: () => dispatch(sortByAsc()),
  sortByDesc: () => dispatch(sortByDesc()),
  filterByDate: (startDate, endDate, validDateRange) => dispatch(filterByDate(startDate, endDate, validDateRange)),
})
// const mapDispatchToProps = ({ readMails, sortByAsc, sortByDesc, filterByDate(startDate) })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(commonStyles)(MailboxIndex))
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
import Fab from '@material-ui/core/Fab'
import CloseIcon from '@material-ui/icons/Close';
import NavigationIcon from '@material-ui/icons/Navigation'
import logo from '../assets/img/logo.png'
import clip from '../assets/img/icon_clip.svg'
import calendar from '../assets/img/icon_calender.svg'
import search from '../assets/img/icon_search.svg'
import iconMailSp from '../assets/img/icon_mail_sp.svg'
import IconButton from '@material-ui/core/IconButton'
import CachedIcon from '@material-ui/icons/Cached'

// Date Picker
import Calendar from "react-date-range-calendar";

import { readMails, sortByAsc, sortByDesc, filterByDate } from '../actions'

function getWindowSize() {
  var ww = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    w = ww.innerWidth || e.clientWidth || g.clientWidth,
    h = ww.innerHeight || e.clientHeight || g.clientHeight;

  return {
    width: w,
    height: h
  }
}

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
        style={{ flexDirection: "row" }}
      />
    );
  }
}

class MailboxIndex extends Component {
  constructor(props) {
    super(props);
    this.orderByDate = this.orderByDate.bind(this);
    this.calendarOpenClick = this.calendarOpenClick.bind(this)
    this.calendarCancelClick = this.calendarCancelClick.bind(this)
    this.handleSetDate = this.handleSetDate.bind(this)
    this.doneSetDate = this.doneSetDate.bind(this)
    this.updateMail = this.updateMail.bind(this)
    this.state = {
      sorted: true,
      calendarIsOpen: false,
      startDate: '',
      endDate: '',
      validDateRange: [],
      key: 'selection',
      breakPoint: 600,
      deviceIsSp: false
    };
  }
  componentDidMount() {
    this.props.readMails();
    if(getWindowSize().width < this.state.breakPoint) {
      this.setState({ deviceIsSp: true })
    } else {
      this.setState({ deviceIsSp: false })
    }
  }

  renderEvents() {
    const { classes } = this.props;
    const spMail = <div className={classes.iconMailSp}><img className={classes.iconMailSpItem} src={iconMailSp} alt="from to（アイコン）" /></div>
    return _.map(this.props.mails, (mail) => (
      <div key={mail.id} className={classes.tableInnerRow}>
        {this.state.deviceIsSp ? spMail : ''}
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
          {mail.attachedfile ? <div className={classes.innerItemClip}><img src={clip} alt="attached file（アイコン）" /></div> : ""}
          {replaceToSlash(mail.date)}
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
      this.props.sortByDesc(this.state.startDate, this.state.endDate, this.state.validDateRange);
    } else {
      this.props.sortByAsc(this.state.startDate, this.state.endDate, this.state.validDateRange);
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

  async calendarCancelClick() {
    await this.setState((prevState) => ({
      startDate: prevState.startDate,
      endDate: prevState.endDate,
      validDateRange: prevState.validDateRange,
    }))
    this.calendarOpenClick()
  }

  async updateMail() {
    await this.setState({
      startDate: '',
      endDate: '',
      validDateRange: []
    })
    this.props.readMails()
  }

  render() {
    const { classes } = this.props;
    const ascButton = <ArrowDropUpIcon fontSize="small" onClick={this.orderByDate} />,
      descButton = <ArrowDropDownIcon fontSize="small"　onClick={this.orderByDate} />;

    const startDate = this.state.startDate,
    endDate = this.state.endDate

    const calendarElement = 
      <div className={classes.calendarInner}>
        <CalendarInput 
          onDateChange={this.handleSetDate}
        />
        <Fab
          variant="extended"
          size="large"
          color="secondary"
          aria-label="done"
          className={classes.doneButton}
          onClick={this.doneSetDate}
        >
          <NavigationIcon  />
          Done
        </Fab>
        <Fab
          size="small"
          color="primary"
          aria-label="cancel"
          className={classes.cancelButton}
          onClick={this.calendarOpenClick}
        >
          <CloseIcon />
        </Fab>
        
      </div>
    const modalOverlay = 
      <div className={classes.modalBg} onClick={this.calendarOpenClick}></div>
    
    return (
      <React.Fragment>
        <div className={classes.root}>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {this.state.calendarIsOpen ? calendarElement : null}
          </div>
          {this.state.calendarIsOpen ? modalOverlay : null}

          <div className={classes.calendarParent}>
            <div className={classes.calendarInput} onClick={this.calendarOpenClick}>
              <div><img src={calendar} className={classes.calendarIcon} alt="Calendar（アイコン）" /></div>
              <div className={classes.calendarItem}>{replaceToSlash(startDate)}</div>
              <div>-</div>
              <div className={classes.calendarItem}>{replaceToSlash(endDate)}</div>
            </div>
            <div className={classes.searchItem}>
              <img src={search} className={classes.searchIcon} alt="Search（アイコン）"/>
            </div>
          </div>

          <div className={classes.resultItem}>
            Results: {this.returnMailsLength() <= 1 ? this.returnMailsLength() + "mail" : this.returnMailsLength() + "mails" }
            <IconButton aria-label="update"
              onClick={this.updateMail}
              className={classes.updateButton}>
              <CachedIcon/>
            </IconButton>
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
      
            {this.returnMailsLength() > 0 ? this.renderEvents() : <div className={classes.logo}><img src={logo} alt="logo icon（アイコン）"/></div>}

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
  sortByAsc: (startDate, endDate, validDateRange) => dispatch(sortByAsc(startDate, endDate, validDateRange)),
  sortByDesc: (startDate, endDate, validDateRange) => dispatch(sortByDesc(startDate, endDate, validDateRange)),
  filterByDate: (startDate, endDate, validDateRange) => dispatch(filterByDate(startDate, endDate, validDateRange)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(commonStyles)(MailboxIndex))
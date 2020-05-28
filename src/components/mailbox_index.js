import React, { Component, useState } from 'react'
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

// Date Picker
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { Calendar } from 'react-date-range'
import { addDays } from 'date-fns'

import { readMails, sortByAsc, sortByDesc } from '../actions'

class CalendarInput extends Component {
  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect(date) {
    console.log(date)
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
    // this.setDate = this.setDate.bind(this);
    this.calendarOpenClick = this.calendarOpenClick.bind(this)
    this.handleSetDate = this.handleSetDate.bind(this)
    this.state = {
      sorted: true,
      calendarIsOpen: false,
      startDate: null,
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

  handleSelect(ranges) {
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
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

  // setDate() {
  //   this.setState((prevState) => ({
  //     calendarIsOpen: !prevState.calendarIsOpen
  //   }))
  //   console.log(this.state.startDate, this.state.endDate)
  // }

  handleSetDate(date) {
    this.setState({startDate: date})
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
    const ascButton = <ArrowDropUpIcon onClick={this.orderByDate} />,
      descButton = <ArrowDropDownIcon onClick={this.orderByDate} />;


    // function Calendar() {
    //   const [date, setDate] = useState([
    //     {
    //       startDate: new Date(),
    //       endDate: new Date(),
    //       key: 'selection'
    //     }
    //   ]);
    //   const handleSelect = () => {
    //     console.log(date[0].startDate);
    //     // console.log(this.props.startDate);
    //     // setDate({startDate: ranges.selection.startDate})
    //     this.props.onDateChange(date[0].startDate)
    //   }
    //   return (
    //     <div>
    //       <DateRangePicker
    //         onChange={async item => 
    //           await setDate([item.selection],
    //           // console.log(item.selection.startDate, item.selection.endDate),
    //           handleSelect(item.selection)
    //         )}
    //         showSelectionPreview={true}
    //         moveRangeOnFirstSelection={false}
    //         months={1}
    //         ranges={date}
    //         direction="vertical"
    //         scroll={{ enabled: true }}
    //       />
    //       <Button variant="contained" color="secondary" onClick={handleSelect}>Set Date</Button>
    //     </div>
    //   )
    // }

    const startDate = this.state.startDate

    const calendarElement = 
      <div style={{ position: "absolute", zIndex: 2 }}>
        {/* <Calendar onDateChange={this.handleSetDate}/> */}
        <CalendarInput 
          startDate={startDate}
          onDateChange={this.handleSetDate}
        />
      </div>
    const modalOverlay = 
      <div className="bg" style={{ position: "fixed", zIndex: 1, top: 0, left: 0, width: "100%", height: "120%", backgroundColor: "rgba(0,0,0,0.75)" }} onClick={this.calendarOpenClick}></div>
    
    return (
      <React.Fragment>
        <Button variant="contained" color="primary" onClick={this.calendarOpenClick} style={{ zIndex: 2 }}>
          {this.state.calendarIsOpen ? 'Close' : 'Open Clendar'}
        </Button>
        <div style={{ position: "relative" }}>
          {this.state.calendarIsOpen ? calendarElement : null}
        </div>
        {this.state.calendarIsOpen ? modalOverlay : null}
        <div style={{ fontWeight: 700 }}>
          Results: {this.returnMailsLength()} mails
        </div>
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
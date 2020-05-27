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
import { DateRangePicker } from 'react-date-range'
import { addDays } from 'date-fns'

import { readMails, sortByAsc, sortByDesc } from '../actions'

class MailboxIndex extends Component {
  constructor(props) {
    super(props);
    this.orderByDate = this.orderByDate.bind(this);
    this.state = { 
      sorted: true,
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.setDate = this.setDate.bind(this);
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

  handleSelect(ranges) {
    console.log(ranges);
  }

  setDate() {
    console.log(this.state.startDate, this.state.endDate)
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

    function Calendar() {
      const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }
      ]);
      return (
        <div>
          <DateRangePicker
            onChange={item => 
              setState([item.selection],
              console.log(item.selection)
            )}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={state}
            direction="vertical"
            scroll={{ enabled: true }}
          />
          {/* <Button variant="contained" color="primary" onClick={console.log(state[0].startDate)}>Set Date</Button> */}
        </div>
      )
    }
    
    return (
      <React.Fragment>
        <Calendar />
        <Button variant="contained" color="secondary" onClick={this.setDate}>Set Date</Button>
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
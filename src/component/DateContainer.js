import React from 'react';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse, parseISO } from 'date-fns'

const DateInputRow = styled.div`
  display: flex;
  /* margin-top: 50px; */
`;

const StyledDatePicker = styled(DatePicker)`
  margin-right: 15px;
  border: 1px solid #444;
  padding: 3px 6px;
  margin-bottom: 10px;
`;

const MainRow = styled.div`
  width: 95%;
  margin: 10px auto;
  justify-content: space-between;
  display: flex;

`;

const SearchInput = styled.input`
  width: 150px;
  border: 1px solid #444;
  height: 20px;
  padding-left: 10px;
`;

const Note = styled.div`
  color: #777;
  font-size: 12px;
  font-style: italic;
`;

class DateContainer extends React.Component {
  constructor(props){
    super(props);
    this.state={
      startDate: null,
      endDate: null,
      value: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSort() {

  }
  
  handleStartDateChange = date => {
    let newDate = format(date, 'MM/dd/yyyy');
    // let stringDate = newDate.toLocaleString();
    // console.log('date', stringDate);
    // this.setState({
    //   startDate: newDate,
    // });
    this.props.startCallback(newDate)
  };
  handleEndDateChange = date => {
    let newDate = format(date, 'MM/dd/yyyy');
    // this.setState({
    //   endDate: date
    // });
    this.props.endCallback(newDate)
  };
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return(
      <MainRow>
        <DateInputRow>
          <div>
            <StyledDatePicker
              selected={this.state.startDate}
              onChange={this.handleStartDateChange}
              popperPlacement="top"
              dateFormat="yyyy/MM/dd"
              // placeholderText="Select Start Date"
            />
            <Note> Home: Move to the previous year.</Note>
            <Note> End: Move to the next year. </Note>
          </div>
          <div>
            <StyledDatePicker
              selected={this.state.endDate}
              onChange={this.handleEndDateChange}
              popperPlacement="top"
            />
             <Note> Home: Move to the previous year.</Note>
            <Note> End: Move to the next year. </Note>
          </div>
        </DateInputRow>
        <form onSubmit={this.handleSubmit}>
          <SearchInput type="text" value={this.state.value} onChange={this.handleChange} />
        </form>
      </MainRow>
    )
  }
}
export default DateContainer;
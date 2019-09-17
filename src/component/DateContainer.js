import React from 'react';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse, parseISO, getTime } from 'date-fns';

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
      startDate: new Date(),
      endDate: new Date(),
      value: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSort() {

  }
  
  handleStartDateChange = date => {
    this.setState({
      startDate: date
    })
    this.props.startCallback(date)
  };
  handleEndDateChange = date => {
    // let newDate = format(date, 'MM/dd/yyyy');
    this.setState({
      endDate: date
    });
    this.props.endCallback(date)
  };
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    this.props.searchCallback(this.state.value)
    // console.log("entered text:", this.state.);
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
              dateFormat="MM/dd/yyyy"
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
          <SearchInput 
            type="text"
            placeholder="Search Campaign" 
            value={this.state.value} 
            onChange={this.handleChange} 
          />
        </form>
      </MainRow>
    )
  }
}
export default DateContainer;
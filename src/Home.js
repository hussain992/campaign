import React from 'react';
import styled from 'styled-components';
import DateContainer from './component/DateContainer';
import CampaignTable from './component/CampaignTable';
import { format, getTime } from 'date-fns';

// const Arr = [{"id":1,"name":"Divavu","startDate":"9/19/2017","endDate":"3/9/2018","Budget":88377},
// {"id":2,"name":"Jaxspan","startDate":"11/21/2017","endDate":"2/21/2018", "Budget":608715},
// {"id":3,"name":"Miboo","startDate":"11/1/2017","endDate":"6/20/2017","Budget":239507},
// {"id":4,"name":"Trilith","startDate":"8/25/2017","endDate":"11/30/2017", "Budget":179838},
// {"id":5,"name":"Layo","startDate":"11/28/2017","endDate":"3/10/2018","Budget":837850},
// {"id":6,"name":"Photojam","startDate":"6/23/2017","endDate":"7/25/2017", "Budget":858131},
// {"id":7,"name":"Blogtag","startDate":"6/27/2017","endDate":"1/15/2018"," Budget":109078},
// {"id":8,"name":"Rhyzio","startDate":"10/13/2017","endDate":"1/25/2018"," Budget":272552},
// {"id":9,"name":"Zoomcast","startDate":"9/6/2017","endDate":"11/10/2017", "Budget":301919},
// {"id":10,"name":"Realbridge","startDate":"3/5/2018","endDate":"10/2/2020 ","Budget":505602}
// ];

// [{"id":13,"name":"Layo","startDate":"11/28/2017","endDate":"3/10/2018","Budget":837850},
// {"id":14,"name":"Photojam","startDate":"6/23/2017","endDate":"7/25/2017", "Budget":858131}]



const MainLayout = styled.div`
  border: 2px solid #91aeff;
	width: 50%;
	margin: 0 auto;
	display: flex;
	padding: 30px;
	border-radius: 4px;
	flex-direction: column;
	@media only screen and (max-width: 768px) {
		width: 90%;
		padding: 15px;	}
`;

class Home extends React.Component {
	constructor(props){
		super(props);
		this.state={
			startDateKey:'',
			endDateKey:'',
			searchTerm:'',
			startDateRange: '',
			endDateRange: '',
			consoleData: [],

		}
	};
	componentDidMount() {
		window.AddCampaigns = (data,data1) => {
			// console.log('data====', data);
			this.setState({
				consoleData: this.state.consoleData.concat(data),
			})
		}
	}
	callbackStartDateFunction = (childData) => {
		let startDateFormated = format(childData, 'MM/dd/yyyy');
		let startMs = getTime(childData);
		this.setState({
			startDateKey: startDateFormated,
			startDateRange: startMs,
		}
		// , () => console.log("got date from prop:", this.state.startDateKey )
		)

		// console.log('parent int start date:', startMs);
	}
	callbackEndDateFunction = (childData) => {
		let endDateFormated = format(childData, 'MM/dd/yyyy');
		let endMs = getTime(childData);
		this.setState({
			endDateKey: endDateFormated,
			endDateRange: endMs,
		}
		// , () => 
		// console.log("got end date from prop:", this.state.endDateKey )
		)
		// console.log('')
	}
	callbackEnteredName = (name) => {
		this.setState({
			searchTerm: name,
		})
	}
	render() {
		// console.log("integer date:", this.state.startDateRange, this.state.endDateRange);
		// console.log('state=====', this.state);
		const { consoleData } = this.state;

		return(
			<MainLayout>
				<DateContainer 
					startCallback = {this.callbackStartDateFunction} 
					endCallback = {this.callbackEndDateFunction}
					searchCallback = {this.callbackEnteredName}
					data={consoleData} 
				/>
				<CampaignTable 
					endDate={this.state.endDateKey} 
					startDate={ this.state.startDateKey} 
					name={this.state.searchTerm}
					startRange={this.state.startDateRange}
					endRange={this.state.endDateRange}
					data={consoleData} 
				/>
			</MainLayout>
		)
	}
}
export default Home;
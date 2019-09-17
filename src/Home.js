import React from 'react';
import styled from 'styled-components';
import DateContainer from './component/DateContainer';
import CampaignTable from './component/CampaignTable';

const Arr = [{"id":1,"name":"Divavu","startDate":"9/19/2017","endDate":"3/9/2018","B udget":88377},
{"id":2,"name":"Jaxspan","startDate":"11/21/2017","endDate":"2/21/2018", "Budget":608715},
{"id":3,"name":"Miboo","startDate":"11/1/2017","endDate":"6/20/2017","Bu dget":239507},
{"id":4,"name":"Trilith","startDate":"8/25/2017","endDate":"11/30/2017", "Budget":179838},
{"id":5,"name":"Layo","startDate":"11/28/2017","endDate":"3/10/2018","Bu dget":837850},
{"id":6,"name":"Photojam","startDate":"7/25/2017","endDate":"6/23/2017", "Budget":858131},
{"id":7,"name":"Blogtag","startDate":"6/27/2017","endDate":"1/15/2018"," Budget":109078},
{"id":8,"name":"Rhyzio","startDate":"10/13/2017","endDate":"1/25/2018"," Budget":272552},
{"id":9,"name":"Zoomcast","startDate":"9/6/2017","endDate":"11/10/2017", "Budget":301919},
{"id":10,"name":"Realbridge","startDate":"3/5/2018","endDate":"10/2/2017 ","Budget":505602}
];

const MainLayout = styled.div`
  border: 2px solid #91aeff;
	width: 50%;
	margin: 0 auto;
	display: flex;
	padding: 30px;
	border-radius: 4px;
	flex-direction: column;
	/* min-height: 300px; */
`;

class Home extends React.Component {
	constructor(props){
		super(props);
		this.state={
			startDateKey:'',
			endDateKey:'',
			searchTerm:'',
		}
	};
	callbackStartDateFunction = (childData) => {
		this.setState({
			startDateKey: childData,
		}, () => console.log("got date from prop:", this.state.startDateKey ))
	}
	callbackEndDateFunction = (childData) => {
		this.setState({
			endDateKey: childData,
		}, () => console.log("got end date from prop:", this.state.endDateKey ))
	}
	callbackEnteredName = (name) => {
		this.setState({
			searchTerm: name,
		})
	}
	render() {
		// console.log
		return(
			<MainLayout>
				<DateContainer 
					startCallback = {this.callbackStartDateFunction} 
					endCallback = {this.callbackEndDateFunction}
					searchCallback = {this.callbackEnteredName}
					data={Arr} 
				/>
				<CampaignTable 
					endDate={this.state.endDateKey} 
					startDate={ this.state.startDateKey} 
					name={this.state.searchTerm}
					data={Arr} 
				/>
			</MainLayout>
		)
	}
}
export default Home;
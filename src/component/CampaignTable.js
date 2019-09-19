import React, { Fragment } from 'react';
import styled from 'styled-components';
import sortBy from 'lodash.sortby';
import { parse, parseISO, getTime } from 'date-fns';

const TableHeader = styled.div`
	display: flex;
	flex-direction: row;
	background-color: #3471eb;
	/* height: 40px; */
	width: 95%;
	margin: 0 auto;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	align-items: center;
	margin-top: 15px;
	
`;

const Title = styled.div`
	color: white;
	width: 25%;
	justify-content: center;
	border-right: 1px solid #fff;
	padding: 10px;
`;

const Description = styled.div`
	background-color: #e6ecff;
	width:95%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	border-bottom: 1px solid #3471eb;
	&:last-child {
		border-right: 1px solid #fff;
		border-bottom: 1px solid #fff;
	}
`;

const Data = styled.div`
	color: #444;
	width: 25%;
	padding: 5px 10px;
	border-right: 1px solid #3471eb;
	&:last-child {
		border-right: 1px solid #fff;
	}
`;

const StatusRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const Dot = styled.div`
	width: 10px;
	height: 10px;
	margin-right: 10px;
	/* background-color: #dc3d3d; */
	border-radius: 10px;
`;

const StatusText = styled.div`
	color: #444;
`;
const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	width: 95%;
	margin: 0 auto;
`;
const SortButton = styled.div`
	border: 1px solid #91aeff;
	padding: 5px 10px;
	border-radius: 4px;
	align-self: flex-start;
	display: flex;
	margin-right: 15px;
	text-transform: capitalize;
	cursor: pointer;
`;
class CampaignTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataArr: this.props.data,
			SortData: [],
			status: '',
			sortName: false,
			sortDate: false,
		}
		this.sortNameClick = this.sortNameClick.bind(this);
		this.sortStartDate = this.sortStartDate.bind(this);
	}



	sortNameClick() {
		// console.log("click sort");
		let unsortedName = []
		unsortedName = this.state.dataArr
		let sortedName = sortBy(unsortedName, ['name'])
		// console.log("sorted name:", sortedName);
		this.setState({
			dataArr: sortedName,
			sortName: true,
			sortDate: false,
		}, 
		// console.log("sorted name:", sortedName)
		)
	}

	sortStartDate() {
		// console.log("click sort");
		let tempArr = this.props.data;
		tempArr.sort(function compare(a, b) {
			var dateA = new Date(a.startDate);
			var dateB = new Date(b.startDate);
			return dateA - dateB;
		});
		this.setState({
			dataArr: tempArr,
			sortDate: true,
			sortName: false,
		})
		// console.log("sorted start date",tempArr);
	}

	static getDerivedStateFromProps(props, state) {
		if (props.data.length > 0 && props.name.length <= 0 && props.startRange <= 0 && state.sortName === false) {
			// console.log("entered here", state.dataArr);
			return {
				dataArr: props.data,
			}
		}
		if (props.name.length > 0) {
			let data = state.dataArr;
			// console.log("enter in search method", data);
			let filterName = [];
			data.map(data => {
				// console.log("hello");
				if (data.name === props.name) {
					// console.log("success");
					filterName.push(data)
				}
			})
			if (filterName.length > 0) {
				return {
					dataArr: filterName,
				}
			}
			else {
				alert("Sorry No Campaign found");
			}
		}
		if (props.startRange > 0) {

			if (props.endRange > 0) {
				if (props.endRange < props.startRange) {
					alert('End Date cannot be before Start Date');
					return null;
				}
				let data = state.dataArr;
				let DateRange = [];
				data.map(data => {
					let startDate = getTime(parse(data.startDate, 'MM/dd/yyyy', new Date()))
					let endDate = getTime(parse(data.endDate, 'MM/dd/yyyy', new Date()))
					// console.log("hello")
					if (startDate > props.startRange && endDate < props.endRange) {
						// console.log('within range');
						DateRange.push(data)
					}
				})
				if (DateRange.length > 0) {
					return {
						dataArr: DateRange,
					}
				}
			}
		}
		return null;
	}
	CampaignStatus() {

	}
	render() {
		// const Arr = this.props.data;
		// console.log('data===Array====', this.state.dataArr);
		// console.log("data in campaign table:", this.props.startDate, this.props.endDate);
		// console.log("search name", this.props);
		// console.log("range",this.props.startRange)
		// console.log("render called", this.state.dataArr);
		return (
			<Fragment>
				<ButtonRow>
					<SortButton style={{ backgroundColor: this.state.sortName ? "#3471eb" : '#fff', color: this.state.sortName ? '#fff' : "#3471eb" }} 
						onClick={this.sortNameClick}>Sort by name</SortButton>
					<SortButton style={{ backgroundColor: this.state.sortDate ? "#3471eb" : '#fff', color: this.state.sortDate ? '#fff' : "#3471eb" }}
						onClick={this.sortStartDate}>Sort by start date</SortButton>
				</ButtonRow>
				<TableHeader>
					<Title> Name </Title>
					<Title> Start Date </Title>
					<Title> End Date </Title>
					<Title> Active </Title>
					<Title> Budget </Title>
				</TableHeader>
				{
					this.state.dataArr.length === 0 ?
						<Description>
							<Data> No data Available </Data>
						</Description>
						:
						<Fragment>
							{
								this.state.dataArr.map(data => {
									let currentDate = getTime(new Date());
									let endDate = getTime(parse(data.endDate, 'MM/dd/yyyy', new Date()))
									if (currentDate < endDate) {
										// console.log("false");
									}
									return (
										<Description key={data.id}>
											<Data>{data.name}</Data>
											<Data>{data.startDate}</Data>
											<Data>{data.endDate}</Data>
											<Data>
												<StatusRow>
													<Dot style={{ backgroundColor: currentDate < endDate ? "#14a214" : "#9e1616" }} />
													<StatusText>{currentDate < endDate ? "active" : "Inactive"}</StatusText>
												</StatusRow>
											</Data>
											<Data>{data.Budget}</Data>
										</Description>
									)
								})
							}
						</Fragment>
				}
			</Fragment>
		)
	}
}
export default CampaignTable;
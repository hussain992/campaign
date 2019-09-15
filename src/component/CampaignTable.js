import React, {Fragment} from 'react';
import styled from 'styled-components';
import sortBy from 'lodash.sortby';


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

class CampaignTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				dataArr : this.props.data,
				SortData: [],
		}
		this.sortName = this.sortName.bind(this);
		this.sortStartDate = this.sortStartDate.bind(this);

	}
	sortName() {
		console.log("click sort");
		this.setState(prevState => {
			return(
				{dataArr: sortBy(prevState.dataArr, ['name'])}
			)
		},() => console.log('sorted data', this.state.dataArr))
	}
	sortStartDate() {
		console.log("click sort");
		let tempArr = this.props.data;
		// this.setState(prevState => {
		// 	return(
		// 		{dataArr: sortBy(prevState.dataArr, ['startDate'])}
		// 	)
		// },() => console.log('sorted data', this.state.dataArr))
		tempArr.sort(function compare(a, b) {
			var dateA = new Date(a.startDate);
			var dateB = new Date(b.startDate);
			return dateA - dateB;
		});
		this.setState({
			dataArr: tempArr,
		})
		console.log("sorted start date",tempArr);
	}
	sortRange() {

	}

	render() {
		const Arr = this.props.data;
		console.log(this.state.dataArr);
		console.log("data in campaign table:", this.props.startDate, this.props.endDate);

		return(
			<Fragment>
				<div onClick={this.sortName}>sort</div>
				<div onClick={this.sortStartDate}>startdate</div>
				<TableHeader>
					<Title> Name </Title>
					<Title> Start Date </Title>
					<Title> End Date </Title>
					<Title> Budget </Title>
				</TableHeader>
				{
					this.state.dataArr.map(data => {
						return(
							<Description key={data.id}>
								<Data>{data.name}</Data>
								<Data>{data.startDate}</Data>
								<Data>{data.endDate}</Data>
								<Data>{data.Budget}</Data>
							</Description>
						)
					})
				}
			</Fragment>
		)
	}
}
export default CampaignTable;
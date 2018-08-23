import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class RecordsTable extends React.Component {
	render() {
		return (
			<Table>
				<TableHead>
					<TableRow>
						{this.props.recordModifier && <TableCell></TableCell>}
						<TableCell>Name</TableCell>
						<TableCell>Phone Number</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						this.props.records.map((record) => {
							return (
								<TableRow key={record.id}>
									{
										this.props.recordModifier &&
										<TableCell>
										{
											React.cloneElement(
												this.props.recordModifier,
												{
													recordid: record.id,
												}
											)
										}
										</TableCell>
									}
									<TableCell>{record.name}</TableCell>
									<TableCell>{record.phoneNumber}</TableCell>
								</TableRow>
							);
						})
					}
				</TableBody>
			</Table>
		);
	}
}

export default RecordsTable;

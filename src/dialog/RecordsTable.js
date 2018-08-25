import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

/**
 * A table containing search results for records.
 * A modifier can be given as a prop, allowing for additional children
 * to be prepended to record rows.
 */
class RecordsTable extends React.Component {
	static propTypes = {
		records: PropTypes.array.isRequired,
		recordModifier: PropTypes.element,
	};

	render() {
		return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Phone Number</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						this.props.records.map((record) => {
							return (
								<TableRow key={record.id}>
									<TableCell>
										{
											this.props.recordModifier &&
											React.cloneElement(
												this.props.recordModifier,
												{
													recordid: record.id,
													recordname: record.name,
													recordphonenumber: record.phoneNumber,
												}
											)
										}
										{record.name}
									</TableCell>
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

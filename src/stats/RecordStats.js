import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	card: {
		[theme.breakpoints.up('md')]: {
			width: "40%",
		},
		margin: "0 auto",
	},
});

/**
 * A Card containing the historical average records added per hour, as well as
 * the average records added vs deleted per hour.
 */
class RecordStats extends React.Component {
	static propTypes = {
		averageRecordsAdded: PropTypes.number.isRequired,
		averageRecordsDeleted: PropTypes.number.isRequired,
		classes: PropTypes.object.isRequired,
		updateAverages: PropTypes.func.isRequired,
	};

	/**
	 * Calculate the greatest common denominator between two numbers
	 * @param {number} a
	 * @param {number} b
	 * @return {number} the greatest common denominator between a and b, or undefined if either is null
	 */
	gcd(a, b) {
		if (a == null || b == null) {
			// Either number being null or undefined means we can't calculate the GCD!
			return undefined;
		}

		return (b === 0) ? a : this.gcd(b, a%b);
	}

	/**
	 * Update the statistics using an interval, calling the back end every second.
	 * TODO: this could be swapped out to use long polling when a real back end
	 * is used instead of our mock.
	 */
	componentDidMount() {
		this.props.updateAverages();
		this.interval = setInterval(() => {
			this.props.updateAverages();
		}, 1000);
	}

	/**
	 * Clear the automatic updating of statistics
	 */
	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		const { averageRecordsAdded, averageRecordsDeleted, classes } = this.props;

		const ratioDivisor = this.gcd(averageRecordsAdded, averageRecordsDeleted);
		const reducedAdded = isNaN(averageRecordsAdded/ratioDivisor) ? 0 :
			averageRecordsAdded/ratioDivisor;
		const reducedDeleted = isNaN(averageRecordsDeleted/ratioDivisor) ? 0 :
			averageRecordsDeleted/ratioDivisor;

		return (
			<Card className={classes.card}>
				<CardContent >
					<Typography variant="body2" align="left">
						Average records added per hour: {averageRecordsAdded}
					</Typography>
					<Typography variant="body2" align="left">
						Ratio of records added vs deleted per hour:&nbsp;
						{
							[
								reducedDeleted === 0 ? averageRecordsAdded : reducedAdded,
								reducedAdded === 0 ? averageRecordsDeleted : reducedDeleted
							].join(":")
						}
					</Typography>
				</CardContent>
			</Card>
		);
	}
}

export default withStyles(styles)(RecordStats);

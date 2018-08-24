import React from 'react';

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

class RecordStats extends React.Component {
	// Calculate the greatest common denominator between two numbers
	gcd(a, b) {
		if (a == null || b == null) {
			// Either number being null or undefined means we can't calculate the GCD!
			return undefined;
		}

		console.log(`a is ${a}, b is ${b}`);
		return (b === 0) ? a : this.gcd(b, a%b);
	}

	componentDidMount() {
		// this.props.updateAverages();
		this.interval = setInterval(() => {
			this.props.updateAverages();
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		console.log('RERENDERING RECORDSTATS!!!!!!!!!');
		const { averageRecordsAdded, averageRecordsDeleted, classes } = this.props;
		// TODO: deal with division by zero
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

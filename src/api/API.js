/**
 * A wrapper for interaction with the back end record storage system.
 * NOTE: currently the back end is mocked, with records being stored in-browser
 * on page load.
 */
class API {
	/**
	 * An API abstraction class for interacting with this application's back end.
	 * TODO: probably include some optional parameters for a database connection
	 * address string for the real back end, etc.
	 */
	constructor() {
		this.mockDB = [
			{
				id: 1000000000,
				created: new Date(),
				name: "John Doe",
				phoneNumber: "7805551234",
			}
		];
		this.addedDates = this.mockDB.map(record => record.created).sort((dateA, dateB) => dateA - dateB);
		this.deletedDates = [];
	}

	/**
	 * Find the next available unique ten digit ID in our mock DB
	 * TODO: this method will be gone when a real back end is used
	 * @return {number} then next available database ID
	 */
	findNextID() {
		// Our next available ID is one more than the largest ID we find in our mock DB
		return this.mockDB.reduce((previous, current) => {
			return previous === undefined || current.id > previous ? current.id : previous;
		}, 999999999) + 1;
	}

	/**
	 * Determine if the props of the given test subject _exactly_ match those
	 * of the given "master" object.
	 * @return {boolean} true if all properties match
	 */
	allPropsMatch(testSubject, master) {
		for (let prop in master) {
				if (!testSubject.hasOwnProperty(prop) || testSubject[prop] !== master[prop]) {
					return false
				}
		}
		return true;
	}

	/**
	 * Determine if the props of the given test subject _contain_ (fuzzy match)
	 * those of the given "master" object.
	 * @param {Object} testSubject
	 * @param {Object} master
	 * @return {boolean} true if at least some properties fuzzy match
	 */
	fuzzyPropsMatch(testSubject, master) {
		for (let prop in master) {
			if (!master[prop] || !testSubject.hasOwnProperty(prop)) {
				// Skip comparing against empty props, as they will always match with
				// any string; also skip props that our test subject does not have
				continue;
			}
			// console.log(`Checking if ${testSubject[prop]} includes ${master[prop]}`)
			if (testSubject[prop].toLowerCase().includes(master[prop].toLowerCase())) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Add the given record to the back end database.
	 * @param {Object} newRecord
	 */
	addRecord(newRecord) {
		// TODO: perform a POST request to the real back end to add our new record

		newRecord = {
			id: this.findNextID(),
			created: new Date(),
			...newRecord
		};
		this.mockDB.push(newRecord);
		this.addedDates.push(newRecord.created);

		return newRecord;
	}

	/**
	 * Delete the given record from the back end database, if it is found.
	 * @param {Object} record
	 */
	deleteRecord(record) {
		// TODO: perform a DELETE request to the real back end to delete this record

		// Find the index in our mock DB that matches the given ID to delete
		// TODO: deal with case where recordIndex is -1 because we don't find the record
		let recordIndex = this.mockDB.findIndex((element) => {
			// Search through each of the properties that must match
			return this.allPropsMatch(element, record);
		});

		// `Array.prototype.splice` gives us an array as output, so we take
		// the first item from that array as we're only deleting one record.
		let deletedRecord = this.mockDB.splice(recordIndex, 1)[0];
		this.deletedDates.push(deletedRecord.created);

		return deletedRecord;
	}

	/**
	 * Find records in the back end database that _exactly_ match those of the
	 * given properties.
	 * @param {Object} searchProps
	 * @return {(Object|Array)} the matching database records
	 */
	findExactRecords(searchProps) {
		// TODO: perform a GET request to the real back end, querying for the desired record exactly
		return this.mockDB.filter((element) => {
			return this.allPropsMatch(element, searchProps);
		});
	}

	/**
	 * Find records in the back end database that _include_ (fuzzy match) match
	 * those of the given properties.
	 * @param {Object} searchProps
	 * @return {(Object|Array)} the matching database records
	 */
	findFuzzyRecords(searchProps) {
		// TODO: perform a GET request to the real back end, querying for fuzzy
		// matches of the desired record
		return this.mockDB.filter((element) => {
			return this.fuzzyPropsMatch(element, searchProps);
		});
	}

	/**
	 * Determine if two standard `Date` objects are on the same day
	 * @param {Date} a
	 * @param {Date} b
	 * @return {boolean} whether the two dates are on the same day
	 */
	sameDay(a, b) {
		return a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate();
	}

	/**
	 * Determine if two standard `Date` objects have identical hours
	 * @param {Date} a
	 * @param {Date} b
	 * @return {boolean} whether the two dates have identical hours
	 */
	sameHour(a, b) {
		return a.getHours() === b.getHours();
	}

	/**
	 * Given a list of dates, determine the average amount of dates/records per
	 * hour.
	 * TODO: this method can be abstracted away into an SQL query when
	 * using the real back end as opposed to our mock.
	 * @param {(Date|Array)} dates the array of dates to use for calculation
	 * @return {number} the average per hour for the given dates
	 */
	calculateAveragePerHour(dates) {
		const sortedDates = [...dates].sort((dateA, dateB) => {
			return dateA - dateB;
		});

		if (sortedDates.length === 0) {
			return 0;
		}
		let totalHours = 1;
		let currentDate = sortedDates[0];
		for (const date of sortedDates) {
			if (!this.sameDay(date, currentDate) || !this.sameHour(date, currentDate)) {
				// If the two sequential dates we're looking at are on different
				// days and/or at different times, we've got a new hour to count
				totalHours++;
			}
			currentDate = date;
		}

		return sortedDates.length / totalHours;
	}

	/**
	 * Determine the historical average records added per hour.
	 * TODO: this method will be abstracted away when a real back end is used
	 * @return {number} the historical average records added per hour
	 */
	calculateAverageAdded() {
		return this.calculateAveragePerHour(this.addedDates);
	}

	/**
	 * Determine the historical average records deleted per hour.
	 * TODO: this method will be abstracted away when a real back end is used
	 * @return {number} the historical average records deleted per hour
	 */
	calculateAverageDeleted() {
		return this.calculateAveragePerHour(this.deletedDates);
	}
}

export default API;

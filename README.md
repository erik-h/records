## Records

This project contains a React front end app for creating, deleting, and
displaying records. Records are composed of a unique 10 digit ID, a name
string, and a phone number string. The back end API is abstracted into its own
class; currently, a mock back end is used that stores records in browser
memory.

Note that the records database comes pre-populated with one entry.

### Building

Start by running `npm install` to pull down the dependencies. If running in
production, use `npm install --production` to skip optional dev dependencies.
To work on a development version of the project, run `npm start` to invoke the
default file compiling and watching functionality from `react-scripts` provided
to this project by `create-react-app`. For a production build, execute `npm run
build`; this will place a minified, deployment ready version of the project
into the `build/` directory.

### Testing

[Jest](https://jestjs.io) and [Enzyme](https://airbnb.io/projects/enzyme/) are
used for testing the application. Unit tests primarily for the main `<App />`
React component are located in `__tests__/`. To execute the test suite, run
`npm test`.

### Additional Documents

Documents containing questions regarding the design of the project, along with
a specification for a real back end REST API are located at `documents/`.

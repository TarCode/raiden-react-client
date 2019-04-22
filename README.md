
# Raiden React Client

This is a React app that connects to the [Raiden Express Server](https://github.com/TarCode/raiden-express-server)

## Get started
- Clone the repository
- run `npm install`
- Create a `.env` file and add `RAIDEN_CLIENT_URL=http://localhost:5001` (Replace `http://localhost:5001` with you Raiden client url)
- Ensure your Raiden client has whitelisted the url the server is running on (`http://localhost:3001`), or you'll get a `cors` error


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

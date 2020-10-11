import React from 'react'
import { makeStyles } from '@material-ui/styles';
import Header from './Containers/Header';
import Employees from './Containers/Employees';


const useStyles = makeStyles({
	root: {
		height: '100%',
		width: '100%',
		position: 'relative',
		overflow: 'auto',
		display: 'flex',
		flexDirection: 'column',
	}
});

const App = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Header />
			<Employees />
		</div>
	)
};

export default App;

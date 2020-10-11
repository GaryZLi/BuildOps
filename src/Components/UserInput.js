import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    updateFirstName,
    updateLastName,
    updateSkill,
} from '../actions';

const useStyles = makeStyles({
    root: {
        width: '90%',
        marginTop: 5,
        marginBottom: 5,
    },
});



const UserInput = ({
    placeholder,
    userInput,
    value,
    updateFirstName,
    updateLastName,
    updateSkill,
}) => {
    const classes = useStyles();

    const dispatch = {
        'firstname': updateFirstName,
        'lastname': updateLastName,
        'skill': updateSkill,
    };

    const handleChange = e => dispatch[value](e.target.value);

    return (
        <input
            className={classes.root}
            placeholder={placeholder}
            value={userInput[value]}
            onChange={handleChange}
        />
    )
};

const mapStateToProps = ({userInput}) => ({userInput});

const mapDispatchToProps = {
    updateFirstName,
    updateLastName,
    updateSkill,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { gql, useMutation } from '@apollo/client';

import SkillListMenu from '../../Components/SkillListMenu';
import UserInput from '../../Components/UserInput';
import ActionButton from '../../Components/ActionButton';
import {
    createEmployee,
} from '../../graphql/mutations'
import {
    getUniqueId,
    updateEmployees,
    updateSkills,
    updateSkill,
    updateFirstName,
    updateLastName
} from '../../actions';

const CreateEmployee = gql(createEmployee);

const useStyles = makeStyles({
    createEmployeeContainer: {
        height: 350,
        width: 270,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 20,
    },
    header: {
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
    skillContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        display: 'inline-block',
        padding: '5px 10px',
        borderRadius: '0.15em',
        boxSizing: 'border-box',
        textDecoration: 'none',
        fontFamily: 'Roboto, sans-serif',
        textTransform: 'uppercase',
        fontWeight: 400,
        color: '#FFFFFF',

        boxShadow: 'inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17)',
        textAlign: 'center',
        position: 'relative',


        '&:active': {
            top: '0.1em',
        }
    },

    addEmployeeButton: {
        backgroundColor: '#1976D2',
        marginTop: 'auto',
        marginBottom: 30,
        borderRadius: 10,

        '&:hover': {
            backgroundColor: '#1976D2',
        },
    }
});

const EmployeeInput = ({
    employees,
    firstname,
    lastname,
    skills,
    skill,
    updateEmployees,
    updateSkills,
    updateSkill,
    updateFirstName,
    updateLastName,
}) => {
    const classes = useStyles();
    const [addEmployee, { loading }] = useMutation(CreateEmployee); // this is the hook to help add an employee to the database

    // this function handles the adding of an employee to our database
    const handleAddEmployee = () => {
        // we do not want duplicates, so return when user already pressed
        if (loading) return;

        // return if the first or last name fields are not filled
        // alert the user if this happens
        if (!firstname.length || !lastname.length) return alert('Please fill out both first and last name!');

        const tempSkills = [];

        // skill is currently stored as a hash to prevent duplicate skills
        // this is to convert the hash to ID
        for (const skill in skills) {
            tempSkills.push({
                name: skill,
                id: skills[skill],
            });
        }

        // get the data and create the employee profile
        const employee = {
            firstname,
            lastname,
            skills: tempSkills,
            id: getUniqueId(firstname, lastname, tempSkills.length),
        };

        // add employee to our database
        addEmployee({
            variables: {
                input: employee,
            }
        })
            // append an employee to the list of employees
            .then(() => updateEmployees([...employees, employee]))
            .catch(err => {
                // alert('Failed to add employee!')
                console.log(err)
            });

        // // reset our input fields
        updateFirstName('');
        updateLastName('');
        updateSkills({});
    };

    return (
        <Paper className={classes.createEmployeeContainer} elevation={3}>
            <Typography variant='h6' className={classes.header}>
                Add Employee
                </Typography>
            <UserInput
                placeholder='First Name'
                value='firstname'
            />
            <UserInput
                placeholder='Last Name'
                value='lastname'
            />
            <SkillListMenu/>
            <ActionButton
                className={[classes.button, classes.addEmployeeButton].join(' ')}
                name='Add Employee'
                onClick={handleAddEmployee}
            />
        </Paper>
    )
};

const mapStateToProps = ({
    employees,
    skills,
    userInput,
}) => ({
    employees,
    skills,
    ...userInput,
});

const mapDispatchToProps = {
    updateSkills,
    updateSkill,
    updateEmployees,
    updateFirstName,
    updateLastName,
};


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeInput);
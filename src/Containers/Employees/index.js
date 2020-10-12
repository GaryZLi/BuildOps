import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { gql, useQuery } from '@apollo/client';

import DataTable from '../../Components/DataTable';
import EmployeeInput from './EmployeeInput';
import { listEmployees } from '../../graphql/queries';
import { updateEmployees } from '../../actions';

const columns = [
    { id: 'firstname', label: 'First Name', minWidth: 170, sortable: true },
    { id: 'lastname', label: 'Last Name', minWidth: 100, sortable: true },
    {
        id: 'skills',
        label: 'Skills',
        minWidth: 170,
    },

];

const ListEmployees = gql(listEmployees);

const useStyles = makeStyles({
    root: {
        paddingTop: 20,
        height: '80%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
    },
});

const Employees = ({
    employees,
    updateEmployees,
}) => {
    const classes = useStyles();
    const employeeData = useQuery(ListEmployees); // this is the hook to help fetch employees

    useEffect(() => {
        // adds employees to our current state
        // re-renders when new employees are added
        if (employeeData.data) updateEmployees(employeeData.data.listEmployees.items);


        // only change when new employee gets added/loaded
    }, [employeeData, updateEmployees])

    return (
        <div className={classes.root}>
            <DataTable
                tableTitle='Employees'
                columns={columns}
                rows={employees}
            />
            <EmployeeInput/>
        </div>
    )
}

const mapStateToProps = ({employees}) => ({employees});

const mapDispatchToProps = {
    updateEmployees,
};

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
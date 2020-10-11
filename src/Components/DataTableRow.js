import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { gql, useMutation } from '@apollo/client';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import SkillListMenu from './SkillListMenu';
import ActionButton from '../Components/ActionButton';
import {
    updateEmployee,
    deleteEmployee,
} from '../graphql/mutations'

import {
    hashCode,
    updateField,
    updateEmployees,
} from '../actions';

const UpdateEmployee = gql(updateEmployee);
const DeleteEmployee = gql(deleteEmployee);

const useStyles = makeStyles({
    input: {
        border: 'none',
    },
    actionButtonCell: {
        width: 10,
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

        '&:hover': {
            backgroundColor: 'none',
        },

        '&:active': {
            top: '0.1em',
        }
    },
});

const DataTableRow = ({
    id,
    columns,
    rows,
    row,
    updateField,
    updateEmployees,
}) => {
    const classes = useStyles();
    const [editEmployee] = useMutation(UpdateEmployee);
    const [removeEmployee] = useMutation(DeleteEmployee);
    const [edited, setEdited] = useState(false);

    const handleChange = (text, row, column) => {
        updateField(text, row, column);
        setEdited(true);
    };

    // handle the correct actions
    // variable: edited --> user has made a change
    const handleActionButton = id => {
        // should delete this row,
        if (!edited) {
            if (window.confirm('Delete this employee?')) {
                removeEmployee({
                    variables: {
                        input: {
                            id: rows[id].id,
                        }
                    }
                })
                    .then(() => {
                        let tempRows = [...rows];
                        tempRows.splice(id, 1);
                        updateEmployees([...tempRows]);
                    })
                    .catch(() => alert('Failed to delete employee!'));
            }
        }
        else {
            const skills = rows[id].skills.map(skill => ({
                id: skill.id || hashCode(skill.name),
                name: skill.name,
            }));

            const employee = {
                id: rows[id].id,
                lastname: rows[id].lastname,
                firstname: rows[id].firstname,
            };

            editEmployee({
                variables: {
                    input: {
                        ...employee,
                        skills: [
                            ...skills,
                        ]
                    },
                }
            })
            .then(res => console.log('res', res))
            .catch(() => alert('Unable to edit employee!'));

            // reset our button
            setEdited(false);
        }
    };

    return (
        <TableRow
            hover
            tabIndex={-1}
            key={id}
        >
            {columns.map((column) => {
                const value = row[column.id];
                const skillsColumn = column.id === 'skills';

                return (
                    <TableCell
                        className={classes.tableCell}
                        key={column.id}
                        style={{
                            width: skillsColumn ? 290 : 200,
                            paddingLeft: skillsColumn && 0,
                        }}
                    >
                        {skillsColumn
                            ? (
                                <SkillListMenu
                                    employeeSkills={value}
                                    info={{
                                        id,
                                        firstname: row.firstname,
                                        lastname: row.lastname,
                                    }}
                                    setEdited={setEdited}
                                />
                            )
                            :
                            <input
                                className={classes.input}
                                value={value}
                                onChange={e => handleChange(e.target.value, id, column.id)}
                            />
                        }
                    </TableCell>
                );
            })}
            <TableCell className={classes.actionButtonCell}>
                <ActionButton
                    name={edited ? 'Confirm' : 'Delete'}
                    className={classes.button}
                    style={{
                        backgroundColor: edited
                            ? '#1976D2'
                            : 'red',
                    }}
                    onClick={() => handleActionButton(id)}
                />
            </TableCell>
        </TableRow>
    )
};

const mapDispatchToProps = {
    updateField,
    updateEmployees,
};

export default connect(null, mapDispatchToProps)(DataTableRow);
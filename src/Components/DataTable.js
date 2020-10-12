import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import DataTableRow from './DataTableRow';

const useStyles = makeStyles({
    root: {
        minWidth: '50%',
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        height: '100%',
        justifyContent: 'space-evenly'
    },
});

const DataTable = ({
    tableTitle,
    columns,
    rows,
}) => {
    const classes = useStyles();
    const [sortType, setSortType] = useState({
        name: 'firstname',
        ascending: true,
    });

    // comparator for sorting depending on ascending/descending and the column
    const comparator = (a, b) => {
        if (sortType.name === 'firstname') {
            if (sortType.ascending) {
                return a.firstname.toLowerCase() < b.firstname.toLowerCase() ? -1 : 1;
            }

            return a.firstname < b.firstname ? 1 : -1;
        }
        else if (sortType.name === 'lastname') {
            if (sortType.ascending) {
                return a.lastname.toLowerCase() < b.lastname.toLowerCase() ? -1 : 1;
            }

            return a.lastname.toLowerCase() < b.lastname.toLowerCase() ? 1 : -1;
        }
        else {
            if (sortType.ascending) {
                return a.skills.length < b.skills.length ? -1 : 1;
            }

            return a.skills.length < b.skills.length ? 1 : -1;
        }
    };

    const handleClick = name => {
        setSortType(prev => ({
            name,
            ascending: !prev.ascending
        }));
    };

    return (
        <Paper
            className={classes.root}
            elevation={11}
        >
            <Toolbar>
                <Typography variant="h5">
                    {tableTitle}
                </Typography>
            </Toolbar>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {/* Maps all of our columns without having us to manually type each out */}
                            {columns.map((column, id) => (
                                <TableCell
                                    key={id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    <div style={{ display: 'flex' }}>
                                        {column.label}
                                        {sortType.name === column.id && sortType.ascending
                                            ? (
                                                <ExpandLess
                                                    className={classes.expandButton}
                                                    onClick={() => handleClick(column.id)}
                                                />
                                            )
                                            : (
                                                <ExpandMore
                                                    className={classes.expandButton}
                                                    onClick={() => handleClick(column.id)}
                                                />
                                            )
                                        }
                                    </div>
                                </TableCell>
                            ))}
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {/* Maps all of our rows without having us to manually type each out */}
                        {rows
                            .slice()
                            .sort(comparator)
                            .map((row, id) => {
                                return (
                                    <DataTableRow
                                        key={id}
                                        rows={rows}
                                        row={row}
                                        id={id}
                                        columns={columns}
                                    />
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}


export default DataTable;






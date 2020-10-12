import React from 'react';
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
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {/* Maps all of our rows without having us to manually type each out */}
                        {rows
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






import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { gql, useQuery } from '@apollo/client';
import { listEmployees } from '../../../graphql/queries';
import { EmployeeRow, AddButton } from '../../molecules';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {},
    toolbar: {
        justifyContent: 'space-between',
        padding: '0 1.5rem',
    },
});

const EmployeeTable = () => {
    const { loading, error, data: employeeListData } = useQuery(
        gql(listEmployees)
    );
    const classes = useStyles();

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const {
        listEmployees: { items },
    } = employeeListData;

    return (
        <TableContainer component={Paper}>
            <Toolbar disableGutters className={classes.toolbar}>
                <Typography variant="h6" id="tableTitle" component="div">
                    Employees
                </Typography>
                <AddButton />
            </Toolbar>
            <Table
                aria-label="simple table"
                className={classes.table}
                size="small"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Edit/Delete</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Skills</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <EmployeeRow employee={item} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EmployeeTable;

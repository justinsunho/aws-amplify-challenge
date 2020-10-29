import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { gql, useQuery } from '@apollo/client';
import { listEmployees } from '../../../graphql/queries';
import { DeleteButton, EditButton } from '../../molecules';

const EmployeeTable = () => {
    const { loading, error, data } = useQuery(gql(listEmployees));

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const {
        listEmployees: { items },
    } = data;
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
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
                        <TableRow key={item.id}>
                            <TableCell>
                                <DeleteButton employeeId={item.id} />
                                <EditButton employeeId={item.id} />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {item.firstname}
                            </TableCell>
                            <TableCell>{item.lastname}</TableCell>
                            <TableCell>
                                <ul>
                                    {item.skills.items.map((skill) => (
                                        <li>{skill.name}</li>
                                    ))}
                                </ul>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EmployeeTable;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {listEmployees} from './../../../graphql/queries'
import {gql, useQuery} from '@apollo/client'

const EmployeeTable =() => {
	const {loading, error, data} = useQuery(gql(listEmployees));

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	const {listEmployees: {items}} = data;
	console.log(items)

    return (   
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Skills</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.firstname}>
                  <TableCell component="th" scope="row">
                    {item.firstname}
                  </TableCell>
                  <TableCell align="right">{item.lastname}</TableCell>
                  {/* <TableCell align="right">{item.skills}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}

export default EmployeeTable
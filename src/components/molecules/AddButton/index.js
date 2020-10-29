import React from 'react';
import Button from '@material-ui/core/Button';
import {gql, useMutation} from '@apollo/client'
import {EmployeeForm} from '../index.js'
import {createEmployee, createSkill} from '../../../graphql/mutations'

const AddButton = () => {
	const [open, setOpen] = React.useState(false);
	const [addEmployee] = useMutation(gql(createEmployee));
	const [addSkill] = useMutation(gql(createSkill));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (firstName, lastName, skills) => {
	addEmployee({
		variables: {
			input: {
				firstname: firstName,
				lastname: lastName,
			}
		}
	  }).then(
		  ({data: {createEmployee : {id}}}) => {
			skills.forEach(skill =>
				addSkill({
					variables: {
						input: {
							employeeID: id,
							name: skill
						}
					}
				})
			)
		  }
	  );

	setOpen(false);
  }
  
  return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Add Employee
			</Button>
			<EmployeeForm title={'Add Employee'} open={open} handleClose={handleClose}  handleSubmit={handleSubmit} />
		</div>
  );
}

export default AddButton
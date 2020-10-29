import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import {gql, useMutation, useQuery} from '@apollo/client'
import {EmployeeForm} from '../index.js'
import {updateEmployee, createSkill, deleteSkill} from '../../../graphql/mutations'
import {getEmployee} from '../../../graphql/queries'

const EditButton = ({employeeId}) => {
	const [open, setOpen] = React.useState(false);
	const [editEmployee] = useMutation(gql(updateEmployee));
	const [addSkill] = useMutation(gql(createSkill));
	const [removeSkill] = useMutation(gql(deleteSkill));
	const defaultValues = useQuery(gql(getEmployee), {variables: {id: employeeId}});

	if(defaultValues.loading) return ''
	if(defaultValues.error) return 'error'

	const defaultSkills = defaultValues.data.getEmployee.skills.items;
	const defaultSkillNames = defaultSkills.map(item => item.name)

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

  const handleSubmit = (firstName, lastName, skills) => {
	editEmployee({
		variables: {
			input: {
				id: employeeId,
				firstname: firstName,
				lastname: lastName,
			}
		}
	  }).then(
		  ({data: {updateEmployee : {id}}}) => {
			const addedSkills =skills.filter(skill => !defaultSkillNames.includes(skill));

			addedSkills.forEach(skill => {
				addSkill({
					variables: {
						input: {
							employeeID: id,
							name: skill
						}
					}
				})
			})

			const removedSkillsNames = defaultSkillNames.filter(skill => !skills.includes(skill));

			const removedSkills =	removedSkillsNames.map(skill => defaultSkills[defaultSkills.findIndex(x => x.name === skill)])

			removedSkills.forEach(skill => {
				removeSkill({
					variables: {
						input: {
							id: skill.id
						}
					}
				})
			})
		  }
	  );

	setOpen(false);
  }
  
  return (
		<div>
            <IconButton aria-label="edit" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
			<EmployeeForm
				title={'Edit Employee'}
				open={open}
				handleClose={handleClose}
				handleSubmit={handleSubmit}
				defaultValues={{
					firstName: defaultValues.data.getEmployee.firstname,
					lastName: defaultValues.data.getEmployee.lastname,
					skills: defaultSkillNames
				}}
			/>
		</div>
  );
}

export default EditButton
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { gql, useMutation, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { EmployeeForm } from '../../molecules';
import {
    createSkill,
    deleteSkill,
    updateEmployee,
} from '../../../graphql/mutations';
import { getEmployee } from '../../../graphql/queries';

const useStyles = makeStyles({
    icon: {
        padding: '0.5rem',
    },
});

const EditButton = ({ employeeId }) => {
    const [_createSkill] = useMutation(gql(createSkill));
    const [_deleteSkill] = useMutation(gql(deleteSkill));
    const [_updateEmployee] = useMutation(gql(updateEmployee));
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const defaultValues = useQuery(gql(getEmployee), {
        variables: { id: employeeId },
    });

    if (defaultValues.loading) return '';
    if (defaultValues.error) return 'error';

    const defaultSkills = defaultValues.data.getEmployee.skills.items;
    const defaultSkillNames = defaultSkills.map((item) => item.name);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (firstName, lastName, skills) => {
        _updateEmployee({
            variables: {
                input: {
                    id: employeeId,
                    firstname: firstName,
                    lastname: lastName,
                },
            },
        }).then(
            ({
                data: {
                    updateEmployee: { id },
                },
            }) => {
                const addedSkills = skills.filter(
                    (skill) => !defaultSkillNames.includes(skill)
                );

                addedSkills.forEach((skill) => {
                    _createSkill({
                        variables: {
                            input: {
                                employeeID: id,
                                name: skill,
                            },
                        },
                    });
                });

                const removedSkillsNames = defaultSkillNames.filter(
                    (skill) => !skills.includes(skill)
                );

                const removedSkills = removedSkillsNames.map(
                    (skill) =>
                        defaultSkills[
                            defaultSkills.findIndex((x) => x.name === skill)
                        ]
                );

                removedSkills.forEach((skill) => {
                    _deleteSkill({
                        variables: {
                            input: {
                                id: skill.id,
                            },
                        },
                    });
                });
            }
        );

        setOpen(false);
    };

    return (
        <div>
            <IconButton
                aria-label="edit"
                onClick={handleClickOpen}
                className={classes.icon}
            >
                <EditIcon />
            </IconButton>
            <EmployeeForm
                defaultValues={{
                    firstName: defaultValues.data.getEmployee.firstname,
                    lastName: defaultValues.data.getEmployee.lastname,
                    skills: defaultSkillNames,
                }}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                open={open}
                title={'Edit Employee'}
            />
        </div>
    );
};

export default EditButton;

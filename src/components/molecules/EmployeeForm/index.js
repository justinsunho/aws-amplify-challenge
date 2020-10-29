import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { gql, useQuery } from '@apollo/client';
import { listSkills } from './../../../graphql/queries';

const EmployeeForm = ({
    title,
    open,
    handleClose,
    handleSubmit,
    defaultValues,
}) => {
    const [firstName, setFirstName] = React.useState(
        defaultValues ? defaultValues.firstName : ''
    );
    const [lastName, setLastName] = React.useState(
        defaultValues ? defaultValues.lastName : ''
    );
    const [skills, setSkills] = React.useState(
        defaultValues ? defaultValues.skills : []
    );

    const { loading, error, data } = useQuery(gql(listSkills));
    if (loading) return 'loading';
    if (error) return 'error' + error.message;
    const skillSet = [
        ...new Set(
            data.listSkills.items.map((item) => (item.name ? item.name : ''))
        ),
    ];

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="normal"
                    id="firstName"
                    label="First Name"
                    type="text"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    autoFocus
                    id="lastName"
                    margin="normal"
                    label="Last Name"
                    type="text"
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <Autocomplete
                    value={skills}
                    onChange={(e, newValue) => {
                        setSkills(newValue);
                    }}
                    multiple
                    id="skill"
                    freeSolo
                    filterSelectedOptions
                    options={skillSet}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Skills"
                            id="values"
                            margin="normal"
                            placeholder="Press Enter to create a new skill"
                        />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => handleSubmit(firstName, lastName, skills)}
                    color="primary"
                >
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmployeeForm;

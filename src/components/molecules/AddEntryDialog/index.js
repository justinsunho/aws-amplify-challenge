import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {gql, useMutation} from '@apollo/client'
import {useFormik} from 'formik'
import {createEmployee} from './../../../graphql/mutations'

const AddEntryDialog = () => {
	const [open, setOpen] = React.useState(false);
	const [addEmployee] = useMutation(gql(createEmployee));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
	  initialValues: {},
	  onSubmit: (values) => {
		  const {firstName, lastName} = values;

		  addEmployee({
			variables: {
				input: {
					firstname: firstName,
          			lastname: lastName,
				}
			}
		  });

		  setOpen(false);
	  }
  })

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Employee
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
			type="text"
			onChange={formik.handleChange}
            fullWidth
          />
		<TextField
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
			type="text"
			onChange={formik.handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={formik.handleSubmit} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddEntryDialog
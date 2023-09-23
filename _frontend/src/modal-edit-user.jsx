import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function FormDialog({ user, editUser }) {
  const [open, setOpen] = React.useState(false);

  const [email, setEmail] = React.useState(user.email);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    editUser({ id: user.id, updated_user: { 
      email,
      password: user.password, // currently just set password to the same value (does not hash in backend update function yet)
      is_admin: user.is_admin, // currently just set is_admin to the same value
    } });
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="success" sx={{ mr: 1 }} onClick={handleOpen}>Edit</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User {user.id}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the new email address for user {user.id}:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="info" onClick={handleClose}>Cancel</Button>
          <Button variant="outlined" color="success" onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
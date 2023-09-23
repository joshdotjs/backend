import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditUserModal from './modal-edit-user';

export default function BasicTable({ users, editUser, deleteUser, sx }) {
  return (
    <TableContainer component={Paper} sx={{ ...sx, /* more styles... */  }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Is Admin</TableCell>
            <TableCell align="right">Password&nbsp;(hashed)</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={`${user.id}-${user.email}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              data-testid={`users-table-row-${user.id}`}
            >
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{String(user.is_admin)}</TableCell>
              <TableCell align="right">{user.password}</TableCell>
              <TableCell align="right">
                <EditUserModal { ...{ user, editUser } }/>
                <Button variant="outlined" color="error" onClick={() => deleteUser(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
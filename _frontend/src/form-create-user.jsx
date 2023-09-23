import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Password from './input-password';
import Button from '@mui/material/Button';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const FC = ({ children }) => (
  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
    {children}
  </FormControl>
);

// ==============================================

export default function CreateUserForm({ createUser }) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [is_admin, setIsAdmin] = React.useState(false);

  // React.useEffect(() => console.log('email: ', email), [email]);
  // React.useEffect(() => console.log('password: ', password), [password]);
  // React.useEffect(() => console.log('is_admin: ', is_admin), [is_admin]);
  
  // ============================================

  return (
    <Box
      component="form"
      // noValidate
      autoComplete="off"
    >
      
      <div style={{ 
        // border: 'solid black 1px', 
        width: 'fit-content', 
        margin: '0 auto'
      }}
      >

        {/* = = = = = = = = = = = = = = = = = = = = = = */}

        <div>
          <FC>
            <TextField
              // error
              id="email-text-field"
              label="Email"
              // defaultValue="Hello World"
              // helperText="Incorrect entry."
              onChange={e => setEmail(e.target.value)}
              value={email}
              placeholder='email'
            />
          </FC>

          <FC>
            <Password 
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </FC>
        </div>

        {/* = = = = = = = = = = = = = = = = = = = = = = */}

        <div>
          <FC>
            <FormControlLabel control={
              <Checkbox checked={is_admin} onChange={e => setIsAdmin(e.target.checked)} />
            } label="Admin?" />
          </FC>

          <FC>
            <Button 
              variant="contained" 
              onClick={() => {
                createUser({ email, password, is_admin });
                setEmail('');
                setPassword('');
                setIsAdmin(false);
              }}
              // disabled={!(email && password)}
              type="button"
              name="create-user-button"
            >Create New User</Button>
          </FC>
        </div>
      

        {/* = = = = = = = = = = = = = = = = = = = = = = */}

      </div>

    </Box>
  );
}
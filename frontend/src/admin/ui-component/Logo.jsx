// material-ui
import { useTheme } from '@mui/material/styles';
import logoDark from '../assets/images/logo-dark.svg';
import logo from '../assets/images/logo.png';

export default function Logo() {
  const theme = useTheme();

  return (
    <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="Logo" width="92" height="32" />
  );
}


import { useSnackbar } from 'notistack';

const useNotification = () => {

  const { enqueueSnackbar } = useSnackbar();

  const notify = ({ message, variant, duration }) => () => {
    // variant: 'default' | 'error' | 'success' | 'warning' | 'info'
    enqueueSnackbar(message, { variant, autoHideDuration: duration });
  };

  return [ notify ];
};

export { useNotification };
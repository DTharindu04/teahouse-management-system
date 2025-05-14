import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Slide,
    useMediaQuery,
    useTheme
  } from '@mui/material';
  import { forwardRef } from 'react';
  
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  const ConfirmationDialog = ({ open, onClose, onConfirm, message }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        fullScreen={fullScreen}
        BackdropProps={{
            sx: {
              backgroundColor: 'rgba(31, 41, 55, 0.75)', // custom dark backdrop
            },
          }}
        sx={{
            '& .MuiDialog-paper': {
              backgroundColor: '#1f2937', // Dark gray with a purple hue
              borderRadius: '25px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              padding: '1rem',
              width: fullScreen ? '90%' : '440px', // increased width slightly
              maxWidth: '90vw',
              animation: 'fadeScaleIn 0.3s ease-out',
              color: '#f3f4f6', // soft light text
            },
            '@keyframes fadeScaleIn': {
              '0%': { opacity: 0, transform: 'scale(0.9)' },
              '100%': { opacity: 1, transform: 'scale(1)' },
            },
          }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            color: '#f9fafb',
            fontFamily: 'Inter, sans-serif',
            fontSize: '1rem', // slightly smaller
            textAlign: 'left',
            mb: 1,
          }}
        >
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              color: '#e2e8f0',
              fontSize: '0.85rem', // slightly smaller
              textAlign: 'left',
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.5,
            }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 2.5,
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              backgroundColor: '#4b5563',
              color: '#fff',
              fontWeight: 600,
              px: 1.8,
              py: 0.6,
              borderRadius: '10px',
              fontSize: '0.75rem',
              textTransform: 'none',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#374151',
                transform: 'scale(1.03)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            sx={{
              backgroundColor: '#e53e3e',
              color: 'white',
              fontWeight: 500,
              px: 1.8,
              py: 0.6,
              border: '2px solid #fff',
              borderRadius: '10px',
              fontSize: '0.75rem',
              textTransform: 'none',
              ml: 1,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#c53030',
                transform: 'scale(1.03)',
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ConfirmationDialog;
  
import { Box, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Typography variant="h4">
        404 - Page Not Found
      </Typography>
    </Box>
  );
};

export default NotFound;

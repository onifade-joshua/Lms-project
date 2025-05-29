import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Stack,
  IconButton,
  Tooltip,
  CircularProgress,
  Badge
} from '@mui/material';
import {
  FiCalendar,
  FiRefreshCw,
  FiDownload,
  FiUpload,
  FiSettings,
  FiBell
} from 'react-icons/fi';

const Header = ({ loading, onRefresh }) => {
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid #E2E8F0' }}>
      <Toolbar sx={{ px: 3 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 32, height: 32 }}>
          <FiCalendar size={18} />
        </Avatar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Academic Calendar
        </Typography>
        
        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="Refresh">
            <IconButton onClick={onRefresh} disabled={loading}>
              {loading ? <CircularProgress size={20} /> : <FiRefreshCw size={18} />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Export">
            <IconButton>
              <FiDownload size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Import">
            <IconButton>
              <FiUpload size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton>
              <FiSettings size={18} />
            </IconButton>
          </Tooltip>
          <Badge badgeContent={3} color="error">
            <IconButton>
              <FiBell size={18} />
            </IconButton>
          </Badge>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
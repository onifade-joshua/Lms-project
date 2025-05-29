import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Chip,
  Box,
  Stack,
  Avatar,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  FiChevronRight,
  FiPlus,
  FiCalendar,
  FiDownload,
  FiSettings,
  FiTrendingUp,
  FiGlobe
} from 'react-icons/fi';
import { eventTypes, priorityConfig } from '../../../constants';

const Sidebar = ({ 
  upcomingEvents, 
  weeklyStats, 
  handleEventClick, 
  handleCreateEvent,
  showNotification 
}) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <Stack spacing={3}>
      {/* Upcoming Events */}
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Upcoming Events
            </Typography>
            <Chip 
              label={upcomingEvents.length}
              color="primary"
              size="small"
            />
          </Box>
          
          <List dense>
            {upcomingEvents.slice(0, 6).map((event, index) => {
              const Icon = eventTypes[event.type].icon;
              return (
                <React.Fragment key={event.id}>
                  <ListItem 
                    button 
                    onClick={() => handleEventClick(event)}
                    sx={{ 
                      px: 0,
                      borderRadius: 1,
                      '&:hover': {
                        bgcolor: 'grey.50'
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar 
                        sx={{ 
                          bgcolor: eventTypes[event.type].bg,
                          color: `${eventTypes[event.type].color}.main`,
                          width: 32,
                          height: 32
                        }}
                      >
                        <Icon size={16} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" noWrap fontWeight={500}>
                          {event.title}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" display="block" color="text.secondary">
                            {event.date.toLocaleDateString()} • {formatTime(event.date)}
                          </Typography>
                          <Typography variant="caption" display="block" color="text.secondary">
                            {event.location}
                          </Typography>
                        </Box>
                      }
                    />
                    <Box>
                      <Chip 
                        label={priorityConfig[event.priority].label.split(' ')[0]}
                        size="small"
                        sx={{ 
                          bgcolor: priorityConfig[event.priority].color + '20',
                          color: priorityConfig[event.priority].color,
                          fontSize: '0.7rem',
                          height: 20
                        }}
                      />
                    </Box>
                  </ListItem>
                  {index < upcomingEvents.slice(0, 6).length - 1 && <Divider />}
                </React.Fragment>
              );
            })}
          </List>
          
          {upcomingEvents.length > 6 && (
            <Button 
              variant="text" 
              size="small" 
              fullWidth 
              sx={{ mt: 1 }}
              endIcon={<FiChevronRight />}
            >
              View All ({upcomingEvents.length - 6} more)
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Weekly Overview */}
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              This Week
            </Typography>
            <Tooltip title="Week view">
              <IconButton size="small">
                <FiTrendingUp size={16} />
              </IconButton>
            </Tooltip>
          </Box>
          
          <Stack spacing={2}>
            {weeklyStats.map(({ type, config, count }) => {
              const Icon = config.icon;
              return (
                <Box key={type} display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar 
                      sx={{ 
                        bgcolor: config.bg,
                        color: `${config.color}.main`,
                        width: 28,
                        height: 28
                      }}
                    >
                      <Icon size={14} />
                    </Avatar>
                    <Typography variant="body2" fontWeight={500}>
                      {config.label}s
                    </Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography variant="h6" fontWeight={600}>
                      {count}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Quick Actions
          </Typography>
          <Stack spacing={1}>
            <Button 
              variant="outlined" 
              startIcon={<FiPlus />}
              fullWidth
              onClick={handleCreateEvent}
            >
              Schedule New Event
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<FiCalendar />}
              fullWidth
            >
              View Full Schedule
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<FiDownload />}
              fullWidth
              onClick={() => showNotification('Export feature coming soon!', 'info')}
            >
              Export Calendar
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<FiSettings />}
              fullWidth
            >
              Calendar Settings
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card sx={{ bgcolor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32 }}>
              <FiGlobe size={16} />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" fontWeight={600} color="success.800">
                System Status
              </Typography>
              <Typography variant="caption" color="success.600">
                All services operational
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="success.700">
              Last sync: 2 min ago
            </Typography>
            <Chip 
              label="Online"
              color="success"
              size="small"
              variant="filled"
            />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Sidebar;
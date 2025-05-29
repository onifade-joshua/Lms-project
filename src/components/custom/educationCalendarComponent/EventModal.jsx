import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  IconButton
} from '@mui/material';
import {
  FiX,
  FiClock,
  FiMapPin,
  FiUser,
  FiUsers,
  FiShare2,
  FiEdit3,
  FiTrash2
} from 'react-icons/fi';
import { eventTypes, priorityConfig } from '../../../constants';

const EventModal = ({ event, open, onClose }) => {
  if (!event) return null;

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              {event.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Chip 
                label={eventTypes[event.type]?.label} 
                color={eventTypes[event.type]?.color}
                size="small"
                icon={React.createElement(eventTypes[event.type]?.icon)}
              />
              <Chip 
                label={priorityConfig[event.priority]?.label}
                size="small"
                sx={{ 
                  bgcolor: priorityConfig[event.priority]?.color + '20',
                  color: priorityConfig[event.priority]?.color,
                  border: `1px solid ${priorityConfig[event.priority]?.color}40`
                }}
              />
              <Chip 
                label={event.status?.toUpperCase()}
                size="small"
                color={event.status === 'confirmed' ? 'success' : 'warning'}
              />
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small">
            <FiX />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              {/* Date and Time */}
              <Card variant="outlined">
                <CardContent sx={{ py: 2 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                      <FiClock size={16} />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Date & Time
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {formatDate(event.date)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatTime(event.date)} - {formatTime(event.endDate)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Location */}
              {event.location && (
                <Card variant="outlined">
                  <CardContent sx={{ py: 2 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                        <FiMapPin size={16} />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Location
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {event.location}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              )}

              {/* Instructor/Organizer */}
              {(event.instructor || event.organizer || event.coordinator) && (
                <Card variant="outlined">
                  <CardContent sx={{ py: 2 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar 
                        src={(event.instructor || event.organizer || event.coordinator)?.avatar}
                        sx={{ width: 32, height: 32 }}
                      >
                        <FiUser size={16} />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          {event.instructor ? 'Instructor' : event.organizer ? 'Organizer' : 'Coordinator'}
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {(event.instructor || event.organizer || event.coordinator)?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {(event.instructor || event.organizer || event.coordinator)?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              )}

              {/* Capacity */}
              {event.students && event.maxCapacity && (
                <Card variant="outlined">
                  <CardContent sx={{ py: 2 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                      <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32 }}>
                        <FiUsers size={16} />
                      </Avatar>
                      <Box flex={1}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Capacity
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {event.students} / {event.maxCapacity} participants
                        </Typography>
                      </Box>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(event.students / event.maxCapacity) * 100}
                      sx={{ height: 6, borderRadius: 3, mt: 1 }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Description */}
              {event.description && (
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                      Description
                    </Typography>
                    <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                      {event.description}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              {/* Course Information */}
              {event.courseCode && (
                <Card variant="outlined">
                  <CardContent sx={{ py: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Course Details
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Code:</strong> {event.courseCode}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Credits:</strong> {event.credits}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Department:</strong> {event.department}
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <Card variant="outlined">
                  <CardContent sx={{ py: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Tags
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {event.tags.map((tag, index) => (
                        <Chip 
                          key={index}
                          label={tag}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              )}

              {/* Additional Info */}
              {(event.resources || event.equipment) && (
                <Card variant="outlined">
                  <CardContent sx={{ py: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Resources Required
                    </Typography>
                    <List dense>
                      {(event.resources || event.equipment || []).map((item, index) => (
                        <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                          <ListItemText 
                            primary={item}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              )}
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button startIcon={<FiShare2 />} variant="outlined">
          Share
        </Button>
        <Button startIcon={<FiEdit3 />} color="primary" variant="outlined">
          Edit
        </Button>
        <Button startIcon={<FiTrash2 />} color="error" variant="outlined">
          Delete
        </Button>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;
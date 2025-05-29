import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Avatar,
  LinearProgress,
  IconButton
} from '@mui/material';
import {
  FiEye,
  FiEdit3,
  FiMoreVertical
} from 'react-icons/fi';
import { eventTypes } from '../../../constants';

const ListView = ({ events = [], onEventClick }) => { // Default to empty array
  const formatTime = (date) => {
    if (!date) return '';
    try {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } catch (error) {
      console.warn('Error formatting time:', error);
      return '';
    }
  };

  // Early return if no events
  if (!events || !Array.isArray(events)) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Events List
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No events available.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Events List
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => {
                if (!event) return null; // Skip null/undefined events
                
                // Safe access to eventTypes
                const eventTypeConfig = eventTypes?.[event?.type];
                const Icon = eventTypeConfig?.icon;
                
                return (
                  <TableRow key={event.id || Math.random()} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {event.title || 'Untitled Event'}
                        </Typography>
                        {event.courseCode && (
                          <Typography variant="caption" color="text.secondary">
                            {event.courseCode} • {event.department}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {eventTypeConfig ? (
                        <Chip
                          label={eventTypeConfig.label || event.type}
                          color={eventTypeConfig.color || 'default'}
                          size="small"
                          icon={Icon ? <Icon size={12} /> : null}
                        />
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          {event.type || 'Unknown'}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {event.date ? event.date.toLocaleDateString() : 'No date'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatTime(event.date)} {event.endDate && `- ${formatTime(event.endDate)}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {event.location || 'TBD'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar 
                          src={(event.instructor || event.organizer || event.coordinator)?.avatar}
                          sx={{ width: 24, height: 24 }}
                        >
                          {((event.instructor || event.organizer || event.coordinator)?.name || 'U')[0]}
                        </Avatar>
                        <Typography variant="body2">
                          {(event.instructor || event.organizer || event.coordinator)?.name || 'Unassigned'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {event.students && event.maxCapacity ? (
                        <Box>
                          <Typography variant="body2">
                            {event.students}/{event.maxCapacity}
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={Math.min((event.students / event.maxCapacity) * 100, 100)}
                            sx={{ height: 4, borderRadius: 2, mt: 0.5 }}
                          />
                        </Box>
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          N/A
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small"
                        onClick={() => onEventClick && onEventClick(event)}
                      >
                        <FiEye size={16} />
                      </IconButton>
                      <IconButton size="small">
                        <FiEdit3 size={16} />
                      </IconButton>
                      <IconButton size="small">
                        <FiMoreVertical size={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ListView;
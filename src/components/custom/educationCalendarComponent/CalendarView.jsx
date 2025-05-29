import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid, // Changed back to regular Grid
  Paper,
  Stack,
  IconButton,
  Chip
} from '@mui/material';
import {
  FiChevronLeft,
  FiChevronRight,
  FiEye
} from 'react-icons/fi';
import { eventTypes } from '../../../constants';

const CalendarView = ({ 
  currentDate, 
  onNavigateMonth, 
  events = [], // Default to empty array
  onEventClick, 
  selectedDate, 
  onDateSelect 
}) => {
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Previous month's days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month - 1, prevMonth.getDate() - i);
      days.push({ date: day, isCurrentMonth: false });
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }
    
    // Next month's days to fill the grid
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({ date: new Date(year, month + 1, day), isCurrentMonth: false });
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    // Enhanced null checking
    if (!date || !events || !Array.isArray(events)) {
      return [];
    }
    
    try {
      return events.filter(event => {
        if (!event || !event.date) return false;
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === date.toDateString();
      });
    } catch (error) {
      console.warn('Error filtering events for date:', error);
      return [];
    }
  };

  return (
    <Card>
      <CardContent>
        {/* Calendar Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </Typography>
            <Box display="flex" sx={{ bgcolor: 'grey.100', borderRadius: 1 }}>
              <IconButton onClick={() => onNavigateMonth(-1)} size="small">
                <FiChevronLeft />
              </IconButton>
              <IconButton onClick={() => onNavigateMonth(1)} size="small">
                <FiChevronRight />
              </IconButton>
            </Box>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <Button 
              variant="outlined"
              size="small"
              onClick={() => onNavigateMonth(0)} // Reset to current month
            >
              Today
            </Button>
            <Button 
              variant="outlined"
              size="small"
              startIcon={<FiEye />}
            >
              View Options
            </Button>
          </Stack>
        </Box>

        {/* Days of the week */}
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
            <Grid item xs key={day} sx={{ width: `${100/7}%` }}>
              <Typography 
                variant="subtitle2" 
                align="center" 
                color="text.secondary"
                sx={{ py: 1, fontWeight: 600, fontSize: '0.75rem' }}
              >
                {day.slice(0, 3).toUpperCase()}
              </Typography>
            </Grid>
          ))}
        </Grid>
        
        {/* Calendar Grid */}
        <Grid container spacing={1}>
          {getDaysInMonth(currentDate).map((dayObj, index) => {
            const { date: day, isCurrentMonth } = dayObj;
            const dayEvents = getEventsForDate(day);
            const isToday = day && day.toDateString() === new Date().toDateString();
            const isSelected = selectedDate && day && day.toDateString() === selectedDate.toDateString();
            
            return (
              <Grid item xs key={index} sx={{ width: `${100/7}%` }}>
                <Paper
                  sx={{
                    minHeight: 120,
                    p: 1,
                    bgcolor: !isCurrentMonth ? 'grey.50' : 'white',
                    border: isToday ? '2px solid' : isSelected ? '2px solid' : '1px solid',
                    borderColor: isToday ? 'primary.main' : isSelected ? 'secondary.main' : 'grey.200',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: !isCurrentMonth ? 'grey.100' : 'grey.50',
                      transform: 'translateY(-1px)',
                      boxShadow: 2
                    }
                  }}
                  onClick={() => onDateSelect(day)}
                >
                  {day && (
                    <Box>
                      <Typography 
                        variant="body2" 
                        fontWeight={isToday ? 700 : isCurrentMonth ? 500 : 400}
                        color={isToday ? 'primary.main' : isCurrentMonth ? 'text.primary' : 'text.disabled'}
                        mb={1}
                        sx={{ fontSize: '0.875rem' }}
                      >
                        {day.getDate()}
                      </Typography>
                      <Stack spacing={0.5}>
                        {dayEvents.slice(0, 2).map(event => {
                          // Safe access to eventTypes
                          const eventTypeConfig = eventTypes?.[event?.type];
                          if (!eventTypeConfig) return null;
                          
                          const Icon = eventTypeConfig.icon;
                          return (
                            <Chip
                              key={event.id}
                              label={event.title}
                              size="small"
                              color={eventTypeConfig.color}
                              onClick={(e) => {
                                e.stopPropagation();
                                onEventClick && onEventClick(event);
                              }}
                              icon={Icon ? <Icon size={12} /> : null}
                              sx={{
                                fontSize: '0.65rem',
                                height: 22,
                                '& .MuiChip-label': {
                                  px: 1,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  maxWidth: '100%'
                                },
                                '& .MuiChip-icon': {
                                  width: 12,
                                  height: 12,
                                  marginLeft: '4px'
                                }
                              }}
                            />
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ 
                              fontSize: '0.7rem',
                              textAlign: 'center',
                              py: 0.5,
                              bgcolor: 'grey.100',
                              borderRadius: 1,
                              cursor: 'pointer'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              // Show all events for this day
                            }}
                          >
                            +{dayEvents.length - 2} more
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  )}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
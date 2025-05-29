import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import components
import Header from '../components/custom/educationCalendarComponent/Header';
import BreadcrumbsNav from '../components/custom/educationCalendarComponent/BreadcrumbsNav';
import CalendarControls from '../components/custom/educationCalendarComponent/CalendarControls';
import EventModal from '../components/custom/educationCalendarComponent/EventModal';
import CalendarView from '../components/custom/educationCalendarComponent/CalendarView';
import ListView from '../components/custom/educationCalendarComponent/ListView';
import AnalyticsView from '../components/custom/educationCalendarComponent/AnalyticsView';
import Sidebar from '../components/custom/educationCalendarComponent/Sidebar';

// Import constants and data
import { theme } from '../theme';
import { eventTypes, priorityConfig } from '../constants';
import { sampleEvents } from '../sampleData';

const EducationCalendar = () => {
  // State management
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('calendar'); // calendar, list, analytics
  const [calendarView, setCalendarView] = useState('month'); // month, week, day
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [selectedDate, setSelectedDate] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [events] = useState(sampleEvents);

  // Computed values
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesType = filterType === 'all' || event.type === filterType;
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (event.instructor?.name && event.instructor.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (event.department && event.department.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [events, filterType, searchTerm]);

  const upcomingEvents = useMemo(() => {
    return filteredEvents
      .filter(event => event.date >= new Date())
      .sort((a, b) => a.date - b.date)
      .slice(0, 10);
  }, [filteredEvents]);

  const weeklyStats = useMemo(() => {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return Object.entries(eventTypes).map(([type, config]) => {
      const count = events.filter(event => {
        const eventDate = new Date(event.date);
        return event.type === type && eventDate >= startOfWeek && eventDate <= endOfWeek;
      }).length;
      
      return { type, config, count };
    });
  }, [events]);

  // Helper functions
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCreateEvent = () => {
    setShowCreateModal(true);
  };

  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };

  const handleRefresh = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      showNotification('Calendar refreshed successfully', 'success');
    }, 1000);
  };

  const renderMainContent = () => {
    switch (viewMode) {
      case 'calendar':
        return (
          <CalendarView
            currentDate={currentDate}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            getEventsForDate={getEventsForDate}
            handleEventClick={handleEventClick}
            navigateMonth={navigateMonth}
            eventTypes={eventTypes}
          />
        );
      case 'list':
        return (
          <ListView
            filteredEvents={filteredEvents}
            eventTypes={eventTypes}
            priorityConfig={priorityConfig}
            handleEventClick={handleEventClick}
          />
        );
      case 'analytics':
        return (
          <AnalyticsView
            events={events}
            eventTypes={eventTypes}
            priorityConfig={priorityConfig}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Header */}
        <Header 
          loading={loading}
          handleRefresh={handleRefresh}
        />

        <Container maxWidth="xl" sx={{ py: 3 }}>
          {/* Breadcrumbs */}
          <BreadcrumbsNav />

          {/* Calendar Controls */}
          <CalendarControls
            viewMode={viewMode}
            setViewMode={setViewMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            calendarView={calendarView}
            setCalendarView={setCalendarView}
            handleCreateEvent={handleCreateEvent}
          />

          <Grid container spacing={3}>
            {/* Main Content Area */}
            <Grid item xs={12} lg={8}>
              {renderMainContent()}
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} lg={4}>
              <Sidebar
                upcomingEvents={upcomingEvents}
                weeklyStats={weeklyStats}
                handleEventClick={handleEventClick}
                handleCreateEvent={handleCreateEvent}
                showNotification={showNotification}
              />
            </Grid>
          </Grid>
        </Container>

        {/* Event Modal */}
        <EventModal
          event={selectedEvent}
          open={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          eventTypes={eventTypes}
          priorityConfig={priorityConfig}
        />

        {/* Notification Snackbar */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={() => setNotification({ ...notification, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setNotification({ ...notification, open: false })}
            severity={notification.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default EducationCalendar;
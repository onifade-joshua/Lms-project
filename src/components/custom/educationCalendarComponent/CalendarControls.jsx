import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Tabs,
  Tab,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  InputAdornment
} from '@mui/material';
import { FiGrid, FiList, FiBarChart, FiSearch, FiPlus, FiFilter } from 'react-icons/fi';

const CalendarControls = ({
  viewMode,
  setViewMode,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  calendarView,
  setCalendarView,
  showFilters,
  setShowFilters,
  onCreateEvent
}) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Box>
              <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
                Academic Calendar
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Manage classes, exams, meetings, and campus events with enterprise-grade features
              </Typography>
              
              {/* View Mode Tabs */}
              <Tabs 
                value={viewMode} 
                onChange={(e, newValue) => setViewMode(newValue)}
                sx={{ mb: 2 }}
              >
                <Tab 
                  label="Calendar View" 
                  value="calendar"
                  icon={<FiGrid size={16} />}
                  iconPosition="start"
                />
                <Tab 
                  label="List View" 
                  value="list"
                  icon={<FiList size={16} />}
                  iconPosition="start"
                />
                <Tab 
                  label="Analytics" 
                  value="analytics"
                  icon={<FiBarChart size={16} />}
                  iconPosition="start"
                />
              </Tabs>
            </Box>
          </Grid>
          
          <Grid item xs={12} lg={6}>
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  placeholder="Search events, instructors, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FiSearch />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ minWidth: 300 }}
                />
                
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel>Filter Type</InputLabel>
                  <Select
                    value={filterType}
                    label="Filter Type"
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <MenuItem value="all">All Types</MenuItem>
                    <MenuItem value="class">Classes</MenuItem>
                    <MenuItem value="exam">Exams</MenuItem>
                    <MenuItem value="meeting">Meetings</MenuItem>
                    <MenuItem value="event">Events</MenuItem>
                    <MenuItem value="lab">Labs</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button 
                  variant="contained"
                  startIcon={<FiPlus />}
                  onClick={onCreateEvent}
                  size="medium"
                >
                  Create Event
                </Button>
                
                <Button 
                  variant="outlined"
                  startIcon={<FiFilter />}
                  onClick={() => setShowFilters(!showFilters)}
                  size="medium"
                >
                  Advanced Filters
                </Button>
                
                {viewMode === 'calendar' && (
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>View</InputLabel>
                    <Select
                      value={calendarView}
                      label="View"
                      onChange={(e) => setCalendarView(e.target.value)}
                    >
                      <MenuItem value="month">Month</MenuItem>
                      <MenuItem value="week">Week</MenuItem>
                      <MenuItem value="day">Day</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        
        {/* Advanced Filters Accordion */}
        {showFilters && (
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #E2E8F0' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Department</InputLabel>
                  <Select defaultValue="" label="Department">
                    <MenuItem value="">All Departments</MenuItem>
                    <MenuItem value="cs">Computer Science</MenuItem>
                    <MenuItem value="math">Mathematics</MenuItem>
                    <MenuItem value="physics">Physics</MenuItem>
                    <MenuItem value="affairs">Academic Affairs</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Priority</InputLabel>
                  <Select defaultValue="" label="Priority">
                    <MenuItem value="">All Priorities</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="critical">Critical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select defaultValue="" label="Status">
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="confirmed">Confirmed</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Date Range"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarControls;
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Stack,
  Avatar,
  LinearProgress
} from '@mui/material';
import { eventTypes } from '../../../constants';

const AnalyticsView = ({ events }) => {
  return (
    <Stack spacing={3}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Event Analytics Dashboard
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center" py={2}>
                <Typography variant="h3" color="primary.main" fontWeight={700}>
                  {events.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Events
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center" py={2}>
                <Typography variant="h3" color="success.main" fontWeight={700}>
                  {events.filter(e => e.status === 'confirmed').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Confirmed
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center" py={2}>
                <Typography variant="h3" color="warning.main" fontWeight={700}>
                  {events.reduce((sum, e) => sum + (e.students || 0), 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Participants
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center" py={2}>
                <Typography variant="h3" color="error.main" fontWeight={700}>
                  {events.filter(e => e.priority === 'critical').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Critical Priority
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Event Distribution by Type
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(eventTypes).map(([type, config]) => {
              const count = events.filter(e => e.type === type).length;
              const percentage = events.length > 0 ? (count / events.length) * 100 : 0;
              const Icon = config.icon;
              
              return (
                <Grid item xs={12} sm={6} md={4} key={type}>
                  <Card 
                    variant="outlined"
                    sx={{ 
                      background: config.gradient,
                      color: 'white',
                      '& .MuiTypography-root': { color: 'white' }
                    }}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                          <Icon size={20} />
                        </Avatar>
                        <Box>
                          <Typography variant="h5" fontWeight={700}>
                            {count}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {config.label}s
                          </Typography>
                        </Box>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={percentage}
                        sx={{ 
                          height: 6, 
                          borderRadius: 3,
                          bgcolor: 'rgba(255,255,255,0.2)',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: 'rgba(255,255,255,0.8)'
                          }
                        }}
                      />
                      <Typography variant="caption" sx={{ opacity: 0.8, mt: 1, display: 'block' }}>
                        {percentage.toFixed(1)}% of total events
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AnalyticsView;
import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { FiHome, FiFolder, FiCalendar } from 'react-icons/fi';

const BreadcrumbsNav = () => {
  return (
    <Breadcrumbs sx={{ mb: 3 }}>
      <Link underline="hover" color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <FiHome size={16} />
        Dashboard
      </Link>
      <Link underline="hover" color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <FiFolder size={16} />
        Academic
      </Link>
      <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <FiCalendar size={16} />
        Calendar
      </Typography>
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
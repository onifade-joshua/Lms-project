import {
  FiBook,
  FiEdit3,
  FiUsers,
  FiCalendar,
  FiSettings
} from 'react-icons/fi';

export const eventTypes = {
  class: { 
    color: 'primary', 
    bg: '#E3F2FD', 
    label: 'Class',
    icon: FiBook,
    gradient: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)'
  },
  exam: { 
    color: 'error', 
    bg: '#FFEBEE', 
    label: 'Exam',
    icon: FiEdit3,
    gradient: 'linear-gradient(135deg, #F44336 0%, #C62828 100%)'
  },
  meeting: { 
    color: 'secondary', 
    bg: '#F3E5F5', 
    label: 'Meeting',
    icon: FiUsers,
    gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)'
  },
  event: { 
    color: 'success', 
    bg: '#E8F5E8', 
    label: 'Event',
    icon: FiCalendar,
    gradient: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)'
  },
  lab: { 
    color: 'warning', 
    bg: '#FFF3E0', 
    label: 'Lab',
    icon: FiSettings,
    gradient: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)'
  }
};

export const priorityConfig = {
  low: { color: '#64748B', label: 'Low Priority' },
  medium: { color: '#F59E0B', label: 'Medium Priority' },
  high: { color: '#EF4444', label: 'High Priority' },
  critical: { color: '#DC2626', label: 'Critical Priority' }
};
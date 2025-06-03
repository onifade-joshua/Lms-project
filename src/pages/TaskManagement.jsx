import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Badge,
  Modal,
  ListGroup,
  Dropdown,
  Alert,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import {
  BsPlus,
  BsSearch,
  BsCalendar,
  BsPerson,
  BsBook,
  BsPeople,
  BsAward,
  BsPersonCheck,
  BsClock,
  BsExclamationTriangle,
  BsCheckCircle,
  BsXCircle,
  BsEye,
  BsPencil,
  BsTrash,
  BsChatSquare,
  BsPaperclip,
  BsStar,
  BsFilter,
  BsMortarboard // Added this import for graduation cap
} from 'react-icons/bs';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [userRole, setUserRole] = useState('student');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');

  // Mock data for demonstration
  const mockTasks = [
    {
      id: 1,
      title: 'Mathematics Assignment - Quadratic Equations',
      description: 'Complete exercises 1-20 from Chapter 5',
      dueDate: '2025-06-05',
      priority: 'high',
      status: 'pending',
      assignedBy: 'Mr. Johnson',
      assignedTo: 'Grade 10A',
      subject: 'Mathematics',
      type: 'assignment',
      attachments: ['worksheet.pdf'],
      createdAt: '2025-05-25',
      comments: 3
    },
    {
      id: 2,
      title: 'Parent-Teacher Conference Preparation',
      description: 'Prepare reports for all students in Grade 9B',
      dueDate: '2025-06-02',
      priority: 'medium',
      status: 'in-progress',
      assignedBy: 'Head of Department',
      assignedTo: 'Grade 9 Teachers',
      subject: 'Administration',
      type: 'administrative',
      attachments: [],
      createdAt: '2025-05-20',
      comments: 1
    },
    {
      id: 3,
      title: 'Science Fair Project Submission',
      description: 'Submit final science project with documentation',
      dueDate: '2025-06-10',
      priority: 'high',
      status: 'completed',
      assignedBy: 'Ms. Davis',
      assignedTo: 'Grade 11 Students',
      subject: 'Science',
      type: 'project',
      attachments: ['project_guidelines.pdf'],
      createdAt: '2025-05-15',
      comments: 5
    },
    {
      id: 4,
      title: 'Department Budget Review',
      description: 'Review and approve departmental budget for next quarter',
      dueDate: '2025-06-08',
      priority: 'high',
      status: 'pending',
      assignedBy: 'Head of School',
      assignedTo: 'Department Heads',
      subject: 'Administration',
      type: 'review',
      attachments: ['budget_template.xlsx'],
      createdAt: '2025-05-28',
      comments: 0
    }
  ];

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    assignedTo: '',
    subject: '',
    type: 'assignment'
  });

  useEffect(() => {
    setTasks(mockTasks);
    setFilteredTasks(mockTasks);
  }, []);

  useEffect(() => {
    let filtered = tasks;

    // Filter by role permissions
    if (userRole === 'student') {
      filtered = filtered.filter(task => 
        task.assignedTo.includes('Student') || 
        task.assignedTo.includes('Grade')
      );
    } else if (userRole === 'parent') {
      filtered = filtered.filter(task => 
        task.type === 'assignment' || task.type === 'project'
      );
    }

    // Filter by status
    if (filterBy !== 'all') {
      filtered = filtered.filter(task => task.status === filterBy);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === 'priority') {
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

    setFilteredTasks(filtered);
  }, [tasks, filterBy, searchTerm, sortBy, userRole]);

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <BsCheckCircle className="text-success" />;
      case 'in-progress': return <BsClock className="text-primary" />;
      case 'pending': return <BsExclamationTriangle className="text-warning" />;
      case 'overdue': return <BsXCircle className="text-danger" />;
      default: return <BsClock className="text-secondary" />;
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'pending': return 'warning';
      case 'overdue': return 'danger';
      default: return 'secondary';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'student': return <BsMortarboard />; 
      case 'parent': return <BsPeople />;
      case 'teacher': return <BsBook />;
      case 'hod': return <BsPersonCheck />;
      case 'headmaster': return <BsStar />;
      default: return <BsPerson />;
    }
  };

  const canCreateTask = () => {
    return ['teacher', 'hod', 'headmaster'].includes(userRole);
  };

  const canEditTask = (task) => {
    if (userRole === 'headmaster') return true;
    if (userRole === 'hod') return true;
    if (userRole === 'teacher' && task.assignedBy === 'Current User') return true;
    return false;
  };

  const handleCreateTask = () => {
    const task = {
      ...newTask,
      id: Date.now(),
      status: 'pending',
      assignedBy: 'Current User',
      createdAt: new Date().toISOString().split('T')[0],
      comments: 0,
      attachments: []
    };
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      assignedTo: '',
      subject: '',
      type: 'assignment'
    });
    setShowCreateModal(false);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (dueDate, status) => {
    return new Date(dueDate) < new Date() && status !== 'completed';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Container fluid className="py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
              <div>
                <h2 className="mb-1 fw-bold text-dark">Task Management</h2>
                {/* <h2 className="display-4 fw-bold text-dark mb-1">Task Management</h2> */}
                <p className="text-muted">Manage assignments, projects, and administrative tasks</p>
              </div>
              
              {/* Role Selector */}
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-2">
                  <Form.Label className="mb-0 fw-medium">Role:</Form.Label>
                  <Form.Select 
                    value={userRole} 
                    onChange={(e) => setUserRole(e.target.value)}
                    size="sm"
                    style={{ width: 'auto' }}
                  >
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                    <option value="teacher">Teacher</option>
                    <option value="hod">Head of Department</option>
                    <option value="headmaster">Head of School</option>
                  </Form.Select>
                </div>
                
                {canCreateTask() && (
                  <Button
                    variant="primary"
                    onClick={() => setShowCreateModal(true)}
                    className="d-flex align-items-center gap-2"
                  >
                    <BsPlus size={16} />
                    Create Task
                  </Button>
                )}
              </div>
            </div>
          </Col>
        </Row>

        {/* Filters and Search */}
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <Row className="g-3">
                  {/* Search */}
                  <Col lg={6}>
                    <InputGroup>
                      <InputGroup.Text>
                        <BsSearch />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Search tasks, subjects, or teachers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>
                  </Col>

                  {/* Filters */}
                  <Col lg={6}>
                    <div className="d-flex gap-3">
                      <Form.Select
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                      >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </Form.Select>

                      <Form.Select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="dueDate">Sort by Due Date</option>
                        <option value="priority">Sort by Priority</option>
                      </Form.Select>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Task Stats */}
        <Row className="mb-4">
          <Col md={3} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted mb-1 fw-medium">Total Tasks</p>
                    <h2 className="mb-0 fw-bold">{filteredTasks.length}</h2>
                  </div>
                  <div className="p-3 bg-primary bg-opacity-10 rounded">
                    <BsCalendar className="text-primary" size={24} />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted mb-1 fw-medium">Pending</p>
                    <h2 className="mb-0 fw-bold text-warning">
                      {filteredTasks.filter(t => t.status === 'pending').length}
                    </h2>
                  </div>
                  <div className="p-3 bg-warning bg-opacity-10 rounded">
                    <BsClock className="text-warning" size={24} />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted mb-1 fw-medium">In Progress</p>
                    <h2 className="mb-0 fw-bold text-primary">
                      {filteredTasks.filter(t => t.status === 'in-progress').length}
                    </h2>
                  </div>
                  <div className="p-3 bg-primary bg-opacity-10 rounded">
                    <BsExclamationTriangle className="text-primary" size={24} />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted mb-1 fw-medium">Completed</p>
                    <h2 className="mb-0 fw-bold text-success">
                      {filteredTasks.filter(t => t.status === 'completed').length}
                    </h2>
                  </div>
                  <div className="p-3 bg-success bg-opacity-10 rounded">
                    <BsCheckCircle className="text-success" size={24} />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Tasks List */}
        <Row>
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white border-0">
                <h5 className="mb-0 fw-semibold">Tasks</h5>
              </Card.Header>
              
              <Card.Body className="p-0">
                {filteredTasks.length > 0 ? (
                  <ListGroup variant="flush">
                    {filteredTasks.map((task) => (
                      <ListGroup.Item key={task.id} className="border-0 border-bottom">
                        <div className="d-flex align-items-start justify-content-between">
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center gap-3 mb-2">
                              {getStatusIcon(task.status)}
                              <h6 className="mb-0 fw-medium">{task.title}</h6>
                              <Badge bg={getPriorityVariant(task.priority)} className="text-uppercase">
                                {task.priority}
                              </Badge>
                              {isOverdue(task.dueDate, task.status) && (
                                <Badge bg="danger" className="text-uppercase">
                                  OVERDUE
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-muted mb-3">{task.description}</p>
                            
                            <div className="d-flex flex-wrap align-items-center gap-3 small text-muted">
                              <div className="d-flex align-items-center gap-1">
                                <BsCalendar />
                                Due: {formatDate(task.dueDate)}
                              </div>
                              <div className="d-flex align-items-center gap-1">
                                <BsBook />
                                {task.subject}
                              </div>
                              <div className="d-flex align-items-center gap-1">
                                <BsPerson />
                                {task.assignedBy}
                              </div>
                              <div className="d-flex align-items-center gap-1">
                                <BsPeople />
                                {task.assignedTo}
                              </div>
                              {task.attachments.length > 0 && (
                                <div className="d-flex align-items-center gap-1">
                                  <BsPaperclip />
                                  {task.attachments.length} files
                                </div>
                              )}
                              {task.comments > 0 && (
                                <div className="d-flex align-items-center gap-1">
                                  <BsChatSquare />
                                  {task.comments} comments
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="d-flex align-items-center gap-1 ms-1">
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>View Details</Tooltip>}
                            >
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => setSelectedTask(task)}
                              >
                                <BsEye />
                              </Button>
                            </OverlayTrigger>
                            
                            {canEditTask(task) && (
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Edit Task</Tooltip>}
                              >
                                <Button variant="outline-primary" size="sm">
                                  <BsPencil />
                                </Button>
                              </OverlayTrigger>
                            )}

                            {userRole === 'student' && task.status === 'pending' && (
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => updateTaskStatus(task.id, 'completed')}
                              >
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <div className="text-center py-5">
                    <BsCalendar className="text-muted mb-3" size={48} />
                    <h5 className="text-dark mb-2">No tasks found</h5>
                    <p className="text-muted">Try adjusting your filters or search terms</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Create Task Modal */}
        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="sm">
          <Modal.Header closeButton>
            <Modal.Title>Create New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  />
                </Col>
              </Row>
              
              <Row className="mb-3">
                <Col>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  />
                </Col>
              </Row>
              
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                </Col>
                
                <Col md={6}>
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Form.Select>
                </Col>
              </Row>
              
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    value={newTask.subject}
                    onChange={(e) => setNewTask({...newTask, subject: e.target.value})}
                  />
                </Col>
                
                <Col md={6}>
                  <Form.Label>Assign To</Form.Label>
                  <Form.Select
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                  >
                    <option value="">Select...</option>
                    <option value="Grade 9 Students">Grade 9 Students</option>
                    <option value="Grade 10 Students">Grade 10 Students</option>
                    <option value="Grade 11 Students">Grade 11 Students</option>
                    <option value="Grade 12 Students">Grade 12 Students</option>
                    <option value="All Teachers">All Teachers</option>
                    <option value="Department Heads">Department Heads</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateTask}
              disabled={!newTask.title || !newTask.dueDate}
            >
              Create Task
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default TaskManagement;
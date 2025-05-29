import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Card, Form, Button, Row, Col, Alert, Spinner, Modal, Toast, ToastContainer } from "react-bootstrap";

// Constants
const USER_ROLES = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  EMPLOYEE: "Employee",
};

// Mock Auth Context 
const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("userProfile");
    return stored ? JSON.parse(stored) : {
      id: "user123",
      name: "John Doe",
      email: "john.doe@company.com",
      role: USER_ROLES.EMPLOYEE,
      department: "Engineering",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      updatedAt: new Date().toISOString(),
    };
  });

  const updateUser = (userData) => {
    const updatedUser = { ...userData, updatedAt: new Date().toISOString() };
    setCurrentUser(updatedUser);
    localStorage.setItem("userProfile", JSON.stringify(updatedUser));
  };

  return { currentUser, updateUser };
};

// Notification Hook
const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = ({ type, message, duration = 4000 }) => {
    const id = Date.now() + Math.random();
    const notification = { id, type, message, show: true };
    
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, show: false } : n)
      );
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 300);
    }, duration);
  };

  const NotificationProvider = () => (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      {notifications.map(notification => (
        <Toast
          key={notification.id}
          show={notification.show}
          bg={notification.type === 'success' ? 'success' : notification.type === 'error' ? 'danger' : 'info'}
          text="white"
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">
              {notification.type === 'success' ? '✅ Success' : 
               notification.type === 'error' ? '❌ Error' : 
               'ℹ️ Info'}
            </strong>
          </Toast.Header>
          <Toast.Body>{notification.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );

  return { showNotification, NotificationProvider };
};

// Validation utilities
const validateProfileData = (data) => {
  const errors = {};
  
  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long";
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  
  if (data.phone && !/^[\d\s\-\+\(\)]+$/.test(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }
  
  return errors;
};

const validatePasswordData = (data) => {
  const errors = {};
  
  if (!data.currentPassword) {
    errors.currentPassword = "Current password is required";
  }
  
  if (!data.newPassword) {
    errors.newPassword = "New password is required";
  } else if (data.newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters long";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.newPassword)) {
    errors.newPassword = "Password must contain uppercase, lowercase, and number";
  }
  
  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (data.newPassword !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  
  return errors;
};

// Mock API services
const updateUserProfile = async (userId, profileData) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (Math.random() < 0.1) {
    throw new Error("Network error occurred");
  }
  
  return { success: true, data: profileData };
};

const changeUserPassword = async (userId, passwordData) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate current password validation
  if (passwordData.currentPassword !== "currentpass123") {
    throw new Error("Current password is incorrect");
  }
  
  if (Math.random() < 0.1) {
    throw new Error("Network error occurred");
  }
  
  return { success: true };
};

// Change Password Modal Component
const ChangePasswordModal = ({ show, onHide, onPasswordChanged }) => {
  const { currentUser } = useAuth();
  const { showNotification } = useNotification();
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [uiState, setUiState] = useState({
    isLoading: false,
    validationErrors: {},
    showPasswords: {
      current: false,
      new: false,
      confirm: false,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific field error on change
    if (uiState.validationErrors[name]) {
      setUiState(prev => ({
        ...prev,
        validationErrors: {
          ...prev.validationErrors,
          [name]: null,
        },
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setUiState(prev => ({
      ...prev,
      showPasswords: {
        ...prev.showPasswords,
        [field]: !prev.showPasswords[field],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validatePasswordData(passwordData);
    if (Object.keys(errors).length > 0) {
      setUiState(prev => ({ ...prev, validationErrors: errors }));
      return;
    }

    setUiState(prev => ({ ...prev, isLoading: true }));

    try {
      await changeUserPassword(currentUser.id, passwordData);
      
      showNotification({
        type: "success",
        message: "Password changed successfully",
      });

      // Reset form and close modal
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setUiState({
        isLoading: false,
        validationErrors: {},
        showPasswords: { current: false, new: false, confirm: false },
      });
      
      onPasswordChanged?.();
      onHide();

    } catch (error) {
      console.error("Password change failed:", error);
      
      showNotification({
        type: "error",
        message: error.message || "Failed to change password",
      });

      setUiState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const renderPasswordField = (name, label, placeholder) => (
    <Form.Group className="mb-3">
      <Form.Label className="fw-semibold">{label}</Form.Label>
      <div className="position-relative">
        <Form.Control
          type={uiState.showPasswords[name.split('Password')[0]] ? "text" : "password"}
          name={name}
          value={passwordData[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={uiState.isLoading}
          isInvalid={!!uiState.validationErrors[name]}
        />
        <Button
          variant="link"
          className="position-absolute end-0 top-50 translate-middle-y border-0 text-muted pe-3"
          onClick={() => togglePasswordVisibility(name.split('Password')[0])}
          disabled={uiState.isLoading}
          style={{ textDecoration: 'none' }}
        >
          {uiState.showPasswords[name.split('Password')[0]] ? '👁️' : '👁️‍🗨️'}
        </Button>
      </div>
      {uiState.validationErrors[name] && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {uiState.validationErrors[name]}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Alert variant="info" className="small">
            <strong>Password Requirements:</strong>
            <ul className="mb-0 mt-2">
              <li>At least 8 characters long</li>
              <li>Must contain uppercase and lowercase letters</li>
              <li>Must contain at least one number</li>
            </ul>
          </Alert>

          {renderPasswordField("currentPassword", "Current Password", "Enter your current password")}
          {renderPasswordField("newPassword", "New Password", "Enter your new password")}
          {renderPasswordField("confirmPassword", "Confirm New Password", "Confirm your new password")}
        </Modal.Body>
        
        <Modal.Footer>
          <Button 
            variant="outline-secondary" 
            onClick={onHide}
            disabled={uiState.isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            disabled={uiState.isLoading}
          >
            {uiState.isLoading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Changing Password...
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

// Main Profile Component
const Profile = () => {
  const { currentUser, updateUser } = useAuth();
  const { showNotification, NotificationProvider } = useNotification();

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    role: currentUser?.role || USER_ROLES.EMPLOYEE,
    department: currentUser?.department || "",
    phone: currentUser?.phone || "",
    location: currentUser?.location || "",
  });

  const [uiState, setUiState] = useState({
    editMode: false,
    isLoading: false,
    hasUnsavedChanges: false,
    validationErrors: {},
    showChangePassword: false,
  });

  // Update form data when currentUser changes (from localStorage)
  useEffect(() => {
    setFormData({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      role: currentUser?.role || USER_ROLES.EMPLOYEE,
      department: currentUser?.department || "",
      phone: currentUser?.phone || "",
      location: currentUser?.location || "",
    });
  }, [currentUser]);

  const hasChanges = useMemo(() => {
    return Object.keys(formData).some(
      key => formData[key] !== (currentUser?.[key] || "")
    );
  }, [formData, currentUser]);

  const isFormValid = useMemo(() => {
    return Object.keys(uiState.validationErrors).length === 0;
  }, [uiState.validationErrors]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const fieldError = validateProfileData({ [name]: value });
    setUiState(prev => ({
      ...prev,
      hasUnsavedChanges: true,
      validationErrors: {
        ...prev.validationErrors,
        [name]: fieldError[name] || null,
      },
    }));
  }, []);

  const handleSaveProfile = useCallback(async () => {
    try {
      setUiState(prev => ({ ...prev, isLoading: true }));

      const errors = validateProfileData(formData);
      if (Object.keys(errors).length > 0) {
        setUiState(prev => ({
          ...prev,
          validationErrors: errors,
          isLoading: false,
        }));
        return;
      }

      const originalUser = currentUser;
      updateUser({ ...currentUser, ...formData });

      try {
        await updateUserProfile(currentUser.id, formData);
        
        showNotification({
          type: "success",
          message: "Profile updated successfully",
        });

        setUiState(prev => ({
          ...prev,
          editMode: false,
          hasUnsavedChanges: false,
          isLoading: false,
          validationErrors: {},
        }));

      } catch (apiError) {
        updateUser(originalUser);
        throw apiError;
      }

    } catch (error) {
      console.error("Profile update failed:", error);
      
      showNotification({
        type: "error",
        message: error.message || "Failed to update profile",
      });

      setUiState(prev => ({ ...prev, isLoading: false }));
    }
  }, [formData, currentUser, updateUser, showNotification]);

  const handleCancelEdit = useCallback(() => {
    if (uiState.hasUnsavedChanges) {
      const confirmDiscard = window.confirm(
        "You have unsaved changes. Are you sure you want to discard them?"
      );
      if (!confirmDiscard) return;
    }

    setFormData({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      role: currentUser?.role || USER_ROLES.EMPLOYEE,
      department: currentUser?.department || "",
      phone: currentUser?.phone || "",
      location: currentUser?.location || "",
    });

    setUiState({
      editMode: false,
      isLoading: false,
      hasUnsavedChanges: false,
      validationErrors: {},
      showChangePassword: false,
    });
  }, [currentUser, uiState.hasUnsavedChanges]);

  const handleEnableEdit = useCallback(() => {
    setUiState(prev => ({ ...prev, editMode: true }));
  }, []);

  const handleShowChangePassword = useCallback(() => {
    setUiState(prev => ({ ...prev, showChangePassword: true }));
  }, []);

  const handleHideChangePassword = useCallback(() => {
    setUiState(prev => ({ ...prev, showChangePassword: false }));
  }, []);

  const handlePasswordChanged = useCallback(() => {
    // Optionally refresh user data or perform other actions
    console.log("Password changed successfully");
  }, []);

  const renderFormField = useCallback(({
    name,
    label,
    type = "text",
    placeholder,
    disabled = false,
    required = false,
    colSize = 6,
  }) => (
    <Col md={colSize} key={name}>
      <Form.Group controlId={`profile-${name}`} className="mb-3">
        <Form.Label className="fw-semibold">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </Form.Label>
        <Form.Control
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={!uiState.editMode || disabled || uiState.isLoading}
          isInvalid={!!uiState.validationErrors[name]}
          required={required}
        />
        {uiState.validationErrors[name] && (
          <Form.Control.Feedback type="invalid">
            {uiState.validationErrors[name]}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </Col>
  ), [formData, uiState, handleInputChange]);

  return (
    <>
      <NotificationProvider />
      
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1 fw-bold text-dark">Profile Management</h2>
            <p className="text-muted mb-0">
              Manage your account information and preferences
            </p>
          </div>
          {uiState.hasUnsavedChanges && (
            <Alert variant="warning" className="mb-0 py-2 px-3">
              <small>You have unsaved changes</small>
            </Alert>
          )}
        </div>

        <Card className="shadow-sm border-0">
          <Card.Header className="bg-light border-bottom-0 py-3">
            <h5 className="mb-0 fw-semibold">Personal Information</h5>
          </Card.Header>
          
          <Card.Body className="p-4">
            <Form noValidate>
              <Row>
                {renderFormField({
                  name: "name",
                  label: "Full Name",
                  placeholder: "Enter your full name",
                  required: true,
                })}
                
                {renderFormField({
                  name: "email",
                  label: "Email Address",
                  type: "email",
                  placeholder: "Enter your email address",
                  required: true,
                })}
              </Row>

              <Row>
                {renderFormField({
                  name: "department",
                  label: "Department",
                  placeholder: "Enter your department",
                })}

                {renderFormField({
                  name: "phone",
                  label: "Phone Number",
                  type: "tel",
                  placeholder: "Enter your phone number",
                })}
              </Row>

              <Row>
                {renderFormField({
                  name: "location",
                  label: "Office Location",
                  placeholder: "Enter your office location",
                })}

                {renderFormField({
                  name: "role",
                  label: "Role",
                  disabled: true,
                  placeholder: "Role assigned by administrator",
                })}
              </Row>

              <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                <div className="text-muted small">
                  {!uiState.editMode && (
                    <span>Last updated: {new Date(currentUser?.updatedAt || Date.now()).toLocaleDateString()}</span>
                  )}
                </div>

                <div className="d-flex gap-2">
                  {!uiState.editMode ? (
                    <Button
                      variant="primary"
                      onClick={handleEnableEdit}
                      disabled={uiState.isLoading}
                      className="px-4"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline-secondary"
                        onClick={handleCancelEdit}
                        disabled={uiState.isLoading}
                        className="px-4"
                      >
                        Cancel
                      </Button>
                      
                      <Button
                        variant="success"
                        onClick={handleSaveProfile}
                        disabled={uiState.isLoading || !hasChanges || !isFormValid}
                        className="px-4"
                      >
                        {uiState.isLoading ? (
                          <>
                            <Spinner size="sm" className="me-2" />
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>

        <Row className="mt-4">
          <Col md={6}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Header className="bg-light border-bottom-0 py-3">
                <h6 className="mb-0 fw-semibold">Account Security</h6>
              </Card.Header>
              <Card.Body>
                <p className="text-muted small mb-3">
                  Manage your account security settings
                </p>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={handleShowChangePassword}
                >
                  Change Password
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Header className="bg-light border-bottom-0 py-3">
                <h6 className="mb-0 fw-semibold">Preferences</h6>
              </Card.Header>
              <Card.Body>
                <p className="text-muted small mb-3">
                  Customize your application experience
                </p>
                <Button variant="outline-primary" size="sm">
                  View Settings
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      <ChangePasswordModal
        show={uiState.showChangePassword}
        onHide={handleHideChangePassword}
        onPasswordChanged={handlePasswordChanged}
      />
    </>
  );
};

export default Profile;
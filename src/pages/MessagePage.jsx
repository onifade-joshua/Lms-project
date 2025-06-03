import React, { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiSend,
  FiPaperclip,
  FiMoreVertical,
  FiUsers,
  FiUser,
  FiBook,
  FiMenu,
  FiX,
  FiArrowLeft,
  FiPhone,
  FiVideo,
  FiInfo,
} from "react-icons/fi";
import {
  MdSchool,
  MdSecurity,
  MdOnlinePrediction,
  MdPriorityHigh,
  MdGroup,
  MdPerson,
  MdAnnouncement,
  MdScience,
} from "react-icons/md";
import {
  BsCheck,
  BsCheckAll,
  BsDot,
  BsBuilding,
  BsMortarboard,
  BsLaptop,
} from "react-icons/bs";

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);

  // Check screen size for mobile responsiveness
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const colors = {
    primary: "#1976d2",
    secondary: "#dc004e",
    success: "#2e7d32",
    warning: "#ed6c02",
    error: "#d32f2f",
    info: "#0288d1",
    background: "#f5f5f5",
    surface: "#ffffff",
    text: "#212121",
    textSecondary: "#757575",
  };

  // Enhanced mock data for enterprise environment
  const conversations = [
    {
      id: 1,
      name: "Advanced Mathematics Team",
      type: "group",
      participants: 24,
      lastMessage:
        "New calculus resources have been uploaded to the shared drive",
      timestamp: "2 min ago",
      unread: 5,
      avatar: "📐",
      subject: "Mathematics",
      online: true,
      priority: "high",
      department: "STEM",
    },
    {
      id: 2,
      name: "Dr. Sarah Chen",
      type: "teacher",
      role: "Department Head - Physics",
      lastMessage:
        "Your research proposal looks excellent. Let's discuss the implementation timeline.",
      timestamp: "8 min ago",
      unread: 2,
      avatar: "👩‍🔬",
      subject: "Physics Research",
      online: true,
      priority: "urgent",
      department: "STEM",
    },
    {
      id: 3,
      name: "Campus Administration",
      type: "announcement",
      lastMessage:
        "Important: New safety protocols effective immediately. Please review the attached documents.",
      timestamp: "25 min ago",
      unread: 1,
      avatar: "🏛️",
      subject: "Campus Safety",
      online: false,
      priority: "urgent",
      department: "Administration",
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      type: "student",
      lastMessage:
        "Could you review my thesis draft? I've incorporated all your previous feedback.",
      timestamp: "1 hour ago",
      unread: 0,
      avatar: "👩‍🎓",
      subject: "Thesis Review",
      online: true,
      priority: "normal",
      department: "Liberal Arts",
    },
    {
      id: 5,
      name: "Prof. Michael Thompson",
      type: "teacher",
      role: "Senior Faculty - Computer Science",
      lastMessage:
        "Excellent work on the machine learning project. Ready for final presentation?",
      timestamp: "2 hours ago",
      unread: 0,
      avatar: "👨‍💻",
      subject: "CS Project",
      online: false,
      priority: "normal",
      department: "STEM",
    },
    {
      id: 6,
      name: "Research Collaboration Hub",
      type: "group",
      participants: 45,
      lastMessage:
        "Weekly research symposium scheduled for Friday 3 PM in Main Auditorium",
      timestamp: "3 hours ago",
      unread: 0,
      avatar: "🔬",
      subject: "Research",
      online: true,
      priority: "normal",
      department: "Research",
    },
    {
      id: 7,
      name: "Dean Patricia Williams",
      type: "admin",
      role: "Dean of Students",
      lastMessage:
        "Congratulations on receiving the Academic Excellence Award! 🎉",
      timestamp: "1 day ago",
      unread: 0,
      avatar: "👩‍💼",
      subject: "Recognition",
      online: true,
      priority: "normal",
      department: "Administration",
    },
  ];

  // Enhanced mock messages
  const mockMessages = {
    1: [
      {
        id: 1,
        sender: "Dr. Alex Chen",
        message:
          "Team, I've uploaded the new differential equations problem set to our shared workspace.",
        timestamp: "Yesterday 3:30 PM",
        isOwn: false,
        avatar: "👨‍🏫",
        status: "delivered",
      },
      {
        id: 2,
        sender: "You",
        message:
          "Thank you, Dr. Chen. I'll review it tonight and prepare discussion points for tomorrow's session.",
        timestamp: "Yesterday 3:45 PM",
        isOwn: true,
        status: "read",
      },
      {
        id: 3,
        sender: "Maria Santos",
        message:
          "I've been working through the integration by parts section. Could we schedule extra office hours?",
        timestamp: "Today 9:15 AM",
        isOwn: false,
        avatar: "👩‍🎓",
        status: "delivered",
      },
      {
        id: 4,
        sender: "Dr. Alex Chen",
        message:
          "Absolutely, Maria. I'll send out a Doodle poll for availability. Everyone should participate.",
        timestamp: "Today 9:20 AM",
        isOwn: false,
        avatar: "👨‍🏫",
        status: "delivered",
      },
      {
        id: 5,
        sender: "James Wilson",
        message:
          "New calculus resources have been uploaded to the shared drive",
        timestamp: "Today 10:40 AM",
        isOwn: false,
        avatar: "👨‍🎓",
        status: "delivered",
      },
    ],
    2: [
      {
        id: 1,
        sender: "Dr. Sarah Chen",
        message:
          "I've reviewed your quantum mechanics research proposal. The theoretical framework is solid.",
        timestamp: "Monday 2:30 PM",
        isOwn: false,
        avatar: "👩‍🔬",
        status: "delivered",
      },
      {
        id: 2,
        sender: "You",
        message:
          "Thank you for the detailed feedback, Dr. Chen. I've addressed the methodology concerns you raised.",
        timestamp: "Monday 4:15 PM",
        isOwn: true,
        status: "read",
      },
      {
        id: 3,
        sender: "Dr. Sarah Chen",
        message:
          "Excellent revisions! The experimental design is much clearer now.",
        timestamp: "Tuesday 10:30 AM",
        isOwn: false,
        avatar: "👩‍🔬",
        status: "delivered",
      },
      {
        id: 4,
        sender: "Dr. Sarah Chen",
        message:
          "Your research proposal looks excellent. Let's discuss the implementation timeline.",
        timestamp: "Today 11:15 AM",
        isOwn: false,
        avatar: "👩‍🔬",
        status: "delivered",
      },
    ],
  };

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "teachers" && conv.type === "teacher") ||
      (activeTab === "students" && conv.type === "student") ||
      (activeTab === "groups" && conv.type === "group") ||
      (activeTab === "announcements" && conv.type === "announcement");
    return matchesSearch && matchesTab;
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      // Add message logic here
      setNewMessage("");
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleBackToList = () => {
    setSelectedChat(null);
    setShowSidebar(true);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "teacher":
        return <MdSchool size={16} style={{ color: colors.primary }} />;
      case "student":
        return <FiUser size={16} style={{ color: colors.success }} />;
      case "group":
        return <FiUsers size={16} style={{ color: colors.secondary }} />;
      case "admin":
        return <MdSecurity size={16} style={{ color: colors.warning }} />;
      default:
        return <FiBook size={16} style={{ color: colors.textSecondary }} />;
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "urgent":
        return { borderLeft: `4px solid ${colors.error}` };
      case "high":
        return { borderLeft: `4px solid ${colors.warning}` };
      default:
        return { borderLeft: "4px solid transparent" };
    }
  };

  return (
    <div
      className="d-flex h-100 w-100"
      style={{ backgroundColor: colors.background, minHeight: "100vh" }}
    >
      {/* Mobile Header */}
      {isMobile && (
        <div
          className="position-fixed top-0 start-0 end-0 bg-white border-bottom p-3 d-flex justify-content-between align-items-center d-lg-none"
          style={{ zIndex: 1050 }}
        >
          {selectedChat ? (
            <div className="d-flex align-items-center">
              <button
                onClick={handleBackToList}
                className="btn btn-light me-3 p-2"
              >
                <FiArrowLeft size={20} />
              </button>
              <div className="d-flex align-items-center">
                <div className="position-relative me-3">
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                    style={{
                      width: "35px",
                      height: "35px",
                      fontSize: "0.9rem",
                    }}
                  >
                    {selectedChat.avatar}
                  </div>
                  {selectedChat.online && (
                    <div
                      className="position-absolute bottom-0 end-0 rounded-circle border border-2 border-white"
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: colors.success,
                      }}
                    ></div>
                  )}
                </div>
                <div>
                  <h6 className="mb-0 fw-semibold">{selectedChat.name}</h6>
                  <small className="text-muted">
                    {selectedChat.online ? "Online" : "Offline"}
                  </small>
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="btn btn-light me-3 p-2"
              >
                <FiMenu size={20} />
              </button>
              <h4 className="mb-0 fw-bold">Messages</h4>
            </div>
          )}

          {selectedChat && (
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-light p-2">
                <FiPhone size={18} />
              </button>
              <button className="btn btn-light p-2">
                <FiVideo size={18} />
              </button>
              <button className="btn btn-light p-2">
                <FiMoreVertical size={18} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
        ${
          isMobile
            ? "position-fixed top-0 start-0 h-100 mt-4"
            : "position-relative"
        } 
        ${showSidebar ? "" : "d-none"} 
        ${isMobile ? "w-100" : "col-lg-4 col-xl-3"} 
        bg-white border-end d-flex flex-column
        ${isMobile ? "pt-5" : ""}
      `}
        style={{
          zIndex: isMobile ? 1040 : "auto",
          minWidth: isMobile ? "100%" : "450px",
          maxWidth: isMobile ? "100%" : "500px",
        }}
      >
        {/* Desktop Header */}
        {!isMobile && (
          <div className="p-4 border-bottom">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="mb-0 fw-bold text-dark">Messages</h2>
              <div className="d-flex align-items-center">
                <span
                  className="badge rounded-pill text-white small"
                  style={{ backgroundColor: colors.success }}
                >
                  {conversations.filter((c) => c.online).length} Online
                </span>
              </div>
            </div>

            {/* Search */}
            <div className="position-relative mb-4">
              <FiSearch
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                size={18}
              />
              <input
                type="text"
                className="form-control ps-5 py-3"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  borderRadius: "12px",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #e9ecef",
                }}
              />
            </div>

            {/* Tabs */}
            <div className="d-flex flex-wrap gap-2">
              {[
                { key: "all", label: "All", count: conversations.length },
                {
                  key: "teachers",
                  label: "Faculty",
                  count: conversations.filter((c) => c.type === "teacher")
                    .length,
                },
                {
                  key: "students",
                  label: "Students",
                  count: conversations.filter((c) => c.type === "student")
                    .length,
                },
                {
                  key: "groups",
                  label: "Groups",
                  count: conversations.filter((c) => c.type === "group").length,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  className={`btn btn-sm px-3 py-2 fw-medium ${
                    activeTab === tab.key
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                  style={{ borderRadius: "8px", fontSize: "0.85rem" }}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Search */}
        {isMobile && showSidebar && (
          <div className="p-3 border-bottom">
            <div className="position-relative mb-3">
              <FiSearch
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                size={18}
              />
              <input
                type="text"
                className="form-control ps-5 py-3"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: "12px" }}
              />
            </div>

            {/* Mobile Tabs */}
            <div className="d-flex gap-2 overflow-auto">
              {[
                { key: "all", label: "All" },
                { key: "teachers", label: "Faculty" },
                { key: "students", label: "Students" },
                { key: "groups", label: "Groups" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  className={`btn btn-sm px-3 py-2 fw-medium text-nowrap ${
                    activeTab === tab.key
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                  style={{ borderRadius: "8px", fontSize: "0.85rem" }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Conversations List */}
        <div className="flex-grow-1 overflow-auto w-100">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              className={`d-flex align-items-center p-2 p-sm-3 cursor-pointer border-bottom ${
                selectedChat?.id === conv.id ? "bg-primary bg-opacity-10" : ""
              }`}
              style={{
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                ...getPriorityStyles(conv.priority),
              }}
              onClick={() => handleChatSelect(conv)}
              onMouseEnter={(e) => {
                if (selectedChat?.id !== conv.id) {
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedChat?.id !== conv.id) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <div className="position-relative me-2 me-sm-3 flex-shrink-0">
                <div
                  className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                  style={{
                    width: window.innerWidth < 576 ? "40px" : "50px",
                    height: window.innerWidth < 576 ? "40px" : "50px",
                    fontSize: window.innerWidth < 576 ? "1.1rem" : "1.3rem",
                  }}
                >
                  {conv.avatar}
                </div>
                {conv.online && (
                  <div
                    className="position-absolute bottom-0 end-0 rounded-circle border border-2 border-white"
                    style={{
                      width: window.innerWidth < 576 ? "12px" : "14px",
                      height: window.innerWidth < 576 ? "12px" : "14px",
                      backgroundColor: colors.success,
                    }}
                  ></div>
                )}
              </div>

              <div className="flex-grow-1 min-w-0">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <div className="d-flex align-items-center gap-1 gap-sm-2 flex-wrap">
                    <h6
                      className="mb-0 fw-semibold text-truncate text-dark"
                      style={{
                        fontSize: window.innerWidth < 576 ? "0.9rem" : "1rem",
                      }}
                    >
                      {conv.name}
                    </h6>
                    <div className="d-none d-sm-inline-block">
                      {getTypeIcon(conv.type)}
                    </div>
                    {conv.priority === "urgent" && (
                      <span
                        className="badge text-white small d-none d-sm-inline-block"
                        style={{ backgroundColor: colors.error }}
                      >
                        <MdPriorityHigh size={12} className="me-1" />
                        <span className="d-none d-md-inline">Urgent</span>
                        <span className="d-inline d-md-none">!</span>
                      </span>
                    )}
                  </div>
                  <small
                    className="text-muted flex-shrink-0 ms-2"
                    style={{
                      fontSize: window.innerWidth < 576 ? "0.7rem" : "0.875rem",
                    }}
                  >
                    {window.innerWidth < 576
                      ? conv.timestamp.split(" ")[1] || conv.timestamp
                      : conv.timestamp}
                  </small>
                </div>

                {/* Mobile: Show priority indicator if urgent */}
                {conv.priority === "urgent" && (
                  <div className="d-block d-sm-none mb-1">
                    <span
                      className="badge text-white small"
                      style={{
                        backgroundColor: colors.error,
                        fontSize: "0.65rem",
                      }}
                    >
                      <MdPriorityHigh size={10} className="me-1" />
                      Urgent
                    </span>
                  </div>
                )}

                {conv.role && (
                  <p
                    className="small mb-1 d-none d-sm-block"
                    style={{ color: colors.primary }}
                  >
                    {conv.role}
                  </p>
                )}

                <div className="d-flex align-items-center justify-content-between">
                  <p
                    className="small text-muted mb-0 text-truncate pe-2"
                    style={{
                      maxWidth: window.innerWidth < 576 ? "180px" : "250px",
                      fontSize: window.innerWidth < 576 ? "0.8rem" : "0.875rem",
                    }}
                  >
                    {conv.lastMessage}
                  </p>
                  {conv.unread > 0 && (
                    <span
                      className="badge text-white rounded-pill flex-shrink-0"
                      style={{
                        backgroundColor: colors.primary,
                        fontSize:
                          window.innerWidth < 576 ? "0.65rem" : "0.7rem",
                        minWidth: window.innerWidth < 576 ? "18px" : "20px",
                        height: window.innerWidth < 576 ? "18px" : "20px",
                      }}
                    >
                      {conv.unread > 99 ? "99+" : conv.unread}
                    </span>
                  )}
                </div>

                {conv.department && (
                  <div className="d-flex align-items-center mt-1">
                    <p className="small text-muted mb-0 d-none d-sm-block">
                      <BsBuilding size={12} className="me-1" />
                      {conv.department}
                    </p>
                    {/* Mobile: Show department as icon only */}
                    <div className="d-block d-sm-none">
                      <BsBuilding
                        size={10}
                        className="text-muted"
                        title={conv.department}
                      />
                    </div>
                  </div>
                )}

                {/* Mobile: Show type icon at bottom */}
                <div className="d-block d-sm-none mt-1">
                  {getTypeIcon(conv.type)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && showSidebar && (
        <div
          className="position-fixed w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1030 }}
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main Chat Area */}
      <div
        className={`flex-grow-1 d-flex flex-column ${isMobile ? "pt-5" : ""} ${
          !selectedChat && isMobile ? "d-none" : ""
        }`}
      >
        {selectedChat ? (
          <>
            {/* Desktop Chat Header */}
            {!isMobile && (
              <div className="d-flex align-items-center justify-content-between p-2 border-bottom bg-white">
                <div className="d-flex align-items-center">
                  <div className="position-relative me-3">
                    <div
                      className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                      style={{
                        width: "50px",
                        height: "50px",
                        fontSize: "1.3rem",
                      }}
                    >
                      {selectedChat.avatar}
                    </div>
                    {selectedChat.online && (
                      <div
                        className="position-absolute bottom-0 end-0 rounded-circle border border-2 border-white"
                        style={{
                          width: "14px",
                          height: "14px",
                          backgroundColor: colors.success,
                        }}
                      ></div>
                    )}
                  </div>
                  <div>
                    <h4 className="mb-1 fw-semibold text-dark">
                      {selectedChat.name}
                    </h4>
                    <div className="d-flex align-items-center gap-3 small text-muted">
                      <span className="d-flex align-items-center">
                        <MdOnlinePrediction
                          size={14}
                          className="me-1"
                          style={{
                            color: selectedChat.online
                              ? colors.success
                              : colors.textSecondary,
                          }}
                        />
                        {selectedChat.online
                          ? "Online"
                          : `Last seen ${selectedChat.timestamp}`}
                      </span>
                      {selectedChat.role && (
                        <>
                          <BsDot />
                          <span style={{ color: colors.primary }}>
                            {selectedChat.role}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  {selectedChat.type === "group" && (
                    <span
                      className="badge text-white px-2 py-2"
                      style={{ backgroundColor: colors.secondary }}
                    >
                      <FiUsers size={14} className="me-1" />
                      {selectedChat.participants} members
                    </span>
                  )}
                  <button className="btn btn-light p-2">
                    <FiPhone size={20} />
                  </button>
                  <button className="btn btn-light p-2">
                    <FiVideo size={20} />
                  </button>
                  <button className="btn btn-light p-2">
                    <FiMoreVertical size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div
              className="flex-grow-1 overflow-auto p-2"
              style={{ backgroundColor: colors.background }}
            >
              <div className="container-fluid">
                {mockMessages[selectedChat.id]?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`d-flex mb-4 ${
                      msg.isOwn
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    {!msg.isOwn && (
                      <div
                        className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                        style={{
                          width: "35px",
                          height: "35px",
                          fontSize: "0.9rem",
                        }}
                      >
                        {msg.avatar}
                      </div>
                    )}

                    <div
                      className={`${msg.isOwn ? "text-end" : ""}`}
                      style={{ maxWidth: "50%" }}
                    >
                      {!msg.isOwn && (
                        <div className="small fw-medium text-dark mb-1">
                          {msg.sender}
                        </div>
                      )}
                      <div
                        className={`p-2 rounded-4 shadow-sm ${
                          msg.isOwn ? "text-white" : "bg-white text-dark border"
                        }`}
                        style={{
                          backgroundColor: msg.isOwn ? colors.primary : "white",
                          borderColor: msg.isOwn ? "transparent" : "#e9ecef",
                        }}
                      >
                        {msg.message}
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-1">
                        <small className="text-muted">{msg.timestamp}</small>
                        {msg.isOwn && (
                          <small className="text-muted ms-2">
                            {msg.status === "read" ? (
                              <BsCheckAll size={14} />
                            ) : (
                              <BsCheck size={14} />
                            )}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-2 border-top bg-white">
              <div className="container-fluid">
                <div className="d-flex align-items-end gap-2">
                  <button className="btn btn-light p-3">
                    <FiPaperclip size={20} className="text-muted" />
                  </button>

                  <div className="flex-grow-1">
                    <textarea
                      className="form-control p-2"
                      rows="1"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      style={{
                        resize: "none",
                        borderRadius: "12px",
                        minHeight: "50px",
                        maxHeight: "120px",
                        border: "1px solid #e9ecef",
                      }}
                    />
                  </div>

                  <button
                    className={`btn p-2 ${
                      newMessage.trim() ? "btn-primary" : "btn-light"
                    }`}
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    style={{
                      borderRadius: "12px",
                      minWidth: "50px",
                      minHeight: "50px",
                    }}
                  >
                    <FiSend size={20} />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Welcome Screen
          <div className="flex-grow-1 d-flex align-items-center justify-content-center p-5">
            <div className="text-center" style={{ maxWidth: "600px" }}>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                style={{
                  width: "120px",
                  height: "120px",
                  backgroundColor: `${colors.primary}20`,
                }}
              >
                <FiUsers size={60} style={{ color: colors.primary }} />
              </div>
              <h2 className="fw-bold text-dark mb-4">
                Enterprise Messaging Platform
              </h2>
              <p className="text-muted mb-5 lead">
                Connect seamlessly with faculty, collaborate with peers, and
                stay updated with institutional communications
              </p>

              <div className="row g-4">
                <div className="col-md-4">
                  <div className="text-center p-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{
                        width: "70px",
                        height: "70px",
                        backgroundColor: `${colors.primary}20`,
                      }}
                    >
                      <MdSchool size={35} style={{ color: colors.primary }} />
                    </div>
                    <h5 className="fw-semibold mb-3">Faculty Communication</h5>
                    <p className="text-muted small">
                      Direct access to professors and academic advisors for
                      seamless collaboration
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{
                        width: "70px",
                        height: "70px",
                        backgroundColor: `${colors.secondary}20`,
                      }}
                    >
                      <MdGroup size={35} style={{ color: colors.secondary }} />
                    </div>
                    <h5 className="fw-semibold mb-3">Study Groups</h5>
                    <p className="text-muted small">
                      Collaborate on projects, share resources, and engage in
                      academic discussions
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{
                        width: "70px",
                        height: "70px",
                        backgroundColor: `${colors.success}20`,
                      }}
                    >
                      <MdAnnouncement
                        size={35}
                        style={{ color: colors.success }}
                      />
                    </div>
                    <h5 className="fw-semibold mb-3">Announcements</h5>
                    <p className="text-muted small">
                      Stay informed with institutional updates and important
                      notifications
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MessagesPage;

export const sampleEvents = [
  {
    id: 1,
    title: "Computer Science 101 - Introduction to Programming",
    type: "class",
    date: new Date(2024, 11, 15, 9, 0),
    endDate: new Date(2024, 11, 15, 10, 30),
    location: "Room A-101",
    instructor: {
      name: "Prof. Sarah Smith",
      email: "sarah.smith@university.edu",
      avatar: "/api/placeholder/32/32"
    },
    students: 45,
    maxCapacity: 50,
    department: "Computer Science",
    courseCode: "CS101",
    credits: 3,
    description: "Introduction to basic programming concepts and Python fundamentals.",
    status: "confirmed",
    priority: "high",
    resources: ["Projector", "Laptops", "Whiteboard"],
    prerequisites: ["Basic Mathematics"],
    tags: ["Programming", "Python", "Beginner"]
  },
  {
    id: 2,
    title: "Mathematics Exam - Calculus II",
    type: "exam",
    date: new Date(2024, 11, 18, 14, 0),
    endDate: new Date(2024, 11, 18, 16, 0),
    location: "Main Hall",
    instructor: {
      name: "Dr. Michael Johnson",
      email: "michael.johnson@university.edu",
      avatar: "/api/placeholder/32/32"
    },
    students: 120,
    maxCapacity: 150,
    department: "Mathematics",
    courseCode: "MATH201",
    credits: 4,
    description: "Comprehensive exam covering derivatives, integrals, and applications.",
    status: "confirmed",
    priority: "critical",
    examType: "Final",
    duration: "2 hours",
    allowedMaterials: ["Calculator", "Formula Sheet"],
    tags: ["Mathematics", "Calculus", "Final Exam"]
  },
  {
    id: 3,
    title: "Faculty Meeting - Curriculum Review",
    type: "meeting",
    date: new Date(2024, 11, 20, 15, 30),
    endDate: new Date(2024, 11, 20, 17, 0),
    location: "Conference Room B",
    organizer: {
      name: "Dr. Emily Williams",
      email: "emily.williams@university.edu",
      avatar: "/api/placeholder/32/32"
    },
    attendees: [
      { name: "Dr. Williams", email: "emily.williams@university.edu" },
      { name: "Prof. Brown", email: "brown@university.edu" },
      { name: "Dr. Davis", email: "davis@university.edu" }
    ],
    department: "Academic Affairs",
    description: "Monthly review of curriculum updates and academic policies.",
    status: "confirmed",
    priority: "medium",
    meetingType: "Department",
    agenda: ["Curriculum Updates", "Policy Review", "Budget Discussion"],
    tags: ["Faculty", "Curriculum", "Policy"]
  },
  {
    id: 4,
    title: "Student Orientation - New Admissions",
    type: "event",
    date: new Date(2024, 11, 22, 10, 0),
    endDate: new Date(2024, 11, 22, 12, 0),
    location: "Auditorium",
    coordinator: {
      name: "Ms. Jennifer Anderson",
      email: "jennifer.anderson@university.edu",
      avatar: "/api/placeholder/32/32"
    },
    students: 200,
    maxCapacity: 300,
    department: "Student Affairs",
    description: "Welcome session for newly admitted students and campus tour.",
    status: "confirmed",
    priority: "high",
    eventType: "Orientation",
    registrationRequired: true,
    refreshments: true,
    tags: ["Orientation", "New Students", "Welcome"]
  },
  {
    id: 5,
    title: "Physics Lab - Quantum Mechanics",
    type: "lab",
    date: new Date(2024, 11, 16, 13, 0),
    endDate: new Date(2024, 11, 16, 15, 0),
    location: "Physics Lab 3",
    instructor: {
      name: "Dr. Robert Wilson",
      email: "robert.wilson@university.edu",
      avatar: "/api/placeholder/32/32"
    },
    students: 25,
    maxCapacity: 30,
    department: "Physics",
    courseCode: "PHYS301",
    credits: 2,
    description: "Hands-on experiments with quantum mechanical phenomena.",
    status: "confirmed",
    priority: "medium",
    labType: "Advanced",
    equipment: ["Quantum Kit", "Oscilloscope", "Laser Equipment"],
    safetyRequirements: ["Lab Coat", "Safety Goggles"],
    tags: ["Physics", "Quantum", "Laboratory"]
  }
];
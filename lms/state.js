/**
 * state.js
 * Core state management for the EdTech LMS.
 * Persists data to localStorage to enable cohesive multi-role interactions.
 */

const DEFAULT_COURSES = [
  {
    id: "webdev",
    title: "Full-Stack Web Development Boot Camp",
    category: "Development",
    instructor: "Prof. Jane Smith",
    price: 499,
    rating: 4.8,
    reviewsCount: 142,
    duration: "12 Weeks",
    studentsEnrolled: 1250,
    shortDescription: "Master HTML5, CSS3, JavaScript, Node.js, and React from scratch with hands-on cohort challenges.",
    longDescription: "This comprehensive cohort-based course is designed to take you from a complete beginner to a job-ready full-stack developer. You will learn modern frontend frameworks, backend API construction, database modeling, and real-world deployment. Includes weekly live mentoring, peer code reviews, and structured project milestones.",
    coverGradient: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    modules: [
      {
        id: "m1",
        title: "Module 1: Frontend Fundamentals",
        lessons: [
          { id: "l1", title: "HTML5 Semantic Structure & SEO", duration: "15:20", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", content: "Semantic HTML elements are those that clearly describe their meaning in a human- and machine-readable way. Elements such as <article>, <aside>, <details>, <figcaption>, <figure>, <footer>, <header>, <main>, <mark>, <nav>, <section>, <summary>, <time> are semantic. Learn how they boost SEO and accessibility." },
          { id: "l2", title: "CSS Grid & Flexbox Mastery", duration: "22:45", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", content: "CSS Grid Layout and CSS Flexible Box Layout (Flexbox) are layout systems designed for different use-cases. Flexbox is 1-dimensional (rows OR columns) and is great for alignment and spacing. Grid is 2-dimensional (rows AND columns) and is perfect for full layouts. We will build a complex responsive dashboard layout in this lesson." },
          { id: "l3", title: "JavaScript ES6+ and State Management", duration: "30:10", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", content: "ES6 (ECMAScript 2015) introduced major features: arrow functions, template literals, destructuring, let/const, promises, and classes. In this lesson, we will explore managing state reactively without external frameworks, laying the groundwork for complex client-side applications." }
        ],
        assignment: {
          id: "a1",
          title: "Assignment 1: Responsive Dashboard UI",
          description: "Build a responsive web application dashboard using Flexbox and Grid. Use custom properties for styling and write semantic HTML. Include a sidebar, header, and content grid.",
          dueDate: "2026-06-05"
        }
      },
      {
        id: "m2",
        title: "Module 2: Server-side & Databases",
        lessons: [
          { id: "l4", title: "Node.js & Express REST APIs", duration: "25:15", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", content: "Learn how to setup an Express server, define route handlers, parse incoming JSON request bodies, and implement standard CRUD principles. We will build a mockup LMS endpoint structure during this live session coding run." },
          { id: "l5", title: "Relational vs NoSQL Databases", duration: "18:50", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", content: "Analyze the fundamental architectural differences between SQL (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis). Learn when to prioritize strict schema integrity versus high write throughput and scale-out potential." }
        ],
        assignment: {
          id: "a2",
          title: "Assignment 2: RESTful API for Course Catalog",
          description: "Develop a basic Node/Express server that serves a list of courses. Include endpoints to add a course, filter by rating, and delete a course. Use arrays for temporary storage.",
          dueDate: "2026-06-15"
        }
      }
    ]
  },
  {
    id: "datascience",
    title: "Applied Data Science & Machine Learning",
    category: "Data Science",
    instructor: "Dr. Alan Turing",
    price: 599,
    rating: 4.9,
    reviewsCount: 98,
    duration: "10 Weeks",
    studentsEnrolled: 820,
    shortDescription: "Learn Python, Pandas, Scikit-Learn, and TensorFlow to build predictive models and analyze real data.",
    longDescription: "Dive deep into data analysis and machine learning workflows. From cleaning dirty datasets using Pandas to tuning hyperparameters of Deep Neural Networks in TensorFlow. You will learn the mathematics behind popular models and implement them to solve business-oriented problems.",
    coverGradient: "linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)",
    modules: [
      {
        id: "ds_m1",
        title: "Module 1: Data Analysis with Python",
        lessons: [
          { id: "ds_l1", title: "Pandas DataFrames & Series", duration: "20:05", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", content: "Explore the core data structures of Pandas: Series (1D) and DataFrames (2D). Learn methods for loading CSV data, inspecting structures, handling missing values, filtering rows, and aggregating metrics." },
          { id: "ds_l2", title: "Matplotlib & Seaborn Visualizations", duration: "17:40", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", content: "Learn to visualize findings using plotting libraries. Create line plots, scatter plots, bar charts, heatmaps, and distribution histograms. Apply proper labeling and color theory to data storytelling." }
        ],
        assignment: {
          id: "ds_a1",
          title: "Assignment 1: Titanic Dataset Wrangling",
          description: "Analyze the passenger survival dataset. Clean missing data, engineer age brackets, and plot survival rates grouped by passenger class and gender. Submit your analysis notebook.",
          dueDate: "2026-06-08"
        }
      }
    ]
  },
  {
    id: "uiux",
    title: "UI/UX Design Masterclass: Figma to Code",
    category: "Design",
    instructor: "Sarah Jenkins",
    price: 349,
    rating: 4.7,
    reviewsCount: 88,
    duration: "8 Weeks",
    studentsEnrolled: 640,
    shortDescription: "Master UI patterns, wireframing, high-fidelity prototypes in Figma, and handoff to frontend code.",
    longDescription: "Go beyond pretty interfaces. Learn the psychology of user experience, construct modular design systems in Figma using auto-layout and components, perform thorough usability tests, and translate designs into production-ready HTML/CSS markup.",
    coverGradient: "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)",
    modules: [
      {
        id: "ui_m1",
        title: "Module 1: Figma Essentials",
        lessons: [
          { id: "ui_l1", title: "Figma Components & Auto-Layout 4.0", duration: "24:30", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", content: "Auto-layout is Figma's most powerful feature for building responsive layouts. Learn configuration properties, alignment, stretching, padding, and min/max dimensions. Build a flexible card component." },
          { id: "ui_l2", title: "Design Systems & Variables", duration: "19:15", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", content: "Create a design token system mapping colors, typography sizes, border radii, and spatial offsets. Implement a switchable light/dark mode design in Figma using variables." }
        ],
        assignment: {
          id: "ui_a1",
          title: "Assignment 1: Portfolio Landing Page Design",
          description: "Design a mobile & desktop responsive landing page in Figma. Use components for buttons, navigation, and input fields. Submit a link to your high-fidelity prototype.",
          dueDate: "2026-06-10"
        }
      }
    ]
  }
];

const DEFAULT_CHATS = [
  { channel: "#general", sender: "Prof. Jane Smith", role: "faculty", text: "Welcome to the cohort everyone! Excited to work with you all over the next 12 weeks. Please check out the first assignment due on June 5th.", timestamp: "2026-05-26T10:00:00Z" },
  { channel: "#general", sender: "Alex Carter", role: "student", text: "Hi Prof. Smith! Super excited to be here. The syllabus looks amazing.", timestamp: "2026-05-26T10:15:00Z" },
  { channel: "#web-dev-cohort", sender: "Emily Rose", role: "student", text: "Hey guys, is anyone working on Lesson 2 CSS Grid? Having some issues with responsive layout collapsing.", timestamp: "2026-05-26T11:30:00Z" },
  { channel: "#web-dev-cohort", sender: "Prof. Jane Smith", role: "faculty", text: "Hi Emily, try setting `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`. This will automatically wrap elements when they drop below 250px width.", timestamp: "2026-05-26T11:45:00Z" },
  { channel: "#announcements", sender: "Admin Portal", role: "faculty", text: "ALERT: Live Class for Module 1 starts today at 5:00 PM. Don't forget to join from the Live Class tab!", timestamp: "2026-05-26T12:00:00Z" }
];

const DEFAULT_STUDENT_INFO = {
  name: "Dileep Ruthin",
  email: "dileep.ruthin@warinedu.org",
  avatar: "DR",
  enrolledCourses: ["webdev"],
  progress: {
    "webdev": ["l1"] // initially completed lesson 1
  },
  grades: {
    "a1": {
      grade: "A-",
      feedback: "Great semantic structures! Make sure your CSS Grid container uses a media query fallback for older browsers. Overall solid code quality.",
      submittedAt: "2026-05-25T14:30:00Z",
      fileContent: "index.html & style.css files submitted. Structured using flex containers and standard CSS variables for dark themes."
    }
  },
  attendance: {
    "webdev": [
      { date: "2026-05-18", status: "Present" },
      { date: "2026-05-20", status: "Present" },
      { date: "2026-05-22", status: "Present" },
      { date: "2026-05-25", status: "Present" }
    ],
    "datascience": [],
    "uiux": []
  },
  invoices: [
    { id: "inv-001", amount: 499, courseTitle: "Full-Stack Web Development Boot Camp", dueDate: "2026-05-28", status: "Unpaid" },
    { id: "inv-002", amount: 99, courseTitle: "Lab Equipment & Textbooks deposit", dueDate: "2026-05-01", status: "Paid", paidDate: "2026-04-29" }
  ],
  notifications: [
    { id: "n1", text: "Your tuition invoice inv-001 ($499) is due in 2 days. Click here to pay.", type: "warning", read: false, time: "1 hour ago" },
    { id: "n2", text: "Assignment 1 (Responsive Dashboard UI) was graded by Prof. Jane Smith: A-", type: "info", read: false, time: "2 hours ago" }
  ]
};

const DEFAULT_LIVE_CLASS = {
  status: "idle", // 'idle' or 'live'
  activeCourseId: "",
  title: "",
  presenter: "",
  viewersCount: 0,
  handRaises: 0,
  messages: []
};

// Global DB Reference
let db = null;

export function initDb() {
  const cached = localStorage.getItem("warin_lms_db");
  if (cached) {
    try {
      db = JSON.parse(cached);
    } catch (e) {
      console.error("Failed to parse cached database. Re-initializing.", e);
    }
  }

  if (!db) {
    db = {
      role: "student", // default role
      courses: DEFAULT_COURSES,
      chats: DEFAULT_CHATS,
      studentInfo: DEFAULT_STUDENT_INFO,
      liveClass: DEFAULT_LIVE_CLASS,
      parentDirectMessages: [
        { sender: "Parent (Dileep's Mom)", role: "parent", text: "Hello Prof. Smith, Dileep wanted to ask if we can extend the deadline for assignment 2 as we have a family trip. Thanks!", timestamp: "2026-05-26T08:00:00Z" },
        { sender: "Prof. Jane Smith", role: "faculty", text: "Hello! Yes, that is fine. I can extend it for Dileep by 3 days. Safe travels!", timestamp: "2026-05-26T09:30:00Z" }
      ]
    };
    saveDb();
  }
  return db;
}

export function getDb() {
  if (!db) initDb();
  return db;
}

export function saveDb() {
  if (db) {
    localStorage.setItem("warin_lms_db", JSON.stringify(db));
  }
}

// ------------------- ACTIONS -------------------

export function setRole(newRole) {
  db.role = newRole;
  saveDb();
}

export function enrollCourse(courseId) {
  if (!db.studentInfo.enrolledCourses.includes(courseId)) {
    db.studentInfo.enrolledCourses.push(courseId);
    db.studentInfo.progress[courseId] = [];
    db.studentInfo.attendance[courseId] = [
      { date: new Date().toISOString().split('T')[0], status: "Present" }
    ];
    
    // Add transaction invoice
    const course = db.courses.find(c => c.id === courseId);
    const invoiceId = "inv-" + Math.floor(100 + Math.random() * 900);
    db.studentInfo.invoices.push({
      id: invoiceId,
      amount: course.price,
      courseTitle: course.title,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "Paid",
      paidDate: new Date().toISOString().split('T')[0]
    });

    // Add alert notification
    db.studentInfo.notifications.unshift({
      id: "n_" + Date.now(),
      text: `Successfully enrolled in ${course.title}! Let's start learning.`,
      type: "success",
      read: false,
      time: "Just now"
    });

    saveDb();
  }
}

export function toggleLessonCompletion(courseId, lessonId) {
  if (!db.studentInfo.progress[courseId]) {
    db.studentInfo.progress[courseId] = [];
  }
  
  const list = db.studentInfo.progress[courseId];
  const idx = list.indexOf(lessonId);
  if (idx > -1) {
    list.splice(idx, 1);
  } else {
    list.push(lessonId);
  }
  saveDb();
  return list;
}

export function submitAssignment(courseId, assignmentId, textContent) {
  db.studentInfo.grades[assignmentId] = {
    grade: "Pending Review",
    feedback: "",
    submittedAt: new Date().toISOString(),
    fileContent: textContent
  };
  
  db.studentInfo.notifications.unshift({
    id: "n_" + Date.now(),
    text: `Submitted Assignment: ${assignmentId.toUpperCase()} for evaluation.`,
    type: "info",
    read: false,
    time: "Just now"
  });

  saveDb();
}

export function gradeAssignment(assignmentId, grade, feedback) {
  if (db.studentInfo.grades[assignmentId]) {
    db.studentInfo.grades[assignmentId].grade = grade;
    db.studentInfo.grades[assignmentId].feedback = feedback;

    db.studentInfo.notifications.unshift({
      id: "n_" + Date.now(),
      text: `Assignment ${assignmentId.toUpperCase()} graded by Faculty: ${grade}`,
      type: "success",
      read: false,
      time: "Just now"
    });

    saveDb();
  }
}

export function payInvoice(invoiceId) {
  const invoice = db.studentInfo.invoices.find(inv => inv.id === invoiceId);
  if (invoice) {
    invoice.status = "Paid";
    invoice.paidDate = new Date().toISOString().split('T')[0];

    db.studentInfo.notifications.unshift({
      id: "n_" + Date.now(),
      text: `Payment of $${invoice.amount} for ${invoice.courseTitle} received. Invoice #${invoice.id} is now complete.`,
      type: "success",
      read: false,
      time: "Just now"
    });

    saveDb();
  }
}

export function sendChatMessage(channel, sender, text, role) {
  db.chats.push({
    channel,
    sender,
    role,
    text,
    timestamp: new Date().toISOString()
  });
  saveDb();
}

export function sendParentMessage(sender, text, role) {
  db.parentDirectMessages.push({
    sender,
    role,
    text,
    timestamp: new Date().toISOString()
  });
  saveDb();
}

export function triggerFeeReminder(invoiceId) {
  const invoice = db.studentInfo.invoices.find(inv => inv.id === invoiceId);
  if (invoice) {
    db.studentInfo.notifications.unshift({
      id: "n_" + Date.now(),
      text: `URGENT PAYMENT REMINDER: Invoice #${invoice.id} for $${invoice.amount} is due on ${invoice.dueDate}. Please clear it immediately.`,
      type: "warning",
      read: false,
      time: "Just now"
    });
    saveDb();
  }
}

export function startLiveClass(courseId, title) {
  const course = db.courses.find(c => c.id === courseId);
  db.liveClass = {
    status: "live",
    activeCourseId: courseId,
    title: title || "Weekly Cohort Sync",
    presenter: course ? course.instructor : "Faculty Guest",
    viewersCount: Math.floor(15 + Math.random() * 20),
    handRaises: 0,
    messages: [
      { sender: "System Bot", text: `Live classroom session started by ${course ? course.instructor : 'Faculty'}. Welcome!`, timestamp: new Date().toISOString() }
    ]
  };

  db.studentInfo.notifications.unshift({
    id: "n_" + Date.now(),
    text: `🔴 Live Class has started for ${course ? course.title : 'your course'}: "${db.liveClass.title}". Click to Join!`,
    type: "warning",
    read: false,
    time: "Just now"
  });

  saveDb();
}

export function stopLiveClass() {
  db.liveClass.status = "idle";
  db.liveClass.activeCourseId = "";
  db.liveClass.title = "";
  db.liveClass.presenter = "";
  db.liveClass.viewersCount = 0;
  db.liveClass.handRaises = 0;
  db.liveClass.messages = [];
  saveDb();
}

export function raiseHand() {
  if (db.liveClass.status === "live") {
    db.liveClass.handRaises += 1;
    db.liveClass.messages.push({
      sender: db.studentInfo.name,
      text: "🙋 Raised hand to ask a question.",
      timestamp: new Date().toISOString()
    });
    saveDb();
  }
}

export function sendLiveClassMessage(sender, text) {
  if (db.liveClass.status === "live") {
    db.liveClass.messages.push({
      sender,
      text,
      timestamp: new Date().toISOString()
    });
    saveDb();
  }
}

export function logAttendance(courseId, date, studentName, status) {
  if (!db.studentInfo.attendance[courseId]) {
    db.studentInfo.attendance[courseId] = [];
  }
  const records = db.studentInfo.attendance[courseId];
  const existing = records.find(r => r.date === date);
  if (existing) {
    existing.status = status;
  } else {
    records.push({ date, status });
  }
  saveDb();
}

export function resetDb() {
  localStorage.removeItem("warin_lms_db");
  db = null;
  initDb();
}

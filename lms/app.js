/**
 * app.js
 * Main routing controller and UI event binder for the LMS.
 * Handles menu item transitions, role swapping, modal states, and interactive mock actions.
 */

import * as State from './state.js';
import * as Components from './components.js';

// Global variables for active page views
let activeStudentTab = "dashboard";
let activeFacultyTab = "overview";
let activeParentTab = "overview";
let isSidebarOpen = false;

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Database
  State.initDb();
  
  // Render layout frame
  renderAppShell();
  
  // Bind core listeners
  setupMenuListeners();
  setupRoleSwitcher();
  setupNotificationListeners();
  
  // Start automated background simulator (simulates student questions / periodic payment prompts)
  startAutomatedSimulator();
});

// ==================== SHELL LAYOUT RENDERING ====================
function renderAppShell() {
  const db = State.getDb();
  const info = db.studentInfo;
  
  // Determine sidebar options based on active role
  let sidebarMenuHtml = "";
  if (db.role === "visitor") {
    sidebarMenuHtml = `
      <li class="menu-item active" data-page="marketplace">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M6.75 18h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75z" /></svg>
          <span>Courses Marketplace</span>
        </a>
      </li>
    `;
  } else if (db.role === "student") {
    sidebarMenuHtml = `
      <li class="menu-item ${activeStudentTab === 'dashboard' ? 'active' : ''}" data-student-tab="dashboard">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
          <span>Dashboard</span>
        </a>
      </li>
      <li class="menu-item ${activeStudentTab === 'courses' ? 'active' : ''}" data-student-tab="courses">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
          <span>My Courses</span>
        </a>
      </li>
      <li class="menu-item ${activeStudentTab === 'live' ? 'active' : ''}" data-student-tab="live">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" /></svg>
          <span>Live Class ${db.liveClass.status === "live" ? `<span class="bell-badge" style="position:static; margin-left:8px; display:inline-block;"></span>` : ''}</span>
        </a>
      </li>
      <li class="menu-item ${activeStudentTab === 'chat' ? 'active' : ''}" data-student-tab="chat">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          <span>Cohort Groups</span>
        </a>
      </li>
      <li class="menu-item ${activeStudentTab === 'certificates' ? 'active' : ''}" data-student-tab="certificates">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
          <span>Certificates</span>
        </a>
      </li>
      <li class="menu-item ${activeStudentTab === 'billing' ? 'active' : ''}" data-student-tab="billing">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>
          <span>Fee Billings</span>
        </a>
      </li>
    `;
  } else if (db.role === "faculty") {
    sidebarMenuHtml = `
      <li class="menu-item active" data-page="faculty">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253m0 0L12 10.5m0 6v4.5" /></svg>
          <span>Faculty Hub</span>
        </a>
      </li>
    `;
  } else if (db.role === "parent") {
    sidebarMenuHtml = `
      <li class="menu-item active" data-page="parent">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
          <span>Parent Portal</span>
        </a>
      </li>
    `;
  }

  // Determine avatar and name details
  let userNameDisp = info.name;
  let userAvatarLetters = info.avatar;
  let userSubBadge = "Student Account";
  
  if (db.role === "visitor") {
    userNameDisp = "Anonymous Guest";
    userAvatarLetters = "AG";
    userSubBadge = "Marketplace Visitor";
  } else if (db.role === "faculty") {
    userNameDisp = "Prof. Jane Smith";
    userAvatarLetters = "JS";
    userSubBadge = "Lead Instructor";
  } else if (db.role === "parent") {
    userNameDisp = "Ruthin (Guardian)";
    userAvatarLetters = "RG";
    userSubBadge = "Family Monitor";
  }

  // Shell HTML template structure
  document.body.innerHTML = `
    <div class="app-container">
      <!-- Collapsible Sidebar -->
      <aside class="sidebar" id="app-sidebar">
        <div class="sidebar-header">
          <div class="logo-icon">W</div>
          <div class="logo-text">WARIN LMS</div>
        </div>
        <ul class="sidebar-menu" id="sidebar-menu-list">
          ${sidebarMenuHtml}
        </ul>
        <div class="sidebar-footer">
          <div class="user-avatar">${userAvatarLetters}</div>
          <div class="user-info">
            <span class="user-name">${userNameDisp}</span>
            <span class="user-role-badge">${userSubBadge}</span>
          </div>
        </div>
      </aside>
      
      <!-- Main Content Area -->
      <div class="main-wrapper">
        <header class="header">
          <button class="mobile-menu-btn" onclick="window.toggleMobileSidebar()">&#9776;</button>
          
          <div class="search-bar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:18px;height:18px;color:var(--text-muted);"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" /></svg>
            <input type="text" placeholder="Search lessons, syllabus, grades..." oninput="window.handleSearchQuery(this.value)" />
          </div>
          
          <div class="header-actions">
            <!-- Notifications System -->
            <button class="notification-bell-btn" onclick="window.toggleNotificationDrawer()">
              ${Icons.bell}
              <span class="bell-badge" id="bell-unread-dot" style="display: ${info.notifications.some(n=>!n.read) ? 'block' : 'none'}"></span>
            </button>
            <div class="notification-drawer" id="notif-drawer">
              <!-- Rendered dynamically -->
            </div>
            
            <div class="user-avatar" style="width:36px; height:36px; font-size:12px;">${userAvatarLetters}</div>
          </div>
        </header>
        
        <!-- App Route View container -->
        <main class="page-container" id="main-container">
          <!-- Rendered dynamically based on state router -->
        </main>
      </div>
      
      <!-- Floating Role Switcher Widget -->
      <div class="role-switcher-widget">
        <div class="switcher-title">
          <span>Role Switcher Mode</span>
          <span class="btn-reset-db" onclick="window.resetDatabaseState()">Reset DB</span>
        </div>
        <div class="switcher-options">
          <button class="switcher-btn ${db.role === 'visitor' ? 'active' : ''}" data-role-btn="visitor" onclick="window.swapRole('visitor')">Marketplace Visitor</button>
          <button class="switcher-btn ${db.role === 'student' ? 'active' : ''}" data-role-btn="student" onclick="window.swapRole('student')">Student (Dileep)</button>
          <button class="switcher-btn ${db.role === 'faculty' ? 'active' : ''}" data-role-btn="faculty" onclick="window.swapRole('faculty')">Faculty (Instructor)</button>
          <button class="switcher-btn ${db.role === 'parent' ? 'active' : ''}" data-role-btn="parent" onclick="window.swapRole('parent')">Parent (Guardian)</button>
        </div>
      </div>
    </div>
    
    <!-- Modal Overlays -->
    <div class="modal-overlay" id="global-modal" onclick="if(event.target===this) window.closeModal()">
      <div class="modal-content" id="global-modal-body">
        <!-- Rendered dynamically -->
      </div>
    </div>
    
    <!-- Toast notices container -->
    <div class="toast-container" id="toast-container"></div>
  `;
  
  // Render main dashboard view
  updatePageView();
  renderNotificationsList();
}

function updatePageView() {
  const db = State.getDb();
  const container = document.getElementById("main-container");
  if (!container) return;

  if (db.role === "visitor") {
    container.innerHTML = Components.renderMarketplace();
  } else if (db.role === "student") {
    container.innerHTML = Components.renderStudentPortal(activeStudentTab);
    
    // Auto scroll chat box on tab load
    if (activeStudentTab === "chat") {
      setTimeout(() => {
        const scroller = document.getElementById("student-chat-scroller");
        if (scroller) scroller.scrollTop = scroller.scrollHeight;
      }, 50);
    }
    // Auto scroll live class box
    if (activeStudentTab === "live" && db.liveClass.status === "live") {
      setTimeout(() => {
        const scroller = document.getElementById("live-chat-scroller");
        if (scroller) scroller.scrollTop = scroller.scrollHeight;
      }, 50);
    }
  } else if (db.role === "faculty") {
    container.innerHTML = Components.renderFacultyPortal();
    if (window.facultyActiveTab === "live" && db.liveClass.status === "live") {
      setTimeout(() => {
        const scroller = document.getElementById("faculty-live-scroller");
        if (scroller) scroller.scrollTop = scroller.scrollHeight;
      }, 50);
    }
  } else if (db.role === "parent") {
    container.innerHTML = Components.renderParentPortal();
    if (window.parentActiveTab === "messages") {
      setTimeout(() => {
        const scroller = document.getElementById("parent-chat-scroller");
        if (scroller) scroller.scrollTop = scroller.scrollHeight;
      }, 50);
    }
  }
}

// ==================== SIDEBAR & MENU MECHANICS ====================
function setupMenuListeners() {
  const list = document.getElementById("sidebar-menu-list");
  if (!list) return;
  
  list.addEventListener("click", (e) => {
    const item = e.target.closest(".menu-item");
    if (!item) return;
    
    // Toggle active markers
    document.querySelectorAll(".sidebar-menu .menu-item").forEach(el => el.classList.remove("active"));
    item.classList.add("active");
    
    // Handle specific student tab routing
    const sTab = item.dataset.studentTab;
    if (sTab) {
      activeStudentTab = sTab;
      updatePageView();
    }
    
    // Close sidebar on mobile
    if (isSidebarOpen) {
      window.toggleMobileSidebar();
    }
  });
}

function setupRoleSwitcher() {
  window.swapRole = (role) => {
    State.setRole(role);
    renderAppShell();
    window.showToast(`Swapped view perspective to: ${role.toUpperCase()}`, "info");
  };

  window.resetDatabaseState = () => {
    if (confirm("Reset local storage simulator database back to factory defaults?")) {
      State.resetDb();
      renderAppShell();
      window.showToast("Database has been reset.", "danger");
    }
  };
}

// Mobile sidebar drawer toggler
window.toggleMobileSidebar = () => {
  const sidebar = document.getElementById("app-sidebar");
  if (!sidebar) return;
  isSidebarOpen = !isSidebarOpen;
  if (isSidebarOpen) {
    sidebar.classList.add("active");
  } else {
    sidebar.classList.remove("active");
  }
};

// ==================== SEARCH BAR MECHANICS ====================
window.handleSearchQuery = (query) => {
  const db = State.getDb();
  if (!query) {
    updatePageView();
    return;
  }
  
  const container = document.getElementById("main-container");
  if (db.role === "student" && activeStudentTab === "courses") {
    // Filter enrolled courses
    const filtered = db.studentInfo.enrolledCourses.filter(cid => {
      const c = db.courses.find(course => course.id === cid);
      return c.title.toLowerCase().includes(query.toLowerCase()) || c.instructor.toLowerCase().includes(query.toLowerCase());
    });
    
    // Temporarily override rendering with search results
    const resultsHtml = filtered.map(cid => {
      const course = db.courses.find(c => c.id === cid);
      const pct = Components.getCourseProgressPercent(cid);
      return `
        <div class="card" style="display:flex; flex-direction:column; gap:16px;">
          <h3>${course.title}</h3>
          <p style="font-size:13px; color:var(--text-secondary);">${course.instructor}</p>
          <button class="btn btn-primary" onclick="renderStudentCourseViewer('${cid}')">Open Dashboard</button>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="page-header">
        <h1>Search Results: "${query}"</h1>
      </div>
      <div class="course-grid">${resultsHtml || '<p style="color:var(--text-muted);">No matching courses found.</p>'}</div>
    `;
  } else if (db.role === "visitor") {
    // Filter marketplace
    const filtered = db.courses.filter(c => c.title.toLowerCase().includes(query.toLowerCase()) || c.shortDescription.toLowerCase().includes(query.toLowerCase()));
    const cardsHtml = filtered.map(course => `
      <div class="card course-card">
        <h3>${course.title}</h3>
        <p class="description">${course.shortDescription}</p>
        <button class="btn btn-primary btn-full" onclick="window.triggerCheckout('${course.id}')">Enroll</button>
      </div>
    `).join('');
    container.innerHTML = `
      <div class="page-header">
        <h1>Marketplace Results: "${query}"</h1>
      </div>
      <div class="course-grid">${cardsHtml || '<p style="color:var(--text-muted);">No courses match search query.</p>'}</div>
    `;
  }
};

// ==================== NOTIFICATIONS LOGIC ====================
function setupNotificationListeners() {
  window.toggleNotificationDrawer = () => {
    const drawer = document.getElementById("notif-drawer");
    if (!drawer) return;
    drawer.classList.toggle("active");
    
    // Mark notifications as read
    if (drawer.classList.contains("active")) {
      const db = State.getDb();
      db.studentInfo.notifications.forEach(n => n.read = true);
      State.saveDb();
      const dot = document.getElementById("bell-unread-dot");
      if (dot) dot.style.display = "none";
      renderNotificationsList();
    }
  };

  window.clearAllNotifications = () => {
    const db = State.getDb();
    db.studentInfo.notifications = [];
    State.saveDb();
    renderNotificationsList();
    window.showToast("Notifications cleared", "info");
  };
}

function renderNotificationsList() {
  const drawer = document.getElementById("notif-drawer");
  if (!drawer) return;
  
  const db = State.getDb();
  const list = db.studentInfo.notifications;
  
  const notifItems = list.map(n => `
    <div class="notification-item ${n.read ? '' : 'unread'}">
      <div class="notification-icon ${n.type}">
        ${n.type === 'warning' ? '🔔' : n.type === 'success' ? '✅' : 'ℹ️'}
      </div>
      <div class="notification-body">
        <span class="notification-text">${n.text}</span>
        <span class="notification-time">${n.time}</span>
      </div>
    </div>
  `).join('');

  drawer.innerHTML = `
    <div class="drawer-header">
      <h3>Alert Notifications</h3>
      <a href="#" class="clear-notifications-btn" onclick="window.clearAllNotifications()">Clear All</a>
    </div>
    <div class="notifications-list">
      ${notifItems || '<div style="padding:32px; text-align:center; font-size:12px; color:var(--text-muted);">No active notifications logs.</div>'}
    </div>
  `;
}

// ==================== GLOBAL MODAL WRAPPERS ====================
window.showModal = (htmlContent) => {
  const modal = document.getElementById("global-modal");
  const body = document.getElementById("global-modal-body");
  if (!modal || !body) return;
  body.innerHTML = htmlContent;
  modal.classList.add("active");
};

window.closeModal = () => {
  const modal = document.getElementById("global-modal");
  if (modal) modal.classList.remove("active");
};

// ==================== TOAST MESSAGES MECHANICS ====================
window.showToast = (message, type = "success") => {
  const container = document.getElementById("toast-container");
  if (!container) return;
  
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button style="margin-left: 8px; font-weight:700;" onclick="this.parentElement.remove()">&times;</button>
  `;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 4000);
};

// ==================== VISITOR MARKETPLACE ACTIONS ====================
window.showCourseDetails = (courseId) => {
  const html = Components.renderCourseDetailsHtml(courseId);
  window.showModal(html);
};

window.triggerCheckout = (courseId) => {
  const html = Components.renderCheckoutForm(courseId);
  window.showModal(html);
  
  // Attach keyup previews for the simulated credit card
  setTimeout(() => {
    const cardNum = document.getElementById("chk-card-num");
    const cardName = document.getElementById("chk-card-name");
    const cardExp = document.getElementById("chk-card-exp");
    
    if (cardNum) {
      cardNum.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, '');
        val = val.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = val;
        document.getElementById("card-preview-number").innerText = val || "•••• •••• •••• ••••";
      });
    }
    if (cardName) {
      cardName.addEventListener("input", (e) => {
        document.getElementById("card-preview-name").innerText = e.target.value.toUpperCase() || "CARDHOLDER NAME";
      });
    }
    if (cardExp) {
      cardExp.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 2) {
          val = val.substring(0, 2) + '/' + val.substring(2, 4);
        }
        e.target.value = val;
        document.getElementById("card-preview-exp").innerText = val || "MM/YY";
      });
    }
  }, 100);
};

window.processCheckoutPayment = (courseId) => {
  const num = document.getElementById("chk-card-num").value;
  const name = document.getElementById("chk-card-name").value;
  
  if (num.length < 15 || name.length < 3) {
    window.showToast("Invalid credit card fields. Use 16-digit simulation card numbers.", "danger");
    return;
  }

  const modalBody = document.getElementById("global-modal-body");
  modalBody.innerHTML = `
    <div style="padding:48px; text-align:center; display:flex; flex-direction:column; align-items:center; gap:20px;">
      <div style="border:4px solid var(--border-color); border-top-color:var(--primary); width:50px; height:50px; border-radius:50%; animation:spin 1s linear infinite;"></div>
      <h4 style="font-weight:700; color:white;">Processing Stripe Gateway Tokens...</h4>
      <p style="font-size:12px; color:var(--text-muted);">Authorizing transactions via secure sandbox mock...</p>
    </div>
  `;

  // Simulate payment processing latency
  setTimeout(() => {
    State.enrollCourse(courseId);
    
    modalBody.innerHTML = `
      <div class="success-payment-screen">
        <div class="success-ring">${Icons.check}</div>
        <h3 style="font-size: 20px; font-weight: 800; color: white;">Payment Authorized!</h3>
        <p style="font-size: 13px; color: var(--text-secondary); margin-top: 6px; max-width: 320px;">Receipt sent. Your account is enrolled into the cohort. Start checking syllabus modules.</p>
        <button class="btn btn-success" style="margin-top:24px;" onclick="window.closeModal(); document.querySelector('[data-role-btn=student]').click(); renderStudentTab('courses');">Enter Dashboard</button>
      </div>
    `;
    
    // Refresh parent layout to sync enrollment data
    renderAppShell();
    window.showToast("Enrollment Payment Successful!", "success");
  }, 1800);
};

window.triggerCheckoutInvoice = (invoiceId) => {
  const db = State.getDb();
  const inv = db.studentInfo.invoices.find(i => i.id === invoiceId);
  if (!inv) return;
  
  window.showModal(`
    <div class="modal-close-btn" onclick="window.closeModal()">&times;</div>
    <div class="checkout-header" style="padding:24px 32px; border-bottom:1px solid var(--border-color);">
      <h3 style="font-size: 18px; font-weight: 700;">Outstanding Invoice Settlement</h3>
      <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">Invoice: <strong>#${inv.id}</strong> Amount: <strong>$${inv.amount}</strong></p>
    </div>
    <div class="checkout-container">
      <div class="payment-form-section">
        <div class="payment-form-group">
          <label>Cardholder Name</label>
          <input type="text" id="chk-card-name" class="payment-input" value="${db.studentInfo.name}" />
        </div>
        <div class="payment-form-group">
          <label>Card Number</label>
          <input type="text" id="chk-card-num" class="payment-input" placeholder="4111 2222 3333 4444" maxlength="19" />
        </div>
        <div style="display: grid; grid-template-columns:1fr 1fr; gap:16px;">
          <div class="payment-form-group"><label>Expiry</label><input type="text" id="chk-card-exp" class="payment-input" placeholder="MM/YY" /></div>
          <div class="payment-form-group"><label>CVV</label><input type="password" id="chk-card-cvv" class="payment-input" placeholder="***" /></div>
        </div>
        <button class="btn btn-success btn-full" onclick="window.processInvoicePayment('${inv.id}')">Pay $${inv.amount}</button>
      </div>
      <div style="display:flex; align-items:center; justify-content:center;">
        <div class="credit-card-preview" style="width:100%;">
          <div class="card-chip"></div>
          <div class="card-number-display">•••• •••• •••• ••••</div>
          <div class="card-footer-info"><div><span style="font-size:9px; opacity:0.5;">CARDHOLDER</span><br/>${db.studentInfo.name}</div></div>
        </div>
      </div>
    </div>
  `);
};

window.processInvoicePayment = (invoiceId) => {
  const modalBody = document.getElementById("global-modal-body");
  modalBody.innerHTML = `
    <div style="padding:48px; text-align:center;">
      <div style="border:4px solid var(--border-color); border-top-color:var(--primary); width:40px; height:40px; border-radius:50%; animation:spin 1s linear infinite; margin:0 auto 16px;"></div>
      <h4 style="color:#fff;">Verifying Balance Settlement...</h4>
    </div>
  `;
  
  setTimeout(() => {
    State.payInvoice(invoiceId);
    window.closeModal();
    renderAppShell();
    window.showToast("Invoice Payment Cleared!", "success");
  }, 1200);
};

// ==================== STUDENT PORTAL INTERACTIVE ACTIONS ====================
window.renderStudentTab = (tab) => {
  activeStudentTab = tab;
  updatePageView();
};

window.toggleLessonComplete = (courseId, lessonId) => {
  State.toggleLessonCompletion(courseId, lessonId);
  updatePageView();
  
  // Check if course was completed to 100%
  const db = State.getDb();
  const pct = Components.getCourseProgressPercent(courseId);
  if (pct === 100) {
    window.showToast(`🏆 Congratulations! You have completed 100% of ${db.courses.find(c=>c.id===courseId).title}. Download your certificate now!`, "success");
  } else {
    window.showToast("Lesson progress updated.", "success");
  }
};

window.switchStudentLesson = (courseId, lessonId) => {
  window.activeLesson = {
    courseId,
    lessonId,
    tab: "video"
  };
  Components.renderStudentCourseViewer(courseId);
};

window.switchLessonTab = (tab) => {
  window.activeLesson.tab = tab;
  Components.renderStudentCourseViewer(window.activeLesson.courseId);
};

window.submitStudentAssignment = (courseId, assignmentId) => {
  const txt = document.getElementById("asg-submission-text").value;
  if (txt.length < 10) {
    window.showToast("Please provide detailed answer text files before submitting.", "danger");
    return;
  }
  
  State.submitAssignment(courseId, assignmentId, txt);
  window.showToast("Assignment Submission Uploaded!", "success");
  Components.renderStudentCourseViewer(courseId);
};

window.simulateFileUpload = () => {
  const mockSubmissions = [
    "// Simulated Submission Contents\nconst app = require('express')();\napp.get('/', (req, res) => res.send('Dashboard UI Online'));\napp.listen(3000);",
    "/* Custom CSS styling Grid layout rules */\n.dashboard-grid {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: 20px;\n}",
    "// Data Analysis Pipeline\nimport pandas as pd\ndf = pd.read_csv('titanic.csv')\nprint(df.groupby('Sex')['Survived'].mean())"
  ];
  
  const text = document.getElementById("asg-submission-text");
  if (text) {
    text.value = mockSubmissions[Math.floor(Math.random() * mockSubmissions.length)];
    window.showToast("File uploaded successfully. Code content loaded into submission window.", "success");
  }
};

// ==================== CERTIFICATE VAULT DOWNLOADS ====================
window.openCertificatePortal = (courseId) => {
  const html = Components.renderCertificateModal(courseId);
  window.showModal(html);
};

window.downloadCertificatePng = (courseId) => {
  const canvas = document.getElementById("certificate-canvas");
  if (!canvas) return;
  
  const link = document.createElement("a");
  link.download = `WARIN_Certificate_${courseId}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
  window.showToast("Certificate PNG file downloaded successfully!", "success");
};

// ==================== PEER COHORT GROUP CHATS ====================
window.switchChatChannel = (channel) => {
  window.activeChannel = channel;
  updatePageView();
};

window.sendCohortChatMessage = () => {
  const input = document.getElementById("cohort-chat-input");
  if (!input || !input.value.trim()) return;
  
  const db = State.getDb();
  State.sendChatMessage(window.activeChannel, db.studentInfo.name, input.value.trim(), "student");
  input.value = "";
  
  // Re-render
  updatePageView();
  window.showToast("Message broadcasted to cohort chat.", "info");
};

// ==================== STUDENT LIVE CLASS ROOM ACTIONS ====================
window.raiseStudentHand = () => {
  State.raiseHand();
  updatePageView();
  window.showToast("Hand raised! Alert pushed to instructor's dashboard.", "success");
};

window.sendLiveClassChat = () => {
  const input = document.getElementById("live-chat-input");
  if (!input || !input.value.trim()) return;
  
  const db = State.getDb();
  State.sendLiveClassMessage(db.studentInfo.name, input.value.trim());
  input.value = "";
  
  updatePageView();
};

// Interactive Whiteboard drawing simulation
window.drawOnWhiteboard = (e) => {
  const container = document.getElementById("wb-dots-container");
  if (!container) return;
  
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const dot = document.createElement("div");
  dot.style.position = "absolute";
  dot.style.left = `${x - 4}px`;
  dot.style.top = `${y - 4}px`;
  dot.style.width = "8px";
  dot.style.height = "8px";
  dot.style.background = "var(--primary)";
  dot.style.borderRadius = "50%";
  container.appendChild(dot);
  
  // Push drawing command update log to student live message stream
  const db = State.getDb();
  if (db.liveClass.status === "live") {
    db.liveClass.messages.push({
      sender: db.studentInfo.name,
      text: `✏️ Drew a marker point at coordinate (${Math.round(x)}, ${Math.round(y)})`,
      timestamp: new Date().toISOString()
    });
  }
};

window.clearWhiteboard = () => {
  const container = document.getElementById("wb-dots-container");
  if (container) container.innerHTML = "";
};

window.clearFacWhiteboard = () => {
  const container = document.getElementById("fac-wb-dots");
  if (container) container.innerHTML = "";
};

// ==================== FACULTY CONTROL DASHBOARD ACTIONS ====================
window.switchFacultyTab = (tab) => {
  window.facultyActiveTab = tab;
  updatePageView();
};

window.gradeStudentAssignment = (assignmentId) => {
  const grade = document.getElementById(`grade-val-${assignmentId}`).value;
  const feedback = document.getElementById(`grade-feed-${assignmentId}`).value;
  
  State.gradeAssignment(assignmentId, grade, feedback);
  window.showToast(`Grade updated to ${grade} for assignment. Student notification broadcasted.`, "success");
  updatePageView();
};

window.startFacultyLiveBroadcast = () => {
  const courseId = document.getElementById("live-setup-course").value;
  const title = document.getElementById("live-setup-title").value || "Weekly Sync Sync Meeting";
  
  State.startLiveClass(courseId, title);
  window.showToast("Classroom Stream Broadcaster Online!", "success");
  updatePageView();
};

window.stopFacultyLiveBroadcast = () => {
  if (confirm("Disconnect live video streaming connection?")) {
    State.stopLiveClass();
    window.showToast("Live classroom broadcast offline.", "danger");
    updatePageView();
  }
};

window.sendFacultyLiveMsg = () => {
  const input = document.getElementById("faculty-live-chat-input");
  if (!input || !input.value.trim()) return;
  
  State.sendLiveClassMessage("Prof. Jane Smith", input.value.trim());
  input.value = "";
  updatePageView();
};

window.simulateLiveChatVisitor = () => {
  const questions = [
    "Wait, can we use CSS Grid gap property for flex layouts too?",
    "Is the homework submission file limit capped at 10MB or 20MB?",
    "Could we review auto-layouts constraints resizing again please?",
    "Prof, does Titanic analysis require normalizing features?"
  ];
  const names = ["Alex Carter", "Emily Rose", "Mark Twain", "Dileep Ruthin"];
  
  const chosenQuestion = questions[Math.floor(Math.random() * questions.length)];
  const chosenName = names[Math.floor(Math.random() * names.length)];
  
  State.sendLiveClassMessage(chosenName, chosenQuestion);
  updatePageView();
  window.showToast(`Live Class Student Simulator: ${chosenName} asked a question.`, "info");
};

window.toggleAttendanceRecord = (date, status) => {
  State.logAttendance("webdev", date, "Dileep Ruthin", status);
  window.showToast(`Updated attendance log for ${date} to: ${status}`, "success");
  updatePageView();
};

window.sendFeeCollectionReminder = (invoiceId) => {
  State.triggerFeeReminder(invoiceId);
  window.showToast(`Reminder alert sent for invoice #${invoiceId}`, "success");
};

// ==================== PARENT INTERACTIVE ACTIONS ====================
window.switchParentTab = (tab) => {
  window.parentActiveTab = tab;
  updatePageView();
};

window.sendParentChatMessage = () => {
  const input = document.getElementById("parent-chat-input");
  if (!input || !input.value.trim()) return;
  
  State.sendParentMessage("Parent (Dileep's Mom)", input.value.trim(), "parent");
  input.value = "";
  updatePageView();
  
  // Auto scroll chat box
  setTimeout(() => {
    const scroller = document.getElementById("parent-chat-scroller");
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }, 50);

  // Trigger instructor auto-reply after 4 seconds
  setTimeout(() => {
    State.sendParentMessage("Prof. Jane Smith", "Received your note. I will coordinate assessment files extensions on the student gradebooks interface. Thanks!", "faculty");
    updatePageView();
    
    // Auto scroll chat box
    const scroller = document.getElementById("parent-chat-scroller");
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
    
    // If not in Parent DM view, push notification
    const db = State.getDb();
    if (db.role !== "parent" || window.parentActiveTab !== "messages") {
      db.studentInfo.notifications.unshift({
        id: "n_" + Date.now(),
        text: "New Direct Message received from Prof. Jane Smith to Parent Portal.",
        type: "info",
        read: false,
        time: "Just now"
      });
      const dot = document.getElementById("bell-unread-dot");
      if (dot) dot.style.display = "block";
    }
  }, 4000);
};

// ==================== AUTOMATED SIMULATION BACKGROUND LOOP ====================
function startAutomatedSimulator() {
  // Push a fee reminder after 15 seconds of site load if student has outstanding balance
  setTimeout(() => {
    const db = State.getDb();
    const unpaid = db.studentInfo.invoices.find(i => i.status === "Unpaid");
    if (unpaid) {
      db.studentInfo.notifications.unshift({
        id: "n_auto_rem",
        text: `⏳ Automated billing system notice: Invoice #${unpaid.id} of $${unpaid.amount} is due soon. Open Billing to clear balance.`,
        type: "warning",
        read: false,
        time: "Just now"
      });
      State.saveDb();
      
      const dot = document.getElementById("bell-unread-dot");
      if (dot) dot.style.display = "block";
      
      renderNotificationsList();
      window.showToast("New Billing Payment notice received.", "warning");
    }
  }, 18000);

  // Periodic live viewer counts adjustments if streaming
  setInterval(() => {
    const db = State.getDb();
    if (db.liveClass.status === "live") {
      db.liveClass.viewersCount += Math.random() > 0.5 ? 1 : -1;
      State.saveDb();
      // Update UI title metrics if student room is active
      const titleEl = document.querySelector(".page-title p");
      if (titleEl && activeStudentTab === "live" && db.role === "student") {
        titleEl.innerHTML = `Live with ${db.liveClass.presenter} &bull; ${db.liveClass.viewersCount} active students`;
      }
    }
  }, 7000);
}

/**
 * components.js
 * Dynamic HTML template templates for the LMS.
 * Handles rendering of all role interfaces: Visitor, Student, Faculty, and Parent.
 */

import * as State from './state.js';

// SVG Icons
const Icons = {
  book: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>`,
  academic: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.263 15.918a9 9 0 0015.474 0M12 3v13.5M3 7.75l9-4.5 9 4.5M21 12v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6" /></svg>`,
  chat: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9s.25 0 .25.25v6.5s0 .25-.25.25h-9s-.25 0-.25-.25V8.5s0-.25.25-.25zM12 17.25h.008v.008H12v-.008zM15 17.25h.008v.008H15v-.008zM9 17.25h.008v.008H9v-.008z" /><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>`,
  live: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" /></svg>`,
  badge: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>`,
  card: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>`,
  chart: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>`,
  bell: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>`,
  lock: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>`,
  upload: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zM14.25 15h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-2.25h.008v.008H16.5V15z" /></svg>`
};

// HELPER: Calculate progress percentage
export function getCourseProgressPercent(courseId) {
  const db = State.getDb();
  const course = db.courses.find(c => c.id === courseId);
  if (!course) return 0;
  
  const completedLessons = db.studentInfo.progress[courseId] || [];
  let totalLessons = 0;
  course.modules.forEach(m => totalLessons += m.lessons.length);
  
  if (totalLessons === 0) return 0;
  return Math.round((completedLessons.length / totalLessons) * 100);
}

// ==================== VISITOR / MARKETPLACE VIEW ====================
export function renderMarketplace() {
  const db = State.getDb();
  
  const courseCards = db.courses.map(course => {
    const isEnrolled = db.studentInfo.enrolledCourses.includes(course.id);
    const actionButton = isEnrolled
      ? `<button class="btn btn-secondary btn-full" onclick="document.querySelector('[data-role-btn=student]').click(); renderStudentTab('courses');">Go to Student Portal</button>`
      : `<button class="btn btn-primary btn-full" onclick="window.triggerCheckout('${course.id}')">Enroll Now</button>`;

    return `
      <div class="card course-card">
        <div class="course-cover" style="background: ${course.coverGradient}">
          <div class="course-cover-text">${course.title}</div>
        </div>
        <div class="course-category">${course.category}</div>
        <h3>${course.title}</h3>
        <p class="description">${course.shortDescription}</p>
        
        <div class="course-meta">
          <span class="course-rating">
            ${Icons.star} ${course.rating} (${course.reviewsCount})
          </span>
          <span class="course-price">$${course.price}</span>
        </div>
        
        <div class="course-card-actions">
          <button class="btn btn-secondary btn-full" onclick="window.showCourseDetails('${course.id}')">Syllabus & Details</button>
          ${actionButton}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="page-header">
      <div class="page-title">
        <h1>Digital Courses Marketplace</h1>
        <p>Explore elite training programs and cohort-based learning. Select a course to purchase and enroll.</p>
      </div>
    </div>
    
    <div class="course-grid">
      ${courseCards}
    </div>
  `;
}

// Render Course Details Modal Content
export function renderCourseDetailsHtml(courseId) {
  const db = State.getDb();
  const course = db.courses.find(c => c.id === courseId);
  if (!course) return "Course not found.";

  const isEnrolled = db.studentInfo.enrolledCourses.includes(course.id);

  const modulesHtml = course.modules.map((m, mIdx) => {
    const lessonsHtml = m.lessons.map(l => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.03); font-size: 13px;">
        <span style="display: flex; align-items: center; gap: 8px;">
          ${Icons.book}
          ${l.title}
        </span>
        <span style="color: var(--text-muted);">${l.duration}</span>
      </div>
    `).join('');

    return `
      <div style="margin-bottom: 20px; background: rgba(0,0,0,0.1); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 12px; color: var(--primary-light);">${m.title}</h4>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          ${lessonsHtml}
          ${m.assignment ? `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; margin-top: 8px; border-radius: var(--radius-sm); background: rgba(99,102,241,0.06); font-size: 13px; color: var(--warning);">
              <span>📝 Assignment: ${m.assignment.title}</span>
              <span>Due: ${m.assignment.dueDate}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="modal-close-btn" onclick="window.closeModal()">&times;</div>
    <div style="padding: 32px;">
      <div class="course-category" style="margin-bottom: 10px;">${course.category}</div>
      <h2 style="font-size: 26px; font-weight: 800; margin-bottom: 14px; line-height: 1.2;">${course.title}</h2>
      <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 14px;">Instructor: <strong>${course.instructor}</strong> | Duration: <strong>${course.duration}</strong></p>
      
      <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 10px; border-bottom: 1px solid var(--border-color); padding-bottom: 6px;">Course Overview</h3>
      <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6; margin-bottom: 24px;">${course.longDescription}</p>
      
      <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 16px; border-bottom: 1px solid var(--border-color); padding-bottom: 6px;">Syllabus Roadmap</h3>
      ${modulesHtml}
      
      <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px;">
        <button class="btn btn-secondary" onclick="window.closeModal()">Close</button>
        ${isEnrolled 
          ? `<button class="btn btn-success" onclick="window.closeModal(); document.querySelector('[data-role-btn=student]').click(); renderStudentTab('courses');">Learn Now</button>`
          : `<button class="btn btn-primary" onclick="window.closeModal(); window.triggerCheckout('${course.id}')">Buy & Enroll ($${course.price})</button>`
        }
      </div>
    </div>
  `;
}

// Render Checkout Modal Form
export function renderCheckoutForm(courseId) {
  const db = State.getDb();
  const course = db.courses.find(c => c.id === courseId);
  const user = db.studentInfo;
  
  if (!course) return "Error.";

  return `
    <div class="modal-close-btn" onclick="window.closeModal()">&times;</div>
    <div class="checkout-header" style="padding: 24px 32px; border-bottom: 1px solid var(--border-color);">
      <h3 style="font-size: 18px; font-weight: 700;">Secure Checkout Portal</h3>
      <p style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Enrolling in: <strong>${course.title}</strong></p>
    </div>
    
    <div class="checkout-container">
      <div class="payment-form-section">
        <div class="payment-form-group">
          <label>Email Address</label>
          <input type="email" class="payment-input" value="${user.email}" readonly />
        </div>
        <div class="payment-form-group">
          <label>Cardholder Name</label>
          <input type="text" id="chk-card-name" class="payment-input" value="${user.name}" placeholder="John Doe" />
        </div>
        <div class="payment-form-group">
          <label>Card Number</label>
          <input type="text" id="chk-card-num" class="payment-input" placeholder="4111 2222 3333 4444" maxlength="19" />
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="payment-form-group">
            <label>Expiry Date</label>
            <input type="text" id="chk-card-exp" class="payment-input" placeholder="MM/YY" maxlength="5" />
          </div>
          <div class="payment-form-group">
            <label>CVV</label>
            <input type="password" id="chk-card-cvv" class="payment-input" placeholder="***" maxlength="3" />
          </div>
        </div>
        
        <button class="btn btn-success btn-full" style="margin-top: 10px;" onclick="window.processCheckoutPayment('${course.id}')">Pay $${course.price}</button>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 20px; justify-content: center;">
        <div class="credit-card-preview">
          <div class="card-emblem"></div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div class="card-chip"></div>
            <div style="font-size: 18px; font-weight: 800; font-style: italic; color: #fff; opacity: 0.7;">WARIN Pay</div>
          </div>
          <div class="card-number-display" id="card-preview-number">•••• •••• •••• ••••</div>
          <div class="card-footer-info">
            <div style="display: flex; flex-direction: column; gap: 2px;">
              <span style="font-size: 9px; opacity: 0.5;">CARDHOLDER</span>
              <span class="card-holder-display" id="card-preview-name">${user.name}</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 2px; align-items: flex-end;">
              <span style="font-size: 9px; opacity: 0.5;">EXPIRES</span>
              <span class="card-expiry-display" id="card-preview-exp">MM/YY</span>
            </div>
          </div>
        </div>
        <div style="font-size: 12px; color: var(--text-secondary); text-align: center;">
          🔒 Encrypted SSL connection. Payments processed via mock sandbox.
        </div>
      </div>
    </div>
  `;
}

// ==================== STUDENT PORTAL VIEWS ====================
export function renderStudentPortal(activeTab = "dashboard") {
  const db = State.getDb();
  const info = db.studentInfo;
  
  // Calculate average progress
  let totalProgressPct = 0;
  if (info.enrolledCourses.length > 0) {
    let sum = 0;
    info.enrolledCourses.forEach(cid => sum += getCourseProgressPercent(cid));
    totalProgressPct = Math.round(sum / info.enrolledCourses.length);
  }

  let mainContent = "";

  switch (activeTab) {
    case "dashboard":
      mainContent = renderStudentDashboard(info, totalProgressPct);
      break;
    case "courses":
      mainContent = renderStudentCourses(info);
      break;
    case "live":
      mainContent = renderStudentLiveClass();
      break;
    case "chat":
      mainContent = renderStudentChat();
      break;
    case "certificates":
      mainContent = renderStudentCertificates(info);
      break;
    case "billing":
      mainContent = renderStudentBilling(info);
      break;
    default:
      mainContent = "Tab view not implemented.";
  }

  return mainContent;
}

function renderStudentDashboard(info, avgProgress) {
  const db = State.getDb();

  // Enrolled courses cards
  const coursesCards = info.enrolledCourses.map(cid => {
    const course = db.courses.find(c => c.id === cid);
    if (!course) return '';
    const pct = getCourseProgressPercent(cid);
    const completedCount = info.progress[cid] ? info.progress[cid].length : 0;
    let totalLessons = 0;
    course.modules.forEach(m => totalLessons += m.lessons.length);

    let progressColorClass = 'low';
    if (pct > 30) progressColorClass = 'medium';
    if (pct > 80) progressColorClass = 'high';

    return `
      <div class="card" style="padding: 20px; display: flex; flex-direction: column; gap: 12px; cursor: pointer;" onclick="renderStudentCourseViewer('${cid}')">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="font-size: 15px; font-weight: 700; margin: 0;">${course.title}</h4>
          <span style="font-size: 11px; padding: 2px 8px; border-radius: 50px; background: rgba(99,102,241,0.1); color: var(--primary-light);">${course.duration}</span>
        </div>
        <p style="font-size: 12px; color: var(--text-secondary);">${course.instructor}</p>
        
        <div style="margin-top: 10px;">
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
            <span>Completed: ${completedCount}/${totalLessons} lessons</span>
            <span style="font-weight: 700;">${pct}%</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill ${progressColorClass}" style="width: ${pct}%;"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Unpaid invoices warning
  const unpaidCount = info.invoices.filter(i => i.status === "Unpaid").length;
  const unpaidAlert = unpaidCount > 0
    ? `
      <div class="card col-12" style="background: rgba(251, 146, 60, 0.08); border-color: rgba(251, 146, 60, 0.3); display: flex; align-items: center; justify-content: space-between; gap: 20px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(251, 146, 60, 0.15); display: flex; align-items: center; justify-content: center; color: var(--warning); font-size: 20px;">⚠️</div>
          <div>
            <h4 style="font-size: 14px; font-weight: 700; color: white;">Tuition Payment Outstanding</h4>
            <p style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">You have ${unpaidCount} unpaid tuition invoice(s). Please clear payments to prevent enrollment locks.</p>
          </div>
        </div>
        <button class="btn btn-secondary" onclick="renderStudentTab('billing')">Pay Invoices</button>
      </div>
    ` : '';

  // Live class indicator
  const liveClassBanner = db.liveClass.status === "live"
    ? `
      <div class="card col-12" style="background: rgba(244, 63, 94, 0.08); border-color: rgba(244, 63, 94, 0.3); display: flex; align-items: center; justify-content: space-between; gap: 20px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <div class="pulsing-dot"></div>
          <div>
            <h4 style="font-size: 15px; font-weight: 700; color: white; display: flex; align-items: center; gap: 8px;">
              🔴 Live Session Broadcast
              <span style="font-size: 10px; background: var(--danger); color: white; padding: 1px 6px; border-radius: 4px;">LIVE NOW</span>
            </h4>
            <p style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">Join Prof. Jane Smith for "${db.liveClass.title}" now.</p>
          </div>
        </div>
        <button class="btn btn-danger" onclick="renderStudentTab('live')">Join Live Classroom</button>
      </div>
    ` : '';

  // Graded list
  const recentGrades = Object.keys(info.grades).map(asgId => {
    const gradeObj = info.grades[asgId];
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border-color);">
        <div>
          <h5 style="font-size: 13px; font-weight: 600; color: #fff;">${asgId.toUpperCase()} Assessment</h5>
          <p style="font-size: 11px; color: var(--text-muted);">Submitted: ${new Date(gradeObj.submittedAt).toLocaleDateString()}</p>
        </div>
        <span style="font-size: 14px; font-weight: 800; color: ${gradeObj.grade.includes('A') ? 'var(--success)' : 'var(--warning)'};">${gradeObj.grade}</span>
      </div>
    `;
  }).join('') || `<p style="font-size: 12px; color: var(--text-muted);">No assessment records yet.</p>`;

  return `
    <div class="page-header">
      <div class="page-title">
        <h1>Student Dashboard</h1>
        <p>Welcome back, ${info.name}! Track your study progress and complete milestones.</p>
      </div>
    </div>
    
    <div class="dashboard-grid">
      ${liveClassBanner}
      ${unpaidAlert}
      
      <!-- Stats widgets -->
      <div class="card col-4 stat-card">
        <div class="stat-info">
          <span class="stat-label">Enrolled Courses</span>
          <span class="stat-value">${info.enrolledCourses.length}</span>
        </div>
        <div class="stat-icon primary">${Icons.book}</div>
      </div>
      
      <div class="card col-4 stat-card">
        <div class="stat-info">
          <span class="stat-label">Average Progress</span>
          <span class="stat-value">${avgProgress}%</span>
        </div>
        <div class="stat-icon success">${Icons.chart}</div>
      </div>
      
      <div class="card col-4 stat-card">
        <div class="stat-info">
          <span class="stat-label">Unlocked Certificates</span>
          <span class="stat-value">${info.enrolledCourses.filter(cid => getCourseProgressPercent(cid) === 100).length}</span>
        </div>
        <div class="stat-icon warning">${Icons.badge}</div>
      </div>

      <!-- Course catalog list -->
      <div class="card col-8">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 20px;">My Enrolled Courses</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          ${coursesCards || `<p style="grid-column: span 2; font-size: 13px; color: var(--text-secondary);">You are not enrolled in any courses yet. Please explore the <a href="#" onclick="renderVisitorMarketplace()" style="color: var(--primary-light); text-decoration: underline;">Marketplace</a>.</p>`}
        </div>
      </div>
      
      <!-- Sidebar feed -->
      <div class="card col-4">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 20px;">Recent Grades</h3>
        <div style="display: flex; flex-direction: column;">
          ${recentGrades}
        </div>
      </div>
    </div>
  `;
}

function renderStudentCourses(info) {
  const db = State.getDb();
  
  const cards = info.enrolledCourses.map(cid => {
    const course = db.courses.find(c => c.id === cid);
    if (!course) return '';
    const pct = getCourseProgressPercent(cid);
    
    return `
      <div class="card" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="course-cover" style="background: ${course.coverGradient}; height: 120px; font-size: 16px;">
          <div class="course-cover-text">${course.title}</div>
        </div>
        <h3>${course.title}</h3>
        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; flex-grow: 1;">Instructor: ${course.instructor}. Syllabus covers modules on theoretical basics and cohort code submissions.</p>
        
        <div style="margin-top: auto;">
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
            <span>Overall progress</span>
            <span><strong>${pct}%</strong></span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill ${pct > 80 ? 'high' : pct > 30 ? 'medium' : 'low'}" style="width: ${pct}%;"></div>
          </div>
        </div>
        
        <button class="btn btn-primary" onclick="renderStudentCourseViewer('${cid}')">Open Learning Dashboard</button>
      </div>
    `;
  }).join('');

  return `
    <div class="page-header">
      <div class="page-title">
        <h1>My Enrolled Courses</h1>
        <p>Select an ongoing course to access lessons, submit assignments, and take quizzes.</p>
      </div>
    </div>
    
    <div class="course-grid">
      ${cards || `<div class="card col-12" style="text-align: center; padding: 48px;"><p style="font-size: 14px; color: var(--text-secondary);">No enrolled courses found. Visit the marketplace to enroll!</p><button class="btn btn-primary" style="margin-top: 16px;" onclick="renderVisitorMarketplace()">Browse Courses</button></div>`}
    </div>
  `;
}

// Dynamic course viewer with lesson lists
export function renderStudentCourseViewer(courseId) {
  const db = State.getDb();
  const info = db.studentInfo;
  const course = db.courses.find(c => c.id === courseId);
  
  if (!course) {
    document.getElementById("main-container").innerHTML = "Course not found.";
    return;
  }

  // Set first lesson active if not set in temporary session memory
  if (!window.activeLesson || !window.activeLesson.courseId || window.activeLesson.courseId !== courseId) {
    window.activeLesson = {
      courseId: courseId,
      lessonId: course.modules[0].lessons[0].id,
      tab: "video" // 'video', 'reading', 'assignment'
    };
  }

  const activeLessonObj = course.modules
    .flatMap(m => m.lessons)
    .find(l => l.id === window.activeLesson.lessonId) || course.modules[0].lessons[0];

  const activeModuleObj = course.modules.find(m => m.lessons.some(l => l.id === activeLessonObj.id));

  // Render Sidebar Syllabus list
  const syllabusHtml = course.modules.map(m => {
    const lessonsHtml = m.lessons.map(l => {
      const isCompleted = (info.progress[courseId] || []).includes(l.id);
      const isActive = window.activeLesson.lessonId === l.id;
      
      return `
        <li class="syllabus-lesson-item ${isActive ? 'active' : ''}" onclick="window.switchStudentLesson('${courseId}', '${l.id}')">
          <span style="display: flex; align-items: center;">
            <div class="lesson-checkbox ${isCompleted ? 'checked' : ''}" onclick="event.stopPropagation(); window.toggleLessonComplete('${courseId}', '${l.id}')">
              ${isCompleted ? Icons.check : ''}
            </div>
            ${l.title}
          </span>
          <span style="font-size: 11px; opacity: 0.6; margin-left: 6px;">${l.duration}</span>
        </li>
      `;
    }).join('');

    return `
      <div class="syllabus-module">
        <h4>${m.title}</h4>
        <ul class="syllabus-lessons">
          ${lessonsHtml}
        </ul>
      </div>
    `;
  }).join('');

  // Tabs for the viewer panel
  const tabsHtml = `
    <div class="lesson-tabs">
      <div class="lesson-tab-btn ${window.activeLesson.tab === 'video' ? 'active' : ''}" onclick="window.switchLessonTab('video')">Video Stream</div>
      <div class="lesson-tab-btn ${window.activeLesson.tab === 'reading' ? 'active' : ''}" onclick="window.switchLessonTab('reading')">Course Materials</div>
      ${activeModuleObj.assignment ? `<div class="lesson-tab-btn ${window.activeLesson.tab === 'assignment' ? 'active' : ''}" onclick="window.switchLessonTab('assignment')">Module Assignment</div>` : ''}
    </div>
  `;

  // Render Viewer main content body based on tab
  let tabBodyHtml = "";
  if (window.activeLesson.tab === "video") {
    tabBodyHtml = `
      <div class="video-container">
        <video controls width="100%" poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800">
          <source src="${activeLessonObj.videoUrl}" type="video/mp4" />
          Your browser does not support HTML video playbacks.
        </video>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;">
        <h4 style="font-size: 16px; font-weight: 700;">${activeLessonObj.title}</h4>
        <button class="btn btn-success" id="btn-mark-complete" onclick="window.toggleLessonComplete('${courseId}', '${activeLessonObj.id}')">
          ${(info.progress[courseId] || []).includes(activeLessonObj.id) ? 'Completed (Undo)' : 'Mark as Completed'}
        </button>
      </div>
    `;
  } else if (window.activeLesson.tab === "reading") {
    tabBodyHtml = `
      <div class="lesson-details-content card" style="background: rgba(255,255,255,0.02); padding: 24px;">
        <h3 style="font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 12px;">Lecture Materials & Summary</h3>
        <p style="white-space: pre-wrap; font-size: 14px; color: var(--text-secondary); line-height: 1.7;">${activeLessonObj.content}</p>
        
        <h4 style="font-size: 14px; font-weight: 700; margin-top: 24px; color: var(--primary-light);">Supplementary Resources:</h4>
        <ul style="padding-left: 20px; margin-top: 8px; font-size: 13px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
          <li>🌐 W3Schools Semantics Reference Sheet</li>
          <li>📖 Eloquent JavaScript Chapter 5 (State Mechanics)</li>
          <li>📂 CSS Flexbox Interactive Visual Cheat Sheet</li>
        </ul>
      </div>
    `;
  } else if (window.activeLesson.tab === "assignment") {
    const asg = activeModuleObj.assignment;
    const submission = info.grades[asg.id];
    
    let submissionBoxHtml = "";
    if (submission) {
      submissionBoxHtml = `
        <div class="card" style="background: rgba(16, 185, 129, 0.05); border-color: rgba(16, 185, 129, 0.2); padding: 20px; display: flex; flex-direction: column; gap: 12px; margin-top: 16px;">
          <div style="display: flex; justify-content: space-between;">
            <h4 style="font-size: 14px; font-weight: 700; color: white;">Submission Received</h4>
            <span style="font-size: 12px; font-weight: 700; padding: 2px 10px; border-radius: 50px; background: rgba(255,255,255,0.1); color: ${submission.grade.includes('Review') ? 'var(--warning)' : 'var(--success)'};">${submission.grade}</span>
          </div>
          <p style="font-size: 13px; font-family: monospace; color: var(--text-secondary); background: rgba(0,0,0,0.2); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">${submission.fileContent}</p>
          ${submission.feedback ? `
            <div style="margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 12px;">
              <h5 style="font-size: 12px; font-weight: 700; color: var(--primary-light);">Faculty Review Feedback:</h5>
              <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px; font-style: italic;">"${submission.feedback}"</p>
            </div>
          ` : ''}
        </div>
      `;
    } else {
      submissionBoxHtml = `
        <div class="assignment-submission-form" style="margin-top: 20px;">
          <h4 style="font-size: 14px; font-weight: 700;">Submit Your Solutions</h4>
          <textarea id="asg-submission-text" placeholder="Paste your HTML/CSS code or share repository links here..."></textarea>
          
          <div class="upload-dropzone" style="margin-top: 12px;" onclick="window.simulateFileUpload()">
            ${Icons.upload}
            <span style="font-size: 13px; font-weight: 500;">Drag and drop zip codes files here, or <strong style="color: var(--primary-light);">browse files</strong></span>
            <span style="font-size: 11px; color: var(--text-muted);">ZIP, RAR, HTML, or PDF files accepted (max 20MB)</span>
            <input type="file" id="asg-file-input" style="display:none;" />
          </div>
          
          <button class="btn btn-primary" style="margin-top: 16px;" onclick="window.submitStudentAssignment('${courseId}', '${asg.id}')">Submit for Evaluation</button>
        </div>
      `;
    }

    tabBodyHtml = `
      <div class="assignment-card card" style="background: rgba(255,255,255,0.02); padding: 24px; border-left-color: var(--warning);">
        <h3 style="font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 4px;">${asg.title}</h3>
        <p style="font-size: 11px; color: var(--danger); font-weight: 600; margin-bottom: 16px;">DEADLINE: ${asg.dueDate}</p>
        
        <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">${asg.description}</p>
        
        ${submissionBoxHtml}
      </div>
    `;
  }

  const container = document.getElementById("main-container");
  container.innerHTML = `
    <div style="margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
      <a href="#" onclick="renderStudentTab('courses')" style="font-size: 13px; color: var(--text-secondary);">&larr; Back to My Courses</a>
    </div>
    
    <div class="page-header" style="margin-bottom: 24px;">
      <div class="page-title">
        <h1>Course Room: ${course.title}</h1>
        <p>Curriculum delivery, tracking progress, and peer assessment sheets.</p>
      </div>
    </div>
    
    <div class="viewer-container">
      <div class="card viewer-syllabus-card">
        <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 16px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">Syllabus Checklist</h3>
        ${syllabusHtml}
      </div>
      
      <div class="viewer-player-card">
        ${tabsHtml}
        <div id="lesson-tab-body">
          ${tabBodyHtml}
        </div>
      </div>
    </div>
  `;
}

function renderStudentLiveClass() {
  const db = State.getDb();
  const live = db.liveClass;
  
  if (live.status !== "live") {
    return `
      <div class="page-header">
        <div class="page-title">
          <h1>Live Lecture Auditorium</h1>
          <p>Attend real-time cohort discussions, raise hands, and sync up on syllabus milestones.</p>
        </div>
      </div>
      
      <div class="card" style="text-align: center; padding: 64px 32px; display: flex; flex-direction: column; align-items: center; gap: 16px;">
        <div style="font-size: 48px;">📴</div>
        <h2 style="font-size: 20px; font-weight: 800; color: #fff;">No Active Lecture</h2>
        <p style="font-size: 14px; color: var(--text-secondary); max-width: 500px; line-height: 1.5;">Faculty handles online class triggers. A notification bar will prompt you when a class sync begins. In the meantime, browse pre-recorded coursework video files.</p>
        <button class="btn btn-secondary" onclick="renderStudentTab('dashboard')">Back to Dashboard</button>
      </div>
    `;
  }

  const course = db.courses.find(c => c.id === live.activeCourseId);

  // Chat messages
  const messagesHtml = live.messages.map(m => `
    <div style="font-size: 12px; margin-bottom: 8px; line-height: 1.4;">
      <strong style="color: ${m.sender === db.studentInfo.name ? 'var(--primary-light)' : 'var(--text-primary)'};">${m.sender}:</strong>
      <span style="color: var(--text-secondary);">${m.text}</span>
    </div>
  `).join('');

  return `
    <div class="page-header">
      <div class="page-title">
        <h1>Live Classroom: ${course ? course.title : ''}</h1>
        <p>Live with ${live.presenter} &bull; ${live.viewersCount} active students</p>
      </div>
    </div>
    
    <div class="classroom-grid">
      <div class="classroom-feed">
        <div class="video-container" style="padding-bottom: 50%;">
          <div class="live-stream-placeholder">
            <div class="pulsing-dot" style="margin-bottom: 12px;"></div>
            <span style="font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Live Streaming Feed</span>
            <span style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Presenter: ${live.presenter} - Topic: "${live.title}"</span>
          </div>
        </div>
        
        <div class="card" style="padding: 16px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; margin-bottom: 10px; color: var(--text-muted);">Interactive Whiteboard Simulation</h4>
          <div class="whiteboard-canvas" onclick="window.drawOnWhiteboard(event)">
            <span style="font-size: 12px; opacity: 0.5;">Click anywhere on this canvas whiteboard to mock draw ideas</span>
            <div id="wb-dots-container" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;"></div>
          </div>
          <div class="whiteboard-toolbar">
            <button class="btn btn-secondary" style="padding: 4px 8px; font-size:11px;" onclick="window.clearWhiteboard()">Clear Canvas</button>
          </div>
        </div>
      </div>
      
      <div class="classroom-chat">
        <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
          <h4 style="font-size: 14px; font-weight: 700; margin: 0;">Live Cohort Chat Feed</h4>
          <button class="btn btn-danger" style="padding: 6px 12px; font-size: 12px;" onclick="window.raiseStudentHand()">🙋 Raise Hand (${live.handRaises})</button>
        </div>
        <div id="live-chat-scroller" style="flex-grow: 1; padding: 20px; overflow-y: auto; background: rgba(0,0,0,0.15);">
          ${messagesHtml}
        </div>
        <div class="chat-input-bar" style="padding: 12px 16px;">
          <input type="text" id="live-chat-input" placeholder="Ask questions or say hello to peers..." onkeydown="if(event.key==='Enter') window.sendLiveClassChat()" />
          <button class="btn btn-primary" style="padding: 8px 14px;" onclick="window.sendLiveClassChat()">Send</button>
        </div>
      </div>
    </div>
  `;
}

function renderStudentChat() {
  const db = State.getDb();
  
  // Channels list
  const channels = ["#general", "#web-dev-cohort", "#announcements"];
  if (!window.activeChannel) window.activeChannel = "#general";

  const channelsHtml = channels.map(c => `
    <li class="chat-channel-item ${window.activeChannel === c ? 'active' : ''}" onclick="window.switchChatChannel('${c}')">
      ${c}
    </li>
  `).join('');

  // Messages list filtered by channel
  const filteredMsgs = db.chats.filter(m => m.channel === window.activeChannel);
  const messagesHtml = filteredMsgs.map(m => {
    const isOwn = m.sender === db.studentInfo.name;
    const avatar = m.sender.split(' ').map(n=>n[0]).join('').substring(0,2);
    
    return `
      <div class="chat-bubble ${isOwn ? 'own' : ''}">
        <div class="chat-bubble-avatar">${avatar}</div>
        <div class="chat-bubble-content">
          <div class="chat-bubble-meta">
            <span class="chat-bubble-sender">${m.sender}</span>
            <span class="chat-bubble-badge ${m.role}">${m.role}</span>
            <span class="chat-bubble-time">${new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
          <p class="chat-bubble-text">${m.text}</p>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="page-header">
      <div class="page-title">
        <h1>Cohort Group Chats & Channels</h1>
        <p>Real-time chat rooms for discussions with class peers and course faculty.</p>
      </div>
    </div>
    
    <div class="chat-container">
      <div class="chat-sidebar">
        <div class="chat-sidebar-header">Peer Discussion Channels</div>
        <ul class="chat-channels-list">
          ${channelsHtml}
        </ul>
      </div>
      
      <div class="chat-messages-area">
        <div class="chat-messages-header">
          <h3>Channel: ${window.activeChannel}</h3>
          <span style="font-size: 12px; color: var(--text-muted);">${filteredMsgs.length} active logs</span>
        </div>
        <div class="chat-scroller" id="student-chat-scroller">
          ${messagesHtml}
        </div>
        <div class="chat-input-bar">
          <input type="text" id="cohort-chat-input" placeholder="Type a message in ${window.activeChannel}..." onkeydown="if(event.key==='Enter') window.sendCohortChatMessage()" />
          <button class="btn btn-primary" onclick="window.sendCohortChatMessage()">Send Message</button>
        </div>
      </div>
    </div>
  `;
}

function renderStudentCertificates(info) {
  const db = State.getDb();
  
  const cards = info.enrolledCourses.map(cid => {
    const course = db.courses.find(c => c.id === cid);
    if (!course) return '';
    const pct = getCourseProgressPercent(cid);
    const isCompleted = pct === 100;

    return `
      <div class="card" style="display: flex; flex-direction: column; gap: 16px; text-align: center; align-items: center; justify-content: center; padding: 32px 24px;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: ${isCompleted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.03)'}; border: 1px solid ${isCompleted ? 'var(--success)' : 'var(--border-color)'}; display: flex; align-items: center; justify-content: center; color: ${isCompleted ? 'var(--success)' : 'var(--text-muted)'};">
          ${isCompleted ? Icons.badge : Icons.lock}
        </div>
        
        <h3 style="font-size: 17px; font-weight: 700;">${course.title}</h3>
        <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.5;">${isCompleted ? 'Congratulations! You have completed all lessons and are eligible to download your official certificate.' : `Complete all coursework lessons to claim certification. Current progress: ${pct}%`}</p>
        
        ${isCompleted
          ? `<button class="btn btn-success" onclick="window.openCertificatePortal('${course.id}')">View & Print Certificate</button>`
          : `<button class="btn btn-secondary" style="opacity: 0.6; cursor: not-allowed;" disabled>Locked (Progress Needed)</button>`
        }
      </div>
    `;
  }).join('');

  return `
    <div class="page-header">
      <div class="page-title">
        <h1>My Certificates</h1>
        <p>Claim and download official credentials drawn automatically upon course syllabus completion.</p>
      </div>
    </div>
    
    <div class="course-grid">
      ${cards || `<div class="card col-12" style="text-align: center; padding: 48px;"><p style="font-size: 14px; color: var(--text-secondary);">No enrolled courses to issue certificates for. Enrolling in courses is required.</p></div>`}
    </div>
  `;
}

// Certificate generator canvas
export function renderCertificateModal(courseId) {
  const db = State.getDb();
  const course = db.courses.find(c => c.id === courseId);
  const student = db.studentInfo;
  
  if (!course) return "Error rendering certificate.";

  // Set timeout to draw canvas in modal DOM thread
  setTimeout(() => {
    const canvas = document.getElementById("certificate-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    // Design certificate elements
    // Clear canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 800, 560);
    
    // Draw intricate blue-gold border
    ctx.strokeStyle = "#1e1b4b";
    ctx.lineWidth = 14;
    ctx.strokeRect(20, 20, 760, 520);

    ctx.strokeStyle = "#d97706"; // Gold
    ctx.lineWidth = 3;
    ctx.strokeRect(32, 32, 736, 496);

    // Draw Corner Flourish Ornaments
    ctx.fillStyle = "#d97706";
    ctx.fillRect(32, 32, 20, 20);
    ctx.fillRect(748, 32, 20, 20);
    ctx.fillRect(32, 508, 20, 20);
    ctx.fillRect(748, 508, 20, 20);

    // Title text
    ctx.fillStyle = "#0f172a";
    ctx.font = "800 24px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("WARIN EDUCATIONAL INSTITUTE", 400, 90);

    ctx.font = "italic 16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#64748b";
    ctx.fillText("Accredited Cohort & Professional Learning Program", 400, 115);

    // Gold emblem
    ctx.fillStyle = "#eab308";
    ctx.beginPath();
    ctx.arc(400, 175, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("W", 400, 182);

    ctx.fillStyle = "#d97706";
    ctx.font = "700 12px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("COHORT SYNCED", 400, 222);

    // Certifies that...
    ctx.fillStyle = "#475569";
    ctx.font = "500 15px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("This credentials certificate is proudly awarded to", 400, 265);

    // Student Name
    ctx.fillStyle = "#4f46e5";
    ctx.font = "800 32px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(student.name.toUpperCase(), 400, 315);

    ctx.fillStyle = "#475569";
    ctx.font = "500 15px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("for successfully completing and passing all assessment criteria for", 400, 355);

    // Course Title
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 22px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(course.title, 400, 395);

    // Dates & signatures
    ctx.fillStyle = "#64748b";
    ctx.font = "500 12px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("DATE OF COMPLETION", 200, 480);
    ctx.fillStyle = "#0f172a";
    ctx.font = "600 13px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), 200, 498);

    ctx.fillStyle = "#64748b";
    ctx.font = "500 12px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("AUTHORIZED INSTRUCTOR", 600, 480);
    ctx.fillStyle = "#4f46e5";
    ctx.font = "italic 16px monospace";
    ctx.fillText("Jane Smith", 600, 495); // Signature mockup
    ctx.fillStyle = "#0f172a";
    ctx.font = "600 13px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Prof. Jane Smith", 600, 510);
    
    // Lines above labels
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(100, 465);
    ctx.lineTo(300, 465);
    ctx.moveTo(500, 465);
    ctx.lineTo(700, 465);
    ctx.stroke();

  }, 100);

  return `
    <div class="modal-close-btn" onclick="window.closeModal()">&times;</div>
    <div style="padding: 24px; text-align: center;">
      <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 20px;">Official Certification Document</h3>
      
      <div class="certificate-preview-box">
        <div class="certificate-canvas-wrapper">
          <canvas id="certificate-canvas" width="800" height="560"></canvas>
        </div>
        
        <div style="display: flex; gap: 12px; margin-top: 8px;">
          <button class="btn btn-secondary" onclick="window.closeModal()">Close Window</button>
          <button class="btn btn-success" onclick="window.downloadCertificatePng('${courseId}')">Download PNG Certificate</button>
        </div>
      </div>
    </div>
  `;
}

function renderStudentBilling(info) {
  const tableRows = info.invoices.map(inv => {
    const isPaid = inv.status === "Paid";
    
    return `
      <tr>
        <td><strong>#${inv.id}</strong></td>
        <td>${inv.courseTitle}</td>
        <td>$${inv.amount}</td>
        <td>${inv.dueDate}</td>
        <td><span class="invoice-badge ${inv.status.toLowerCase()}">${inv.status}</span></td>
        <td>${inv.paidDate ? inv.paidDate : '—'}</td>
        <td>
          ${isPaid 
            ? `<button class="btn btn-secondary" style="padding: 6px 12px; font-size:11px; opacity:0.6; cursor:not-allowed;" disabled>Paid</button>`
            : `<button class="btn btn-primary" style="padding: 6px 12px; font-size:11px;" onclick="window.triggerCheckoutInvoice('${inv.id}')">Pay Now</button>`
          }
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="page-header">
      <div class="page-title">
        <h1>Fee Collections & Invoices</h1>
        <p>Review current payments schedules and clear pending tuition fees.</p>
      </div>
    </div>
    
    <div class="card col-12">
      <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 16px;">Invoice Billing Log</h3>
      <table class="invoices-table">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Item / Course</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Paid Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  `;
}

// ==================== FACULTY PORTAL VIEWS ====================
export function renderFacultyPortal() {
  const db = State.getDb();
  
  if (!window.facultyActiveTab) window.facultyActiveTab = "overview";

  let tabBodyHtml = "";
  switch (window.facultyActiveTab) {
    case "overview":
      tabBodyHtml = renderFacultyOverview();
      break;
    case "gradebook":
      tabBodyHtml = renderFacultyGradebook();
      break;
    case "live":
      tabBodyHtml = renderFacultyLiveClass();
      break;
    case "attendance":
      tabBodyHtml = renderFacultyAttendance();
      break;
    case "billing":
      tabBodyHtml = renderFacultyBilling();
      break;
    default:
      tabBodyHtml = "Faculty sub-view not found.";
  }

  return `
    <div class="page-header">
      <div class="page-title">
        <h1>Faculty Command Center</h1>
        <p>Monitor cohort analytics, host online video classes, grade submissions, and log student attendance.</p>
      </div>
      
      <div class="page-header-actions">
        <button class="btn ${window.facultyActiveTab === 'overview' ? 'btn-primary' : 'btn-secondary'}" onclick="window.switchFacultyTab('overview')">Analytics Overview</button>
        <button class="btn ${window.facultyActiveTab === 'gradebook' ? 'btn-primary' : 'btn-secondary'}" onclick="window.switchFacultyTab('gradebook')">Grade Assessment</button>
        <button class="btn ${window.facultyActiveTab === 'live' ? 'btn-primary' : 'btn-secondary'}" onclick="window.switchFacultyTab('live')">Broadcast Live Class</button>
        <button class="btn ${window.facultyActiveTab === 'attendance' ? 'btn-primary' : 'btn-secondary'}" onclick="window.switchFacultyTab('attendance')">Attendance Log</button>
        <button class="btn ${window.facultyActiveTab === 'billing' ? 'btn-primary' : 'btn-secondary'}" onclick="window.switchFacultyTab('billing')">Fees Collection</button>
      </div>
    </div>
    
    <div id="faculty-tab-body">
      ${tabBodyHtml}
    </div>
  `;
}

function renderFacultyOverview() {
  const db = State.getDb();
  const info = db.studentInfo;
  
  // Faculty stats
  const totalEnrolled = db.courses.reduce((sum, c) => sum + c.studentsEnrolled, 0) + 1; // including Dileep
  const totalOutstandingFees = info.invoices.filter(i => i.status === "Unpaid").reduce((sum, i) => sum + i.amount, 0);
  const avgClassProgress = getCourseProgressPercent("webdev");
  const handRaiseCount = db.liveClass.handRaises;

  // Grade list in gradebook
  const submissionRows = Object.keys(info.grades).map(asgId => {
    const s = info.grades[asgId];
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; border-bottom:1px solid var(--border-color);">
        <div>
          <span style="font-size:12px; background:rgba(99,102,241,0.1); color:var(--primary-light); padding:2px 8px; border-radius:4px; font-weight:700; margin-right:8px;">${asgId.toUpperCase()}</span>
          <span style="font-size:13px; font-weight:600; color:white;">${info.name}</span>
          <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Submitted: ${new Date(s.submittedAt).toLocaleDateString()}</p>
        </div>
        <span style="font-size:13px; font-weight:700; color: ${s.grade.includes('Review') ? 'var(--warning)' : 'var(--success)'};">${s.grade}</span>
      </div>
    `;
  }).join('') || '<p style="font-size:12px; color:var(--text-muted); padding:16px 0;">No active submissions found.</p>';

  return `
    <div class="dashboard-grid">
      <!-- Stats -->
      <div class="card col-3 stat-card">
        <div class="stat-info">
          <span class="stat-label">Estimated Enrollment</span>
          <span class="stat-value">${totalEnrolled}</span>
        </div>
        <div class="stat-icon primary">${Icons.user}</div>
      </div>
      
      <div class="card col-3 stat-card">
        <div class="stat-info">
          <span class="stat-label">Outstanding Fees</span>
          <span class="stat-value">$${totalOutstandingFees}</span>
        </div>
        <div class="stat-icon danger">${Icons.card}</div>
      </div>
      
      <div class="card col-3 stat-card">
        <div class="stat-info">
          <span class="stat-label">Dileep Progress</span>
          <span class="stat-value">${avgClassProgress}%</span>
        </div>
        <div class="stat-icon success">${Icons.chart}</div>
      </div>
      
      <div class="card col-3 stat-card">
        <div class="stat-info">
          <span class="stat-label">Live Hand Raises</span>
          <span class="stat-value" id="faculty-stat-raises">${handRaiseCount}</span>
        </div>
        <div class="stat-icon warning">${Icons.chat}</div>
      </div>

      <!-- Graph and Submissions -->
      <div class="card col-8">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 20px;">LMS Core Analytics Chart</h3>
        <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:24px; text-align:center; height: 320px; display:flex; flex-direction:column; justify-content:center; align-items:center;">
          <!-- SVG Bar Chart -->
          <svg width="450" height="200" viewBox="0 0 450 200" style="margin-top: 10px;">
            <!-- Grid lines -->
            <line x1="40" y1="20" x2="430" y2="20" stroke="rgba(255,255,255,0.05)" />
            <line x1="40" y1="70" x2="430" y2="70" stroke="rgba(255,255,255,0.05)" />
            <line x1="40" y1="120" x2="430" y2="120" stroke="rgba(255,255,255,0.05)" />
            <line x1="40" y1="170" x2="430" y2="170" stroke="rgba(255,255,255,0.1)" />
            
            <!-- Bar elements -->
            <!-- Web Dev -->
            <rect x="80" y="${170 - 150 * (avgClassProgress/100)}" width="45" height="${150 * (avgClassProgress/100)}" rx="4" fill="url(#indigoGrad)" />
            <text x="102" y="190" fill="var(--text-secondary)" font-size="11" text-anchor="middle">Web Dev</text>
            <text x="102" y="${160 - 150 * (avgClassProgress/100)}" fill="white" font-size="12" font-weight="700" text-anchor="middle">${avgClassProgress}%</text>

            <!-- Data Science -->
            <rect x="200" y="130" width="45" height="40" rx="4" fill="url(#greenGrad)" />
            <text x="222" y="190" fill="var(--text-secondary)" font-size="11" text-anchor="middle">Data Sci</text>
            <text x="222" y="120" fill="white" font-size="12" font-weight="700" text-anchor="middle">25%</text>

            <!-- UI/UX -->
            <rect x="320" y="150" width="45" height="20" rx="4" fill="url(#roseGrad)" />
            <text x="342" y="190" fill="var(--text-secondary)" font-size="11" text-anchor="middle">UI/UX</text>
            <text x="342" y="140" fill="white" font-size="12" font-weight="700" text-anchor="middle">10%</text>

            <!-- Gradients Definition -->
            <defs>
              <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#818cf8"/>
                <stop offset="100%" stop-color="#6366f1"/>
              </linearGradient>
              <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#34d399"/>
                <stop offset="100%" stop-color="#10b981"/>
              </linearGradient>
              <linearGradient id="roseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#fb7185"/>
                <stop offset="100%" stop-color="#f43f5e"/>
              </linearGradient>
            </defs>
          </svg>
          <span style="font-size:12px; color:var(--text-secondary); margin-top:20px;">Average Cohort Learning Syllabus Progress</span>
        </div>
      </div>
      
      <div class="card col-4">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 20px;">Submissions Waiting List</h3>
        <div style="display:flex; flex-direction:column; gap:4px;">
          ${submissionRows}
        </div>
      </div>
    </div>
  `;
}

function renderFacultyGradebook() {
  const db = State.getDb();
  const info = db.studentInfo;
  
  // Pending review or graded items
  const gradeItems = Object.keys(info.grades).map(asgId => {
    const s = info.grades[asgId];
    const isPending = s.grade.includes("Review");
    
    return `
      <div class="card" style="margin-bottom: 20px; border-left: 4px solid ${isPending ? 'var(--warning)' : 'var(--success)'}; padding:20px;">
        <div style="display:flex; justify-content:space-between; align-items:start; flex-wrap:wrap; gap:12px;">
          <div>
            <h4 style="font-size: 16px; font-weight:700; color:white;">${info.name} - ${asgId.toUpperCase()} Submission</h4>
            <p style="font-size:12px; color:var(--text-secondary); margin-top:2px;">Submitted at: ${new Date(s.submittedAt).toLocaleString()}</p>
          </div>
          <div style="text-align: right;">
            <span class="invoice-badge ${isPending ? 'unpaid' : 'paid'}" style="font-size:11px; padding:4px 12px;">${s.grade}</span>
          </div>
        </div>
        
        <div style="margin-top:16px; background:rgba(0,0,0,0.25); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px;">
          <h5 style="font-size:12px; font-weight:700; text-transform:uppercase; color:var(--text-muted); margin-bottom:8px;">Student Solution Code/Link</h5>
          <p style="font-size:13px; font-family:monospace; color:var(--text-primary); white-space:pre-wrap; word-break:break-all;">${s.fileContent}</p>
        </div>

        <div style="margin-top:16px; border-top:1px solid var(--border-color); padding-top:16px;">
          <h5 style="font-size:13px; font-weight:700; color:#fff; margin-bottom:12px;">Assessment Grading Form</h5>
          <div style="display:grid; grid-template-columns:120px 1fr; gap:16px; align-items:center;">
            <select id="grade-val-${asgId}" class="payment-input" style="padding:8px 12px; font-size:13px;">
              <option value="A" ${s.grade==='A'?'selected':''}>A (Excellent)</option>
              <option value="A-" ${s.grade==='A-'?'selected':''}>A-</option>
              <option value="B+" ${s.grade==='B+'?'selected':''}>B+</option>
              <option value="B" ${s.grade==='B'?'selected':''}>B (Average)</option>
              <option value="C" ${s.grade==='C'?'selected':''}>C (Passing)</option>
              <option value="F" ${s.grade==='F'?'selected':''}>F (Fail)</option>
            </select>
            <input type="text" id="grade-feed-${asgId}" class="payment-input" style="padding:8px 16px; font-size:13px;" value="${s.feedback}" placeholder="Provide student with code-improving advice..." />
          </div>
          <button class="btn btn-success" style="margin-top:12px; padding:8px 16px; font-size:12px;" onclick="window.gradeStudentAssignment('${asgId}')">Update Assessment Record</button>
        </div>
      </div>
    `;
  }).join('') || '<div class="card" style="text-align:center; padding:32px;"><p style="font-size:13px; color:var(--text-secondary);">No assignment submissions turned in yet.</p></div>';

  return `
    <div style="margin-top:20px;">
      <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 16px;">Cohort Gradebook</h3>
      ${gradeItems}
    </div>
  `;
}

function renderFacultyLiveClass() {
  const db = State.getDb();
  const live = db.liveClass;
  const isBroadcasting = live.status === "live";

  // Active broadcast feeds
  let monitorHtml = "";
  if (isBroadcasting) {
    const classChats = live.messages.map(m => `
      <div style="font-size: 12px; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.03); padding-bottom: 4px;">
        <span style="font-weight:700; color:var(--primary-light);">${m.sender}:</span>
        <span style="color:var(--text-secondary);">${m.text}</span>
      </div>
    `).join('');

    monitorHtml = `
      <div class="classroom-grid" style="margin-top: 20px;">
        <div class="classroom-feed">
          <div class="card" style="padding: 24px; text-align: center; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:16px;">
            <div class="pulsing-dot" style="width:20px; height:20px;"></div>
            <h2 style="font-size:18px; font-weight:800;">🔴 Classroom Webcast Active</h2>
            <p style="font-size:13px; color:var(--text-secondary);">Active Session: <strong>"${live.title}"</strong> &bull; Host: ${live.presenter}</p>
            <div style="display:flex; gap:12px;">
              <button class="btn btn-secondary" onclick="window.simulateLiveChatVisitor()">Simulate Student Question</button>
              <button class="btn btn-danger" onclick="window.stopFacultyLiveBroadcast()">Terminate Broadcast</button>
            </div>
          </div>
          
          <div class="card" style="padding: 16px;">
            <h4 style="font-size:13px; font-weight:700; text-transform:uppercase; color:var(--text-muted); margin-bottom:10px;">Broadcaster Shared Whiteboard</h4>
            <div class="whiteboard-canvas" style="background:#ffffff; border-color:#e2e8f0; color:#334155;">
              <span style="font-size:12px; opacity:0.5;">Broadcasting drawings to all student screens in real-time</span>
              <div id="fac-wb-dots" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;"></div>
            </div>
            <div class="whiteboard-toolbar">
              <button class="btn btn-secondary" style="padding:4px 8px; font-size:11px;" onclick="window.clearFacWhiteboard()">Clear Drawings</button>
            </div>
          </div>
        </div>
        
        <div class="classroom-chat">
          <div style="padding:16px; border-bottom:1px solid var(--border-color); font-weight:700; font-size:14px;">Live Stream Audit Panel</div>
          <div id="faculty-live-scroller" style="flex-grow:1; padding:20px; overflow-y:auto; background:rgba(0,0,0,0.2);">
            ${classChats}
          </div>
          <div class="chat-input-bar" style="padding:12px 16px;">
            <input type="text" id="faculty-live-chat-input" placeholder="Broadcasting instructor chat announcements..." onkeydown="if(event.key==='Enter') window.sendFacultyLiveMsg()" />
            <button class="btn btn-primary" onclick="window.sendFacultyLiveMsg()">Broad</button>
          </div>
        </div>
      </div>
    `;
  } else {
    // Launch broadcast form
    monitorHtml = `
      <div class="card" style="max-width: 500px; margin: 40px auto; padding: 32px; display:flex; flex-direction:column; gap:20px;">
        <h3 style="font-size:18px; font-weight:800; text-align:center;">Launch Interactive Live Webcast</h3>
        <p style="font-size:13px; color:var(--text-secondary); text-align:center; margin-top:-10px;">Select target cohort and configure session title details. Triggers webhook pushes to active student alerts.</p>
        
        <div class="payment-form-group">
          <label>Target Cohort Course</label>
          <select id="live-setup-course" class="payment-input">
            <option value="webdev">Full-Stack Web Development</option>
            <option value="datascience">Applied Data Science & ML</option>
            <option value="uiux">UI/UX Design Masterclass</option>
          </select>
        </div>
        
        <div class="payment-form-group">
          <label>Syllabus Session Title</label>
          <input type="text" id="live-setup-title" class="payment-input" placeholder="e.g., Week 2: Grid Alignment Q&A" />
        </div>
        
        <button class="btn btn-danger" style="margin-top:10px;" onclick="window.startFacultyLiveBroadcast()">Launch Stream (Go Live)</button>
      </div>
    `;
  }

  return monitorHtml;
}

function renderFacultyAttendance() {
  const db = State.getDb();
  const info = db.studentInfo;
  
  const dates = ["2026-05-18", "2026-05-20", "2026-05-22", "2026-05-25", new Date().toISOString().split('T')[0]];
  const attendanceList = info.attendance["webdev"] || [];

  const studentRows = `
    <tr>
      <td><strong>${info.name}</strong></td>
      <td>webdev</td>
      ${dates.map(date => {
        const record = attendanceList.find(r => r.date === date);
        const isPresent = record ? record.status === "Present" : false;
        
        return `
          <td style="text-align: center;">
            <button class="btn" style="padding: 6px 12px; font-size:11px; background:${isPresent?'rgba(16, 185, 129, 0.15)':'rgba(244, 63, 94, 0.15)'}; color:${isPresent?'var(--success)':'var(--danger)'}; border: 1px solid ${isPresent?'rgba(16, 185, 129, 0.3)':'rgba(244, 63, 94, 0.3)'};" onclick="window.toggleAttendanceRecord('${date}', '${isPresent?'Absent':'Present'}')">
              ${isPresent ? 'Present' : 'Absent'}
            </button>
          </td>
        `;
      }).join('')}
    </tr>
  `;

  return `
    <div class="card col-12" style="margin-top:20px;">
      <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 16px;">Attendance Verification Grid</h3>
      <table class="invoices-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Course ID</th>
            ${dates.map(d => `<th style="text-align: center;">${new Date(d).toLocaleDateString('en-US', {month:'short', day:'numeric'})}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${studentRows}
        </tbody>
      </table>
    </div>
  `;
}

function renderFacultyBilling() {
  const db = State.getDb();
  const info = db.studentInfo;

  const tableRows = info.invoices.map(inv => {
    const isPaid = inv.status === "Paid";
    
    return `
      <tr>
        <td><strong>#${inv.id}</strong></td>
        <td>${info.name}</td>
        <td>${inv.courseTitle}</td>
        <td>$${inv.amount}</td>
        <td>${inv.dueDate}</td>
        <td><span class="invoice-badge ${inv.status.toLowerCase()}">${inv.status}</span></td>
        <td>
          ${isPaid 
            ? `<button class="btn btn-secondary" style="padding: 6px 12px; font-size:11px; opacity:0.6; cursor:not-allowed;" disabled>Paid</button>`
            : `<button class="btn btn-danger" style="padding: 6px 12px; font-size:11px;" onclick="window.sendFeeCollectionReminder('${inv.id}')">Send Notification Notice</button>`
          }
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="card col-12" style="margin-top:20px;">
      <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 16px;">Outstanding Fee Ledger</h3>
      <table class="invoices-table">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Student Name</th>
            <th>Billing Item</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action Actions</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  `;
}

// ==================== PARENT PORTAL VIEW ====================
export function renderParentPortal() {
  const db = State.getDb();
  const student = db.studentInfo;
  
  if (!window.parentActiveTab) window.parentActiveTab = "overview";

  // Calculate student average progress
  let sum = 0;
  student.enrolledCourses.forEach(cid => sum += getCourseProgressPercent(cid));
  const avgProgress = student.enrolledCourses.length > 0 ? Math.round(sum / student.enrolledCourses.length) : 0;

  // Calculate overall attendance rate
  const attendanceList = student.attendance["webdev"] || [];
  const presentCount = attendanceList.filter(r => r.status === "Present").length;
  const attendanceRate = attendanceList.length > 0 ? Math.round((presentCount / attendanceList.length) * 100) : 100;

  let tabBodyHtml = "";
  if (window.parentActiveTab === "overview") {
    // Parent Overview Dashboard
    const coursesProgressHtml = student.enrolledCourses.map(cid => {
      const course = db.courses.find(c => c.id === cid);
      if (!course) return '';
      const pct = getCourseProgressPercent(cid);
      
      return `
        <div style="margin-bottom: 16px;">
          <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
            <span>${course.title}</span>
            <span><strong>${pct}% Complete</strong></span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill ${pct>80?'high':pct>30?'medium':'low'}" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    const gradesHtml = Object.keys(student.grades).map(asgId => {
      const g = student.grades[asgId];
      return `
        <div style="padding:12px; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h5 style="font-size:13px; font-weight:700; color:white;">${asgId.toUpperCase()} Evaluation</h5>
            <p style="font-size:11px; color:var(--text-muted);">Feedback: "${g.feedback || 'Pending'}"</p>
          </div>
          <span style="font-weight:800; color:var(--success); font-size:14px;">${g.grade}</span>
        </div>
      `;
    }).join('') || '<p style="font-size:12px; color:var(--text-muted);">No graded deliverables.</p>';

    tabBodyHtml = `
      <div class="dashboard-grid">
        <!-- Stats Widgets -->
        <div class="card col-4 stat-card">
          <div class="stat-info">
            <span class="stat-label">Child Enrolled Courses</span>
            <span class="stat-value">${student.enrolledCourses.length}</span>
          </div>
          <div class="stat-icon primary">${Icons.book}</div>
        </div>
        
        <div class="card col-4 stat-card">
          <div class="stat-info">
            <span class="stat-label">Child Syllabus Progress</span>
            <span class="stat-value">${avgProgress}%</span>
          </div>
          <div class="stat-icon success">${Icons.chart}</div>
        </div>
        
        <div class="card col-4 stat-card">
          <div class="stat-info">
            <span class="stat-label">Attendance Verification</span>
            <span class="stat-value">${attendanceRate}%</span>
          </div>
          <div class="stat-icon warning">${Icons.calendar}</div>
        </div>

        <!-- Progress detail -->
        <div class="card col-6">
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 20px;">Syllabus Completion</h3>
          ${coursesProgressHtml}
        </div>
        
        <!-- Grades list -->
        <div class="card col-6">
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 20px;">Child Performance Report</h3>
          <div style="display:flex; flex-direction:column;">
            ${gradesHtml}
          </div>
        </div>
      </div>
    `;
  } else if (window.parentActiveTab === "billing") {
    // Parent billing table
    const tableRows = student.invoices.map(inv => {
      const isPaid = inv.status === "Paid";
      
      return `
        <tr>
          <td><strong>#${inv.id}</strong></td>
          <td>${inv.courseTitle}</td>
          <td>$${inv.amount}</td>
          <td>${inv.dueDate}</td>
          <td><span class="invoice-badge ${inv.status.toLowerCase()}">${inv.status}</span></td>
          <td>
            ${isPaid 
              ? `<button class="btn btn-secondary" style="padding: 6px 12px; font-size:11px; opacity:0.6; cursor:not-allowed;" disabled>Invoice Settled</button>`
              : `<button class="btn btn-primary" style="padding: 6px 12px; font-size:11px;" onclick="window.triggerCheckoutInvoice('${inv.id}')">Pay Invoice Balance</button>`
            }
          </td>
        </tr>
      `;
    }).join('');

    tabBodyHtml = `
      <div class="card col-12">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 16px;">Outstanding Family Bills</h3>
        <table class="invoices-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Billing Item</th>
              <th>Due Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    `;
  } else if (window.parentActiveTab === "messages") {
    // Parent Faculty DM
    const messages = db.parentDirectMessages.map(m => {
      const isOwn = m.role === "parent";
      return `
        <div class="chat-bubble ${isOwn ? 'own' : ''}">
          <div class="chat-bubble-avatar">${isOwn ? 'PT' : 'FT'}</div>
          <div class="chat-bubble-content">
            <div class="chat-bubble-meta">
              <span class="chat-bubble-sender">${m.sender}</span>
              <span class="chat-bubble-badge ${isOwn?'student':'faculty'}">${isOwn?'Parent':'Faculty'}</span>
              <span class="chat-bubble-time">${new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <p class="chat-bubble-text">${m.text}</p>
          </div>
        </div>
      `;
    }).join('');

    tabBodyHtml = `
      <div class="chat-container">
        <div class="chat-sidebar" style="width: 200px;">
          <div class="chat-sidebar-header">Instructors</div>
          <ul class="chat-channels-list">
            <li class="chat-channel-item active">Prof. Jane Smith</li>
          </ul>
        </div>
        
        <div class="chat-messages-area">
          <div class="chat-messages-header">
            <h3>Direct Discussion Board: Prof. Jane Smith</h3>
          </div>
          <div class="chat-scroller" id="parent-chat-scroller">
            ${messages}
          </div>
          <div class="chat-input-bar">
            <input type="text" id="parent-chat-input" placeholder="Type a message to instructor..." onkeydown="if(event.key==='Enter') window.sendParentChatMessage()" />
            <button class="btn btn-primary" onclick="window.sendParentChatMessage()">Send Message</button>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="page-header">
      <div class="page-title">
        <h1>Parent / Student Guardian Portal</h1>
        <p>Review academic reports for <strong>${student.name}</strong>, settle tuition balances, and consult faculty members.</p>
      </div>
      
      <div class="page-header-actions">
        <button class="btn ${window.parentActiveTab === 'overview' ? 'btn-primary' : 'btn-secondary'}" onclick="window.switchParentTab('overview')">Student Performance</button>
        <button class="btn ${window.parentActiveTab === 'billing' ? 'btn-primary' : 'btn-secondary'}" onclick="window.switchParentTab('billing')">Fees & Invoices</button>
        <button class="btn ${window.parentActiveTab === 'messages' ? 'btn-primary' : 'btn-secondary'}" onclick="window.switchParentTab('messages')">Instructor Messages</button>
      </div>
    </div>
    
    <div id="parent-tab-body">
      ${tabBodyHtml}
    </div>
  `;
}

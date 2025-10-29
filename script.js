// ===================== DATA =====================
const jobs = [
  {
    id: 1,
    title: "Customer Service Representative",
    company: "TechStart Inc.",
    location: "Quezon City",
    type: "Part-time",
    salary: "₱18,000-22,000/mo",
    experience: "Entry-level",
    description: "Help customers via phone and chat. Flexible hours available.",
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "Data Entry Specialist",
    company: "Local Community Center",
    location: "Makati - Hybrid",
    type: "Full-time",
    salary: "₱16,000-20,000/mo",
    experience: "Entry-level",
    description: "Organize and input data. Training provided.",
    posted: "1 week ago"
  },
  {
    id: 3,
    title: "Social Media Assistant",
    company: "Green Gardens Charity",
    location: "Remote",
    type: "Part-time",
    salary: "₱15,000-19,000/mo",
    experience: "Entry-level",
    description: "Manage social media accounts and create engaging content.",
    posted: "3 days ago"
  },
  {
    id: 4,
    title: "Warehouse Associate",
    company: "Quick Logistics",
    location: "Pasig City",
    type: "Full-time",
    salary: "₱17,000-21,000/mo",
    experience: "No experience needed",
    description: "Sort and organize packages. Weekend shifts available.",
    posted: "5 days ago"
  },
  {
    id: 5,
    title: "Virtual Assistant",
    company: "Small Business Network",
    location: "Remote",
    type: "Part-time",
    salary: "₱16,000-20,000/mo",
    experience: "Entry-level",
    description: "Support small business owners with administrative tasks.",
    posted: "1 day ago"
  }
];

const partners = [
  {
    id: 1,
    name: "Sunshine Bakery",
    type: "Local Business",
    openings: 3,
    description:
      "Family-owned bakery in Taguig offering flexible shifts and on-the-job training.",
    contact: "hiring@sunshinebakery.com",
    location: "Taguig City",
    salary: "₱18,000 - ₱25,000"
  },
  {
    id: 2,
    name: "Hope Center Charity",
    type: "Non-profit",
    openings: 5,
    description:
      "Community organization in Manila with various volunteer and paid positions.",
    contact: "jobs@hopecenter.org",
    location: "Manila",
    salary: "₱15,000 - ₱20,000"
  },
  {
    id: 3,
    name: "Green Tech Startup",
    type: "Tech Company",
    openings: 2,
    description:
      "BGC-based innovation hub focused on inclusive hiring and remote work opportunities.",
    contact: "careers@greentech.co",
    location: "BGC, Taguig",
    salary: "₱22,000 - ₱30,000"
  },
  {
    id: 4,
    name: "City Skills Training Center",
    type: "Training Provider",
    openings: 8,
    description:
      "Free training programs in Quezon City with direct pathways to employment.",
    contact: "enroll@cityskills.org",
    location: "Quezon City",
    salary: "₱14,000 - ₱18,000"
  },
  {
    id: 5,
    name: "Friendly Cafe",
    type: "Local Business",
    openings: 4,
    description:
      "Coffee shop in Mandaluyong with a mission to provide first-time work experience.",
    contact: "jobs@friendlycafe.com",
    location: "Mandaluyong City",
    salary: "₱16,000 - ₱20,000"
  }
];

let chatMessages = [
  {
    id: 1,
    user: "Maria",
    message: "Hi everyone! Just joined. Looking for remote work opportunities.",
    time: "10:30 AM",
    isMe: false
  },
  {
    id: 2,
    user: "John",
    message:
      "Welcome Maria! Check out the job board, there are several remote positions posted.",
    time: "10:32 AM",
    isMe: false
  },
  {
    id: 3,
    user: "Sarah",
    message:
      "Does anyone have experience with the local bakery partnership? They seem great!",
    time: "10:45 AM",
    isMe: false
  }
];

// ===================== STATE =====================
let currentTab = "jobs";
let filters = { jobType: "all", location: "all", experience: "all" };
let searchQuery = "";

// ===================== INIT =====================
document.addEventListener("DOMContentLoaded", function () {
  initNavigation();
  initJobBoard();
  initChat();
  initPartners();
  initModal(); // Added modal initialization
  renderJobs();
  renderChat();
  renderPartners();
});

// ===================== NAVIGATION =====================
function initNavigation() {
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
  });
  document.getElementById(`${tab}Tab`).classList.add("active");
}

// ===================== JOB BOARD =====================
function initJobBoard() {
  const searchInput = document.getElementById("searchInput");
  const filterBtn = document.getElementById("filterBtn");
  const filterPanel = document.getElementById("filterPanel");
  const jobTypeFilter = document.getElementById("jobTypeFilter");
  const locationFilter = document.getElementById("locationFilter");
  const experienceFilter = document.getElementById("experienceFilter");
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderJobs();
  });

  filterBtn.addEventListener("click", () => filterPanel.classList.toggle("hidden"));

  [jobTypeFilter, locationFilter, experienceFilter].forEach((filter, idx) => {
    filter.addEventListener("change", (e) => {
      const keys = ["jobType", "location", "experience"];
      filters[keys[idx]] = e.target.value;
      updateFilterBadge();
      renderJobs();
    });
  });

  clearFiltersBtn.addEventListener("click", () => {
    filters = { jobType: "all", location: "all", experience: "all" };
    jobTypeFilter.value = locationFilter.value = experienceFilter.value = "all";
    updateFilterBadge();
    renderJobs();
  });
}

function updateFilterBadge() {
  const badge = document.getElementById("filterBadge");
  const active =
    filters.jobType !== "all" || filters.location !== "all" || filters.experience !== "all";
  badge.classList.toggle("hidden", !active);
}

// ✅ Popup
function showPopup(message) {
  const popup = document.createElement("div");
  popup.textContent = message;
  popup.style.cssText = `
    position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
    background: #4CAF50; color: white; padding: 12px 20px; border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2); font-size: 16px; z-index: 9999;
    opacity: 0; transition: opacity 0.5s ease;
  `;
  document.body.appendChild(popup);
  setTimeout(() => (popup.style.opacity = "1"), 50);
  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => popup.remove(), 500);
  }, 2500);
}

function renderJobs() {
  const jobListings = document.getElementById("jobListings");
  const filtered = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = filters.jobType === "all" || job.type.toLowerCase().includes(filters.jobType);
    const matchLoc = filters.location === "all" || job.location.toLowerCase().includes(filters.location);
    const matchExp = filters.experience === "all" || job.experience.toLowerCase().includes(filters.experience);
    return matchSearch && matchType && matchLoc && matchExp;
  });

  if (!filtered.length) {
    jobListings.innerHTML = `
      <div class="empty-state">
        <svg data-lucide="briefcase"></svg>
        <p>No jobs match your criteria</p>
      </div>`;
    lucide.createIcons();
    return;
  }

  jobListings.innerHTML = filtered
    .map(
      (job) => `
      <div class="job-card">
        <h3 class="job-title">${job.title}</h3>
        <div class="job-company"><svg data-lucide="building-2" width="16" height="16"></svg>
          <span>${job.company}</span></div>
        <div class="job-badges">
          <span class="badge badge-blue"><svg data-lucide="clock"></svg>${job.type}</span>
          <span class="badge badge-green"><svg data-lucide="map-pin"></svg>${job.location}</span>
          <span class="badge badge-purple">${job.salary}</span>
        </div>
        <p class="job-description">${job.description}</p>
        <div class="job-footer">
          <span class="job-posted">Posted ${job.posted}</span>
          <button class="apply-btn" data-title="${job.title}">Apply Now</button>
        </div>
      </div>`
    )
    .join("");
  lucide.createIcons();
  initApplyButtons();
}

// ===================== MODAL LOGIC (shared for jobs & partners) =====================
function initApplyButtons() {
  document.querySelectorAll(".apply-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent event bubbling
      showApplyModal(btn.dataset.title);
    });
  });
}

function showApplyModal(jobTitle) {
  const modal = document.getElementById("applyModal");
  const modalTitle = document.getElementById("modalJobTitle");
  
  modalTitle.textContent = `Apply for ${jobTitle}`;
  modal.classList.remove("hidden");
}

function initModal() {
  const modal = document.getElementById("applyModal");
  const closeModal = document.getElementById("closeModal");
  const applyForm = document.getElementById("applyForm");

  // Close modal events
  if (closeModal) {
    closeModal.addEventListener("click", () => modal.classList.add("hidden"));
  }
  
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  // Form submission
  applyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById('applicantName').value.trim();
    const phone = document.getElementById('applicantPhone').value.trim();
    const email = document.getElementById('applicantEmail').value.trim();
    const file = document.getElementById('resumeFile').files[0];
    
    if (!name || !phone || !email || !file) {
      return showPopup("⚠️ Please complete all fields.");
    }
    if (!/^[0-9]{11}$/.test(phone)) {
      return showPopup("⚠️ Invalid cellphone number.");
    }
    
    showPopup(`✅ Application submitted successfully!`);
    applyForm.reset();
    modal.classList.add("hidden");
  });
}

// ===================== CHAT =====================
function initChat() {
  const sendBtn = document.getElementById("sendBtn");
  const chatInput = document.getElementById("chatInput");
  const chatMessagesDiv = document.getElementById("chatMessages");

  sendBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => e.key === "Enter" && sendMessage());
}

function sendMessage() {
  const chatInput = document.getElementById("chatInput");
  const chatMessagesDiv = document.getElementById("chatMessages");
  const message = chatInput.value.trim();
  if (!message) return;
  chatMessages.push({
    id: chatMessages.length + 1,
    user: "You",
    message,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    isMe: true
  });
  chatInput.value = "";
  renderChat();
  chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
}

function renderChat() {
  const chatMessagesDiv = document.getElementById("chatMessages");
  chatMessagesDiv.innerHTML = chatMessages
    .map(
      (msg) => `
    <div class="chat-message ${msg.isMe ? "mine" : ""}">
      <div class="message-bubble ${msg.isMe ? "mine" : "other"}">
        ${!msg.isMe ? `<p class="message-sender">${msg.user}</p>` : ""}
        <p class="message-text">${msg.message}</p>
        <p class="message-time">${msg.time}</p>
      </div>
    </div>`
    )
    .join("");
}

// ===================== PARTNERS =====================
function initPartners() {
  renderPartners();
}

function renderPartners() {
  const list = document.getElementById("partnersList");
  list.innerHTML = partners
    .map(
      (p) => `
    <div class="partner-card" data-id="${p.id}">
      <div class="partner-header">
        <div><h3 class="partner-name">${p.name}</h3><span class="partner-type">${p.type}</span></div>
        <div class="verified-badge"><svg data-lucide="heart"></svg><span>Verified</span></div>
      </div>
      <p class="partner-description">${p.description}</p>
      <div class="partner-footer">
        <div class="partner-openings"><strong>${p.openings} openings</strong><span> available</span></div>
        <button class="view-jobs-btn" data-id="${p.id}">View Jobs</button>
      </div>
    </div>`
    )
    .join("");
  lucide.createIcons();

  // Initialize partner view jobs buttons
  document.querySelectorAll(".view-jobs-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const partnerId = btn.dataset.id;
      const partner = partners.find(p => p.id == partnerId);
      const card = e.target.closest(".partner-card");
      
      // Remove existing popup if any
      const existing = card.querySelector(".job-hover-popup");
      if (existing) existing.remove();

      const popup = document.createElement("div");
      popup.className = "job-hover-popup";
      popup.innerHTML = `
        <div class="job-detail">
          <p><i data-lucide='map-pin'></i> ${partner.location}</p>
          <p><i data-lucide='dollar-sign'></i> ${partner.salary}</p>
          <button class='apply-btn' data-title='${partner.name}'>Apply Now</button>
        </div>`;
      card.appendChild(popup);
      lucide.createIcons();

      // Initialize the apply button in the popup
      initApplyButtons();
    });
  });
}

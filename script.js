// Data
const jobs = [
    {
        id: 1,
        title: 'Customer Service Representative',
        company: 'TechStart Inc.',
        location: 'Quezon City',
        type: 'Part-time',
        salary: '₱18,000-22,000/mo',
        experience: 'Entry-level',
        description: 'Help customers via phone and chat. Flexible hours available.',
        posted: '2 days ago'
    },
    {
        id: 2,
        title: 'Data Entry Specialist',
        company: 'Local Community Center',
        location: 'Makati - Hybrid',
        type: 'Full-time',
        salary: '₱16,000-20,000/mo',
        experience: 'Entry-level',
        description: 'Organize and input data. Training provided.',
        posted: '1 week ago'
    },
    {
        id: 3,
        title: 'Social Media Assistant',
        company: 'Green Gardens Charity',
        location: 'Remote',
        type: 'Part-time',
        salary: '₱15,000-19,000/mo',
        experience: 'Entry-level',
        description: 'Manage social media accounts and create engaging content.',
        posted: '3 days ago'
    },
    {
        id: 4,
        title: 'Warehouse Associate',
        company: 'Quick Logistics',
        location: 'Pasig City',
        type: 'Full-time',
        salary: '₱17,000-21,000/mo',
        experience: 'No experience needed',
        description: 'Sort and organize packages. Weekend shifts available.',
        posted: '5 days ago'
    },
    {
        id: 5,
        title: 'Virtual Assistant',
        company: 'Small Business Network',
        location: 'Remote',
        type: 'Part-time',
        salary: '₱16,000-20,000/mo',
        experience: 'Entry-level',
        description: 'Support small business owners with administrative tasks.',
        posted: '1 day ago'
    }
];

const partners = [
    {
        id: 1,
        name: 'Sunshine Bakery',
        type: 'Local Business',
        openings: 3,
        description: 'Family-owned bakery in Taguig offering flexible shifts and on-the-job training.',
        contact: 'hiring@sunshinebakery.com'
    },
    {
        id: 2,
        name: 'Hope Center Charity',
        type: 'Non-profit',
        openings: 5,
        description: 'Community organization in Manila with various volunteer and paid positions.',
        contact: 'jobs@hopecenter.org'
    },
    {
        id: 3,
        name: 'Green Tech Startup',
        type: 'Tech Company',
        openings: 2,
        description: 'BGC-based innovation hub focused on inclusive hiring and remote work opportunities.',
        contact: 'careers@greentech.co'
    },
    {
        id: 4,
        name: 'City Skills Training Center',
        type: 'Training Provider',
        openings: 8,
        description: 'Free training programs in Quezon City with direct pathways to employment.',
        contact: 'enroll@cityskills.org'
    },
    {
        id: 5,
        name: 'Friendly Cafe',
        type: 'Local Business',
        openings: 4,
        description: 'Coffee shop in Mandaluyong with a mission to provide first-time work experience.',
        contact: 'jobs@friendlycafe.com'
    }
];

let chatMessages = [
    { id: 1, user: 'Maria', message: 'Hi everyone! Just joined. Looking for remote work opportunities.', time: '10:30 AM', isMe: false },
    { id: 2, user: 'John', message: 'Welcome Maria! Check out the job board, there are several remote positions posted.', time: '10:32 AM', isMe: false },
    { id: 3, user: 'Sarah', message: 'Does anyone have experience with the local bakery partnership? They seem great!', time: '10:45 AM', isMe: false }
];

// State
let currentTab = 'jobs';
let filters = {
    jobType: 'all',
    location: 'all',
    experience: 'all'
};
let searchQuery = '';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initJobBoard();
    initChat();
    initPartners();
    renderJobs();
    renderChat();
    renderPartners();
});

// Navigation
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            switchTab(tab);
        });
    });
}

function switchTab(tab) {
    currentTab = tab;
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tab}Tab`).classList.add('active');
}

// Job Board
function initJobBoard() {
    const searchInput = document.getElementById('searchInput');
    const filterBtn = document.getElementById('filterBtn');
    const filterPanel = document.getElementById('filterPanel');
    const jobTypeFilter = document.getElementById('jobTypeFilter');
    const locationFilter = document.getElementById('locationFilter');
    const experienceFilter = document.getElementById('experienceFilter');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderJobs();
    });
    
    filterBtn.addEventListener('click', () => {
        filterPanel.classList.toggle('hidden');
    });
    
    jobTypeFilter.addEventListener('change', (e) => {
        filters.jobType = e.target.value;
        updateFilterBadge();
        renderJobs();
    });
    
    locationFilter.addEventListener('change', (e) => {
        filters.location = e.target.value;
        updateFilterBadge();
        renderJobs();
    });
    
    experienceFilter.addEventListener('change', (e) => {
        filters.experience = e.target.value;
        updateFilterBadge();
        renderJobs();
    });
    
    clearFiltersBtn.addEventListener('click', () => {
        filters = { jobType: 'all', location: 'all', experience: 'all' };
        jobTypeFilter.value = 'all';
        locationFilter.value = 'all';
        experienceFilter.value = 'all';
        updateFilterBadge();
        renderJobs();
    });
}

function updateFilterBadge() {
    const filterBadge = document.getElementById('filterBadge');
    const hasActiveFilters = filters.jobType !== 'all' || filters.location !== 'all' || filters.experience !== 'all';
    filterBadge.classList.toggle('hidden', !hasActiveFilters);
}

function renderJobs() {
    const jobListings = document.getElementById('jobListings');
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             job.company.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filters.jobType === 'all' || job.type.toLowerCase().includes(filters.jobType);
        const matchesLocation = filters.location === 'all' || job.location.toLowerCase().includes(filters.location);
        const matchesExp = filters.experience === 'all' || job.experience.toLowerCase().includes(filters.experience);
        
        return matchesSearch && matchesType && matchesLocation && matchesExp;
    });
    
    if (filteredJobs.length === 0) {
        jobListings.innerHTML = `
            <div class="empty-state">
                <svg data-lucide="briefcase"></svg>
                <p>No jobs match your criteria</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    jobListings.innerHTML = filteredJobs.map(job => `
        <div class="job-card">
            <h3 class="job-title">${job.title}</h3>
            <div class="job-company">
                <svg data-lucide="building-2" width="16" height="16"></svg>
                <span>${job.company}</span>
            </div>
            <div class="job-badges">
                <span class="badge badge-blue">
                    <svg data-lucide="clock" width="12" height="12"></svg>
                    ${job.type}
                </span>
                <span class="badge badge-green">
                    <svg data-lucide="map-pin" width="12" height="12"></svg>
                    ${job.location}
                </span>
                <span class="badge badge-purple">
                    ${job.salary}
                </span>
            </div>
            <p class="job-description">${job.description}</p>
            <div class="job-footer">
                <span class="job-posted">Posted ${job.posted}</span>
                <button class="apply-btn">Apply Now</button>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Chat
function initChat() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (message) {
        const newMessage = {
            id: chatMessages.length + 1,
            user: 'You',
            message: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        };
        
        chatMessages.push(newMessage);
        chatInput.value = '';
        renderChat();
        
        // Scroll to bottom
        const chatMessagesDiv = document.getElementById('chatMessages');
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
    }
}

function renderChat() {
    const chatMessagesDiv = document.getElementById('chatMessages');
    
    chatMessagesDiv.innerHTML = chatMessages.map(msg => `
        <div class="chat-message ${msg.isMe ? 'mine' : ''}">
            <div class="message-bubble ${msg.isMe ? 'mine' : 'other'}">
                ${!msg.isMe ? `<p class="message-sender">${msg.user}</p>` : ''}
                <p class="message-text">${msg.message}</p>
                <p class="message-time">${msg.time}</p>
            </div>
        </div>
    `).join('');
}

// Partners
function initPartners() {
    // No initialization needed for partners
}

function renderPartners() {
    const partnersList = document.getElementById('partnersList');
    
    partnersList.innerHTML = partners.map(partner => `
        <div class="partner-card">
            <div class="partner-header">
                <div>
                    <h3 class="partner-name">${partner.name}</h3>
                    <span class="partner-type">${partner.type}</span>
                </div>
                <div class="verified-badge">
                    <svg data-lucide="heart" width="14" height="14"></svg>
                    <span>Verified</span>
                </div>
            </div>
            <p class="partner-description">${partner.description}</p>
            <div class="partner-footer">
                <div class="partner-openings">
                    <strong>${partner.openings} openings</strong>
                    <span> available</span>
                </div>
                <button class="view-jobs-btn">View Jobs</button>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

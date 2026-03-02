// Chart configurations for the dashboard

document.addEventListener("DOMContentLoaded", () => {

  // 1. Sales Overview Chart (Simulating the complex flow chart using a stylized Line Chart for simplicity but elegance)
  const ctxSales = document.getElementById('salesFlowChart').getContext('2d');

  // Create gradient for the lines
  const gradientPrimary = ctxSales.createLinearGradient(0, 0, 0, 300);
  gradientPrimary.addColorStop(0, 'rgba(99, 102, 241, 0.5)');
  gradientPrimary.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

  const gradientPositive = ctxSales.createLinearGradient(0, 0, 0, 300);
  gradientPositive.addColorStop(0, 'rgba(45, 212, 191, 0.4)');
  gradientPositive.addColorStop(1, 'rgba(45, 212, 191, 0.0)');

  new Chart(ctxSales, {
    type: 'line',
    data: {
      labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
      datasets: [
        {
          label: 'USA',
          data: [1200, 1900, 1500, 2200, 2000, 2500],
          borderColor: '#6366F1',
          backgroundColor: gradientPrimary,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6
        },
        {
          label: 'Europe',
          data: [800, 1200, 1100, 1600, 1400, 1900],
          borderColor: '#2DD4BF',
          backgroundColor: gradientPositive,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            font: {
              family: "'Inter', sans-serif",
              size: 13
            }
          }
        },
        tooltip: {
          backgroundColor: '#111827',
          padding: 12,
          titleFont: { family: "'Inter', sans-serif", size: 14 },
          bodyFont: { family: "'Inter', sans-serif", size: 13 },
          displayColors: false,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          grid: { display: false, drawBorder: false },
          ticks: { font: { family: "'Inter', sans-serif", color: '#6B7280' } }
        },
        y: {
          grid: {
            color: '#F3F4F6',
            drawBorder: false,
            borderDash: [5, 5]
          },
          border: { display: false },
          ticks: {
            display: false // Hide y axis numbers for cleaner look
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false,
      },
    }
  });

  // 2. Subscriber Bar Chart
  const ctxSubscriber = document.getElementById('subscriberBarChart').getContext('2d');

  new Chart(ctxSubscriber, {
    type: 'bar',
    data: {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{
        label: 'Subscribers',
        data: [1200, 1800, 3874, 1500, 2000, 2500, 2100],
        backgroundColor: (context) => {
          const index = context.dataIndex;
          // Highlight Tuesday (index 2) with primary color, others light grey
          return index === 2 ? '#6366F1' : '#E5E7EB';
        },
        borderRadius: 6,
        borderSkipped: false,
        barPercentage: 0.6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#111827',
          padding: 12,
          bodyFont: { family: "'Inter', sans-serif", size: 14, weight: 'bold' },
          displayColors: false,
          callbacks: {
            title: () => null // Hide title in tooltip
          }
        }
      },
      scales: {
        x: {
          grid: { display: false, drawBorder: false },
          ticks: { font: { family: "'Inter', sans-serif" }, color: '#6B7280' }
        },
        y: {
          display: false // Completely hide y axis
        }
      }
    }
  });

  // --- Added Interactivity --- //

  // 1. Sidebar Navigation Active State Toggle
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent jump to top
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // 2. Table Row Checkbox Toggle
  const tableRows = document.querySelectorAll('.integration-table tbody tr');
  tableRows.forEach(row => {
    row.addEventListener('click', (e) => {
      // Avoid double-toggle if the user explicitly clicked the checkbox itself
      if (e.target.tagName.toLowerCase() !== 'input') {
        const checkbox = row.querySelector('.custom-checkbox');
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
        }
      }
    });
  });

  // 3. Generic Click Feedback for specific buttons and actions
  const btnUpgrade = document.querySelector('.btn-upgrade');
  if (btnUpgrade) {
    btnUpgrade.addEventListener('click', () => {
      alert("Upgrade Plan Modal would open here!");
    });
  }

  const userProfile = document.querySelector('.user-profile');
  if (userProfile) {
    userProfile.addEventListener('click', () => {
      // Toggle a pseudo dropdown or just alert
      alert("Opening User Settings...");
    });
  }

  const teamSwitcher = document.querySelector('.team-switcher');
  if (teamSwitcher) {
    teamSwitcher.addEventListener('click', () => {
      alert("Opening Switch Team Menu...");
    });
  }

  // 4. Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const icon = themeToggleBtn.querySelector('i');
      if (document.body.classList.contains('dark-theme')) {
        icon.classList.replace('ph-moon', 'ph-sun');
      } else {
        icon.classList.replace('ph-sun', 'ph-moon');
      }
    });
  }

  // 5. AI Assistant Toggle & Chat Logic
  const aiAssistantBtn = document.getElementById('aiAssistantBtn');
  const aiChatBox = document.getElementById('aiChatBox');
  const aiChatClose = document.getElementById('aiChatClose');
  const aiChatInput = document.getElementById('aiChatInput');
  const aiSendBtn = document.getElementById('aiSendBtn');
  const aiChatMessages = document.getElementById('aiChatMessages');

  if (aiAssistantBtn && aiChatBox) {
    aiAssistantBtn.addEventListener('click', () => {
      aiChatBox.classList.add('active');
    });

    aiChatClose.addEventListener('click', () => {
      aiChatBox.classList.remove('active');
    });

    // Simple chat interaction
    const sendMessage = () => {
      const text = aiChatInput.value.trim();
      if (!text) return;

      // Add user message
      const userMsg = document.createElement('div');
      userMsg.classList.add('ai-message', 'ai-sent');
      userMsg.textContent = text;
      aiChatMessages.appendChild(userMsg);
      aiChatInput.value = '';
      aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

      // Add loading state
      const aiResponse = document.createElement('div');
      aiResponse.classList.add('ai-message', 'ai-received');
      aiResponse.innerHTML = '<span class="typing-indicator">...</span>';
      aiChatMessages.appendChild(aiResponse);
      aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

      // Call secure Vercel API backend
      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            aiResponse.textContent = "Ошибка: " + data.error;
          } else {
            aiResponse.textContent = data.reply;
          }
          aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
        })
        .catch(err => {
          console.error(err);
          aiResponse.textContent = "Ошибка: нет связи с сервером.";
          aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
        });
    };

    aiSendBtn.addEventListener('click', sendMessage);
    aiChatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
});

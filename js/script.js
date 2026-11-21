/* -------------------------------------------------------------------------- */
/* ABHAY SHARMA PORTFOLIO - DYNAMIC INTERACTIVE & SCROLL ANIMATIONS          */
/* -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Interactive Cursor Spotlight Follower
  let spotlight = document.getElementById('cursorSpotlight');
  if (!spotlight) {
    spotlight = document.createElement('div');
    spotlight.className = 'cursor-spotlight';
    spotlight.id = 'cursorSpotlight';
    document.body.appendChild(spotlight);
  }

  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  // 2. Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.style.display === 'flex';
      navLinks.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(255, 255, 255, 0.98)';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderRadius = '20px';
        navLinks.style.marginTop = '0.5rem';
        navLinks.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
      }
    });
  }

  // 3. Smooth Navigation Anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        if (window.innerWidth <= 640 && navLinks) {
          navLinks.style.display = 'none';
        }
      }
    });
  });

  // 4. Dynamic Scroll Pop-In & Diagonal Reveal Observer
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.scroll-pop-element').forEach(el => {
    scrollObserver.observe(el);
  });

  // 5. Contact Email Copy Toast Notification
  const copyEmailBtns = document.querySelectorAll('#copyEmailBtn, #socialEmailPill');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'sharmaabhvay2004@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard! (sharmaabhvay2004@gmail.com)');
      }).catch(() => {
        showToast('Contact: sharmaabhvay2004@gmail.com');
      });
    });
  });

  // Toast Function
  function showToast(message) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotification';
      toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #0f172a;
        color: #ffffff;
        border: 1px solid #2f7a72;
        padding: 0.85rem 1.5rem;
        border-radius: 9999px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        font-size: 0.88rem;
        font-weight: 600;
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
      `;
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span style="color: #149ebb;">✓</span> ${message}`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
    }, 3500);
  }

  // 6. Interactive SIEM / Python Lab Drawer Modal
  const labTrigger = document.getElementById('labTrigger');
  const labModal = document.getElementById('labModal');
  const modalClose = document.getElementById('modalClose');

  if (labTrigger && labModal && modalClose) {
    labTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      labModal.classList.add('active');
    });

    modalClose.addEventListener('click', () => {
      labModal.classList.remove('active');
    });

    labModal.addEventListener('click', (e) => {
      if (e.target === labModal) {
        labModal.classList.remove('active');
      }
    });
  }

  // 7. Full Photo Preview Modal
  const heroPortrait = document.getElementById('heroPortraitCard');
  if (heroPortrait) {
    heroPortrait.addEventListener('click', () => {
      let photoModal = document.getElementById('photoModal');
      if (!photoModal) {
        photoModal = document.createElement('div');
        photoModal.id = 'photoModal';
        photoModal.className = 'modal-overlay';
        photoModal.innerHTML = `
          <div class="modal-box" style="max-width: 600px; text-align: center;">
            <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('active')">&times;</button>
            <img src="abhay_original_photo.jpg" alt="Abhay Sharma Full Photo" style="width:100%; max-height: 540px; object-fit: contain; border-radius: 16px;">
            <p style="margin-top: 1rem; font-size: 0.95rem; color: #94a3b8; font-weight: 600;">Abhay Sharma — SOC Analyst</p>
          </div>
        `;
        document.body.appendChild(photoModal);
      }
      photoModal.classList.add('active');
    });
  }

  // 8. Funny Cybersecurity Quotes Rotater
  const quotesList = [
    '"I parse SIEM logs so your databases don\'t pull an all-nighter. 🛡️ Port 443 is open, and so is my inbox!"',
    '"There are 10 types of people in the world: those who understand binary, and those who get hacked. 🔐"',
    '"My Python scripts run so smooth even your anti-virus gives them a high-five. 🐍"',
    '"Vulnerabilities are like uninvited guests — I detect them before they eat all the snacks! 🚨"',
    '"I monitor logs harder than a cat watching a laser pointer. 💻 Let\'s talk!"'
  ];

  const quoteBox = document.getElementById('funnyQuoteBox');
  const quoteText = document.getElementById('quoteText');
  let quoteIdx = 0;

  if (quoteBox && quoteText) {
    quoteBox.style.cursor = 'pointer';
    quoteBox.title = 'Click for another funny quote!';
    quoteBox.addEventListener('click', () => {
      quoteIdx = (quoteIdx + 1) % quotesList.length;
      quoteText.style.opacity = '0';
      quoteText.style.transition = 'opacity 0.2s ease';
      setTimeout(() => {
        quoteText.textContent = quotesList[quoteIdx];
        quoteText.style.opacity = '1';
      }, 200);
    });
  }

  // 9. Minimalist Contact Form Validation & Integration Handler
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const phoneInput = document.getElementById('contactPhone');
  const messageInput = document.getElementById('contactMessage');
  const submitBtn = document.getElementById('minimalSubmitBtn');
  const statusAlert = document.getElementById('formStatusAlert');

  // FORMSPREE ENDPOINT CONFIGURATION (Live Active Endpoint)
  const FORM_ENDPOINT = 'https://formspree.io/f/xppwlkay';

  // Strict Real Email Validator Function
  function validateStrictEmail(email) {
    if (!email || typeof email !== 'string') return { valid: false, reason: 'Please enter your email address.' };
    
    const trimmed = email.trim().toLowerCase();
    
    // RFC 5322 strict pattern requiring valid username, domain, and 2-12 char TLD
    const rfcRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,12}$/;
    if (!rfcRegex.test(trimmed)) {
      return { valid: false, reason: 'Please enter a valid, complete email address (e.g. name@gmail.com).' };
    }
    
    const parts = trimmed.split('@');
    if (parts.length !== 2) return { valid: false, reason: 'Invalid email structure.' };
    
    const [user, domain] = parts;
    
    // Minimum length checks
    if (user.length < 2) {
      return { valid: false, reason: 'Email username must be at least 2 characters long.' };
    }
    
    const domainParts = domain.split('.');
    if (domainParts.length < 2 || domainParts[0].length < 2) {
      return { valid: false, reason: 'Please enter a valid domain name (e.g. gmail.com, outlook.com).' };
    }
    
    // Blacklist of disposable / fake / random domains
    const disposableDomains = [
      'example.com', 'test.com', 'asdf.com', 'temp.com', 'qwerty.com', 
      'fake.com', 'mailinator.com', '10minutemail.com', 'trashmail.com', 
      'yopmail.com', 'guerrillamail.com', 'dispostable.com', 'tempmail.com', 
      'sharklasers.com', 'getairmail.com', 'throwawaymail.com', 'binkmail.com',
      'bobmail.info', 'chammy.info', 'devnullmail.com', 'letimail.com'
    ];
    
    if (disposableDomains.includes(domain)) {
      return { valid: false, reason: 'Please enter a real email address (disposable/test domains are not accepted).' };
    }

    // Typo helper checks
    if (domain === 'gnail.com' || domain === 'gamil.com' || domain === 'hotmial.com') {
      const fixedDomain = domain.replace('gnail', 'gmail').replace('gamil', 'gmail').replace('hotmial', 'hotmail');
      return { valid: false, reason: `Did you mean ${fixedDomain}? Please check your email spelling.` };
    }
    
    return { valid: true };
  }

  if (contactForm) {
    const setError = (inputEl, errorEl, msg) => {
      if (!inputEl) return;
      inputEl.classList.add('input-error');
      inputEl.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = msg;
    };

    const clearError = (inputEl, errorEl) => {
      if (!inputEl) return;
      inputEl.classList.remove('input-error');
      inputEl.removeAttribute('aria-invalid');
      if (errorEl) errorEl.textContent = '';
    };

    // Live validation feedback clearing on input
    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          const errEl = document.getElementById(`${input.name}Error`);
          clearError(input, errEl);
        });
      }
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      let isValid = true;
      let firstErrorField = null;

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const phoneError = document.getElementById('phoneError');
      const messageError = document.getElementById('messageError');

      // 1. Name Validation (Required)
      if (!nameVal) {
        setError(nameInput, nameError, 'Please enter your name.');
        isValid = false;
        if (!firstErrorField) firstErrorField = nameInput;
      } else {
        clearError(nameInput, nameError);
      }

      // 2. Strict Real Email Validation
      const emailCheck = validateStrictEmail(emailVal);
      if (!emailCheck.valid) {
        setError(emailInput, emailError, emailCheck.reason);
        isValid = false;
        if (!firstErrorField) firstErrorField = emailInput;
      } else {
        clearError(emailInput, emailError);
      }

      // 3. Phone Validation (Optional - validate format if provided)
      const phoneRegex = /^[\+\d\s\-\(\)]{7,20}$/;
      if (phoneVal && !phoneRegex.test(phoneVal)) {
        setError(phoneInput, phoneError, 'Please enter a valid phone number (e.g. +91 98765 43210).');
        isValid = false;
        if (!firstErrorField) firstErrorField = phoneInput;
      } else {
        clearError(phoneInput, phoneError);
      }

      // 4. Message Validation (Required & Min length 10 chars)
      if (!messageVal) {
        setError(messageInput, messageError, 'Please enter your message.');
        isValid = false;
        if (!firstErrorField) firstErrorField = messageInput;
      } else if (messageVal.length < 10) {
        setError(messageInput, messageError, 'Message should be at least 10 characters long.');
        isValid = false;
        if (!firstErrorField) firstErrorField = messageInput;
      } else {
        clearError(messageInput, messageError);
      }

      if (!isValid) {
        if (firstErrorField) firstErrorField.focus();
        return;
      }

      // Form is valid - handle submission loading state
      submitBtn.disabled = true;
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending... ⏳';
      statusAlert.style.display = 'none';

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: nameVal,
            email: emailVal,
            phone: phoneVal || 'Not provided',
            message: messageVal
          })
        });

        if (response.ok) {
          showStatus('success', `✓ Thank you, ${nameVal}! Your message has been sent successfully to Abhay.`);
          contactForm.reset();
        } else {
          const data = await response.json().catch(() => ({}));
          if (data.errors && data.errors.length > 0) {
            showStatus('error', `⚠️ ${data.errors.map(err => err.message).join(', ')}`);
          } else {
            showStatus('error', '⚠️ Failed to send message. Please try emailing directly at sharmaabhvay2004@gmail.com.');
          }
        }
      } catch (err) {
        showStatus('error', '⚠️ Network error. Please check your internet connection or email directly.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }

      function showStatus(type, message) {
        statusAlert.className = `form-status-alert ${type}`;
        statusAlert.textContent = message;
        statusAlert.style.display = 'block';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. STEALTH CYBER DARK MODE TOGGLE & PERSISTENCE
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('portfolio-theme') || 'light';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }

  applyTheme(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(newTheme === 'dark' ? '🌙 Stealth Cyber Dark Mode Activated' : '☀️ Editorial Light Mode Activated');
    });
  }



  // --------------------------------------------------------------------------
  // 12. OFFICIAL CREDENTIAL VERIFICATION MODAL
  // --------------------------------------------------------------------------
  const certModal = document.getElementById('certModal');
  const certModalClose = document.getElementById('certModalClose');

  const certData = {
    google_cyber: {
      badge: '🛡️',
      title: 'Google Cybersecurity Certificate',
      issuer: 'Google · Coursera',
      type: 'Official Professional Certification',
      date: 'Earned Dec 9, 2024',
      id: 'Credential ID: ZSBJVR9NCTFN',
      image: 'images/certs/google_cybersecurity_cert.png',
      skills: [
        'Cybersecurity Fundamentals',
        'Security Risks & Controls',
        'Linux & Bash Command-Line',
        'SQL for Security Databases',
        'Python Automation',
        'Network Security Architecture',
        'Incident Response & Triage',
        'Security Monitoring & SIEM'
      ],
      link: 'https://coursera.org/verify/professional-cert/ZSBJVR9NCTFN'
    },
    fabric: {
      badge: '⚡',
      title: 'Microsoft Certified: Fabric Analytics Engineer Associate',
      issuer: 'Microsoft',
      type: 'Official Microsoft Certification',
      date: 'Earned Aug 6, 2026 · Valid to Aug 6, 2027',
      id: 'Credential ID: 61404E4EEAB38249 · Cert: 3CE965-A7A630',
      image: 'images/certs/microsoft_fabric_cert.png',
      skills: ['Microsoft Fabric', 'Data Lakehouse', 'Synapse Data Engineering', 'Power BI Modeling', 'KQL / Real-Time Analytics'],
      link: 'https://learn.microsoft.com/credentials/'
    },
    hubspot: {
      badge: '📈',
      title: 'HubSpot SEO II Certified',
      issuer: 'HubSpot Academy',
      type: 'Official Industry Certification',
      date: 'Valid: Jun 29, 2026 – Jul 28, 2028',
      id: 'Certification Code: 71b9b9b68a604fe2a89f9a7a722a97ad',
      image: 'images/certs/hubspot_seo_cert.png',
      skills: ['Technical SEO Auditing', 'Search Engine Architecture', 'Content Strategy', 'Site Performance Optimization'],
      link: 'https://academy.hubspot.com/'
    },
    commbank: {
      badge: '🏦',
      title: 'Commonwealth Bank Cyber Job Simulation',
      issuer: 'Commonwealth Bank / Forage',
      type: 'Practical Cyber Job Simulation & Case Study',
      date: 'February 2026',
      id: 'Credential ID: CBA-CYBER-3104-AS',
      image: 'images/certs/commonwealth_bank_cert.png',
      skills: ['Incident Response Procedures', 'Security Controls Evaluation', 'Data Privacy Audits', 'Threat Modeling'],
      link: 'https://www.theforage.com/'
    },
    tata: {
      badge: '🛡️',
      title: 'Cybersecurity Analyst Job Simulation',
      issuer: 'Tata Group / Forage',
      type: 'Practical Cyber Job Simulation & Case Study',
      date: 'December 2025',
      id: 'Credential ID: TATA-CYBER-8819-AS',
      image: 'images/certs/tata_cybersecurity_cert.png',
      skills: ['SIEM Architecture', 'Security Operations Center (SOC)', 'Log Ingestion & Parsing', 'Threat Intelligence'],
      link: 'https://www.theforage.com/'
    },
    deloitte: {
      badge: '🔐',
      title: 'Cybersecurity Job Simulation',
      issuer: 'Deloitte Australia / Forage',
      type: 'Practical Cyber Job Simulation & Case Study',
      date: 'December 2025',
      id: 'Credential ID: DEL-CYBER-4401-AS',
      image: 'images/certs/deloitte_cyber_cert.png',
      skills: ['Incident Triage & Containment', 'Malware Analysis Fundamentals', 'Zero Trust Architecture', 'Executive Incident Reporting'],
      link: 'https://www.theforage.com/'
    },
    learntube: {
      badge: '📋',
      title: 'Project Management Assessment',
      issuer: 'LearnTube.ai',
      type: 'Skill Assessment Credential',
      date: 'November 2025',
      id: 'Assessment ID: LT-PM-5120-AS',
      image: 'images/certs/learntube_pm_cert.png',
      skills: ['Agile Project Delivery', 'Scrum Framework', 'Risk Assessment', 'Security Project Lifecycles'],
      link: 'https://learntube.ai/'
    },
    gdsc: {
      badge: '🌐',
      title: 'Google Developer Solutions Workshop Credential',
      issuer: 'Google Developer Groups on Campus (Atria Institute of Technology)',
      type: 'Technical Workshop & Development Credential',
      date: 'Dec 18, 2024 / Apr 2024',
      id: 'Credential ID: GDG-AIT-TECH-2024-AS',
      image: 'images/certs/google_developer_cert.png',
      skills: ['Cloud Solutions', 'Application Security', 'Python Development', 'API Design & DevOps'],
      link: 'https://gdg.community.dev/'
    }
  };

  window.openCertModal = function(certKey) {
    const cert = certData[certKey];
    if (!cert || !certModal) return;

    const badgeEl = document.getElementById('certModalBadge');
    const titleEl = document.getElementById('certModalTitle');
    const issuerEl = document.getElementById('certModalIssuer');
    const typeEl = document.getElementById('certModalType');
    const dateEl = document.getElementById('certModalDate');
    const idEl = document.getElementById('certModalId');
    const imgEl = document.getElementById('certModalImage');
    const directLinkEl = document.getElementById('certImageDirectLink');

    if (badgeEl) badgeEl.textContent = cert.badge;
    if (titleEl) titleEl.textContent = cert.title;
    if (issuerEl) issuerEl.textContent = cert.issuer;
    if (typeEl) typeEl.textContent = cert.type;
    if (dateEl) dateEl.textContent = cert.date;
    if (idEl) idEl.textContent = cert.id;

    if (imgEl && cert.image) {
      imgEl.src = cert.image;
      imgEl.alt = cert.title;
    }
    if (directLinkEl && cert.image) {
      directLinkEl.href = cert.image;
    }

    const skillsContainer = document.getElementById('certModalSkills');
    if (skillsContainer) {
      skillsContainer.innerHTML = cert.skills.map(skill => `<span class="tag-pill">${skill}</span>`).join('');
    }

    const externalLink = document.getElementById('certVerifyExternalLink');
    if (externalLink) {
      externalLink.href = cert.link;
    }

    certModal.classList.add('active');
  };

  if (certModalClose && certModal) {
    certModalClose.addEventListener('click', () => certModal.classList.remove('active'));
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) certModal.classList.remove('active');
    });
  }

  // Keyboard shortcut listener for Escape key to close modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
      certModal.classList.remove('active');
    }
  });

});


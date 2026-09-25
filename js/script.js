/* -------------------------------------------------------------------------- */
/* ABHAY SHARMA PORTFOLIO - DYNAMIC INTERACTIVE & SCROLL ANIMATIONS          */
/* -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Interactive Cursor Spotlight Follower
  const spotlight = document.createElement('div');
  spotlight.className = 'cursor-spotlight';
  document.body.appendChild(spotlight);

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
      const email = 'sharmaabhay.tech@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard! (sharmaabhay.tech@gmail.com)');
      }).catch(() => {
        showToast('Contact: sharmaabhay.tech@gmail.com');
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
            showStatus('error', '⚠️ Failed to send message. Please try emailing directly at sharmaabhay.tech@gmail.com.');
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
});

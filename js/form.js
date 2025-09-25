/* Contact Form functionality */

const form = document.getElementById('contactForm');
const submitBtn = form.querySelector('.submit-btn');

// Form validation
function validateField(field, errorId, validationFn) {
    const value = field.value.trim();
    const errorElement = document.getElementById(errorId);
    const isValid = validationFn(value);
    
    if (isValid) {
        field.classList.remove('error');
        errorElement.classList.remove('show');
    } else {
        field.classList.add('error');
        errorElement.classList.add('show');
    }
    
    return isValid;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.length > 0 && emailRegex.test(email);
}

function validatePhone(phone) {
    if (phone.length === 0) return true;
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Real-time validation
form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('blur', function() {
        const fieldName = this.name;
        
        switch(fieldName) {
            case 'name':
                validateField(this, 'nameError', value => value.length > 0);
                break;
            case 'email':
                validateField(this, 'emailError', validateEmail);
                break;
            case 'subject':
                validateField(this, 'subjectError', value => value.length > 0);
                break;
            case 'message':
                validateField(this, 'messageError', value => value.length > 10);
                break;
        }
    });
    
// Remove error state when typing
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            const errorId = this.name + 'Error';
            document.getElementById(errorId).classList.remove('show');
        }
    });
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
// Validate all fields
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    const isNameValid = validateField(name, 'nameError', value => value.length > 0);
    const isEmailValid = validateField(email, 'emailError', validateEmail);
    const isSubjectValid = validateField(subject, 'subjectError', value => value.length > 0);
    const isMessageValid = validateField(message, 'messageError', value => value.length > 10);
    
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        submitBtn.classList.add('loading');
        
      setTimeout(() => {
          form.style.display = 'none';
          document.querySelector('.legal-text').style.display = 'none';
          document.getElementById('successMessage').classList.add('show');
          
// Redirect to home page after 60 seconds
          setTimeout(() => {
              window.location.href = 'index.html';
          }, 60000);
      }, 2000);
    }
});

function resetForm() {
    form.reset();
    form.style.display = 'block';
    document.querySelector('.form-header').style.display = 'block';
    document.getElementById('successMessage').classList.remove('show');
    submitBtn.classList.remove('loading');
    
// Clear any error states
    form.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('error');
    });
    form.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
    });
} /*

// Form submission - Netlify version
form.addEventListener('submit', function(e) {
// Validate all fields before submission
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    const isNameValid = validateField(name, 'nameError', value => value.length > 0);
    const isEmailValid = validateField(email, 'emailError', validateEmail);
    const isSubjectValid = validateField(subject, 'subjectError', value => value.length > 0);
    const isMessageValid = validateField(message, 'messageError', value => value.length > 10);
    
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
// Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
// Let Netlify handle the form submission
// The ?success=true will trigger handleNetlifySuccess() on page reload
    } else {
// Prevent submission if validation fails
        e.preventDefault();
        
// Scroll to first error field
        const firstError = form.querySelector('.form-input.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
});

// Handle successful Netlify submission
function handleNetlifySuccess() {
// Show loading for 2 seconds first
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
    }
    
    setTimeout(() => {
        const form = document.getElementById('contactForm');
        const legalText = document.querySelector('.legal-text');
        const successMessage = document.getElementById('successMessage');
        
        if (form) form.style.display = 'none';
        if (legalText) legalText.style.display = 'none';
        if (successMessage) successMessage.classList.add('show');
        
// Redirect to home page after 60 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 60000);
    }, 2000);
}

// Check URL for success parameter
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('success') === 'true') {
    handleNetlifySuccess();
} */
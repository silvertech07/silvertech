// SilverTech Industrial Services - Main JavaScript File

$(document).ready(function () {
  // Initialize Materialize components
  initializeMaterialize();

  // Setup event listeners
  setupEventListeners();

  // Show welcome message
  showWelcomeMessage();
});

/**
 * Initialize all Materialize CSS components
 */
function initializeMaterialize() {
  // Initialize side navigation with toggle logic
  var sidenavElems = document.querySelectorAll('.sidenav');
  var sidenavInstances = M.Sidenav.init(sidenavElems, {
    edge: 'right', // Open from right side
    onOpenStart: function () { $('.sidenav-trigger').addClass('is-active'); },
    onCloseStart: function () { $('.sidenav-trigger').removeClass('is-active'); }
  });

  // Custom Toggle functionality for Floating Menu
  $('.sidenav-trigger').off('click').on('click', function (e) {
    var instance = M.Sidenav.getInstance($('.sidenav'));
    if (instance.isOpen) {
      e.preventDefault();
      e.stopPropagation();
      instance.close();
    }
    // If closed, default Materialize behavior handles opening
  });

  // Initialize modals
  $('.modal').modal();

  // Initialize dropdowns
  $('.dropdown-trigger').dropdown();

  // Initialize tooltips
  $('.tooltipped').tooltip();

  // Initialize form selects
  $('select').formSelect();

  // Initialize carousel
  $('.carousel').carousel({
    indicators: true
  });
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // Smooth scrolling for internal links
  setupSmoothScrolling();

  // Scroll indicator click handler
  setupScrollIndicator();
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
  $('a[href^="#"]').on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;

      // Animate scroll to target
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 64 // Account for fixed navbar
      }, 800, function () {
        // Update URL hash after animation
        window.location.hash = hash;
      });
    }
  });
}

/**
 * Setup scroll indicator functionality
 */
function setupScrollIndicator() {
  $('.scroll-indicator').on('click', function () {
    $('html, body').animate({
      scrollTop: $('#intro').offset().top - 64
    }, 800);
  });
}

/**
 * Show welcome toast message
 */
function showWelcomeMessage() {
  M.toast({
    html: 'Welcome to SilverTech Industrial Services',
    classes: 'rounded',
    displayLength: 3000
  });
}

/**
 * Utility function to check if element is in viewport
 * @param {jQuery} element - jQuery element to check
 * @returns {boolean} - True if element is in viewport
 */
function isInViewport(element) {
  var elementTop = element.offset().top;
  var elementBottom = elementTop + element.outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
}

/**
 * Add scroll-based animations (optional enhancement)
 */
function setupScrollAnimations() {
  $(window).on('scroll', function () {
    // Add scroll-based animations here if needed
    // Example: Fade in elements when they come into view
    $('.service-card').each(function () {
      if (isInViewport($(this))) {
        $(this).addClass('animate-fade-in');
      }
    });
  });
}

/**
 * Form validation helper (for contact forms)
 * @param {string} formId - ID of the form to validate
 * @returns {boolean} - True if form is valid
 */
function validateForm(formId) {
  var isValid = true;
  var form = $('#' + formId);

  // Check required fields
  form.find('input[required], textarea[required]').each(function () {
    if ($(this).val().trim() === '') {
      $(this).addClass('invalid');
      isValid = false;
    } else {
      $(this).removeClass('invalid');
    }
  });

  // Validate email format
  form.find('input[type="email"]').each(function () {
    var email = $(this).val();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      $(this).addClass('invalid');
      isValid = false;
    }
  });

  return isValid;
}

/**
 * Show loading spinner
 * @param {string} message - Optional loading message
 */
function showLoading(message = 'Loading...') {
  // Create loading overlay if it doesn't exist
  if ($('#loading-overlay').length === 0) {
    $('body').append(`
      <div id="loading-overlay" class="loading-overlay">
        <div class="loading-content">
          <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div>
              <div class="gap-patch">
                <div class="circle"></div>
              </div>
              <div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
          <p>${message}</p>
        </div>
      </div>
    `);
  }

  $('#loading-overlay').fadeIn(300);
}

/**
 * Hide loading spinner
 */
function hideLoading() {
  $('#loading-overlay').fadeOut(300);
}

/**
 * Display success message
 * @param {string} message - Success message to display
 */
function showSuccess(message) {
  M.toast({
    html: `<i class="material-icons left">check_circle</i>${message}`,
    classes: 'green rounded',
    displayLength: 4000
  });
}

/**
 * Display error message
 * @param {string} message - Error message to display
 */
function showError(message) {
  M.toast({
    html: `<i class="material-icons left">error</i>${message}`,
    classes: 'red rounded',
    displayLength: 5000
  });
}

/**
 * Format phone number for display
 * @param {string} phone - Raw phone number
 * @returns {string} - Formatted phone number
 */
function formatPhone(phone) {
  // Remove all non-digits
  var cleaned = phone.replace(/\D/g, '');

  // Format Indian mobile number
  if (cleaned.length === 10) {
    return '+91 ' + cleaned.substring(0, 5) + ' ' + cleaned.substring(5);
  }

  return phone; // Return original if not standard format
}

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
  var timeout;
  return function executedFunction(...args) {
    var later = function () {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export functions for use in other scripts (if needed)
window.SilverTech = {
  validateForm: validateForm,
  showLoading: showLoading,
  hideLoading: hideLoading,
  showSuccess: showSuccess,
  showError: showError,
  formatPhone: formatPhone,
  debounce: debounce
};
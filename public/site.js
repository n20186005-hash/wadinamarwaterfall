(() => {
  const header = document.querySelector('.site-header');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const consentBox = document.getElementById('analytics-consent');
  const key = 'wadi-namar-analytics-consent';
  const GA_ID = 'G-HXM22WWPKP';

  const loadAnalytics = () => {
    if (document.querySelector('script[data-ga4]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.dataset.ga4 = 'true';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  };

  const choice = localStorage.getItem(key);
  if (choice === 'accepted') loadAnalytics();
  if (!choice) consentBox?.classList.add('show');

  document.querySelector('[data-consent="accept"]')?.addEventListener('click', () => {
    localStorage.setItem(key, 'accepted');
    consentBox?.classList.remove('show');
    loadAnalytics();
  });

  document.querySelector('[data-consent="reject"]')?.addEventListener('click', () => {
    localStorage.setItem(key, 'rejected');
    consentBox?.classList.remove('show');
  });

  document.querySelector('[data-consent="settings"]')?.addEventListener('click', () => {
    localStorage.removeItem(key);
    consentBox?.classList.add('show');
  });

  document.querySelectorAll('[data-dialog-open]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-dialog-open');
      const dialog = id ? document.getElementById(id) : null;
      if (dialog instanceof HTMLDialogElement) dialog.showModal();
    });
  });

  document.querySelectorAll('[data-dialog-close]').forEach((button) => {
    button.addEventListener('click', () => {
      const dialog = button.closest('dialog');
      if (dialog instanceof HTMLDialogElement) dialog.close();
    });
  });
})();

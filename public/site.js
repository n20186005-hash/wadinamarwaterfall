(() => {
  const header = document.querySelector('.site-header');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  const box = document.getElementById('analytics-consent');
  const status = document.getElementById('consent-status');
  const key = 'wadi-namar-analytics-consent';
  const veto = key + '-denied-tab';
  const id = 'G-HXM22WWPKP';
  let configured = false;
  const read = (store, name) => { try { return { ok: true, value: window[store].getItem(name) }; } catch { return { ok: false }; } };
  const write = (store, name, value) => { try { window[store].setItem(name, value); const r = read(store, name); return r.ok && r.value === value; } catch { return false; } };
  const remove = (store, name) => { try { window[store].removeItem(name); const r = read(store, name); return r.ok && r.value === null; } catch { return false; } };
  const say = (text, show = true) => { if (status) status.textContent = text; const feedback = document.getElementById('consent-feedback'); if (feedback) feedback.textContent = text; if (show) box?.classList.add('show'); };
  const deny = () => { window['ga-disable-' + id] = true; if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: 'denied' }); };
  const grant = () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    if (!configured && !document.querySelector('script[data-ga4]')) {
      window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      window.gtag('js', new Date()); window.gtag('config', id);
      const script = document.createElement('script'); script.async = true; script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`; script.dataset.ga4 = 'true'; document.head.appendChild(script); configured = true;
    }
    window['ga-disable-' + id] = false;
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
  };
  const refuse = () => {
    deny();
    const tabSaved = write('sessionStorage', veto, '1');
    let sharedSafe = write('localStorage', key, 'rejected');
    if (!sharedSafe) sharedSafe = remove('localStorage', key);
    if (sharedSafe) { say('التحليلات موقوفة. تم التحقق من حفظ الرفض أو إزالة الإذن المشترك.', false); box?.classList.remove('show'); }
    else say('التحليلات موقوفة ' + (tabSaved ? 'في هذا التبويب، مع محاولة الاحتفاظ بالرفض عند إعادة تحميله.' : 'لهذه الصفحة فقط؛ لم نتأكد من الاحتفاظ بالرفض بعد إعادة التحميل.') + ' تعذر تأكيد إزالة الإذن المخزن؛ قد تستخدمه تبويبات أخرى، بما فيه إذن قد تكون كتبته المحاولة الفاشلة.');
    return sharedSafe;
  };
  const accept = () => {
    deny();
    const shared = read('localStorage', key); const tab = read('sessionStorage', veto);
    if (!shared.ok || !tab.ok) { refuse(); return; }
    // Verify clearing this tab's veto before publishing a shared grant.
    if (!remove('sessionStorage', veto)) { refuse(); return; }
    if (!write('localStorage', key, 'accepted')) { refuse(); return; }
    const finalShared = read('localStorage', key); const finalTab = read('sessionStorage', veto);
    if (!finalShared.ok || finalShared.value !== 'accepted' || !finalTab.ok || finalTab.value !== null) { refuse(); return; }
    grant(); say('تم التحقق من حفظ الموافقة؛ التحليلات مفعلة. اختر رفض لإيقافها.', false); box?.classList.remove('show');
  };
  deny();
  const initial = read('localStorage', key); const initialTab = read('sessionStorage', veto);
  if (initial.ok && initial.value === 'accepted' && initialTab.ok && initialTab.value === null) grant();
  else if (!initial.ok || !initialTab.ok) say('تعذر قراءة التفضيل بأمان؛ التحليلات موقوفة. يمكنك اختيار الرفض أو المحاولة مجدداً.');
  else if (initial.value !== 'rejected' || initialTab.value !== null) box?.classList.add('show');
  document.querySelector('[data-consent="accept"]')?.addEventListener('click', accept);
  document.querySelector('[data-consent="reject"]')?.addEventListener('click', refuse);
  document.querySelector('[data-consent="close"]')?.addEventListener('click', () => box?.classList.remove('show'));
  document.querySelector('[data-consent="settings"]')?.addEventListener('click', () => say('فتح الإعدادات لا يغير الاختيار الحالي. اختر رفض لإيقاف التحليلات أو موافق للتحقق من الحفظ.'));
  window.addEventListener('storage', (event) => { if (event.key === key || event.key === null) { deny(); say('تغير التفضيل في نافذة أخرى؛ التحليلات موقوفة هنا حتى تختار مجدداً.'); } });
  document.querySelectorAll('[data-dialog-open]').forEach((button) => button.addEventListener('click', () => { const target = document.getElementById(button.getAttribute('data-dialog-open')); if (target instanceof HTMLDialogElement) target.showModal(); }));
  document.querySelectorAll('[data-dialog-close]').forEach((button) => button.addEventListener('click', () => { const target = button.closest('dialog'); if (target instanceof HTMLDialogElement) target.close(); }));
})();

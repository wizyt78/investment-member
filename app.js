/* Investment Portal — member application
   Browser-safe Supabase client. Never place a secret/service-role key here.
*/
const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

const state = {
  lang: localStorage.getItem('portal_lang') || 'ar',
  profile: null, wallet: null, tx: [], inv: [], fr: [], wr: [], loading: false
};

const T = {
  ar: {
    brand:'Investment Portal',brandSub:'منطقة الأعضاء',memberArea:'منطقة الأعضاء',signIn:'تسجيل الدخول',signUp:'إنشاء حساب',welcomeBack:'مرحباً بعودتك',loginSub:'سجّل الدخول إلى حسابك بأمان.',username:'اسم المستخدم',password:'كلمة المرور',forgot:'نسيت كلمة المرور؟',reset:'إعادة التعيين',createAccount:'أنشئ حسابك',signupSub:'أنشئ حساباً جديداً للوصول إلى بوابتك.',fullName:'الاسم الكامل',email:'البريد الإلكتروني',confirmPassword:'تأكيد كلمة المرور',agree:'أوافق على الشروط وسياسة الاستخدام.',dashboard:'لوحة التحكم',investments:'استثماراتي',fundAccount:'تمويل الحساب',withdraw:'السحب',transactions:'المعاملات',profile:'الملف الشخصي',settings:'الإعدادات',logout:'تسجيل الخروج',securePortal:'بوابة آمنة',hello:'مرحباً',dashboardIntro:'تابع رصيدك واستثماراتك وطلباتك من مكان واحد.',availableBalance:'الرصيد المتاح',totalInvested:'إجمالي الاستثمار',earnings:'الأرباح المسجلة',recentTransactions:'آخر المعاملات',myInvestments:'استثماراتي',viewAll:'عرض الكل',investmentSub:'الاستثمارات المسجلة في حسابك.',fundSub:'أرسل طلب تمويل ليتم مراجعته من الإدارة.',amount:'المبلغ (KWD)',method:'طريقة الدفع',reference:'المرجع',notes:'ملاحظات',submitRequest:'إرسال الطلب',myFundingRequests:'طلبات التمويل',withdrawSub:'أرسل طلب سحب من رصيدك المتاح.',destination:'بيانات الاستلام',myWithdrawalRequests:'طلبات السحب',transactionsSub:'سجل العمليات المسجلة على حسابك.',profileSub:'حدّث معلومات ملفك الشخصي.',phone:'رقم الهاتف',saveChanges:'حفظ التغييرات',settingsSub:'تفضيلات حسابك.',language:'اللغة',languageSub:'اختر لغة واجهة الحساب.',avatar:'الصورة الشخصية',chooseImage:'اختيار صورة',saveImage:'حفظ الصورة',noData:'لا توجد بيانات بعد.',loading:'جارٍ التحميل...',requestSent:'تم إرسال الطلب بنجاح.',saved:'تم حفظ التغييرات.',loginFailed:'تعذر تسجيل الدخول.',signupDone:'تم إنشاء الحساب. تحقق من بريدك الإلكتروني قبل تسجيل الدخول.',passwordMismatch:'كلمتا المرور غير متطابقتين.',invalidAmount:'أدخل مبلغاً صحيحاً.',logoutDone:'تم تسجيل الخروج.',resetSent:'إذا كان البريد مسجلاً، ستصلك تعليمات إعادة التعيين.',resetPassword:'تعيين كلمة مرور جديدة',newPassword:'كلمة المرور الجديدة',confirmNewPassword:'تأكيد كلمة المرور الجديدة',updatePassword:'تحديث كلمة المرور',passwordUpdated:'تم تحديث كلمة المرور.',error:'حدث خطأ. حاول مرة أخرى.',pending:'قيد المراجعة',approved:'مقبول',rejected:'مرفوض',active:'نشط',completed:'مكتمل',cancelled:'ملغى',credit:'إضافة',debit:'خصم',funding:'تمويل',withdrawal:'سحب',investment:'استثمار',earning:'أرباح',selectMethod:'اختر الطريقة',bankTransfer:'تحويل بنكي',crypto:'أصول رقمية',other:'أخرى',enterDestination:'أدخل بيانات الاستلام',fileTooLarge:'حجم الصورة كبير جداً.',imageSaved:'تم حفظ الصورة.',usernameTaken:'اسم المستخدم مستخدم بالفعل.',invalidUsername:'اسم المستخدم يجب أن يكون من 3 إلى 30 حرفاً، ويحتوي على أحرف إنجليزية أو أرقام أو _ . - فقط.',emailTaken:'البريد الإلكتروني مستخدم بالفعل.',networkError:'تعذر الاتصال بالخدمة. تحقق من اتصال الإنترنت وحاول مرة أخرى.',profileLoadError:'تعذر تحميل بيانات الحساب.',sessionExpired:'انتهت جلسة الدخول. سجّل الدخول مرة أخرى.',accountInactive:'الحساب غير نشط. تواصل مع الإدارة.',passwordWeak:'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل.'
  },
  en: {
    brand:'Investment Portal',brandSub:'Member Area',memberArea:'Member Area',signIn:'Sign in',signUp:'Create account',welcomeBack:'Welcome back',loginSub:'Sign in securely to your account.',username:'Username',password:'Password',forgot:'Forgot your password?',reset:'Reset it',createAccount:'Create your account',signupSub:'Create a new account to access your portal.',fullName:'Full name',email:'Email address',confirmPassword:'Confirm password',agree:'I agree to the terms and usage policy.',dashboard:'Dashboard',investments:'My investments',fundAccount:'Fund account',withdraw:'Withdraw',transactions:'Transactions',profile:'Profile',settings:'Settings',logout:'Log out',securePortal:'Secure portal',hello:'Hello',dashboardIntro:'Track your balance, investments and requests in one place.',availableBalance:'Available balance',totalInvested:'Total invested',earnings:'Recorded earnings',recentTransactions:'Recent transactions',myInvestments:'My investments',viewAll:'View all',investmentSub:'Investments recorded on your account.',fundSub:'Submit a funding request for administrative review.',amount:'Amount (KWD)',method:'Payment method',reference:'Reference',notes:'Notes',submitRequest:'Submit request',myFundingRequests:'Funding requests',withdrawSub:'Submit a withdrawal request from your available balance.',destination:'Receiving details',myWithdrawalRequests:'Withdrawal requests',transactionsSub:'A record of transactions posted to your account.',profileSub:'Update your profile information.',phone:'Phone number',saveChanges:'Save changes',settingsSub:'Your account preferences.',language:'Language',languageSub:'Choose your account interface language.',avatar:'Profile picture',chooseImage:'Choose image',saveImage:'Save picture',noData:'No data yet.',loading:'Loading...',requestSent:'Request submitted successfully.',saved:'Changes saved.',loginFailed:'Unable to sign in.',signupDone:'Account created. Check your email before signing in.',passwordMismatch:'Passwords do not match.',invalidAmount:'Enter a valid amount.',logoutDone:'Signed out.',resetSent:'If that email is registered, reset instructions have been sent.',resetPassword:'Set a new password',newPassword:'New password',confirmNewPassword:'Confirm new password',updatePassword:'Update password',passwordUpdated:'Password updated.',error:'Something went wrong. Please try again.',pending:'Pending',approved:'Approved',rejected:'Rejected',active:'Active',completed:'Completed',cancelled:'Cancelled',credit:'Credit',debit:'Debit',funding:'Funding',withdrawal:'Withdrawal',investment:'Investment',earning:'Earnings',selectMethod:'Choose a method',bankTransfer:'Bank transfer',crypto:'Digital assets',other:'Other',enterDestination:'Enter receiving details',fileTooLarge:'Image is too large.',imageSaved:'Picture saved.',usernameTaken:'That username is already in use.',invalidUsername:'Username must be 3–30 characters and use only English letters, numbers, _ . or -.',emailTaken:'That email address is already registered.',networkError:'The service could not be reached. Check your internet connection and try again.',profileLoadError:'Unable to load your account data.',sessionExpired:'Your session has expired. Please sign in again.',accountInactive:'This account is not active. Please contact administration.',passwordWeak:'Password must be at least 8 characters.'
  }
};

const tr = key => T[state.lang]?.[key] || T.en[key] || key;
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function applyLang() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = tr(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = tr(el.dataset.i18nPlaceholder); });
  document.getElementById('langAr')?.classList.toggle('active', state.lang === 'ar');
  document.getElementById('langEn')?.classList.toggle('active', state.lang === 'en');
  document.getElementById('resetLangAr')?.classList.toggle('active', state.lang === 'ar');
  document.getElementById('resetLangEn')?.classList.toggle('active', state.lang === 'en');
  document.getElementById('topLang') && (document.getElementById('topLang').textContent = state.lang === 'ar' ? 'English' : 'العربية');
  document.title = tr('brand');
  if (state.profile) render();
}

function setLang(lang) {
  if (!T[lang]) return;
  state.lang = lang;
  localStorage.setItem('portal_lang', lang);
  applyLang();
}

function toast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 3200);
}

function friendlyError(error, fallback = tr('error')) {
  const message = String(error?.message || error || '').trim();
  const lower = message.toLowerCase();
  if (!navigator.onLine || lower.includes('failed to fetch') || lower.includes('load failed') || lower.includes('network')) return tr('networkError');
  if (lower.includes('username') && (lower.includes('duplicate') || lower.includes('unique'))) return tr('usernameTaken');
  if (lower.includes('already registered') || lower.includes('user already registered')) return tr('emailTaken');
  if (lower.includes('password') && (lower.includes('weak') || lower.includes('at least'))) return tr('passwordWeak');
  if (lower.includes('jwt') || lower.includes('session')) return tr('sessionExpired');
  return message || fallback;
}

function setBusy(button, busy, busyText) {
  if (!button) return;
  if (busy) {
    button.dataset.originalText = button.textContent;
    button.disabled = true;
    if (busyText) button.textContent = busyText;
  } else {
    button.disabled = false;
    if (button.dataset.originalText) button.textContent = button.dataset.originalText;
  }
}

function fmt(number) {
  return `KWD ${Number(number || 0).toLocaleString(state.lang === 'ar' ? 'ar-KW' : 'en-KW', {minimumFractionDigits:3, maximumFractionDigits:3})}`;
}

function initials(name) {
  return (name || 'U').trim().split(/\s+/).map(x => x[0]).slice(0, 2).join('').toUpperCase() || 'U';
}

function statusBadge(status) { return `<span class="badge">${esc(tr(status))}</span>`; }

async function currentUser() {
  const { data, error } = await sb.auth.getUser();
  if (error) throw error;
  return data.user;
}

async function loadData() {
  const user = await currentUser();
  if (!user) throw new Error(tr('sessionExpired'));

  const results = await Promise.all([
    sb.from('profiles').select('*').eq('id', user.id).single(),
    sb.from('wallets').select('*').eq('user_id', user.id).single(),
    sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', {ascending:false}).limit(50),
    sb.from('investments').select('*').eq('user_id', user.id).order('created_at', {ascending:false}),
    sb.from('funding_requests').select('*').eq('user_id', user.id).order('created_at', {ascending:false}),
    sb.from('withdrawal_requests').select('*').eq('user_id', user.id).order('created_at', {ascending:false})
  ]);

  const [p,w,tx,inv,fr,wr] = results;
  const firstError = results.find(r => r.error)?.error;
  if (firstError) throw firstError;
  if (!p.data || !w.data) throw new Error(tr('profileLoadError'));

  state.profile = p.data;
  state.wallet = w.data;
  state.tx = tx.data || [];
  state.inv = inv.data || [];
  state.fr = fr.data || [];
  state.wr = wr.data || [];
  render();
}

function render() {
  const p = state.profile || {};
  document.getElementById('userNameTop').textContent = p.full_name || p.username || '—';
  document.getElementById('userEmailTop').textContent = p.email || '—';
  document.getElementById('heroName').textContent = p.full_name || p.username || '—';
  setAvatar('avatarSmall', p); setAvatar('profileAvatar', p);

  const w = state.wallet || {};
  document.getElementById('balance').textContent = fmt(w.balance);
  document.getElementById('invested').textContent = fmt(w.total_invested);
  document.getElementById('earnings').textContent = fmt(w.recorded_earnings);

  const positive = ['credit','funding','earning'];
  renderRows('recentTx', state.tx.slice(0,5), x => `<div class="row"><div><strong>${esc(tr(x.type))}</strong><small>${esc(x.description || x.reference || '')}</small></div><div class="amount ${positive.includes(x.type) ? 'positive' : 'negative'}">${positive.includes(x.type) ? '+' : '-'} ${fmt(x.amount)}</div></div>`);
  renderRows('transactionList', state.tx, x => `<div class="row"><div><strong>${esc(tr(x.type))}</strong><small>${new Date(x.created_at).toLocaleString(state.lang === 'ar' ? 'ar-KW' : 'en-KW')} · ${esc(x.description || '')}</small></div><div>${statusBadge(x.status)} <span class="amount">${fmt(x.amount)}</span></div></div>`);
  renderRows('recentInv', state.inv.slice(0,5), x => `<div class="row"><div><strong>${esc(x.plan_name)}</strong><small>${esc(tr(x.status))}</small></div><div class="amount">${fmt(x.amount)}</div></div>`);
  renderRows('investmentList', state.inv, x => `<div class="row"><div><strong>${esc(x.plan_name)}</strong><small>${esc(tr(x.status))} · ${new Date(x.created_at).toLocaleDateString(state.lang === 'ar' ? 'ar-KW' : 'en-KW')}</small></div><div class="amount">${fmt(x.amount)}</div></div>`);
  renderRows('fundingList', state.fr, x => `<div class="row"><div><strong>${esc(tr('funding'))} · ${fmt(x.amount)}</strong><small>${esc(x.payment_method)} ${x.reference ? '· ' + esc(x.reference) : ''}</small></div>${statusBadge(x.status)}</div>`);
  renderRows('withdrawalList', state.wr, x => `<div class="row"><div><strong>${esc(tr('withdrawal'))} · ${fmt(x.amount)}</strong><small>${esc(x.method)}</small></div>${statusBadge(x.status)}</div>`);

  document.getElementById('profileName').value = p.full_name || '';
  document.getElementById('profilePhone').value = p.phone || '';
  document.getElementById('profileEmail').value = p.email || '';
  document.getElementById('profileUsername').value = p.username || '';
}

function setAvatar(id, profile) {
  const el = document.getElementById(id); if (!el) return;
  if (profile.avatar_url) {
    el.innerHTML = `<img src="${esc(profile.avatar_url)}" alt="">`;
    el.classList.add('has-image');
  } else {
    el.textContent = initials(profile.full_name || profile.username);
    el.classList.remove('has-image');
  }
}

function renderRows(id, rows, renderer) {
  const el = document.getElementById(id); if (!el) return;
  el.innerHTML = rows.length ? rows.map(renderer).join('') : `<div class="empty">${esc(tr('noData'))}</div>`;
}

async function emailForUsername(username) {
  const clean = username.trim();
  if (!clean) return null;
  const { data, error } = await sb.rpc('get_email_for_username', {p_username: clean});
  if (error) throw error;
  return data || null;
}

async function loginWithUsername(username, password) {
  const email = await emailForUsername(username);
  if (!email) throw new Error(tr('loginFailed'));
  const { error } = await sb.auth.signInWithPassword({email, password});
  if (error) throw error;
}

async function signup() {
  const name = document.getElementById('signupName').value.trim();
  const username = document.getElementById('signupUsername').value.trim();
  const email = document.getElementById('signupEmail').value.trim().toLowerCase();
  const password = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('signupConfirm').value;

  if (!name) throw new Error(tr('error'));
  if (!/^[A-Za-z0-9_.-]{3,30}$/.test(username)) throw new Error(tr('invalidUsername'));
  if (password.length < 8) throw new Error(tr('passwordWeak'));
  if (password !== confirm) throw new Error(tr('passwordMismatch'));

  /* Important: registration intentionally does NOT call get_email_for_username.
     The Auth signup creates the user, and the database trigger creates the profile/wallet
     from raw_user_meta_data. Username lookup is only needed later for username login. */
  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: { data: { username, full_name: name } }
  });
  if (error) throw error;
  if (!data.user) throw new Error(tr('error'));

  document.getElementById('signupForm').reset();
  showAuth('login');
  toast(tr('signupDone'));
}

function showAuth(tab) {
  document.getElementById('loginForm').classList.toggle('hidden', tab !== 'login');
  document.getElementById('signupForm').classList.toggle('hidden', tab !== 'signup');
  document.getElementById('showLogin').classList.toggle('active', tab === 'login');
  document.getElementById('showSignup').classList.toggle('active', tab === 'signup');
}

async function showApp() {
  document.getElementById('authView').classList.add('hidden');
  document.getElementById('resetView').classList.add('hidden');
  document.getElementById('appView').classList.remove('hidden');
  try { await loadData(); }
  catch (error) {
    console.error(error);
    document.getElementById('appView').classList.add('hidden');
    document.getElementById('authView').classList.remove('hidden');
    await sb.auth.signOut();
    toast(friendlyError(error, tr('profileLoadError')));
  }
}

function showPage(page) {
  const target = document.getElementById(`page-${page}`);
  if (!target) return;
  document.querySelectorAll('.page').forEach(x => x.classList.add('hidden'));
  target.classList.remove('hidden');
  document.querySelectorAll('#nav button').forEach(x => x.classList.toggle('active', x.dataset.page === page));
  const nav = document.querySelector(`#nav button[data-page="${CSS.escape(page)}"]`);
  document.getElementById('pageTitle').textContent = nav?.querySelector('[data-i18n]')?.textContent || tr(page);
}

async function requestFund(event) {
  event.preventDefault();
  const amount = Number(document.getElementById('fundAmount').value);
  if (!(amount > 0)) throw new Error(tr('invalidAmount'));
  const user = await currentUser();
  const { error } = await sb.from('funding_requests').insert({user_id:user.id, amount, payment_method:document.getElementById('fundMethod').value.trim(), reference:document.getElementById('fundRef').value.trim(), notes:document.getElementById('fundNotes').value.trim()});
  if (error) throw error;
  event.target.reset(); toast(tr('requestSent')); await loadData();
}

async function requestWithdraw(event) {
  event.preventDefault();
  const amount = Number(document.getElementById('withdrawAmount').value);
  const balance = Number(state.wallet?.balance || 0);
  if (!(amount > 0) || amount > balance) throw new Error(tr('invalidAmount'));
  const user = await currentUser();
  const { error } = await sb.from('withdrawal_requests').insert({user_id:user.id, amount, method:document.getElementById('withdrawMethod').value.trim(), destination:document.getElementById('withdrawDestination').value.trim(), notes:document.getElementById('withdrawNotes').value.trim()});
  if (error) throw error;
  event.target.reset(); toast(tr('requestSent')); await loadData();
}

async function saveProfile(event) {
  event.preventDefault();
  const name = document.getElementById('profileName').value.trim();
  if (!name) throw new Error(tr('error'));
  const user = await currentUser();
  const { error } = await sb.from('profiles').update({full_name:name, phone:document.getElementById('profilePhone').value.trim()}).eq('id', user.id);
  if (error) throw error;
  toast(tr('saved')); await loadData();
}

async function uploadAvatar() {
  const input = document.getElementById('avatarFile');
  const file = input.files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) throw new Error(tr('error'));
  if (file.size > 2 * 1024 * 1024) throw new Error(tr('fileTooLarge'));
  const user = await currentUser();
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const path = `${user.id}/avatar.${ext}`;
  const { error: uploadError } = await sb.storage.from('avatars').upload(path, file, {upsert:true, contentType:file.type, cacheControl:'3600'});
  if (uploadError) throw uploadError;
  const { data } = sb.storage.from('avatars').getPublicUrl(path);
  const { error } = await sb.from('profiles').update({avatar_url:data.publicUrl}).eq('id', user.id);
  if (error) throw error;
  input.value = '';
  toast(tr('imageSaved')); await loadData();
}

async function updatePassword(event) {
  event.preventDefault();
  const a = document.getElementById('newPassword').value;
  const b = document.getElementById('confirmNewPassword').value;
  if (a.length < 8) throw new Error(tr('passwordWeak'));
  if (a !== b) throw new Error(tr('passwordMismatch'));
  const { error } = await sb.auth.updateUser({password:a});
  if (error) throw error;
  event.target.reset();
  history.replaceState(null, '', location.pathname + location.search);
  document.getElementById('resetView').classList.add('hidden');
  document.getElementById('authView').classList.remove('hidden');
  toast(tr('passwordUpdated'));
}

async function handleForgotPassword() {
  const email = prompt(state.lang === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email');
  if (!email?.trim()) return;
  const { error } = await sb.auth.resetPasswordForEmail(email.trim().toLowerCase(), {redirectTo: location.origin + location.pathname});
  if (error) throw error;
  toast(tr('resetSent'));
}

function showResetView() {
  document.getElementById('authView').classList.add('hidden');
  document.getElementById('appView').classList.add('hidden');
  document.getElementById('resetView').classList.remove('hidden');
}

function showAuthView() {
  document.getElementById('resetView').classList.add('hidden');
  document.getElementById('appView').classList.add('hidden');
  document.getElementById('authView').classList.remove('hidden');
}

function bindForm(formId, handler) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', async event => {
    const button = form.querySelector('button[type="submit"]');
    if (button?.disabled) return;
    setBusy(button, true, tr('loading'));
    try { await handler(event); }
    catch (error) { console.error(error); toast(friendlyError(error)); }
    finally { setBusy(button, false); }
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('showLogin').onclick = () => showAuth('login');
document.getElementById('showSignup').onclick = () => showAuth('signup');
document.getElementById('langAr').onclick = () => setLang('ar');
document.getElementById('langEn').onclick = () => setLang('en');
document.getElementById('resetLangAr').onclick = () => setLang('ar');
document.getElementById('resetLangEn').onclick = () => setLang('en');
document.getElementById('topLang').onclick = () => setLang(state.lang === 'ar' ? 'en' : 'ar');
document.getElementById('settingsAr').onclick = () => setLang('ar');
document.getElementById('settingsEn').onclick = () => setLang('en');
document.querySelectorAll('#nav button').forEach(button => button.onclick = () => showPage(button.dataset.page));
document.querySelectorAll('[data-page-jump]').forEach(button => button.onclick = () => showPage(button.dataset.pageJump));

document.getElementById('logout').onclick = async () => {
  try { await sb.auth.signOut(); } finally { showAuthView(); showAuth('login'); }
};

document.getElementById('forgotBtn').onclick = async () => {
  try { await handleForgotPassword(); } catch (error) { console.error(error); toast(friendlyError(error)); }
};
document.getElementById('avatarFile').onchange = async () => {
  try { await uploadAvatar(); } catch (error) { console.error(error); toast(friendlyError(error)); }
};

bindForm('loginForm', async () => {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  if (!username || !password) throw new Error(tr('loginFailed'));
  await loginWithUsername(username, password);
  await showApp();
});

bindForm('signupForm', signup);
bindForm('fundForm', requestFund);
bindForm('withdrawForm', requestWithdraw);
bindForm('profileForm', saveProfile);
bindForm('resetForm', updatePassword);

applyLang();

sb.auth.onAuthStateChange(async event => {
  if (event === 'PASSWORD_RECOVERY') showResetView();
});

(async function bootstrap() {
  try {
    const { data, error } = await sb.auth.getSession();
    if (error) throw error;
    if (data.session) await showApp();
    else if (location.hash.includes('access_token=') || location.hash.includes('type=recovery')) showResetView();
    else showAuthView();
  } catch (error) {
    console.error(error);
    showAuthView();
    toast(friendlyError(error));
  }
})();

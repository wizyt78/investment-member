const API=window.API_BASE_URL;
let token=localStorage.getItem("ip_token")||"",data=null;
let lang=localStorage.getItem("ip_lang")||"ar";
let theme=localStorage.getItem("ip_theme")||"light";
let balanceHidden=false;
let currency=localStorage.getItem("ip_currency")||"KWD";
let fxRates={KWD:1,USD:null,EUR:null};

const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const toast=m=>{const x=$("toast");x.textContent=m;x.style.display="block";clearTimeout(window.__toast);window.__toast=setTimeout(()=>x.style.display="none",3200)};
const fmt=n=>{
 const raw=Number(n||0);
 const rate=currency==="KWD"?1:fxRates[currency];
 if(rate==null)return "— "+currency;
 const value=raw*rate;
 return value.toLocaleString(lang==="ar"?"ar-KW":"en-US",{minimumFractionDigits:3,maximumFractionDigits:3})+" "+currency;
};
const date=v=>v?new Date(v).toLocaleDateString(lang==="ar"?"ar-KW":"en-US",{year:"numeric",month:"short",day:"numeric"}):"—";

const T={
ar:{
secureAccess:"دخول الأعضاء الآمن",memberPortal:"بوابة الأعضاء",welcomeHeadline:"حسابك المالي في مكان واحد.",welcomeCopy:"تابع رصيدك واستثماراتك وطلباتك من مساحة حساب آمنة وواضحة.",serverData:"بيانات الحساب المسجلة على الخادم",secureSessions:"جلسات دخول آمنة",privateWorkspace:"مساحة حساب خاصة",secureSignIn:"SECURE SIGN IN",welcomeBack:"مرحباً بعودتك",loginSub:"سجّل الدخول باستخدام اسم المستخدم وكلمة المرور.",createSub:"أنشئ حسابك باستخدام بياناتك الأساسية.",username:"اسم المستخدم",password:"كلمة المرور",signIn:"تسجيل الدخول",noAccount:"ليس لديك حساب؟",haveAccount:"لديك حساب؟",createAccount:"إنشاء حساب",fullName:"الاسم الكامل",email:"البريد الإلكتروني",confirmPassword:"تأكيد كلمة المرور",memberArea:"منطقة العضو",logout:"خروج",home:"الرئيسية",deposit:"إيداع",depositSub:"تمويل حسابك",sendMoney:"إرسال الأموال",sendSub:"طلب تحويل",withdraw:"سحب",withdrawSub:"طلب أموالك",settings:"الإعدادات",settingsSub:"إدارة حسابك",dashboardSub:"نظرة احترافية على حسابك واستثماراتك.",active:"الحساب نشط",availableBalance:"الرصيد المتاح",realServerBalance:"الرصيد المسجل في الحساب",depositNow:"إيداع الآن",withdrawFunds:"سحب الأموال",totalInvested:"إجمالي الاستثمار",recordedEarnings:"الأرباح المسجلة",investmentCount:"الاستثمارات النشطة",pendingRequests:"الطلبات المعلقة",activity:"النشاط",portfolio:"المحفظة",transactions:"آخر المعاملات",investments:"الاستثمارات",refresh:"تحديث",history:"السجل",depositTitle:"تمويل حسابك الاستثماري",fundingHelp:"أرسل تفاصيل التمويل للمراجعة الإدارية.",requestFunding:"طلب إيداع",depositExplain:"أدخل المبلغ وتفاصيل الدفع. لا يتغير الرصيد إلا بعد الاعتماد.",amountKwd:"المبلغ (KWD)",paymentMethod:"طريقة الدفع",referenceOptional:"المرجع (اختياري)",notesOptional:"ملاحظات (اختياري)",submitRequest:"إرسال الطلب",fundingHistory:"طلبات الإيداع",sendTitle:"إرسال الأموال",sendHelp:"تحتاج التحويلات الداخلية إلى خدمة تحويل على الخادم قبل نقل الأموال.",sendUnavailable:"خدمة التحويل غير مفعلة",sendUnavailableSub:"واجهة الحساب الحالية لا توفر نقطة تحويل حقيقية بين الأعضاء. لن يتم الادعاء بإتمام تحويل غير منفذ.",withdrawTitle:"السحب من حسابك",withdrawHelp:"اطلب مبلغاً من رصيدك المتاح. يتم الخصم بعد الاعتماد.",requestWithdraw:"طلب سحب",withdrawExplain:"أدخل المبلغ والوجهة. تتم مراجعة الطلب قبل الاعتماد.",method:"الطريقة",destination:"وجهة التحويل",withdrawHistory:"طلبات السحب",settingsTitle:"إعدادات الحساب",settingsSub:"إدارة ملفك الشخصي والبريد وكلمة المرور والمظهر.",profileLabel:"الملف الشخصي",personalDetails:"البيانات الشخصية",avatarHelp:"ارفع صورة شخصية. يتم الاحتفاظ بها على هذا الجهاز لمساحة العضو.",removePhoto:"إزالة الصورة",security:"الأمان",changePassword:"تغيير كلمة المرور",passwordSub:"حدّث كلمة المرور واستمر في تسجيل الدخول.",currentPassword:"كلمة المرور الحالية",newPassword:"كلمة المرور الجديدة",updatePassword:"تحديث كلمة المرور",preferences:"التفضيلات",appearance:"المظهر",themeMode:"السمة",themeModeSub:"اختر الوضع الفاتح أو الداكن.",language:"اللغة",languageSub:"تبديل لغة الواجهة بالكامل.",secureAccount:"حساب آمن",secureAccountSub:"جلسة حسابك محمية.",profileSaved:"تم حفظ بيانات الحساب.",passwordChanged:"تم تغيير كلمة المرور بنجاح.",photoSaved:"تم حفظ صورة الملف على هذا الجهاز.",photoRemoved:"تمت إزالة الصورة.",badPassword:"كلمتا المرور غير متطابقتين.",accountCreated:"تم إنشاء الحساب. يمكنك تسجيل الدخول الآن.",requestSent:"تم إرسال الطلب للمراجعة.",connection:"تعذر الاتصال بالخادم.",noTransactions:"لا توجد معاملات مسجلة.",noInvestments:"لا توجد استثمارات مسجلة.",noFunding:"لا توجد طلبات إيداع.",noWithdrawals:"لا توجد طلبات سحب.",current:"الحالية",status:"الحالة",description:"الوصف",amount:"المبلغ",date:"التاريخ",
currency:"العملة",currencySub:"اختر العملة المعروضة في حسابك.",amountLabel:"المبلغ (KWD)",totalEarnings:"إجمالي الأرباح",saveProfile:"حفظ التغييرات",
menu:"القائمة",theme:"المظهر",saved:"تم الحفظ.",statusCompleted:"مكتمل",statusApproved:"معتمد",statusPending:"قيد المراجعة",statusRejected:"مرفوض",statusActive:"نشط",
light:"فاتح",dark:"داكن",profilePicture:"صورة الملف الشخصي",choosePhoto:"اختر صورة",logoutSuccess:"تم تسجيل الخروج بنجاح.",
fxUnavailable:"سعر الصرف غير متاح حالياً. يرجى المحاولة لاحقاً.",logoutConfirm:"هل تريد تسجيل الخروج؟"
},
en:{
secureAccess:"Secure member access",memberPortal:"MEMBER PORTAL",welcomeHeadline:"Your financial account, in one place.",welcomeCopy:"Follow your balance, investments and requests from a secure, focused account workspace.",serverData:"Server-recorded account data",secureSessions:"Secure sessions",privateWorkspace:"Private account workspace",secureSignIn:"SECURE SIGN IN",welcomeBack:"Welcome back",loginSub:"Sign in with your username and password.",createSub:"Create your account with your basic details.",username:"Username",password:"Password",signIn:"Sign in",noAccount:"Don't have an account?",haveAccount:"Already have an account?",createAccount:"Create account",fullName:"Full name",email:"Email address",confirmPassword:"Confirm password",memberArea:"Member area",logout:"Log out",home:"Home",deposit:"Deposit",depositSub:"Fund your account",sendMoney:"Send Money",sendSub:"Transfer request",withdraw:"Withdraw",withdrawSub:"Request your funds",settings:"Settings",settingsSub:"Manage your account",dashboardSub:"A professional view of your account and investments.",active:"Account active",availableBalance:"Available balance",realServerBalance:"Balance recorded on the account",depositNow:"Deposit now",withdrawFunds:"Withdraw funds",totalInvested:"Total invested",recordedEarnings:"Recorded earnings",investmentCount:"Active investments",pendingRequests:"Pending requests",activity:"ACTIVITY",portfolio:"PORTFOLIO",transactions:"Recent transactions",investments:"Investments",refresh:"Refresh",history:"HISTORY",depositTitle:"Fund your investment account",fundingHelp:"Submit your funding details for administrative review.",requestFunding:"Deposit request",depositExplain:"Enter the amount and payment details. Your balance changes only after approval.",amountKwd:"Amount (KWD)",paymentMethod:"Payment method",referenceOptional:"Reference (optional)",notesOptional:"Notes (optional)",submitRequest:"Submit request",fundingHistory:"Deposit requests",sendTitle:"Send money",sendHelp:"Internal transfers require a server-side transfer service before money can be moved.",sendUnavailable:"Transfer service not enabled",sendUnavailableSub:"The current account API does not provide a genuine member-to-member transfer endpoint. This page will not pretend a transfer was completed.",withdrawTitle:"Withdraw from your account",withdrawHelp:"Request an amount from your available balance. The balance is deducted after approval.",requestWithdraw:"Withdrawal request",withdrawExplain:"Enter your requested amount and destination. Requests are reviewed before approval.",method:"Method",destination:"Transfer destination",withdrawHistory:"Withdrawal requests",settingsTitle:"Account settings",settingsSub:"Manage your profile, email, password and appearance.",profileLabel:"PROFILE",personalDetails:"Personal details",avatarHelp:"Upload a profile picture. It is kept on this device for your Member workspace.",removePhoto:"Remove photo",security:"SECURITY",changePassword:"Change password",passwordSub:"Update your password and stay signed in.",currentPassword:"Current password",newPassword:"New password",updatePassword:"Update password",preferences:"PREFERENCES",appearance:"Appearance",themeMode:"Theme",themeModeSub:"Choose light or dark mode.",language:"Language",languageSub:"Switch the complete interface language.",secureAccount:"Secure account",secureAccountSub:"Your account session is protected.",profileSaved:"Account details saved.",passwordChanged:"Password changed successfully.",photoSaved:"Profile photo saved on this device.",photoRemoved:"Photo removed.",badPassword:"The passwords do not match.",accountCreated:"Account created. You can sign in now.",requestSent:"Request submitted for review.",connection:"Unable to connect to the server.",noTransactions:"No transactions recorded.",noInvestments:"No investments recorded.",noFunding:"No deposit requests.",noWithdrawals:"No withdrawal requests.",current:"Current",status:"Status",description:"Description",amount:"Amount",date:"Date",
currency:"Currency",currencySub:"Choose the display currency for your account.",amountLabel:"Amount (KWD)",totalEarnings:"Total earnings",saveProfile:"Save changes",
menu:"Menu",theme:"Appearance",saved:"Saved.",statusCompleted:"Completed",statusApproved:"Approved",statusPending:"Pending",statusRejected:"Rejected",statusActive:"Active",
light:"Light",dark:"Dark",profilePicture:"Profile picture",choosePhoto:"Choose photo",logoutSuccess:"You have been signed out.",
fxUnavailable:"The exchange rate is currently unavailable. Please try again later.",logoutConfirm:"Are you sure you want to sign out?"
}};

function applyLang(){
 const tr=T[lang];
 document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";
 document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(tr[k])el.textContent=tr[k]});
 if($("lang"))$("lang").textContent=lang==="ar"?"English":"العربية";
 if($("lang2"))$("lang2").textContent=lang==="ar"?"English":"العربية";
 if($("langSettings"))$("langSettings").textContent=lang==="ar"?"English":"العربية";
 if($("authTitle")&&!$("signupForm").hidden)$("authTitle").textContent=tr.welcomeBack;
 if($("authSub")&&!$("signupForm").hidden)$("authSub").textContent=tr.loginSub;
 if($("showSignup"))$("showSignup").textContent=tr.createAccount;
 if($("showLogin"))$("showLogin").textContent=tr.signIn;
 document.querySelectorAll("[data-i18n-aria]").forEach(el=>{const k=el.dataset.i18nAria;if(tr[k])el.setAttribute("aria-label",tr[k])});
 updateCurrencyLabels();
 if(data)render();
}
function toggleLang(){lang=lang==="ar"?"en":"ar";localStorage.setItem("ip_lang",lang);applyLang()}
function applyTheme(){document.documentElement.classList.toggle("dark",theme==="dark");localStorage.setItem("ip_theme",theme)}
function toggleTheme(){theme=theme==="dark"?"light":"dark";applyTheme()}
applyTheme();

async function api(path,opt={}){
 const headers={"content-type":"application/json",...(token?{authorization:"Bearer "+token}:{})};
 const r=await fetch(API+path,{...opt,headers});
 let d={};try{d=await r.json()}catch{}
 if(!r.ok)throw Error(d.error||T[lang].connection);
 return d;
}
function show(view){
 document.querySelectorAll(".view").forEach(x=>x.hidden=x.id!==view);
 document.querySelectorAll("[data-view]").forEach(x=>x.classList.toggle("active",x.dataset.view===view));
 document.querySelectorAll(".mobile-nav button").forEach(x=>x.classList.toggle("active",x.dataset.view===view));
 $("sidebar")?.classList.remove("open");
 window.scrollTo({top:0,behavior:"smooth"});
}
function statusClass(s){return String(s||"").toLowerCase().replace(/[^a-z]/g,"")}
function avatarKey(id){return "ip_avatar_"+String(id||"member")}
function initials(name){return String(name||"M").trim().split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase()||"M"}
function setAvatar(el,src,name){
 if(!el)return;
 if(src){el.style.backgroundImage=`url("${src.replace(/"/g,"%22")}")`;el.textContent=""}
 else{el.style.backgroundImage="";el.textContent=initials(name)}
}
function getAvatar(){
 try{return localStorage.getItem(avatarKey(data?.user?.id))||""}catch{return""}
}
function setAllAvatars(){
 const name=data?.user?.full_name||"Member",src=getAvatar();
 ["avatarTop","avatarSide","mobileAvatar","profileAvatar"].forEach(id=>setAvatar($(id),src,name));
 $("topName").textContent=name;$("sideName").textContent=name;$("sideUsername").textContent="@"+(data?.user?.username||"member");
 $("profileName").textContent=name;$("profileHandle").textContent="@"+(data?.user?.username||"member");
}
function pendingCount(){
 return [...(data?.funding_requests||[]),...(data?.withdrawal_requests||[])].filter(x=>String(x.status).toLowerCase()==="pending").length
}
function statusText(status){
 const k=String(status||"").toLowerCase();
 const map={completed:"statusCompleted",approved:"statusApproved",pending:"statusPending",rejected:"statusRejected",active:"statusActive"};
 return T[lang][map[k]]||status||"—";
}
async function loadFxRates(){
 try{
   const r=await fetch("https://open.er-api.com/v6/latest/KWD",{cache:"no-store"});
   const d=await r.json();
   if(d?.result==="success"&&d.rates){
     fxRates.USD=Number(d.rates.USD)||null;
     fxRates.EUR=Number(d.rates.EUR)||null;
   }
 }catch{}
}
function setCurrency(v){
 currency=["KWD","USD","EUR"].includes(v)?v:"KWD";
 localStorage.setItem("ip_currency",currency);
 if($("currencySelect"))$("currencySelect").value=currency;
 if($("currencySettings"))$("currencySettings").value=currency;
 updateCurrencyLabels();
 if(data)render();
}
function updateCurrencyLabels(){
 const label=T[lang].amountLabel.replace("KWD",currency);
 ["fundAmountLabel","withAmountLabel"].forEach(id=>{if($(id))$(id).textContent=label});
}
function render(){
 const w=data.wallet||{};
 $("welcome").textContent=data.user.full_name;
 $("balance").textContent=balanceHidden?"••••••":" "+fmt(w.balance);
 $("invested").textContent=fmt(w.total_invested);$("earnings").textContent=fmt(w.recorded_earnings);
 $("invCount").textContent=(data.investments||[]).length;$("pendingCount").textContent=pendingCount();
 $("transactions").innerHTML=(data.transactions||[]).length?'<div class="row head"><span>'+T[lang].description+'</span><span>'+T[lang].amount+'</span><span>'+T[lang].status+'</span><span>'+T[lang].date+'</span></div>'+
 data.transactions.map(t=>`<div class="row"><span>${esc(t.description||t.type)}</span><b>${fmt(t.amount)}</b><span class="tag ${statusClass(t.status)}">${esc(statusText(t.status))}</span><span>${date(t.created_at)}</span></div>`).join(""):`<div class="empty">${T[lang].noTransactions}</div>`;
 $("investments").innerHTML=(data.investments||[]).length?data.investments.map(i=>`<div class="investment-item"><b>${esc(i.plan_name)}</b><div class="investment-meta"><span>${fmt(i.amount)}</span><span class="tag ${statusClass(i.status)}">${esc(statusText(i.status))}</span></div></div>`).join(""):`<div class="empty">${T[lang].noInvestments}</div>`;
 $("fundList").innerHTML=(data.funding_requests||[]).length?data.funding_requests.map(f=>`<div class="request-item"><b>${fmt(f.amount)}</b><div class="investment-meta"><span>${esc(f.payment_method)}</span><span class="tag ${statusClass(f.status)}">${esc(statusText(f.status))}</span></div><div class="investment-meta"><span>${date(f.created_at)}</span></div></div>`).join(""):`<div class="empty">${T[lang].noFunding}</div>`;
 $("withList").innerHTML=(data.withdrawal_requests||[]).length?data.withdrawal_requests.map(f=>`<div class="request-item"><b>${fmt(f.amount)}</b><div class="investment-meta"><span>${esc(f.method)}</span><span class="tag ${statusClass(f.status)}">${esc(statusText(f.status))}</span></div><div class="investment-meta"><span>${date(f.created_at)}</span></div></div>`).join(""):`<div class="empty">${T[lang].noWithdrawals}</div>`;
 $("pUser").value=data.user.username||"";$("pName").value=data.user.full_name||"";$("pEmail").value=data.user.email||"";
 setAllAvatars();
}
async function load(){const d=await api("/api/me");data=d;$("auth").hidden=true;$("dash").hidden=false;render()}

$("lang").onclick=toggleLang;$("lang2").onclick=toggleLang;$("langSettings").onclick=toggleLang;
$("theme").onclick=toggleTheme;$("themeSettings").onclick=toggleTheme;
$("currencySelect").onchange=e=>setCurrency(e.target.value);
$("currencySettings").onchange=e=>setCurrency(e.target.value);
$("logout").onclick=async()=>{
 try{
   if(token) await api("/api/auth/logout",{method:"POST"});
 }catch{}
 token="";data=null;localStorage.removeItem("ip_token");
 $("dash").hidden=true;$("auth").hidden=false;
 $("loginForm").hidden=false;$("signupForm").hidden=true;
 $("authTitle").textContent=T[lang].welcomeBack;$("authSub").textContent=T[lang].loginSub;
 $("loginPass").value="";
 show("overview");
 toast(T[lang].logoutSuccess);
};
$("hideBalance").onclick=()=>{balanceHidden=!balanceHidden;render()};
$("mobileMenu").onclick=()=>$("sidebar").classList.toggle("open");
$("profileTop").onclick=()=>show("settings");
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",e=>{e.preventDefault();show(b.dataset.view)}));
document.querySelectorAll("[data-view-link]").forEach(b=>b.addEventListener("click",e=>{e.preventDefault();show(b.dataset.viewLink)}));

$("loginForm").onsubmit=async e=>{
 e.preventDefault();const b=$("loginBtn");
 try{
  b.classList.add("busy");
  const d=await api("/api/auth/login",{method:"POST",body:JSON.stringify({username:$("loginUser").value.trim(),password:$("loginPass").value})});
  const session=typeof d.session==="string"?d.session:d.session?.token;
  if(!session)throw Error(T[lang].connection);
  token=session;localStorage.setItem("ip_token",token);await load();
 }catch(e){localStorage.removeItem("ip_token");token="";toast(e.message)}finally{b.classList.remove("busy")}
};
$("signupForm").onsubmit=async e=>{
 e.preventDefault();const b=$("signupBtn");
 try{
  if($("signupPass").value!==$("signupPass2").value)throw Error(T[lang].badPassword);
  b.classList.add("busy");
  await api("/api/auth/signup",{method:"POST",body:JSON.stringify({full_name:$("fullName").value.trim(),email:$("signupEmail").value.trim(),username:$("signupUser").value.trim(),phone:"",password:$("signupPass").value})});
  token="";localStorage.removeItem("ip_token");$("signupForm").reset();$("signupForm").hidden=true;$("loginForm").hidden=false;
  $("authTitle").textContent=T[lang].welcomeBack;$("authSub").textContent=T[lang].loginSub;$("loginUser").focus();toast(T[lang].accountCreated);
 }catch(e){toast(e.message)}finally{b.classList.remove("busy")}
};
$("showSignup").onclick=()=>{$("loginForm").hidden=true;$("signupForm").hidden=false;$("authTitle").textContent=T[lang].createAccount;$("authSub").textContent=T[lang].createSub};
$("showLogin").onclick=()=>{$("signupForm").hidden=true;$("loginForm").hidden=false;$("authTitle").textContent=T[lang].welcomeBack;$("authSub").textContent=T[lang].loginSub};

$("refresh").onclick=async()=>{try{await load();toast(lang==="ar"?"تم تحديث الحساب.":"Account refreshed.")}catch(e){toast(e.message)}};
$("fundForm").onsubmit=async e=>{e.preventDefault();const b=$("fundBtn");try{b.classList.add("busy");await api("/api/funding",{method:"POST",body:JSON.stringify({amount:Number($("fundAmount").value),currency:$("fundCurrency").value,payment_method:$("fundMethod").value.trim(),reference:$("fundRef").value.trim(),notes:$("fundNotes").value.trim()})});toast(T[lang].requestSent);$("fundForm").reset();await load();show("funding")}catch(e){toast(e.message)}finally{b.classList.remove("busy")}};
$("withdrawForm").onsubmit=async e=>{e.preventDefault();const b=$("withBtn");try{b.classList.add("busy");await api("/api/withdrawals",{method:"POST",body:JSON.stringify({amount:Number($("withAmount").value),currency:$("withCurrency").value,method:$("withMethod").value.trim(),destination:$("withDest").value.trim(),notes:$("withNotes").value.trim()})});toast(T[lang].requestSent);$("withdrawForm").reset();await load();show("withdraw")}catch(e){toast(e.message)}finally{b.classList.remove("busy")}};

$("profileForm").onsubmit=async e=>{
 e.preventDefault();const b=e.submitter;
 try{
  b.classList.add("busy");
  await api("/api/profile",{method:"PATCH",body:JSON.stringify({full_name:$("pName").value.trim(),email:$("pEmail").value.trim(),phone:"",avatar_url:data.user.avatar_url||""})});
  toast(T[lang].profileSaved);await load();show("settings");
 }catch(e){toast(e.message)}finally{b.classList.remove("busy")}
};
$("passwordForm").onsubmit=async e=>{
 e.preventDefault();const b=e.submitter;
 try{
  if($("newPass").value!==$("newPass2").value)throw Error(T[lang].badPassword);
  b.classList.add("busy");
  const d=await api("/api/auth/change-password",{method:"POST",body:JSON.stringify({current_password:$("currentPass").value,new_password:$("newPass").value})});
  const session=typeof d.session==="string"?d.session:d.session?.token;
  if(!session)throw Error(T[lang].connection);
  token=session;localStorage.setItem("ip_token",token);$("passwordForm").reset();toast(T[lang].passwordChanged);await load();show("settings");
 }catch(e){toast(e.message)}finally{b.classList.remove("busy")}
};
$("avatarFile").onchange=e=>{
 const file=e.target.files?.[0];if(!file||!data)return;
 if(file.size>5*1024*1024){toast(lang==="ar"?"اختر صورة أصغر من 5MB.":"Choose an image under 5MB.");return}
 const r=new FileReader();
 r.onload=ev=>{
  const img=new Image();
  img.onload=()=>{
   const c=document.createElement("canvas"),max=420,scale=Math.min(1,max/Math.max(img.width,img.height));
   c.width=Math.max(1,Math.round(img.width*scale));c.height=Math.max(1,Math.round(img.height*scale));
   c.getContext("2d").drawImage(img,0,0,c.width,c.height);
   const dataUrl=c.toDataURL("image/jpeg",.78);
   try{localStorage.setItem(avatarKey(data.user.id),dataUrl);setAllAvatars();toast(T[lang].photoSaved)}catch{toast(T[lang].connection)}
  };img.src=ev.target.result;
 };r.readAsDataURL(file);e.target.value="";
};
$("removeAvatar").onclick=()=>{try{localStorage.removeItem(avatarKey(data.user.id));setAllAvatars();toast(T[lang].photoRemoved)}catch{}};

setCurrency(currency);
applyLang();
loadFxRates().then(()=>{if(data)render()});
(async()=>{if(token){try{await load()}catch{localStorage.removeItem("ip_token");token=""}}})();

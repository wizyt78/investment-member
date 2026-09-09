const API=window.API_BASE_URL;
let token=localStorage.getItem("ip_token")||"", data=null;
let lang=localStorage.getItem("ip_lang")||"ar";

const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const toast=m=>{const x=$("toast");x.textContent=m;x.style.display="block";clearTimeout(window.__toast);window.__toast=setTimeout(()=>x.style.display="none",3200)};
const fmt=n=>Number(n||0).toLocaleString("en-US",{minimumFractionDigits:3,maximumFractionDigits:3})+" KWD";
const date=v=>v?new Date(v).toLocaleDateString(lang==="ar"?"ar-KW":"en-US",{year:"numeric",month:"short",day:"numeric"}):"—";

const T={
ar:{secureAccess:"دخول الأعضاء الآمن",memberPortal:"بوابة الأعضاء",welcomeHeadline:"إدارة حسابك المالي بثقة ووضوح.",welcomeCopy:"وصول آمن إلى رصيدك وطلبات التمويل والسحب وسجل معاملاتك.",serverData:"بيانات الرصيد من الخادم",secureSessions:"جلسات دخول آمنة",secureSignIn:"SECURE SIGN IN",welcomeBack:"مرحباً بعودتك",loginSub:"سجّل الدخول باستخدام اسم المستخدم وكلمة المرور.",createSub:"أنشئ حسابك باستخدام بياناتك الأساسية.",username:"اسم المستخدم",password:"كلمة المرور",signIn:"تسجيل الدخول",noAccount:"ليس لديك حساب؟",createAccount:"إنشاء حساب",fullName:"الاسم الكامل",email:"البريد الإلكتروني",phoneOptional:"رقم الهاتف (اختياري)",confirmPassword:"تأكيد كلمة المرور",memberArea:"منطقة العضو",logout:"خروج",dashboard:"DASHBOARD",dashboardSub:"نظرة واضحة على رصيدك وحسابك.",active:"الحساب نشط",availableBalance:"الرصيد المتاح",realServerBalance:"الرصيد المسجل في الحساب",totalInvested:"إجمالي الاستثمار",recordedEarnings:"الأرباح المسجلة",investmentCount:"الاستثمارات",funding:"طلب تمويل",fundingSub:"إرسال طلب للمراجعة",withdraw:"طلب سحب",withdrawSub:"تقديم طلب من الرصيد المتاح",profile:"الملف الشخصي",profileSub:"مراجعة بيانات الحساب",overview:"نظرة عامة",transactions:"آخر المعاملات",transactionsSub:"سجل العمليات المسجلة على حسابك.",refresh:"تحديث",investments:"الاستثمارات",investmentsSub:"الاستثمارات المسجلة في حسابك.",fundingRequest:"FUNDING REQUEST",requestFunding:"طلب تمويل",fundingHelp:"أرسل تفاصيل العملية ليتم مراجعتها من الإدارة.",amountKwd:"المبلغ (KWD)",paymentMethod:"طريقة الدفع",referenceOptional:"المرجع (اختياري)",notesOptional:"ملاحظات (اختياري)",submitRequest:"إرسال الطلب",fundingHistory:"طلبات التمويل",withdrawRequest:"WITHDRAWAL REQUEST",requestWithdraw:"طلب سحب",withdrawHelp:"يمكنك طلب مبلغ من الرصيد المتاح. الخصم يتم عند الاعتماد.",method:"الطريقة",destination:"وجهة التحويل",withdrawHistory:"طلبات السحب",profileLabel:"PROFILE",saveProfile:"حفظ التغييرات",badPassword:"كلمتا المرور غير متطابقتين.",accountCreated:"تم إنشاء الحساب. يمكنك تسجيل الدخول الآن.",requestSent:"تم إرسال الطلب للمراجعة.",profileSaved:"تم حفظ بيانات الملف.",connection:"تعذر الاتصال بالخادم."},
en:{secureAccess:"Secure member access",memberPortal:"MEMBER PORTAL",welcomeHeadline:"Manage your account with confidence and clarity.",welcomeCopy:"Secure access to your balance, funding and withdrawal requests, and transaction history.",serverData:"Server-recorded balance",secureSessions:"Secure sessions",secureSignIn:"SECURE SIGN IN",welcomeBack:"Welcome back",loginSub:"Sign in with your username and password.",createSub:"Create your account with your basic details.",username:"Username",password:"Password",signIn:"Sign in",noAccount:"Don't have an account?",createAccount:"Create account",fullName:"Full name",email:"Email address",phoneOptional:"Phone number (optional)",confirmPassword:"Confirm password",memberArea:"Member area",logout:"Log out",dashboard:"DASHBOARD",dashboardSub:"A clear view of your account and balance.",active:"Account active",availableBalance:"Available balance",realServerBalance:"Balance recorded on the account",totalInvested:"Total invested",recordedEarnings:"Recorded earnings",investmentCount:"Investments",funding:"Funding request",fundingSub:"Submit for review",withdraw:"Withdrawal request",withdrawSub:"Request from available balance",profile:"Profile",profileSub:"Review your account details",overview:"Overview",transactions:"Recent transactions",transactionsSub:"Operations recorded on your account.",refresh:"Refresh",investments:"Investments",investmentsSub:"Investments recorded on your account.",fundingRequest:"FUNDING REQUEST",requestFunding:"Funding request",fundingHelp:"Submit the transaction details for administrative review.",amountKwd:"Amount (KWD)",paymentMethod:"Payment method",referenceOptional:"Reference (optional)",notesOptional:"Notes (optional)",submitRequest:"Submit request",fundingHistory:"Funding requests",withdrawRequest:"WITHDRAWAL REQUEST",requestWithdraw:"Withdrawal request",withdrawHelp:"Request an amount from your available balance. The balance is deducted after approval.",method:"Method",destination:"Transfer destination",withdrawHistory:"Withdrawal requests",profileLabel:"PROFILE",saveProfile:"Save changes",badPassword:"The passwords do not match.",accountCreated:"Account created. You can sign in now.",requestSent:"Request submitted for review.",profileSaved:"Profile saved.",connection:"Unable to connect to the server."}
};

function applyLang(){
  const tr=T[lang]; document.documentElement.lang=lang; document.documentElement.dir=lang==="ar"?"rtl":"ltr";
  document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(tr[k])el.textContent=tr[k]});
  $("lang").textContent=lang==="ar"?"English":"العربية"; $("lang2").textContent=lang==="ar"?"English":"العربية";
  if($("authTitle"))$("authTitle").textContent=tr.welcomeBack;
  if($("authSub"))$("authSub").textContent=tr.loginSub;
  if($("showSignup"))$("showSignup").textContent=tr.createAccount;
  if($("showLogin"))$("showLogin").textContent=tr.signIn;
  if(data)render();
}
function toggleLang(){lang=lang==="ar"?"en":"ar";localStorage.setItem("ip_lang",lang);applyLang()}
$("lang").onclick=toggleLang;$("lang2").onclick=toggleLang;

async function api(path,opt={}){
  const headers={"content-type":"application/json",...(token?{authorization:"Bearer "+token}:{})};
  const r=await fetch(API+path,{...opt,headers});
  let d={};try{d=await r.json()}catch{}
  if(!r.ok)throw Error(d.error||T[lang].connection);
  return d;
}
function show(view){
  document.querySelectorAll(".view").forEach(x=>x.hidden=x.id!==view);
  document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x.dataset.view===view));
  window.scrollTo({top:0,behavior:"smooth"});
}
function statusClass(s){return String(s||"").toLowerCase().replace(/[^a-z]/g,"")}
function render(){
  const w=data.wallet||{};
  $("welcome").textContent=(lang==="ar"?"مرحباً، ":"Welcome, ")+esc(data.user.full_name);
  $("balance").textContent=fmt(w.balance);$("invested").textContent=fmt(w.total_invested);$("earnings").textContent=fmt(w.recorded_earnings);
  $("invCount").textContent=data.investments.length;
  $("transactions").innerHTML=data.transactions.length?'<div class="row head"><span>'+ (lang==="ar"?"الوصف":"Description")+'</span><span>'+T[lang].amountKwd+'</span><span>'+ (lang==="ar"?"الحالة":"Status")+'</span><span>'+ (lang==="ar"?"التاريخ":"Date")+'</span></div>'+
    data.transactions.map(t=>`<div class="row"><span>${esc(t.description||t.type)}</span><b>${fmt(t.amount)}</b><span class="tag ${statusClass(t.status)}">${esc(t.status)}</span><span>${date(t.created_at)}</span></div>`).join(""):'<div class="empty">No transactions recorded.</div>';
  $("investments").innerHTML=data.investments.length?data.investments.map(i=>`<div class="card"><b>${esc(i.plan_name)}</b><p>${fmt(i.amount)}</p><span class="tag ${statusClass(i.status)}">${esc(i.status)}</span></div>`).join(""):'<div class="empty">No investments recorded.</div>';
  $("fundList").innerHTML=data.funding_requests.length?data.funding_requests.map(f=>`<div class="row"><span>${fmt(f.amount)}</span><span>${esc(f.payment_method)}</span><span class="tag ${statusClass(f.status)}">${esc(f.status)}</span><span>${date(f.created_at)}</span></div>`).join(""):'<div class="empty">No funding requests.</div>';
  $("withList").innerHTML=data.withdrawal_requests.length?data.withdrawal_requests.map(f=>`<div class="row"><span>${fmt(f.amount)}</span><span>${esc(f.method)}</span><span class="tag ${statusClass(f.status)}">${esc(f.status)}</span><span>${date(f.created_at)}</span></div>`).join(""):'<div class="empty">No withdrawal requests.</div>';
  $("pUser").value=data.user.username||"";$("pName").value=data.user.full_name||"";$("pEmail").value=data.user.email||"";$("pPhone").value=data.user.phone||"";
}
async function load(){
  const d=await api("/api/me");data=d;$("auth").hidden=true;$("dash").hidden=false;render();
}
$("loginForm").onsubmit=async e=>{
  e.preventDefault();
  const b=$("loginBtn");
  try{
    b.classList.add("busy");
    const d=await api("/api/auth/login",{method:"POST",body:JSON.stringify({
      username:$("loginUser").value.trim(),
      password:$("loginPass").value
    })});
    const session=typeof d.session==="string"?d.session:d.session?.token;
    if(!session) throw Error(T[lang].connection);
    token=session;
    localStorage.setItem("ip_token",token);
    await load();
  }catch(e){
    localStorage.removeItem("ip_token");
    token="";
    toast(e.message);
  }finally{b.classList.remove("busy")}
};
$("signupForm").onsubmit=async e=>{
  e.preventDefault();
  const b=$("signupBtn");
  try{
    if($("signupPass").value!==$("signupPass2").value) throw Error(T[lang].badPassword);
    b.classList.add("busy");
    await api("/api/auth/signup",{method:"POST",body:JSON.stringify({
      full_name:$("fullName").value.trim(),
      email:$("signupEmail").value.trim(),
      username:$("signupUser").value.trim(),
      phone:$("phone").value.trim(),
      password:$("signupPass").value
    })});
    token="";
    localStorage.removeItem("ip_token");
    $("signupForm").reset();
    $("signupForm").hidden=true;
    $("loginForm").hidden=false;
    $("authTitle").textContent=T[lang].welcomeBack;
    $("authSub").textContent=T[lang].loginSub;
    $("loginUser").focus();
    toast(T[lang].accountCreated);
  }catch(e){toast(e.message)}
  finally{b.classList.remove("busy")}
};
$("showSignup").onclick=()=>{$("loginForm").hidden=true;$("signupForm").hidden=false;$("authTitle").textContent=T[lang].createAccount;$("authSub").textContent=T[lang].createSub};
$("showLogin").onclick=()=>{$("signupForm").hidden=true;$("loginForm").hidden=false;$("authTitle").textContent=T[lang].welcomeBack;$("authSub").textContent=T[lang].loginSub};
document.querySelectorAll("[data-view]").forEach(b=>{
  b.addEventListener("click",e=>{
    e.preventDefault();
    show(b.dataset.view);
  });
});
$("refresh").onclick=async()=>{try{await load()}catch(e){toast(e.message)}};
$("fundForm").onsubmit=async e=>{e.preventDefault();try{await api("/api/funding",{method:"POST",body:JSON.stringify({amount:+$("fundAmount").value,payment_method:$("fundMethod").value.trim(),reference:$("fundRef").value.trim(),notes:$("fundNotes").value.trim()})});toast(T[lang].requestSent);$("fundForm").reset();await load();show("funding")}catch(e){toast(e.message)}};
$("withdrawForm").onsubmit=async e=>{e.preventDefault();try{await api("/api/withdrawals",{method:"POST",body:JSON.stringify({amount:+$("withAmount").value,method:$("withMethod").value.trim(),destination:$("withDest").value.trim(),notes:$("withNotes").value.trim()})});toast(T[lang].requestSent);$("withdrawForm").reset();await load();show("withdraw")}catch(e){toast(e.message)}};
$("profileForm").onsubmit=async e=>{e.preventDefault();try{await api("/api/profile",{method:"PATCH",body:JSON.stringify({full_name:$("pName").value.trim(),email:$("pEmail").value.trim(),phone:$("pPhone").value.trim(),avatar_url:data.user.avatar_url||""})});toast(T[lang].profileSaved);await load();show("profile")}catch(e){toast(e.message)}};
$("logout").onclick=async()=>{try{await api("/api/auth/logout",{method:"POST"})}catch{}localStorage.removeItem("ip_token");token="";data=null;$("dash").hidden=true;$("auth").hidden=false;$("loginForm").hidden=false;$("signupForm").hidden=true;$("authTitle").textContent=T[lang].welcomeBack;$("authSub").textContent=T[lang].loginSub};
applyLang();
(async()=>{if(token){try{await load()}catch{localStorage.removeItem("ip_token");token=""}}})();

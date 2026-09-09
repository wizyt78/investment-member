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
 return value.toLocaleString(lang==="ar"?"ar-KW":"en-US",{minimumFractionDigits:2,maximumFractionDigits:2})+" "+currency;
};
const date=v=>v?new Date(v).toLocaleDateString(lang==="ar"?"ar-KW":"en-US",{year:"numeric",month:"short",day:"numeric"}):"—";

const T={
ar:{
secureAccess:"دخول الأعضاء الآمن",memberPortal:"بوابة الأعضاء",welcomeHeadline:"حسابك المالي في مكان واحد.",welcomeCopy:"تابع رصيدك واستثماراتك وطلباتك من مساحة حساب آمنة وواضحة.",serverData:"بيانات الحساب المسجلة على الخادم",secureSessions:"جلسات دخول آمنة",privateWorkspace:"مساحة حساب خاصة",secureSignIn:"SECURE SIGN IN",welcomeBack:"مرحباً بعودتك",loginSub:"سجّل الدخول باستخدام اسم المستخدم وكلمة المرور.",createSub:"أنشئ حسابك باستخدام بياناتك الأساسية.",username:"اسم المستخدم",password:"كلمة المرور",signIn:"تسجيل الدخول",noAccount:"ليس لديك حساب؟",haveAccount:"لديك حساب؟",createAccount:"إنشاء حساب",fullName:"الاسم الكامل",email:"البريد الإلكتروني",confirmPassword:"تأكيد كلمة المرور",memberArea:"منطقة العضو",logout:"خروج",home:"الرئيسية",deposit:"إيداع",depositSub:"تمويل حسابك",sendMoney:"إرسال الأموال",sendSub:"طلب تحويل",withdraw:"سحب",withdrawSub:"طلب أموالك",settings:"الإعدادات",settingsSub:"إدارة حسابك",dashboardSub:"نظرة احترافية على حسابك واستثماراتك.",active:"الحساب نشط",availableBalance:"الرصيد المتاح",realServerBalance:"الرصيد المسجل في الحساب",depositNow:"إيداع الآن",withdrawFunds:"سحب الأموال",totalInvested:"إجمالي الاستثمار",recordedEarnings:"الأرباح المسجلة",investmentCount:"الاستثمارات النشطة",pendingRequests:"الطلبات المعلقة",activity:"النشاط",portfolio:"المحفظة",transactions:"آخر المعاملات",investments:"الاستثمارات",refresh:"تحديث",history:"السجل",depositTitle:"تمويل حسابك الاستثماري",fundingHelp:"أرسل تفاصيل التمويل للمراجعة الإدارية.",requestFunding:"طلب إيداع",depositExplain:"أدخل المبلغ وتفاصيل الدفع. لا يتغير الرصيد إلا بعد الاعتماد.",amountKwd:"المبلغ (KWD)",paymentMethod:"طريقة الدفع",referenceOptional:"المرجع (اختياري)",notesOptional:"ملاحظات (اختياري)",submitRequest:"إرسال الطلب",fundingHistory:"طلبات الإيداع",sendTitle:"إرسال الأموال",sendHelp:"أرسل طلب تحويل إلى بنك أو مؤسسة مالية.",sendUnavailable:"إرسال تحويل",sendUnavailableSub:"",withdrawTitle:"السحب من حسابك",withdrawHelp:"اطلب مبلغاً من رصيدك المتاح. يتم الخصم بعد الاعتماد.",requestWithdraw:"طلب سحب",withdrawExplain:"أدخل المبلغ والوجهة. تتم مراجعة الطلب قبل الاعتماد.",method:"الطريقة",destination:"وجهة التحويل",withdrawHistory:"طلبات السحب",settingsTitle:"إعدادات الحساب",settingsSub:"إدارة ملفك الشخصي والبريد وكلمة المرور والمظهر.",profileLabel:"الملف الشخصي",personalDetails:"البيانات الشخصية",avatarHelp:"ارفع صورة شخصية. يتم الاحتفاظ بها على هذا الجهاز لمساحة العضو.",removePhoto:"إزالة الصورة",security:"الأمان",changePassword:"تغيير كلمة المرور",passwordSub:"حدّث كلمة المرور واستمر في تسجيل الدخول.",currentPassword:"كلمة المرور الحالية",newPassword:"كلمة المرور الجديدة",updatePassword:"تحديث كلمة المرور",preferences:"التفضيلات",appearance:"المظهر",themeMode:"السمة",themeModeSub:"اختر الوضع الفاتح أو الداكن.",language:"اللغة",languageSub:"تبديل لغة الواجهة بالكامل.",secureAccount:"حساب آمن",secureAccountSub:"جلسة حسابك محمية.",profileSaved:"تم حفظ بيانات الحساب.",passwordChanged:"تم تغيير كلمة المرور بنجاح.",photoSaved:"تم حفظ صورة الملف على هذا الجهاز.",photoRemoved:"تمت إزالة الصورة.",badPassword:"كلمتا المرور غير متطابقتين.",accountCreated:"تم إنشاء الحساب. يمكنك تسجيل الدخول الآن.",requestSent:"تم إرسال الطلب للمراجعة.",connection:"تعذر الاتصال بالخادم.",noTransactions:"لا توجد معاملات مسجلة.",noInvestments:"لا توجد استثمارات مسجلة.",noFunding:"لا توجد طلبات إيداع.",noWithdrawals:"لا توجد طلبات سحب.",current:"الحالية",status:"الحالة",description:"الوصف",amount:"المبلغ",date:"التاريخ",
currency:"العملة",currencySub:"اختر العملة المعروضة في حسابك.",amountLabel:"المبلغ (KWD)",totalEarnings:"إجمالي الأرباح",saveProfile:"حفظ التغييرات",
memberHighlights:"أعضاء مميزون",topMembers:"أعضاء مميزون",verifiedResults:"نتائج موثقة",ownerRole:"المالك",managerRole:"المدير",memberRole:"عضو",replaceProfilePhotos:"استبدل ملفات الصور في مجلد profiles مع الحفاظ على أسماء الملفات.",menu:"القائمة",theme:"المظهر",saved:"تم الحفظ.",statusCompleted:"مكتمل",statusApproved:"معتمد",statusPending:"قيد المراجعة",statusRejected:"مرفوض",statusActive:"نشط",
light:"فاتح",dark:"داكن",profilePicture:"صورة الملف الشخصي",choosePhoto:"اختر صورة",logoutSuccess:"تم تسجيل الخروج بنجاح.",
fxUnavailable:"سعر الصرف غير متاح حالياً. يرجى المحاولة لاحقاً.",logoutConfirm:"هل تريد تسجيل الخروج؟",fundWallet:"تمويل المحفظة",fundWalletHelp:"للحصول على تعليمات التمويل، تواصل مباشرة مع فريق الدعم عبر المحادثة المباشرة.",openLiveChat:"فتح المحادثة المباشرة",fundChatMessage:"أريد تمويل محفظتي الآن",sendTitleSub:"إرسال الأموال إلى بنك أو مؤسسة مالية",recipientName:"اسم المستفيد",recipientCountry:"دولة المستفيد",bankInstitution:"البنك / المؤسسة المالية",searchBank:"ابحث عن بنك أو مؤسسة",recipientAccount:"رقم الحساب / IBAN / البريد",transferAmount:"مبلغ التحويل",purposeOptional:"الغرض (اختياري)",sendRequest:"إرسال طلب التحويل",transferNotice:"سيتم إرسال طلب التحويل للمراجعة قبل تنفيذ أي حركة مالية.",countryKuwait:"الكويت",countrySaudi:"السعودية",countryUAE:"الإمارات",countryBahrain:"البحرين",countryQatar:"قطر",countryOman:"عُمان",countryEgypt:"مصر",countryJordan:"الأردن",countryTurkey:"تركيا",countryUSA:"الولايات المتحدة",countryUK:"المملكة المتحدة",countryGermany:"ألمانيا",countryFrance:"فرنسا",countryCanada:"كندا",countryAustralia:"أستراليا",countryIndia:"الهند",countryPakistan:"باكستان",countryNigeria:"نيجيريا",countryGhana:"غانا",countrySouthAfrica:"جنوب أفريقيا",countryOther:"دولة أخرى",bankOther:"بنك / مؤسسة أخرى",withdrawBank:"البنك المستلم",accountHolder:"اسم صاحب الحساب",accountNumber:"رقم الحساب / IBAN",withdrawCountry:"دولة البنك",withdrawBankSearch:"ابحث عن بنك",adminMessage:"رسالة من الإدارة",notifications:"رسائل الحساب",noNotifications:"لا توجد رسائل جديدة.",requestStatus:"حالة الطلب",globalDestinations:"وجهات عالمية",bankPaymentDestinations:"البنوك ووجهات الدفع",transferMethods:"تحويل بنكي",iban:"IBAN",paypal:"PayPal",wise:"Wise",payoneer:"Payoneer",revolut:"Revolut",
},
en:{
secureAccess:"Secure member access",memberPortal:"MEMBER PORTAL",welcomeHeadline:"Your financial account, in one place.",welcomeCopy:"Follow your balance, investments and requests from a secure, focused account workspace.",serverData:"Server-recorded account data",secureSessions:"Secure sessions",privateWorkspace:"Private account workspace",secureSignIn:"SECURE SIGN IN",welcomeBack:"Welcome back",loginSub:"Sign in with your username and password.",createSub:"Create your account with your basic details.",username:"Username",password:"Password",signIn:"Sign in",noAccount:"Don't have an account?",haveAccount:"Already have an account?",createAccount:"Create account",fullName:"Full name",email:"Email address",confirmPassword:"Confirm password",memberArea:"Member area",logout:"Log out",home:"Home",deposit:"Deposit",depositSub:"Fund your account",sendMoney:"Send Money",sendSub:"Transfer request",withdraw:"Withdraw",withdrawSub:"Request your funds",settings:"Settings",settingsSub:"Manage your account",dashboardSub:"A professional view of your account and investments.",active:"Account active",availableBalance:"Available balance",realServerBalance:"Balance recorded on the account",depositNow:"Deposit now",withdrawFunds:"Withdraw funds",totalInvested:"Total invested",recordedEarnings:"Recorded earnings",investmentCount:"Active investments",pendingRequests:"Pending requests",activity:"ACTIVITY",portfolio:"PORTFOLIO",transactions:"Recent transactions",investments:"Investments",refresh:"Refresh",history:"HISTORY",depositTitle:"Fund your investment account",fundingHelp:"Submit your funding details for administrative review.",requestFunding:"Deposit request",depositExplain:"Enter the amount and payment details. Your balance changes only after approval.",amountKwd:"Amount (KWD)",paymentMethod:"Payment method",referenceOptional:"Reference (optional)",notesOptional:"Notes (optional)",submitRequest:"Submit request",fundingHistory:"Deposit requests",sendTitle:"Send money",sendHelp:"Send a transfer request to a bank or financial institution.",sendUnavailable:"Send transfer",sendUnavailableSub:"",withdrawTitle:"Withdraw from your account",withdrawHelp:"Request an amount from your available balance. The balance is deducted after approval.",requestWithdraw:"Withdrawal request",withdrawExplain:"Enter your requested amount and destination. Requests are reviewed before approval.",method:"Method",destination:"Transfer destination",withdrawHistory:"Withdrawal requests",settingsTitle:"Account settings",settingsSub:"Manage your profile, email, password and appearance.",profileLabel:"PROFILE",personalDetails:"Personal details",avatarHelp:"Upload a profile picture. It is kept on this device for your Member workspace.",removePhoto:"Remove photo",security:"SECURITY",changePassword:"Change password",passwordSub:"Update your password and stay signed in.",currentPassword:"Current password",newPassword:"New password",updatePassword:"Update password",preferences:"PREFERENCES",appearance:"Appearance",themeMode:"Theme",themeModeSub:"Choose light or dark mode.",language:"Language",languageSub:"Switch the complete interface language.",secureAccount:"Secure account",secureAccountSub:"Your account session is protected.",profileSaved:"Account details saved.",passwordChanged:"Password changed successfully.",photoSaved:"Profile photo saved on this device.",photoRemoved:"Photo removed.",badPassword:"The passwords do not match.",accountCreated:"Account created. You can sign in now.",requestSent:"Request submitted for review.",connection:"Unable to connect to the server.",noTransactions:"No transactions recorded.",noInvestments:"No investments recorded.",noFunding:"No deposit requests.",noWithdrawals:"No withdrawal requests.",current:"Current",status:"Status",description:"Description",amount:"Amount",date:"Date",
currency:"Currency",currencySub:"Choose the display currency for your account.",amountLabel:"Amount (KWD)",totalEarnings:"Total earnings",saveProfile:"Save changes",
memberHighlights:"MEMBER HIGHLIGHTS",topMembers:"Top Members",verifiedResults:"Verified results",ownerRole:"Owner",managerRole:"Manager",memberRole:"Member",replaceProfilePhotos:"Replace the profile files in the profiles folder with the correct photos, keeping the same filenames.",menu:"Menu",theme:"Appearance",saved:"Saved.",statusCompleted:"Completed",statusApproved:"Approved",statusPending:"Pending",statusRejected:"Rejected",statusActive:"Active",
light:"Light",dark:"Dark",profilePicture:"Profile picture",choosePhoto:"Choose photo",logoutSuccess:"You have been signed out.",
fxUnavailable:"The exchange rate is currently unavailable. Please try again later.",logoutConfirm:"Are you sure you want to sign out?",fundWallet:"Fund wallet",fundWalletHelp:"To receive funding instructions, contact our support team directly through live chat.",openLiveChat:"Open live chat",fundChatMessage:"I want to fund my wallet now",sendTitleSub:"Send money to a bank or financial institution",recipientName:"Recipient name",recipientCountry:"Recipient country",bankInstitution:"Bank / financial institution",searchBank:"Search bank or institution",recipientAccount:"Account number / IBAN / email",transferAmount:"Transfer amount",purposeOptional:"Purpose (optional)",sendRequest:"Send transfer request",transferNotice:"Your transfer request will be reviewed before any financial movement is completed.",countryKuwait:"Kuwait",countrySaudi:"Saudi Arabia",countryUAE:"United Arab Emirates",countryBahrain:"Bahrain",countryQatar:"Qatar",countryOman:"Oman",countryEgypt:"Egypt",countryJordan:"Jordan",countryTurkey:"Turkey",countryUSA:"United States",countryUK:"United Kingdom",countryGermany:"Germany",countryFrance:"France",countryCanada:"Canada",countryAustralia:"Australia",countryIndia:"India",countryPakistan:"Pakistan",countryNigeria:"Nigeria",countryGhana:"Ghana",countrySouthAfrica:"South Africa",countryOther:"Other country",bankOther:"Other bank / institution",withdrawBank:"Receiving bank",accountHolder:"Account holder name",accountNumber:"Account number / IBAN",withdrawCountry:"Bank country",withdrawBankSearch:"Search bank",adminMessage:"Message from administration",notifications:"Account messages",noNotifications:"No new messages.",requestStatus:"Request status",globalDestinations:"Global destinations",bankPaymentDestinations:"Banks & payment destinations",transferMethods:"Bank transfer",iban:"IBAN",paypal:"PayPal",wise:"Wise",payoneer:"Payoneer",revolut:"Revolut",
}};


const BANKS={
"Kuwait":["Kuwait Finance House (KFH)","National Bank of Kuwait (NBK)","Gulf Bank","Burgan Bank","Boubyan Bank","Warba Bank","Kuwait International Bank (KIB)","Ahli United Bank Kuwait","Commercial Bank of Kuwait","Ahli Bank of Kuwait","Industrial Bank of Kuwait","Bank of Bahrain and Kuwait - Kuwait","Al Ahli Bank of Kuwait"],
"Saudi Arabia":["Saudi National Bank (SNB)","Al Rajhi Bank","Riyad Bank","Saudi Awwal Bank (SAB)","Bank Albilad","Bank Alinma","Arab National Bank","Banque Saudi Fransi","Saudi Investment Bank","Gulf International Bank Saudi Arabia","Emirates NBD Saudi Arabia","Bank AlJazira"],
"United Arab Emirates":["Emirates NBD","First Abu Dhabi Bank (FAB)","Abu Dhabi Commercial Bank (ADCB)","Mashreq","Dubai Islamic Bank","Abu Dhabi Islamic Bank","Emirates Islamic","RAKBANK","Commercial Bank of Dubai","National Bank of Fujairah","Ajman Bank","Sharjah Islamic Bank"],
"Bahrain":["National Bank of Bahrain","Bank of Bahrain and Kuwait","Ahli United Bank Bahrain","Bahrain Islamic Bank","Kuwait Finance House Bahrain","BisB"],
"Qatar":["Qatar National Bank (QNB)","Qatar Islamic Bank","Commercial Bank Qatar","Doha Bank","Masraf Al Rayan","Dukhan Bank","Ahli Bank Qatar","International Bank of Qatar"],
"Oman":["Bank Muscat","BankDhofar","National Bank of Oman","Ahli Bank Oman","Sohar International","Oman Arab Bank","Bank Nizwa","Alizz Islamic Bank"],
"Egypt":["National Bank of Egypt","Banque Misr","Commercial International Bank (CIB)","QNB Alahli","Banque du Caire","AlexBank","Arab African International Bank","HSBC Egypt","Faisal Islamic Bank of Egypt","Mashreq Egypt"],
"Jordan":["Arab Bank","Jordan Kuwait Bank","Housing Bank for Trade and Finance","Cairo Amman Bank","Bank al Etihad","Jordan Islamic Bank","Investbank","Capital Bank of Jordan"],
"Turkey":["Ziraat Bank","İşbank","Garanti BBVA","Yapi Kredi","Akbank","QNB Türkiye","Halkbank","VakıfBank","DenizBank","Kuveyt Türk"],
"United States":["JPMorgan Chase","Bank of America","Wells Fargo","Citibank","U.S. Bank","PNC Bank","Truist","Capital One","TD Bank","Charles Schwab Bank","Goldman Sachs Bank USA","Morgan Stanley Private Bank"],
"United Kingdom":["Barclays","HSBC UK","Lloyds Bank","NatWest","Royal Bank of Scotland","Santander UK","Halifax","Nationwide Building Society","Metro Bank","TSB Bank","Monzo","Starling Bank"],
"Germany":["Deutsche Bank","Commerzbank","DZ Bank","KfW","ING Germany","DKB","N26","Volksbank Raiffeisenbank","Sparkasse"],
"France":["BNP Paribas","Crédit Agricole","Société Générale","BPCE","Banque Populaire","Caisse d'Epargne","Crédit Mutuel","La Banque Postale","Boursobank"],
"Canada":["Royal Bank of Canada (RBC)","Toronto-Dominion Bank (TD)","Bank of Montreal (BMO)","Bank of Nova Scotia (Scotiabank)","Canadian Imperial Bank of Commerce (CIBC)","National Bank of Canada","Desjardins"],
"Australia":["Commonwealth Bank","Westpac","ANZ","National Australia Bank (NAB)","Macquarie Bank","Bendigo Bank","Suncorp Bank","ING Australia"],
"India":["State Bank of India","HDFC Bank","ICICI Bank","Axis Bank","Kotak Mahindra Bank","IndusInd Bank","Bank of Baroda","Punjab National Bank","Canara Bank","Union Bank of India","IDFC FIRST Bank"],
"Pakistan":["Habib Bank Limited (HBL)","United Bank Limited (UBL)","Meezan Bank","MCB Bank","Allied Bank","Bank Alfalah","Faysal Bank","Standard Chartered Pakistan","Askari Bank"],
"Nigeria":["Access Bank","GTBank","Zenith Bank","First Bank of Nigeria","United Bank for Africa (UBA)","Fidelity Bank","Moniepoint","OPay","Sterling Bank","Stanbic IBTC","Union Bank Nigeria","FCMB"],
"Ghana":["GCB Bank","Ecobank Ghana","Absa Bank Ghana","Stanbic Bank Ghana","Fidelity Bank Ghana","CalBank","Republic Bank Ghana","Standard Chartered Ghana","Consolidated Bank Ghana"],
"South Africa":["Standard Bank","First National Bank (FNB)","Absa","Nedbank","Capitec Bank","Investec","African Bank","TymeBank"],
"Switzerland":["UBS","Credit Suisse","Zürcher Kantonalbank","Julius Baer","Pictet"],
"Netherlands":["ING Netherlands","ABN AMRO","Rabobank","de Volksbank","bunq"],
"Spain":["Banco Santander","BBVA","CaixaBank","Banco Sabadell","Bankinter","Unicaja Banco"],
"Italy":["UniCredit","Intesa Sanpaolo","Banco BPM","BPER Banca","Mediobanca"],
"Japan":["MUFG Bank","SMBC","Mizuho Bank","Resona Bank","Japan Post Bank"],
"Singapore":["DBS Bank","OCBC Bank","United Overseas Bank (UOB)","Standard Chartered Singapore","Citibank Singapore"],
"Hong Kong":["HSBC Hong Kong","Bank of China Hong Kong","Hang Seng Bank","Standard Chartered Hong Kong","DBS Hong Kong"],
"China":["Bank of China","Industrial and Commercial Bank of China (ICBC)","China Construction Bank","Agricultural Bank of China","Bank of Communications","China Merchants Bank"],
"Malaysia":["Maybank","CIMB Bank","Public Bank","RHB Bank","Hong Leong Bank","AmBank"],
"Indonesia":["Bank Mandiri","Bank Central Asia (BCA)","Bank Rakyat Indonesia (BRI)","Bank Negara Indonesia (BNI)","CIMB Niaga","Bank Permata"],
"Philippines":["BDO Unibank","Bank of the Philippine Islands (BPI)","Metrobank","Land Bank of the Philippines","Security Bank"],
"Thailand":["Bangkok Bank","Kasikornbank","Siam Commercial Bank","Krung Thai Bank","Krungsri"],
"Brazil":["Itaú Unibanco","Banco do Brasil","Bradesco","Caixa Econômica Federal","Santander Brasil","BTG Pactual"],
"Mexico":["BBVA México","Banorte","Santander México","Citibanamex","HSBC México","Scotiabank México"],
"Argentina":["Banco Galicia","Banco de la Nación Argentina","Santander Argentina","BBVA Argentina","Banco Macro"],
"Kenya":["KCB Bank Kenya","Equity Bank Kenya","Co-operative Bank of Kenya","Absa Bank Kenya","NCBA Bank Kenya","Stanbic Bank Kenya"],
"Uganda":["Stanbic Bank Uganda","Centenary Bank","Absa Bank Uganda","Bank of Baroda Uganda","DFCU Bank"],
"Tanzania":["CRDB Bank","NMB Bank","NBC Tanzania","Absa Bank Tanzania","Stanbic Bank Tanzania"],
"Rwanda":["Bank of Kigali","I&M Bank Rwanda","Equity Bank Rwanda","BPR Bank Rwanda"],
"New Zealand":["ANZ New Zealand","ASB Bank","BNZ","Westpac New Zealand","Kiwibank"],
"Ireland":["AIB","Bank of Ireland","Permanent TSB","Revolut Bank Ireland"],
"Belgium":["KBC Bank","BNP Paribas Fortis","ING Belgium","Belfius Bank"],
"Austria":["Erste Bank","Raiffeisen Bank","Bank Austria","BAWAG"],
"Sweden":["SEB","Swedbank","Handelsbanken","Nordea Sweden"],
"Norway":["DNB","Nordea Norway","SpareBank 1"],
"Denmark":["Danske Bank","Nordea Denmark","Jyske Bank"],
"Portugal":["Caixa Geral de Depósitos","Millennium BCP","Novo Banco","Santander Totta"],
"Greece":["National Bank of Greece","Piraeus Bank","Alpha Bank","Eurobank"],
"Israel":["Bank Hapoalim","Bank Leumi","Mizrahi-Tefahot Bank","Discount Bank"],
"South Korea":["KB Kookmin Bank","Shinhan Bank","Hana Bank","Woori Bank","NH NongHyup Bank"],
"Vietnam":["Vietcombank","BIDV","VietinBank","ACB","Techcombank"],
"Bangladesh":["Dutch-Bangla Bank","BRAC Bank","Eastern Bank","City Bank Bangladesh","Standard Chartered Bangladesh"],
"Sri Lanka":["Commercial Bank of Ceylon","Sampath Bank","Hatton National Bank","Nations Trust Bank"],
"Nepal":["Nepal Bank","Rastriya Banijya Bank","Nabil Bank","Global IME Bank"],
"Russia":["Sberbank","VTB Bank","Alfa-Bank","Gazprombank","Tinkoff"],
"Ukraine":["PrivatBank","Oschadbank","Raiffeisen Bank Ukraine","UkrSibbank"],
"Poland":["PKO Bank Polski","Bank Pekao","Santander Bank Polska","mBank"],
"Czech Republic":["Česká spořitelna","ČSOB","Komerční banka","Raiffeisenbank Czech Republic"],
"Hungary":["OTP Bank","MBH Bank","Erste Bank Hungary","K&H Bank"],
"Romania":["Banca Transilvania","BCR","BRD - Groupe Société Générale","Raiffeisen Bank Romania"],
"Morocco":["Attijariwafa Bank","Banque Populaire du Maroc","Bank of Africa Morocco","CIH Bank","Crédit du Maroc"],
"Algeria":["Banque Nationale d'Algérie","Banque Extérieure d'Algérie","Crédit Populaire d'Algérie","Société Générale Algérie"],
"Tunisia":["Banque de Tunisie","BIAT","Amen Bank","Attijari Bank Tunisia","Arab Tunisian Bank"],
"Lebanon":["Bank Audi","BLOM Bank","Byblos Bank","Bankmed"],
"Cyprus":["Bank of Cyprus","Hellenic Bank","Eurobank Cyprus"],
"Other":["PayPal","Wise","Revolut","Payoneer","Skrill","Neteller","Other bank / financial institution"]
};
const COUNTRY_KEYS={"Kuwait":"countryKuwait","Saudi Arabia":"countrySaudi","United Arab Emirates":"countryUAE","Bahrain":"countryBahrain","Qatar":"countryQatar","Oman":"countryOman","Egypt":"countryEgypt","Jordan":"countryJordan","Turkey":"countryTurkey","United States":"countryUSA","United Kingdom":"countryUK","Germany":"countryGermany","France":"countryFrance","Canada":"countryCanada","Australia":"countryAustralia","India":"countryIndia","Pakistan":"countryPakistan","Nigeria":"countryNigeria","Ghana":"countryGhana","South Africa":"countrySouthAfrica","Other":"countryOther"};
function fillBankOptions(country, searchId, listId){
 const list=$(listId); if(!list)return;
 const q=(($(searchId)?.value)||"").trim().toLowerCase();
 const names=(BANKS[country]||BANKS.Other).filter(n=>!q||n.toLowerCase().includes(q));
 list.innerHTML=names.map(n=>`<option value="${esc(n)}"></option>`).join("");
}
function populateCountries(selectId){
 const s=$(selectId);if(!s)return;
 s.innerHTML=Object.keys(BANKS).map(c=>`<option value="${esc(c)}">${esc(T[lang][COUNTRY_KEYS[c]]||c)}</option>`).join("");
 if(selectId==="withCountry")s.value="Kuwait";
 if(selectId==="sendCountry")s.value="Kuwait";
}
function refreshBankFields(){
 populateCountries("withCountry");populateCountries("sendCountry");
 fillBankOptions($("withCountry")?.value||"Kuwait","withBankSearch","withBankOptions");
 fillBankOptions($("sendCountry")?.value||"Kuwait","sendBankSearch","sendBankOptions");
}

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
 document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{const k=el.dataset.i18nPlaceholder;if(tr[k])el.placeholder=tr[k]});
 updateCurrencyLabels();
 populateCountries("withCountry");populateCountries("sendCountry");refreshBankFields();
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
 populateCountries("withCountry");populateCountries("sendCountry");refreshBankFields();
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
 if($("notificationList")){
  const ns=data.notifications||[];
  $("notificationList").innerHTML=ns.length?ns.map(n=>`<div class="notification-item"><div><b>${esc(n.title||T[lang].adminMessage)}</b><p>${esc(n.message||"")}</p></div><small>${date(n.created_at)}</small></div>`).join(""):`<div class="empty">${T[lang].noNotifications}</div>`;
 }
 $("transactions").innerHTML=(data.transactions||[]).length?'<div class="row head"><span>'+T[lang].description+'</span><span>'+T[lang].amount+'</span><span>'+T[lang].status+'</span><span>'+T[lang].date+'</span></div>'+
 data.transactions.map(t=>`<div class="row"><span>${esc(t.description||t.type)}</span><b>${fmt(t.amount)}</b><span class="tag ${statusClass(t.status)}">${esc(statusText(t.status))}</span><span>${date(t.created_at)}</span></div>`).join(""):`<div class="empty">${T[lang].noTransactions}</div>`;
 $("investments").innerHTML=(data.investments||[]).length?data.investments.map(i=>`<div class="investment-item"><b>${esc(i.plan_name)}</b><div class="investment-meta"><span>${fmt(i.amount)}</span><span class="tag ${statusClass(i.status)}">${esc(statusText(i.status))}</span></div></div>`).join(""):`<div class="empty">${T[lang].noInvestments}</div>`;
 $("fundList").innerHTML=(data.funding_requests||[]).length?data.funding_requests.map(f=>`<div class="request-item"><b>${fmt(f.amount)}</b><div class="investment-meta"><span>${esc(f.payment_method||"")}</span><span class="tag ${statusClass(f.status)}">${esc(statusText(f.status))}</span></div><div class="investment-meta"><span>${date(f.created_at)}</span></div>${f.admin_message?`<div class="request-message"><strong>${esc(T[lang].adminMessage)}:</strong> ${esc(f.admin_message)}</div>`:""}</div>`).join(""):`<div class="empty">${T[lang].noFunding}</div>`;
 $("withList").innerHTML=(data.withdrawal_requests||[]).length?data.withdrawal_requests.map(f=>`<div class="request-item"><b>${fmt(f.amount)}</b><div class="investment-meta"><span>${esc(f.bank||f.method||"")}</span><span class="tag ${statusClass(f.status)}">${esc(statusText(f.status))}</span></div><div class="investment-meta"><span>${date(f.created_at)}</span></div>${f.admin_message?`<div class="request-message"><strong>${esc(T[lang].adminMessage)}:</strong> ${esc(f.admin_message)}</div>`:""}</div>`).join(""):`<div class="empty">${T[lang].noWithdrawals}</div>`;
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
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",e=>{e.preventDefault();if(b.dataset.view==="funding"){openFundingChat();return}show(b.dataset.view)}));
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
function openFundingChat(){
 const message=T[lang].fundChatMessage;
 try{
   if(window.jivo_api){
     if(data?.user)window.jivo_api.setContactInfo({name:data.user.full_name||"",email:data.user.email||"",description:message});
     window.jivo_api.open({start:"chat"});
     try{navigator.clipboard?.writeText(message)}catch{}
     return;
   }
 }catch{}
 setTimeout(()=>{try{if(window.jivo_api){if(data?.user)window.jivo_api.setContactInfo({name:data.user.full_name||"",email:data.user.email||"",description:message});window.jivo_api.open({start:"chat"})}}catch{}},1200);
}
$("fundChatBtn")?.addEventListener("click",openFundingChat);

$("sendForm").onsubmit=async e=>{e.preventDefault();const b=$("sendBtn");try{b.classList.add("busy");await api("/api/transfers",{method:"POST",body:JSON.stringify({recipient_username:$("sendRecipient").value.trim(),recipient_country:$("sendCountry").value,bank:$("sendBankSearch").value.trim(),destination:$("sendAccount").value.trim(),currency:$("sendCurrency").value,amount:Number($("sendAmount").value),purpose:$("sendPurpose").value.trim()})});toast(T[lang].requestSent);$("sendForm").reset();refreshBankFields();await load();show("send")}catch(e){toast(e.message)}finally{b.classList.remove("busy")}};
$("withdrawForm").onsubmit=async e=>{e.preventDefault();const b=$("withBtn");try{b.classList.add("busy");await api("/api/withdrawals",{method:"POST",body:JSON.stringify({amount:Number($("withAmount").value),currency:$("withCurrency").value,country:$("withCountry").value,bank:$("withBankSearch").value.trim(),account_holder:$("withHolder").value.trim(),account_number:$("withAccount").value.trim(),method:"bank_transfer",destination:$("withAccount").value.trim(),notes:$("withNotes").value.trim()})});toast(T[lang].requestSent);$("withdrawForm").reset();refreshBankFields();await load();show("withdraw")}catch(e){toast(e.message)}finally{b.classList.remove("busy")}};

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


/* Premium 8-profile member carousel. Static profile files are intentionally replaceable. */
(function initMemberCarousel(){
  const track=document.getElementById("profileTrack");
  const viewport=document.querySelector(".profile-viewport");
  const dots=document.getElementById("profileDots");
  const prev=document.getElementById("profilePrev");
  const next=document.getElementById("profileNext");
  if(!track||!viewport||!dots)return;
  const slides=[...track.querySelectorAll(".profile-slide")];
  let index=0;
  let timer=null;
  const visible=()=>window.innerWidth<=600?1:window.innerWidth<=980?2:4;
  const maxIndex=()=>Math.max(0,slides.length-visible());
  const render=()=>{
    const v=visible();
    index=Math.min(index,maxIndex());
    track.style.transform=`translateX(-${(index*(100/v))}%)`;
    dots.innerHTML="";
    for(let i=0;i<=maxIndex();i++){
      const b=document.createElement("button");
      b.type="button";
      b.className="profile-dot"+(i===index?" active":"");
      b.setAttribute("aria-label",`Profile group ${i+1}`);
      b.onclick=()=>{index=i;render();restart();};
      dots.appendChild(b);
    }
  };
  const move=step=>{index+=step;if(index>maxIndex())index=0;if(index<0)index=maxIndex();render();restart();};
  const restart=()=>{clearInterval(timer);timer=setInterval(()=>move(1),5000);};
  prev.addEventListener("click",()=>move(-1));
  next.addEventListener("click",()=>move(1));
  window.addEventListener("resize",render);
  render();restart();
})();

setCurrency(currency);
populateCountries("withCountry");populateCountries("sendCountry");
$("withCountry")?.addEventListener("change",()=>fillBankOptions($("withCountry").value,"withBankSearch","withBankOptions"));
$("sendCountry")?.addEventListener("change",()=>fillBankOptions($("sendCountry").value,"sendBankSearch","sendBankOptions"));
$("withBankSearch")?.addEventListener("input",()=>fillBankOptions($("withCountry").value,"withBankSearch","withBankOptions"));
$("sendBankSearch")?.addEventListener("input",()=>fillBankOptions($("sendCountry").value,"sendBankSearch","sendBankOptions"));
refreshBankFields();
applyLang();
loadFxRates().then(()=>{if(data)render()});
(async()=>{if(token){try{await load()}catch{localStorage.removeItem("ip_token");token=""}}})();

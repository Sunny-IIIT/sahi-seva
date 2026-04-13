"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "EN" | "HI" | "GU";

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const translations = {
  EN: {
    "nav.home": "Home",
    "nav.join": "Join as Worker",
    "nav.signin": "Sign In",
    "hero.badge": "India's Most Trusted Home Services Platform",
    "hero.title1": "Find & Book Trusted Workers",
    "hero.title2": "Across India,",
    "hero.title3": "Instantly",
    "hero.desc": "Aadhaar-verified maids, plumbers, cooks & more — all background-checked. Book in 2 minutes, anywhere in India.",
    "hero.searchService": "What service do you need? (e.g. Maid, Plumber)",
    "hero.searchCity": "Your city (e.g. Mumbai)",
    "hero.searchBtn": "Search",
    "hero.popular": "Popular:",
    "hero.stat1": "Verified Workers",
    "hero.stat2": "Jobs Completed",
    "hero.stat3": "Average Rating",
    "hero.stat4": "BGV Verified",
    
    // Login Customer
    "login.title": "Sign in to Sahiseva",
    "login.subtitle": "Find & hire verified workers near you",
    "login.mobile": "MOBILE NUMBER",
    "login.otp": "OTP",
    "login.resend": "Resend OTP",
    "login.btn": "Verify & Sign In",
    "login.or": "OR",
    "login.join": "Join as a Worker instead →",
    "login.terms": "By signing in you agree to our Terms & Privacy Policy",

    // Login Worker
    "wlogin.title": "Worker Sign In",
    "wlogin.subtitle": "Manage your profile, jobs, and earnings",
    "wlogin.btn": "Sign In to Dashboard",
    "wlogin.join": "Not registered yet? Apply here →",

    // Registration
    "reg.step1": "Your Profile",
    "reg.step2": "Verify ID",
    "reg.title1": "Become a Verified Worker",
    "reg.desc1": "Earn more with trust and transparency",
    "reg.title2": "Verify Your Identity",
    "reg.desc2": "We tokenize your ID — raw files are never stored",
    "reg.fullName": "FULL NAME",
    "reg.phone": "PHONE NUMBER",
    "reg.area": "AREA / CITY",
    "reg.price": "EXPECTED PRICING",
    "reg.category": "SERVICE CATEGORY",
    "reg.next": "Next: Verify Aadhaar",
    "reg.already": "Already verified?",
    "reg.upload": "Upload Aadhaar Card",
    "reg.complete": "Complete Registration",

    // Categories (Full List)
    "cat.Maids": "Maids",
    "cat.Plumbers": "Plumbers",
    "cat.Cooks": "Cooks",
    "cat.Electricians": "Electricians",
    "cat.Painters": "Painters",
    "cat.Carpenters": "Carpenters",
    "cat.Gardeners": "Gardeners",
    "cat.Guards": "Guards",
    "cat.Nannies": "Nannies",
    "cat.Nurses": "Nurses",
    "cat.Beauticians": "Beauticians",
    "cat.Car Washers": "Car Washers",
    "cat.Pest Control": "Pest Control",
    "cat.Delivery": "Delivery",
    "cat.Loaders": "Loaders",
    "cat.Tailors": "Tailors",
    "cat.Tutors": "Tutors",
    "cat.Mechanics": "Mechanics",
    "cat.Photographers": "Photographers",
    "cat.Cleaners": "Cleaners",
    
    // Category Grid UI
    "cat.subtitle": "All workers are Aadhaar-verified & background-checked before they reach you.",
    "cat.bookNow": "Book Now",

    // Dashboard
    "dash.hello": "Hello,",
    "dash.subtitle": "Manage your profile, visibility and pricing",
    "dash.stat1": "Profile Views",
    "dash.stat1sub": "+12% this month",
    "dash.stat2": "Total Reviews",
    "dash.stat2sub": "4.8 avg rating",
    "dash.stat3": "Jobs Done",
    "dash.stat3sub": "This year",
    "dash.badge1": "BGV Verified",
    "dash.badge2": "4.8 ★ Rating",
    "dash.badge3": "Top 5%",
    "dash.trust": "TRUST SCORE",
    "dash.pricingTitle": "Pricing Settings",
    "dash.currentRate": "CURRENT RATE",
    "dash.pricingDesc": "Consistent pricing improves your search ranking.",
    "dash.quick": "Quick Actions",
    "dash.action1": "View My Public Profile",
    "dash.action2": "Edit Profile Details",
    "dash.toast1": "Public Profile view is coming soon!",
    "dash.toast2": "Profile editor will be added in Phase 2."
  },
  HI: {
    "nav.home": "होम",
    "nav.join": "वर्कर बनें",
    "nav.signin": "लॉग इन",
    "hero.badge": "भारत का सबसे भरोसेमंद होम सर्विस प्लेटफॉर्म",
    "hero.title1": "भरोसेमंद कामगार खोजें और बुक करें",
    "hero.title2": "पूरे भारत में,",
    "hero.title3": "तुरंत",
    "hero.desc": "आधार-सत्यापित मेड, प्लंबर, रसोइए और बहुत कुछ — सभी का बैकग्राउंड चेक किया गया है। भारत में कहीं भी, 2 मिनट में बुक करें।",
    "hero.searchService": "आपको कौन सी सेवा चाहिए? (उदा. मेड, प्लंबर)",
    "hero.searchCity": "आपका शहर (उदा. मुंबई)",
    "hero.searchBtn": "खोजें",
    "hero.popular": "लोकप्रिय:",
    "hero.stat1": "सत्यापित कामगार",
    "hero.stat2": "पूरे किए गए काम",
    "hero.stat3": "औसत रेटिंग",
    "hero.stat4": "BGV सत्यापित",

    // Login Customer
    "login.title": "सहीसेवा में लॉग इन करें",
    "login.subtitle": "अपने आस-पास सत्यापित कामगार खोजें",
    "login.mobile": "मोबाइल नंबर",
    "login.otp": "ओटीपी (OTP)",
    "login.resend": "ओटीपी फिर भेजें",
    "login.btn": "सत्यापित करें और लॉग इन करें",
    "login.or": "या",
    "login.join": "कामगार के रूप में जुड़ें →",
    "login.terms": "लॉग इन करके आप हमारी शर्तों और गोपनीयता नीति से सहमत हैं",

    // Login Worker
    "wlogin.title": "कामगार लॉग इन",
    "wlogin.subtitle": "अपनी प्रोफ़ाइल और काम प्रबंधित करें",
    "wlogin.btn": "डैशबोर्ड में लॉग इन करें",
    "wlogin.join": "पंजीकृत नहीं हैं? यहाँ आवेदन करें →",

    // Registration
    "reg.step1": "आपकी प्रोफ़ाइल",
    "reg.step2": "ID सत्यापित करें",
    "reg.title1": "सत्यापित कामगार बनें",
    "reg.desc1": "विश्वास और पारदर्शिता के साथ अधिक कमाएं",
    "reg.title2": "अपनी पहचान सत्यापित करें",
    "reg.desc2": "हम आपकी ID को सुरक्षित टोकन में बदलते हैं — फाइलें स्टोर नहीं होतीं",
    "reg.fullName": "पूरा नाम",
    "reg.phone": "फ़ोन नंबर",
    "reg.area": "क्षेत्र / शहर",
    "reg.price": "अपेक्षित मूल्य",
    "reg.category": "सेवा श्रेणी",
    "reg.next": "आगे बढ़ें: आधार सत्यापन",
    "reg.already": "पहले से सत्यापित हैं?",
    "reg.upload": "आधार कार्ड अपलोड करें",
    "reg.complete": "पंजीकरण पूरा करें",

    // Categories
    "cat.Maids": "कामवाली बाई",
    "cat.Plumbers": "प्लंबर",
    "cat.Cooks": "रसोइया",
    "cat.Electricians": "बिजली वाला",
    "cat.Painters": "पुताई वाला",
    "cat.Carpenters": "बढ़ई",
    "cat.Gardeners": "माली",
    "cat.Guards": "सुरक्षा गार्ड",
    "cat.Nannies": "नैनियाँ (Nannies)",
    "cat.Nurses": "नर्स",
    "cat.Beauticians": "ब्यूटीशियन",
    "cat.Car Washers": "कार धोने वाला",
    "cat.Pest Control": "कीट नियंत्रण (Pest Control)",
    "cat.Delivery": "डिलिवरी बॉय",
    "cat.Loaders": "लोडर (मज़दूर)",
    "cat.Tailors": "दर्जी",
    "cat.Tutors": "ट्यूटर (शिक्षक)",
    "cat.Mechanics": "मैकेनिक",
    "cat.Photographers": "फोटोग्राफर",
    "cat.Cleaners": "सफाई कर्मचारी",

    // Category Grid UI
    "cat.subtitle": "सभी कामगार आपके घर पहुँचने से पहले आधार द्वारा सत्यापित और बैकग्राउंड-चेक किए जाते हैं।",
    "cat.bookNow": "अभी बुक करें",

    // Dashboard
    "dash.hello": "नमस्ते,",
    "dash.subtitle": "अपनी प्रोफ़ाइल, दृश्यता और मूल्य निर्धारण प्रबंधित करें",
    "dash.stat1": "प्रोफ़ाइल व्यूज",
    "dash.stat1sub": "इस महीने +12%",
    "dash.stat2": "कुल समीक्षाएं",
    "dash.stat2sub": "4.8 औसत रेटिंग",
    "dash.stat3": "किए गए काम",
    "dash.stat3sub": "इस साल",
    "dash.badge1": "BGV सत्यापित",
    "dash.badge2": "4.8 ★ रेटिंग",
    "dash.badge3": "शीर्ष 5%",
    "dash.trust": "विश्वास स्कोर (Trust Score)",
    "dash.pricingTitle": "मूल्य सेटिंग",
    "dash.currentRate": "वर्तमान दर",
    "dash.pricingDesc": "सही मूल्य निर्धारण आपकी खोज रैंकिंग में सुधार करता है।",
    "dash.quick": "त्वरित क्रियाएँ",
    "dash.action1": "मेरी सार्वजानिक प्रोफ़ाइल देखें",
    "dash.action2": "प्रोफ़ाइल विवरण संपादित करें",
    "dash.toast1": "सार्वजनिक प्रोफ़ाइल दृश्य जल्द ही आ रहा है!",
    "dash.toast2": "प्रोफ़ाइल संपादक चरण 2 में जोड़ा जाएगा।"
  },
  GU: {
    "nav.home": "મુખ્ય પૃષ્ઠ",
    "nav.join": "કામદાર તરીકે જોડાઓ",
    "nav.signin": "સાઇન ઇન",
    "hero.badge": "ભારતનું સૌથી વિશ્વસનીય હોમ સર્વિસ પ્લેટફોર્મ",
    "hero.title1": "વિશ્વસનીય કામદારો શોધો અને બુક કરો",
    "hero.title2": "સમગ્ર ભારતમાં,",
    "hero.title3": "તરત જ",
    "hero.desc": "આધાર-વેરીફાઈડ મેઇડ, પ્લમ્બર, રસોઈયા અને વધુ — તમામનું બેકગ્રાઉન્ડ ચેક કરેલ છે. ભારતમાં ગમે ત્યાં, 2 મિનિટમાં બુક કરો.",
    "hero.searchService": "તમારે કઈ સેવાની જરૂર છે? (દા.ત. મેઇડ, પ્લમ્બર)",
    "hero.searchCity": "તમારું શહેર (દા.ત. મુંબઈ)",
    "hero.searchBtn": "શોધો",
    "hero.popular": "લોકપ્રિય:",
    "hero.stat1": "વેરિફાઇડ કામદારો",
    "hero.stat2": "પૂર્ણ થયેલ કામો",
    "hero.stat3": "સરેરાશ રેટિંગ",
    "hero.stat4": "BGV વેરિફાઇડ",

     // Login Customer
    "login.title": "સહીસેવા માં સાઇન ઇન કરો",
    "login.subtitle": "તમારી નજીક 100% વેરિફાઇડ કામદારો શોધો",
    "login.mobile": "મોબાઇલ નંબર",
    "login.otp": "ઓટીપી (OTP)",
    "login.resend": "ઓટીપી ફરી મોકલો",
    "login.btn": "ચકાસો અને સાઇન ઇન કરો",
    "login.or": "અથવા",
    "login.join": "કામદાર તરીકે જોડાઓ →",
    "login.terms": "સાઇન ઇન કરીને તમે અમારી શરતો અને ગોપનીયતા નીતિ સાથે સંમત થાઓ છો",

    // Login Worker
    "wlogin.title": "કામદાર સાઇન ઇન",
    "wlogin.subtitle": "તમારી પ્રોફાઇલ અને નોકરીઓ મેનેજ કરો",
    "wlogin.btn": "ડેશબોર્ડમાં સાઇન ઇન કરો",
    "wlogin.join": "રજિસ્ટર્ડ નથી? અહીં અરજી કરો →",

    // Registration
    "reg.step1": "તમારી પ્રોફાઇલ",
    "reg.step2": "ID ચકાસો",
    "reg.title1": "વેરિફાઇડ કામદાર બનો",
    "reg.desc1": "વિશ્વાસ અને પારદર્શિતા સાથે વધુ કમાઓ",
    "reg.title2": "તમારી ઓળખ ચકાસો",
    "reg.desc2": "અમે તમારી ID ને સુરક્ષિત રીતે ટોકનાઈઝ કરીએ છીએ",
    "reg.fullName": "પૂરું નામ",
    "reg.phone": "ફોન નંબર",
    "reg.area": "વિસ્તાર / શહેર",
    "reg.price": "અપેક્ષિત કિંમત",
    "reg.category": "સેવા શ્રેણી",
    "reg.next": "આગળ: આધાર ચકાસો",
    "reg.already": "પહેલેથી જ ચકાસાયેલ છે?",
    "reg.upload": "આધાર કાર્ડ અપલોડ કરો",
    "reg.complete": "નોંધણી પૂર્ણ કરો",

    // Categories
    "cat.Maids": "કામવાળી",
    "cat.Plumbers": "પ્લમ્બર",
    "cat.Cooks": "રસોઈયા",
    "cat.Electricians": "લાઈટવાળા",
    "cat.Painters": "રંગારા",
    "cat.Carpenters": "સુથાર",
    "cat.Gardeners": "માળી",
    "cat.Guards": "સિક્યોરિટી ગાર્ડ",
    "cat.Nannies": "આયા",
    "cat.Nurses": "નર્સ",
    "cat.Beauticians": "બ્યુટિશિયન",
    "cat.Car Washers": "કાર ધોનાર",
    "cat.Pest Control": "પેસ્ટ કંટ્રોલ",
    "cat.Delivery": "ડિલિવરી બોય",
    "cat.Loaders": "મજૂર",
    "cat.Tailors": "દરજી",
    "cat.Tutors": "શિક્ષક",
    "cat.Mechanics": "મિકેનિક",
    "cat.Photographers": "ફોટોગ્રાફર",
    "cat.Cleaners": "સફાઈ કામદાર",

    // Category Grid UI
    "cat.subtitle": "તમારા ઘરે પહોંચતા પહેલા તમામ કામદારો આધાર દ્વારા વેરિફાઇડ અને બેકગ્રાઉન્ડ ચેક કરવામાં આવે છે.",
    "cat.bookNow": "હમણાં બુક કરો",

    // Dashboard
    "dash.hello": "નમસ્તે,",
    "dash.subtitle": "તમારી પ્રોફાઇલ, દૃશ્યતા અને કિંમત મેનેજ કરો",
    "dash.stat1": "પ્રોફાઇલ વ્યૂઝ",
    "dash.stat1sub": "આ મહિને +12%",
    "dash.stat2": "કુલ સમીક્ષાઓ",
    "dash.stat2sub": "4.8 સરેરાશ રેટિંગ",
    "dash.stat3": "પૂર્ણ થયેલ કામો",
    "dash.stat3sub": "આ વર્ષે",
    "dash.badge1": "BGV વેરિફાઇડ",
    "dash.badge2": "4.8 ★ રેટિંગ",
    "dash.badge3": "ટોચના 5%",
    "dash.trust": "વિશ્વાસ સ્કોર",
    "dash.pricingTitle": "કિંમત સેટિંગ",
    "dash.currentRate": "વર્તમાન દર",
    "dash.pricingDesc": "સાચી કિંમત તમારી શોધ રેન્કિંગમાં સુધારો કરે છે.",
    "dash.quick": "ઝડપી ક્રિયાઓ",
    "dash.action1": "મારી સાર્વજનિક પ્રોફાઇલ જુઓ",
    "dash.action2": "પ્રોફાઇલ વિગતોમાં ફેરફાર કરો",
    "dash.toast1": "સાર્વજનિક પ્રોફાઇલ વ્યૂ ટૂંક સમયમાં આવી રહ્યું છે!",
    "dash.toast2": "પ્રોફાઇલ એડિટર તબક્કા 2 માં ઉમેરવામાં આવશે."
  }
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("EN");

  // Read saved language from localStorage on mount (client-side only)
  React.useEffect(() => {
    const saved = localStorage.getItem('sahiseva_lang') as Lang | null;
    if (saved && ['EN', 'HI', 'GU'].includes(saved)) {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('sahiseva_lang', l);
  };

  const t = (key: string): string => {
    // @ts-ignore
    const translated = translations[lang][key] || translations["EN"][key];
    if (translated) return translated;
    
    // If it's a category and no translation exists, remove the "cat." prefix
    if (key.startsWith("cat.")) {
      return key.replace("cat.", "");
    }
    
    return key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

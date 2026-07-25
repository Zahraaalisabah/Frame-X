document.addEventListener('DOMContentLoaded', () => {

    // 1. التحكم بنقاط التمرير (Carousel Dots) في الهيرو الرئيسي
    const dots = document.querySelectorAll('.carousel-dots .dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            // هنا يمكن إضافة كود لتبديل العروض أو الصور الخلفية في المستقبل
        });
    });

    // 2. تفعيل اختيار الباقات النشطة (Sectors Selection)
    const sectorCards = document.querySelectorAll('.sector-card');
    sectorCards.forEach(card => {
        card.addEventListener('click', () => {
            sectorCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    // 3. تمرير سلس في أشرطة المعارض والأعمال عند النقر على الأسهم
    const setupCarousel = (gridClass, nextBtnClass, prevBtnClass) => {
        const grid = document.querySelector(gridClass);
        const nextBtn = document.querySelector(nextBtnClass);
        const prevBtn = document.querySelector(prevBtnClass);

        if (grid && nextBtn && prevBtn) {
            const scrollAmount = 250;
            nextBtn.addEventListener('click', () => {
                grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); // اتجاه سالب لـ RTL
            });
            prevBtn.addEventListener('click', () => {
                grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }
    };

    // تطبيق التمرير على الباقات ومعرض الأعمال
    setupCarousel('.sectors-grid', '.sectors-carousel .next', '.sectors-carousel .prev');
    setupCarousel('.portfolio-grid', '.portfolio-carousel .next', '.portfolio-carousel .prev');
});
document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("worksTrack");
    const prevBtn = document.getElementById("slidePrev");
    const nextBtn = document.getElementById("slideNext");
    const cards = document.querySelectorAll(".work-slide-card");
    
    let currentIndex = 0;

    function getVisibleCardsCount() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 4; // عدد الكروت الافتراضي للشاشات الكبيرة
    }

    function updateSliderPosition() {
        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = 20; // مطابق للـ Gap بالـ CSS
        const totalShift = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(${totalShift}px)`; // الإزاحة لليمين لأن اتجاه الموقع العربي RTL
    }

    // زر السابق
    prevBtn.addEventListener("click", () => {
        const visibleCards = getVisibleCardsCount();
        if (currentIndex < cards.length - visibleCards) {
            currentIndex++;
        } else {
            currentIndex = 0; // العودة للبداية عند الوصول للنهاية
        }
        updateSliderPosition();
    });

    // زر التالي
    nextBtn.addEventListener("click", () => {
        const visibleCards = getVisibleCardsCount();
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = cards.length - visibleCards; // الذهاب للنهاية
        }
        updateSliderPosition();
    });

    // ملاءمة السلايدر عند تغيير حجم الشاشة
    window.addEventListener("resize", () => {
        currentIndex = 0;
        updateSliderPosition();
    });

    // تفعيل تشغيل الفيديو بالضغط على الكارت
    const lightbox = document.getElementById("worksLightbox");
    const lightboxVideo = document.getElementById("worksLightboxVideo");
    const lightboxClose = document.getElementById("worksLightboxClose");

    cards.forEach(card => {
        card.addEventListener("click", function () {
            const videoUrl = this.getAttribute("data-video-url");
            if (videoUrl) {
                lightboxVideo.src = videoUrl;
                lightbox.classList.add("active");
                lightboxVideo.play();
            }
        });
    });

    // إغلاق نافذة الفيديو
    lightboxClose.addEventListener("click", () => {
        lightbox.classList.remove("active");
        lightboxVideo.pause();
        lightboxVideo.src = "";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove("active");
            lightboxVideo.pause();
            lightboxVideo.src = "";
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('sectorsTrack');
    const prevBtn = document.getElementById('sectSlidePrev');
    const nextBtn = document.getElementById('sectSlideNext');

    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;

        function getVisibleCards() {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 4;
        }

        function updateSlider() {
            const cards = track.querySelectorAll('.sect-card');
            const totalCards = cards.length;
            const visibleCards = getVisibleCards();
            const maxIndex = totalCards - visibleCards;

            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;

            const cardWidth = cards[0].getBoundingClientRect().width + 20; // 20px is gap
            track.style.transform = `translateX(${currentIndex * cardWidth}px)`;
        }

        nextBtn.addEventListener('click', () => {
            const visibleCards = getVisibleCards();
            const totalCards = track.querySelectorAll('.sect-card').length;
            if (currentIndex < totalCards - visibleCards) {
                currentIndex++;
            } else {
                currentIndex = 0; // العودة للبداية
            }
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                const visibleCards = getVisibleCards();
                const totalCards = track.querySelectorAll('.sect-card').length;
                currentIndex = totalCards - visibleCards; // الانتقال للنهاية
            }
            updateSlider();
        });

        window.addEventListener('resize', updateSlider);
    }
});


// ==========================================
// إعدادات ومساعد Frame X الذكي (Gemini)
// ==========================================

// ⚠️ استبدل الرقم برقم واتساب الشركة الرسمي (مثال: 9647800000000)
const WHATSAPP_LINK = "https://wa.me/9647800000000"; 

const SYSTEM_INSTRUCTION = `
أنت "مستشار Frame X الذكي" - مساعد شخصي ومستشار تسويقي احترافي لشركة Frame X في بغداد، العراق.

🎯 هدفك الرئيسي:
1. الترحيب بالزبون بأسلوب ودي جداً واحترافي.
2. السؤال عن نوع مشروع الزبون (مطعم، عيادة طبية، متجر ملابس، شركة، مشروع فني، إلخ).
3. تقديم نصائح تسويقية ذكية واقتراح الباقة المناسبة لمشروعه وميزانيته من بين باقاتنا.
4. إقناع الزبون بذكاء وفهم عالي بدون إجبار.
5. في نهاية المحادثة أو عند استفسار الزبون عن الحجز والتفاصيل الرسمية، وجّهه للتواصل المباشر مع القسم المختص عبر الواتساب.

---
📋 تفاصيل باقات Frame X المتاحة:

1️⃣ الفئة الفضية (Silver):
- 2 ريلز، 10 صور، 5 تصاميم.
- استشارة تسويقية واحدة، فكرتان لتطوير المشروع.
- الهدف: الدخول بالسوق كمنافس على المستوى الشخصي.
- السعر: 400 ألف دينار شهرياً.

2️⃣ الفئة الذهبية (Gold):
- 4 ريلزات، 15 صورة، 8 تصاميم.
- 3 استشارات تسويقية، 5 أفكار لتطوير المشروع.
- الهدف: المنافسة على مستوى أعلى من المستوى الشخصي.
- السعر: 600 ألف دينار شهرياً.

3️⃣ الفئة الماسية (Diamond):
- 6 ريلزات، 20 صورة، 12 تصميم.
- 5 استشارات تسويقية، 7 أفكار لتطوير المشروع.
- الهدف: تفوق كامل على المنافسين الحاليين.
- السعر: 850 ألف دينار شهرياً.

4️⃣ الفئة العليا (Taj):
- 7 ريلزات، 28 صورة، 15 تصميم.
- 7 استشارات تسويقية، 8 أفكار لتطوير المشروع.
- الهدف: الصدارة وتجاوز جميع المنافسين بالسوق.
- السعر: مليون و50 ألف دينار شهرياً.

---
⭐ مميزات وقواعد عمل Frame X (استخدمها أثناء الشرح مع الزبون):
- المودلز متوفرون مجاناً وبدون عدد محدد مع جميع الاشتراكات سواء للصور أو الريلزات.
- بعد اشتراك سنة كاملة، نقدم قياس مدى تطور المشروع ودراسة جدوى سنوية شاملة وحل أي إخفاقات.
- خطط المحتوى هي مسؤولية فريق المسوقين وكتّاب المحتوى لدينا بفضل فهمنا العميق لسلوك الزبون العراقي.
- نعتبر أنفسنا شركاء حقيقيين لمشروعك، ويوفر فريقنا موظفاً خاصاً للرد على طلباتك وإتمام المبيعات فوراً.
- يُفضل دائماً تحديد ميزانية مخصصة لتفصيل باقة استثنائية تناسب دخلك.

---
💬 أسلوب الرد والتحويل للواتساب:
- عند توجيه الزبون للواتساب، استخدم دائماً صيغة HTML للرابط مثل: 
  "<a href='${WHATSAPP_LINK}' target='_blank' style='color:#ff007f; font-weight:bold;'>اضغط هنا للتواصل المباشر عبر الواتساب 📲</a>"
- أجب بإيجاز، نسّق ردودك بنقاط واضحة، ولا تضع ردوداً طويلة جداً تدفع الزبون للملل.
`;

// مصفوفة الذاكرة لإرسال المحادثة كاملة إلى Gemini
let chatHistory = [];

async function handleSend() {
    const inputField = document.getElementById("ai-input");
    const text = inputField.value.trim();
    if (!text) return;

    appendMessage(text, "user");
    inputField.value = "";

    chatHistory.push({
        role: "user",
        parts: [{ text: text }]
    });

    const loadingMsg = appendMessage("جاري التفكير...", "bot");

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                systemInstruction: {
                    parts: [{ text: SYSTEM_INSTRUCTION }]
                },
                contents: chatHistory
            })
        });

        const data = await response.json();

        if (response.ok && data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            const botReply = data.candidates[0].content.parts[0].text;
            loadingMsg.innerHTML = botReply.replace(/\n/g, "<br>");

            chatHistory.push({
                role: "model",
                parts: [{ text: botReply }]
            });
        } else {
            loadingMsg.innerText = "عذراً، حدث خطأ بسيط، تواصل معنا مباشرة عبر الواتساب!";
        }

    } catch (err) {
        console.error("Fetch Error:", err);
        loadingMsg.innerText = "حدث خطأ في الاتصال، يرجى المحاولة لاحقاً.";
    }
}

function appendMessage(text, sender) {
    const messagesContainer = document.getElementById("ai-chat-messages");
    if (!messagesContainer) return;

    const msgDiv = document.createElement("div");
    msgDiv.className = `ai-msg ${sender}`;
    msgDiv.innerHTML = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return msgDiv;
}

// ==========================================
// ربط نموذج التواصل بالواتساب تلقائياً
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // منع إعادة تحميل الصفحة

        // 1. جلب البيانات من المدخلات
        const name = document.getElementById('contactName').value.trim();
        const phone = document.getElementById('contactPhone').value.trim();
        const email = document.getElementById('contactEmail').value.trim() || "غير محدد";
        const service = document.getElementById('contactService').value;
        const details = document.getElementById('contactDetails').value.trim() || "لا توجد تفاصيل إضافية";

        // ⚠️ رقم واتساب الشركة الرسمية بدون علامة + (استبدله برقمك الحقيقي)
        const companyWhatsApp = "9647751246272"; 

        // 2. صياغة النص المرسل للواتساب
        const message = `السلام عليكم Frame X👋
لدي طلب جديد من الموقع:

👤 *الاسم:* ${name}
📞 *رقم الهاتف:* ${phone}
📧 *البريد:* ${email}
🛠️ *الخدمة المطلوبة:* ${service}
📝 *تفاصيل المشروع:*
${details}`;

        // 3. ترميز الرسالة وفتح رابط الواتساب
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${companyWhatsApp}?text=${encodedMessage}`;

        // فتح الواتساب في نافذة جديدة
        window.open(whatsappURL, '_blank');
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const promoVideo = document.getElementById('promoDirectVideo');
    const soundToggle = document.getElementById('soundToggle');
    const soundIcon = document.getElementById('soundIcon');

    if (promoVideo && soundToggle) {
        soundToggle.addEventListener('click', function () {
            // كتم أو تشغيل الصوت
            promoVideo.muted = !promoVideo.muted;

            // تغيير الأيقونة بناءً على حالة الصوت
            if (promoVideo.muted) {
                soundIcon.className = 'fa-solid fa-volume-xmark';
                soundToggle.setAttribute('title', 'تشغيل الصوت');
            } else {
                soundIcon.className = 'fa-solid fa-volume-high';
                soundToggle.setAttribute('title', 'كتم الصوت');
            }
        });
    }
});














// ==========================================================================
// كود التجاوب والتفاعل مع الشاشات والسحب باللمس (Responsive & Touch Module)
// ==========================================================================

function initResponsiveSlider(config) {
    const track = document.getElementById(config.trackId);
    const prevBtn = document.getElementById(config.prevBtnId);
    const nextBtn = document.getElementById(config.nextBtnId);
    const cards = track ? track.querySelectorAll(config.cardSelector) : [];

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isDragging = false;

    // 1. تحديد عدد الكروت المعروضة بناءً على عرض شاشة الجهاز الفعلي
    function getVisibleCardsCount() {
        const width = window.innerWidth;
        if (width < 600) return 1;       // هواتف أندرويد وآيفون
        if (width < 992) return 2;       // آيباد وتابلت
        if (width < 1200) return 3;      // شاشات لابتوب صغيرة
        return 4;                        // شاشات كبيرة
    }

    // 2. تحريك السلايدر وحساب المسافات تلقائياً
    function updateSliderPosition() {
        const visibleCards = getVisibleCardsCount();
        const maxIndex = Math.max(0, cards.length - visibleCards);

        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = parseFloat(window.getComputedStyle(track).gap) || 20;
        const totalShift = currentIndex * (cardWidth + gap);

        track.style.transform = `translateX(${totalShift}px)`;
        prevTranslate = totalShift;
    }

    // 3. أزرار الأسهم
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const visibleCards = getVisibleCardsCount();
            if (currentIndex < cards.length - visibleCards) {
                currentIndex++;
            } else {
                currentIndex = 0; // العودة للبداية
            }
            updateSliderPosition();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                const visibleCards = getVisibleCardsCount();
                currentIndex = Math.max(0, cards.length - visibleCards); // الذهاب للنهاية
            }
            updateSliderPosition();
        });
    }

    // 4. دعم السحب باللمس للأندرويد والأيفون والماوس للابتوب
    track.addEventListener('touchstart', touchStart, { passive: true });
    track.addEventListener('touchend', touchEnd);
    track.addEventListener('touchmove', touchMove, { passive: true });

    track.addEventListener('mousedown', touchStart);
    track.addEventListener('mouseup', touchEnd);
    track.addEventListener('mouseleave', touchEnd);
    track.addEventListener('mousemove', touchMove);

    function touchStart(event) {
        isDragging = true;
        startX = getPositionX(event);
        track.style.transition = 'none';
    }

    function touchMove(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        const diff = currentPosition - startX;
        currentTranslate = prevTranslate + diff;
    }

    function touchEnd() {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -50) { // سحب لليسار
            const visibleCards = getVisibleCardsCount();
            if (currentIndex < cards.length - visibleCards) currentIndex++;
        } else if (movedBy > 50) { // سحب لليمين
            if (currentIndex > 0) currentIndex--;
        }

        updateSliderPosition();
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    }

    // 5. تعديل المظهر فوراً عند تغيير اتجاه الشاشة أو حجمها (Resize / Orientation)
    window.addEventListener('resize', updateSliderPosition);

    // التشغيل المبدئي
    updateSliderPosition();
}

// ----------------------------------------------------
// تشغيل السلايدرات الخاصة بالموقع
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // سلايدر الأعمال
    initResponsiveSlider({
        trackId: 'worksTrack',
        prevBtnId: 'slidePrev',
        nextBtnId: 'slideNext',
        cardSelector: '.work-slide-card'
    });

    // سلايدر الباقات / القطاعات
    initResponsiveSlider({
        trackId: 'sectorsTrack',
        prevBtnId: 'sectSlidePrev',
        nextBtnId: 'sectSlideNext',
        cardSelector: '.sect-card'
    });
});
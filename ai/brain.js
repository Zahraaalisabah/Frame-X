class FrameXBrain {
    processInput(userText) {
        memory.addHistory('user', userText);
        const intent = flow.checkIntent(userText);

        // 1. التحية
        if (intent === "greetings") {
            const currentStep = flow.getCurrentStep();
            let reply = "يا أهلاً وسهلاً بك! الحمد لله بخير، كيف حالك أنت؟ 🌸<br><br>";
            if (currentStep && currentStep.key === "projectType") {
                reply += "شنو نوع مشروعك أو الفكرة اللي تحب تطورها ويا Frame X؟";
            } else if (currentStep) {
                reply += "نرجع لمشروعك، " + currentStep.question;
            } else {
                reply += "كيف أقدر أساعدك اليوم؟";
            }
            memory.addHistory('bot', reply);
            return reply;
        }

        // 2. الاستفسار عن الخدمات
        if (intent === "services") {
            let reply = "<b>كل ما يحتاجه مشروعك في مكان واحد مع Frame X 🚀:</b><br><br>";
            reply += "📱 <b>إدارة السوشال ميديا:</b> إدارة احترافية لجميع المنصات مع خطة محتوى شهرية وتقارير أداء.<br>";
            reply += "🎨 <b>تصميم الهوية البصرية:</b> شعار وهوية متكاملة تعكس شخصية براندك.<br>";
            reply += "📸 <b>التصوير الاحترافي:</b> تصوير المنتجات والخدمات بأعلى جودة.<br>";
            reply += "🎬 <b>المونتاج والموشن جرافيك:</b> فيديوهات إعلانية قصيرة مخصصة للسوشال ميديا.<br>";
            reply += "🌐 <b>تصميم المواقع وربط البكسل:</b> مواقع سريعة ومتجاوبة مع ربط البكسل.<br>";
            reply += "🎯 <b>الحملات الإعلانية:</b> إدارة حملات Meta وGoogle للوصول للجمهور المناسب.<br>";
            reply += "📝 <b>كتابة المحتوى:</b> محتوى إبداعي يبرز علامتك التجارية.<br>";
            reply += "⚖️ <b>إخلاء المسؤولية:</b> حماية الحسابات والإعلانات حسب سياسات Meta.<br><br>";
            reply += "🌟 <b>مميزات حصرية:</b> المودلز مجاناً وبدون حدود، ودراسة جدوى سنوية!<br><br>";

            const currentStep = flow.getCurrentStep();
            if (currentStep) {
                reply += "حتى أقولك أي خدمة أو باقة تناسبك بالضبط، <b>" + currentStep.question.replace("أهلاً بك في Frame X! 🎬<br>", "") + "</b>";
            }

            memory.addHistory('bot', reply);
            return reply;
        }

        // 3. الاستفسار عن الباقات
        if (intent === "packages") {
            let reply = "<b>باقات Frame X التسويقية 📊:</b><br><br>";
            PACKAGES_BASE.forEach(pkg => {
                reply += `🔹 <b>${pkg.name}</b> - ${pkg.price.toLocaleString()} د.ع / شهرياً<br>`;
                reply += `🎯 ${pkg.target}<br>`;
                reply += `🎬 ${pkg.reels} ريلز | 📸 ${pkg.photos} صورة | 🎨 ${pkg.designs} تصاميم | 💡 ${pkg.consultations} استشارات<br><br>`;
            });
            reply += "💡 *ملاحظة:* المودلز متوفرون مجاناً وبدون عدد محدد مع كافة الاشتراكات!<br>";
            reply += "يمكنك أيضاً تحديد ميزانية خاصة لنقوم بتصميم باقة مخصصة لك." + sales.getCTAButton("تواصل لبدء باقتك 📲");

            memory.addHistory('bot', reply);
            return reply;
        }

        // 4. استفسار حفلات التخرج
        if (intent === "graduation") {
            let reply = KNOWLEDGE_BASE.specialOffers.graduation + sales.getCTAButton("احجز لتغطية حفل تخرجك 🎓");
            memory.addHistory('bot', reply);
            return reply;
        }

        // 5. متابعة الأسئلة التفاعلية
        flow.parseAnswer(userText);
        const nextStep = flow.getCurrentStep();

        if (nextStep) {
            const reply = nextStep.question;
            memory.addHistory('bot', reply);
            return reply;
        } else {
            const report = advisor.analyze();
            const cta = sales.getCTAButton("تواصل معنا مباشرة عبر الواتساب 📲");
            const finalReply = report + cta;
            
            memory.addHistory('bot', finalReply);
            return finalReply;
        }
    }
}

const brain = new FrameXBrain();
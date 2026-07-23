class FrameXAdvisor {
    analyze() {
        const pType = memory.get("projectType") || "المشروع";
        const budget = memory.get("budget");
        const hasLogo = memory.get("hasLogo");
        const hasSocial = memory.get("hasSocial");

        let recommendations = [];
        let matchedPackage = null;
        let upsellPackage = null;

        // 1. تحليل الاحتياجات
        if (!hasLogo) recommendations.push("✅ تحتاج تصميم هوية بصرية وشعار احترافي.");
        recommendations.push("✅ تحتاج خطة تصوير وتصميم ريلز لجذب الزبائن.");
        if (!hasSocial) recommendations.push("✅ تحتاج إنشاء وإدارة صفحات السوشال ميديا من الصفر.");

        // 2. مطابقة الباقة حسب الميزانية
        if (typeof budget === "number") {
            if (budget < 500000) {
                matchedPackage = PACKAGES_BASE.find(p => p.id === "silver");
                upsellPackage = PACKAGES_BASE.find(p => p.id === "gold");
            } else if (budget < 750000) {
                matchedPackage = PACKAGES_BASE.find(p => p.id === "gold");
                upsellPackage = PACKAGES_BASE.find(p => p.id === "diamond");
            } else if (budget < 1000000) {
                matchedPackage = PACKAGES_BASE.find(p => p.id === "diamond");
                upsellPackage = PACKAGES_BASE.find(p => p.id === "taj");
            } else {
                matchedPackage = PACKAGES_BASE.find(p => p.id === "taj");
            }
        } else {
            matchedPackage = PACKAGES_BASE.find(p => p.id === "gold"); // الافتراضي
        }

        // 3. بناء نص التقرير
        let report = `<b>📊 تحليل مشروعك (${pType}):</b><br><br>`;
        report += recommendations.join("<br>") + "<br><br>";

        if (typeof budget === "number" && budget < 400000) {
            report += `💡 **لاحظت أن ميزانيتك (${budget.toLocaleString()} د.ع)** أقل من الباقة الفضية، لكن **لا تقلق إطلاقاً!** في Frame X نستطيع تصميم باقة خاصة ومصممة خصيصاً لتناسب ميزانيتك ودخلك الحالي بدون إجبار.`;
        } else if (matchedPackage) {
            report += `💡 **أنصحك بـ ${matchedPackage.name}** بسعر **${matchedPackage.price.toLocaleString()} د.ع شهرياً**.<br>`;
            report += `تضمن لك: ${matchedPackage.reels} ريلز، ${matchedPackage.photos} صورة، ${matchedPackage.designs} تصاميم، والمودلز مجاناً بالكامل!`;

            if (upsellPackage) {
                report += `<br><br>🚀 *نصيحة إضافية:* إذا استطعت رفع الميزانية إلى **${upsellPackage.name}** ستكون نتائج الانتشار والتفوق على المنافسين أسرع بكثير.`;
            }
        }

        return report;
    }
}

const advisor = new FrameXAdvisor();
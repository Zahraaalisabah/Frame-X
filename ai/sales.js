class SalesManager {
    generateWhatsAppLink() {
        const phone = KNOWLEDGE_BASE.company.phone;
        const pType = memory.get("projectType") || "مشروع";
        const budget = memory.get("budget") ? `${memory.get("budget").toLocaleString()} د.ع` : "غير محددة";
        
        const message = `السلام عليكم Frame X👋
أنا صاحب مشروع (${pType})
الميزانية التقريبية: (${budget})
تم تحليل المشورع وترشيحه من قبل مساعد المبيعات الذكي، وأرغب بالتواصل معكم لبدء الخطة.`;

        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${phone}?text=${encodedMessage}`;
    }

    getCTAButton(buttonText = "ابدأ الآن عبر الواتساب 📲") {
        const link = this.generateWhatsAppLink();
        return `<br><br><a href="${link}" target="_blank" class="ai-whatsapp-btn">${buttonText}</a>`;
    }
}

const sales = new SalesManager();
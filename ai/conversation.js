class ConversationFlow {
    constructor() {
        this.steps = [
            { key: "projectType", question: "أهلاً بك في Frame X! 🎬<br>شنو نوع مشروعك الحالي أو الفكرة اللي تحب تطورها بالسوق؟ (مطعم، عيادة، متجر، إلخ...)" },
            { key: "isNew", question: "ممتاز! هل مشروعك **جديد** تحت التأسيس أم **موجود وحالي** بالسوق؟" },
            { key: "hasSocial", question: "تمام! هل عندك صفحات حالية على السوشال ميديا؟" },
            { key: "hasLogo", question: "وهل عندك **هوية بصرية وشعار (Logo)** محترف، أم تحتاج تصميم جديد؟" },
            { key: "budget", question: "تمام جداً! شكد تقريباً **الميزانية الشهرية** المخصصة للتسويق حتى ننصحك بالباقة الأنسب؟ (مثلاً: 400 ألف، 600 ألف، 850 ألف...)" },
            { key: "goal", question: "شنو **الهدف الأساسي** المباشر حالياً؟ (زيادة المبيعات، بناء براند، إطلاق منتج؟)" }
        ];
    }

    getCurrentStep() {
        for (let step of this.steps) {
            if (memory.get(step.key) === null) {
                return step;
            }
        }
        return null;
    }

    checkIntent(userText) {
        const text = userText.trim().toLowerCase();

        if (/^(مرحبا|هلا|اهلين|السلام عليكم|شلونك|شلونكم|اخبارك|هلو|هلاو|مساء الخير|صباح الخير|الو)/.test(text)) {
            return "greetings";
        }

        if (text.includes("خدمات") || text.includes("شنو تسوون") || text.includes("شنو تقدمون") || text.includes("عرض")) {
            return "services";
        }

        if (text.includes("باقة") || text.includes("باقات") || text.includes("أسعار") || text.includes("اسعار") || text.includes("سعر")) {
            return "packages";
        }

        if (text.includes("تخرج") || text.includes("حفلة") || text.includes("حفلات")) {
            return "graduation";
        }

        return "normal_answer";
    }

    parseAnswer(userText) {
        const text = userText.toLowerCase();
        const currentStep = this.getCurrentStep();

        if (!currentStep) return;

        switch (currentStep.key) {
            case "projectType":
                if (this.checkIntent(userText) === "normal_answer") {
                    memory.set("projectType", userText);
                }
                break;
            case "isNew":
                if (text.includes("جديد") || text.includes("تأسيس")) memory.set("isNew", true);
                else if (text.includes("موجود") || text.includes("قديم") || text.includes("حالي")) memory.set("isNew", false);
                else memory.set("isNew", userText);
                break;
            case "hasSocial":
                memory.set("hasSocial", text.includes("نعم") || text.includes("عندي") || text.includes("اي"));
                break;
            case "hasLogo":
                memory.set("hasLogo", text.includes("نعم") || text.includes("عندي") || text.includes("اي"));
                break;
            case "budget":
                const numbers = text.match(/\d+/g);
                if (numbers) {
                    let amount = parseInt(numbers.join(''));
                    if (amount < 1000) amount *= 1000;
                    memory.set("budget", amount);
                } else {
                    memory.set("budget", userText);
                }
                break;
            case "goal":
                memory.set("goal", userText);
                break;
        }
    }
}

const flow = new ConversationFlow();
class FrameXMemory {
    constructor() {
        this.clear();
    }

    clear() {
        this.data = {
            projectType: null,    // نوع المشروع (مطعم، عيادة، متجر...)
            isNew: null,          // جديد أم موجود؟
            hasSocial: null,      // هل توجد صفحات؟
            hasLogo: null,        // هل يوجد شعار؟
            targetAudience: null, // الجمهور
            budget: null,         // الميزانية بالأرقام
            goal: null,           // هدف المشروع (زيادة مبيعات، انتشار...)
            questionCount: 0      // عدد الأسئلة المتداولة
        };
        this.history = [];
    }

    set(key, value) {
        this.data[key] = value;
    }

    get(key) {
        return this.data[key];
    }

    addHistory(role, text) {
        this.history.push({ role, text, time: new Date() });
        if (role === 'user') this.data.questionCount++;
    }
}

const memory = new FrameXMemory();
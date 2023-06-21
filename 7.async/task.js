class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.intervalId = null;
    }

    addClock(ringTime, action) {
        if (!ringTime || typeof action !== "function") {
            throw new Error('Отсутствуют обязательные аргументы');
        }

        if (this.alarmCollection.findIndex(item => item.time === ringTime) > -1) {
            console.warn('Уже присутствует звонок на это же время');
        }

        this.alarmCollection.push({
            callback: action,
            time: ringTime,
            canCall: true,
        });
    }

    removeClock(ringTime) {
        this.alarmCollection = this.alarmCollection.filter(item => item.time !== ringTime);
    }

    getCurrentFormattedTime() {
        const now = new Date();
        return now.getHours() + ':' + now.getMinutes();
    }

    start() {
        if (this.intervalId) {
            return;
        }
        this.intervalId = setInterval(() => {
            this.alarmCollection.forEach(item => {
                if (item.canCall && item.time === this.getCurrentFormattedTime()) {
                    item.canCall = false;
                    item.callback();
                }
            });
        }, 1000);

    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    resetAllCalls() {
        this.alarmCollection.forEach(alarm => alarm.canCall = true);
    }

    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}


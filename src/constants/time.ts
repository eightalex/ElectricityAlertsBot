/**
 * Getters for access self properties
 */
export const TIME = {
    get SECOND() {
        return 1000;
    },
    get MINUTE() {
        return this.SECOND * 60;
    },
    get HOUR() {
        return this.MINUTE * 60;
    },
    get DAY() {
        return this.HOUR * 24;
    },
};

export const TIME_IN_SECONDS = {
    get SECOND() {
        return 1;
    },
    get MINUTE() {
        return this.SECOND * 60;
    },
    get HOUR() {
        return this.MINUTE * 60;
    },
    get DAY() {
        return this.HOUR * 24;
    },
};

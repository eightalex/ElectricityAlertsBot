export type StatisticsStateType = {
    available: {
        shortest: number
        longest: number
    },
    notAvailable: {
        shortest: number
        longest: number
    }
}

export type StatisticsType = {
    date: string
    previousState: string
    state: StatisticsStateType
    time: {
        available: number
        notAvailable: number
        previous: number
    }
}

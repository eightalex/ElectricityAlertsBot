export type StatisticsType = {
    date: string
    // TODO feature:
    // availability: {
    //     shortest: number
    //     longest: number
    // },
    // notAvailability: {
    //     shortest: number
    //     longest: number
    // }
    time: {
        available: number
        notAvailable: number
        previous: number
    }
}

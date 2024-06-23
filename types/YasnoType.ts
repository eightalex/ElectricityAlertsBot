export type OutageType = 'DEFINITE_OUTAGE' | 'POSSIBLE_OUTAGE';
export type RegionType = 'kiev' | 'dnipro';

export type Outage = {
    start: number;
    end: number;
    type: OutageType;
}

export type Schedule = {
    [region in RegionType]: {
        [group: string]: Outage[][];
    };
}

export type FAQ = {
    question: string
    answer: string
    learn_more_link_text: string | null
    learn_more_link_url: string | null
};

type BaseComponent = {
    template_name: string
    anchor: string
    available_regions: string[]
};

export type EditorComponent = BaseComponent & {
    template_name: 'editor'
    content: string
}

export type ScheduleComponent = BaseComponent & {
    template_name: 'electricity-outages-schedule'
    title: string
    description: string
    schedule: Schedule
    lastRegistryUpdateTime: number
    cities: any // ?
    streets: any // ?
};

export type FAQComponent = BaseComponent & {
    template_name: 'FrequentlyAskedQuestions'
    FAQs: FAQ[]
}

export type Component = EditorComponent | ScheduleComponent | FAQComponent;

export type Page = {
    title: string
    type: string
    section: {
        id: number
        key: string
        title: string
    };
    uri: string
    meta_title: string
    meta_description: string | null
    meta_keywords: string | null
    is_viber_ignored: boolean
    available_regions: string[]
    is_referral: boolean
};

export type YasnoResponse = {
    page: Page
    components: Component[]
};

export interface BenefitData {
    id: string;
    description: string;
    subscriptionId: string;
}

export interface BenefitCreateData {
    description: string;
    subscriptionId: string;
}
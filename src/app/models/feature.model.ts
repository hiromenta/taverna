import { Role } from "./user.model";

export interface Feature {
    name: string;
    description: string;
    enabled: boolean;
    grant: Role[];
    grantAll: boolean;
    grantNone: boolean;
}
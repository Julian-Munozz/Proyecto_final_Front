export interface Habits {
    _id : string;
    user: string;
    img : string; 
    tittle : string;
    category: string;
    description : string; 
    benefit : string;
    theory?: {
    cue: String;
    craving: String;
    response: String;
    reward: String;
    };
    science : string;
    createdAt?: string; // generado automáticamente por timestamps
    updatedAt?: string; // generado automáticamente por timestamps
}

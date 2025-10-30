export interface Habits {
    _id : string;
    user: string;
    img : string; 
    tittle : string;
    category: string;
    description : string; 
    benefit : string;
    createdAt?: string; // generado automáticamente por timestamps
    updatedAt?: string; // generado automáticamente por timestamps
}

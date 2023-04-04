export interface CatData {
    name: string;
    age: number;
    breed: string;
}

export interface Cat extends CatData {
    id: string;
}

import { v4 as uuid } from "uuid";
import { Cat, CatData } from "../types";

const cats: { [key: string]: Cat } = {};

const read = (id: string) => cats[id];

const create = (catData: CatData) => {
    const id = uuid();
    cats[id] = { ...catData, id };
    return id;
};

const readAll = (): Cat[] => Object.values(cats);
const update = (id: string, newCat: CatData) => {
    cats[id] = { id, ...newCat };
};
const remove = (id: string) => delete cats[id];

export default { create, read, readAll, update, remove };

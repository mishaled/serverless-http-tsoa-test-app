import { v4 as uuid } from "uuid";
import { Cat, CatData } from "../types";
import * as redis from "redis";

const client = redis.createClient({
    socket: {
        host: "redis",
        port: 6379,
    },
});

export const init = async () => await client.connect();

client.on("error", (err) => {
    console.log("Error " + err);
});

const read = async (id: string): Promise<Cat | null> => {
    const str = await client.get(id);

    console.log("str", str);

    if (!str) {
        return null;
    }

    return JSON.parse(str);
};

const create = async (catData: CatData) => {
    const id = uuid();

    await client.set(
        id,
        JSON.stringify({
            id,
            ...catData,
        })
    );

    return id;
};

const update = async (id: string, newCat: CatData): Promise<void> => {
    await client.set(
        id,
        JSON.stringify({
            id,
            ...newCat,
        })
    );
};

const remove = async (id: string): Promise<void> => {
    await client.del(id);
};

const getAllIds = async (): Promise<string[]> => {
    const ids = await client.keys("*");
    return ids;
};

export default { create, read, update, remove, getAllIds };

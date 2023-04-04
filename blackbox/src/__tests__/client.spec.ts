import "mocha";
import { expect } from "chai";
import nodeFetch from "node-fetch";
import {
    DefaultApi,
    Configuration,
} from "@swagger/typescript-fetch-some-client";

describe("Client", () => {
    it("Should not fail", async () => {
        const api = new DefaultApi(
            new Configuration({
                basePath: "http://api:3000",
                fetchApi: nodeFetch,
            })
        );

        try {
            const harta = await api.getHarta({
                name1: "name1",
                name2: "name2",
            });
            expect(harta).to.exist;
        } catch (err) {
            console.log(err);
        }
    });
});

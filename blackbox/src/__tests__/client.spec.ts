import "mocha";
import { v4 as uuid } from "uuid";
import { expect } from "chai";
import nodeFetch from "node-fetch";
import { CatApi, Configuration } from "@swagger/typescript-fetch-some-client";

describe("Client", () => {
    it("Should not fail", async () => {
        const catApi = new CatApi(
            new Configuration({
                basePath: "http://api:3000",
                fetchApi: nodeFetch,
            })
        );

        try {
            await catApi.getCat({ id: uuid() });
        } catch (err: any) {
            console.log(err);
            expect(err?.response?.status).to.be.equal("404");
        }
    });
});

import "mocha";
import { expect } from "chai";
import nodeFetch from "node-fetch";
import { Configuration, DefaultApi } from "../../some-client/dist";

describe("Client", () => {
    it("Should not fail", async () => {
        const api = new DefaultApi(
            new Configuration({
                basePath: "http://api:3000",
                fetchApi: nodeFetch,
            })
        );

        try {
            const harta = await api.getHarta();
            expect(harta).to.exist;
        } catch (err) {
            console.log(err);
        }
    });
});

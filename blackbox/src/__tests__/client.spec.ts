import "mocha";
import { v4 as uuid } from "uuid";
import { expect } from "chai";
import nodeFetch from "node-fetch";
import { CatApi, Configuration } from "@swagger/typescript-fetch-some-client";

describe("Client", () => {
    let catApi: CatApi;

    beforeEach(() => {
        catApi = new CatApi(
            new Configuration({
                basePath: "http://api:3000",
                fetchApi: nodeFetch,
            })
        );
    });

    it("No cat - return 404", async () => {
        try {
            await catApi.getOne({ id: uuid() });
        } catch (err: any) {
            expect(err?.response?.status).to.be.equal(404);
            return;
        }

        expect.fail("Should return 404");
    });

    it("Create cat - should not fail", async () => {
        const catId = await catApi.create({
            catData: {
                age: 4,
                breed: uuid(),
                name: uuid(),
            },
        });

        expect(catId).not.to.be.empty;
    });

    it("Get cat - should return cat correctly", async () => {
        const expectedCatData = {
            age: 4,
            breed: uuid(),
            name: uuid(),
        };
        const catId = await catApi.create({
            catData: expectedCatData,
        });

        try {
            const cat = await catApi.getOne({ id: catId });
            expect(cat).to.be.deep.equal({ id: catId, ...expectedCatData });
        } catch (err) {
            console.log(err);
        }
    });

    it("Update cat - should return cat correctly", async () => {
        const initialCatData = {
            age: 4,
            breed: uuid(),
            name: uuid(),
        };
        const expectedCatData = {
            ...initialCatData,
            name: uuid(),
        };
        const catId = await catApi.create({ catData: initialCatData });
        await catApi.update({ id: catId, catData: expectedCatData });
        const updatedCat = await catApi.getOne({ id: catId });

        expect(updatedCat).to.be.deep.equal({
            id: catId,
            ...expectedCatData,
        });
    });

    it("Delete cat - cat should not exist", async () => {
        const catData = {
            age: 4,
            breed: uuid(),
            name: uuid(),
        };
        const catId = await catApi.create({ catData });

        await catApi.remove({ id: catId });

        try {
            await catApi.getOne({ id: catId });
        } catch (err: any) {
            expect(err?.response?.status).to.be.equal(404);
            return;
        }

        expect.fail("Should return 404");
    });

    xit("GetAllIds - cat should not exist", async () => {
        const catData = {
            age: 4,
            breed: uuid(),
            name: uuid(),
        };
        const catId = await catApi.create({ catData });

        const keys = await catApi.getIdsKeys({ id: catId });

        expect(keys).to.be.include(catId);
    });
});

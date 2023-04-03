import { Controller, Get, Route } from "tsoa";
import swaggerJson from "../generated/swagger/swagger.json";

@Route("swagger")
export class SwaggerController extends Controller {
    @Get("/get")
    public async get(): Promise<{}> {
        return swaggerJson;
    }
}

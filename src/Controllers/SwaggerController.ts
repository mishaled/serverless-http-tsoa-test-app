import { Controller, Get, Route, Tags } from "tsoa";
import swaggerJson from "../generated/swagger/swagger.json";

@Route("swagger")
@Tags("Cat")
export class SwaggerController extends Controller {
    @Get("/get")
    public async get(): Promise<{}> {
        return swaggerJson;
    }
}

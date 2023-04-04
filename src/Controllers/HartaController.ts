import { Controller, Get, Query, Route, SuccessResponse } from "tsoa";

@Route("users")
export class HartaController extends Controller {
    @Get("/harta")
    public async getHarta(
        @Query() name1: string,
        @Query() name2: string
    ): Promise<string> {
        return "harta" + name1 + name2;
    }

    @SuccessResponse("201", "Created") // Custom success response
    // @Security('api_key')
    @Get("/barta")
    public async getBarta(): // @Body() requestBody: UserCreationParams
    Promise<string> {
        return "barta";
        // this.setStatus(200); // set return status 201
        // new UsersService().create(requestBody);
        // return;
    }
}

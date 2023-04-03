import { Controller, Get, Route, SuccessResponse } from "tsoa";

@Route("users")
export class HartaController extends Controller {
    @Get("/harta")
    public async getHarta(): // @Path() userId: number,
    // @Query() name?: string
    Promise<string> {
        return "harta";
        // return new UsersService().get(userId, name);
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

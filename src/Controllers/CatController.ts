import catService from "../services/catService";
import { Cat, CatData } from "../types";
import {
    Controller,
    Get,
    Route,
    Tags,
    Post,
    Body,
    Put,
    Delete,
    Res,
    TsoaResponse,
    Path,
} from "tsoa";

@Route("cat")
@Tags("Cat")
export class CatController extends Controller {
    @Get("/{id}")
    public async getOne(
        @Path() id: string,
        @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
    ): Promise<Cat | null> {
        const cat = await catService.read(id);
        if (!cat) {
            return notFoundResponse(404, {
                reason: "No cat stored",
            });
        }

        return cat;
    }

    @Post("/")
    public async create(@Body() catData: CatData): Promise<string> {
        return catService.create(catData);
    }

    @Put("/{id}")
    public async update(
        @Path() id: string,
        @Body() cat: CatData
    ): Promise<void> {
        return catService.update(id, cat);
    }

    @Delete("/{id}")
    public async remove(@Path() id: string): Promise<void> {
        return catService.remove(id);
    }
}

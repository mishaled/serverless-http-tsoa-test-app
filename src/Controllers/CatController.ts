import catService from "../services/catService";
import { Cat, CatData } from "../types";
import {
    Controller,
    Get,
    Route,
    Tags,
    Path,
    Post,
    Body,
    Put,
    Delete,
    Res,
    TsoaResponse,
} from "tsoa";

@Route("cat")
@Tags("Cat")
export class CatController extends Controller {
    @Get("/")
    public async getAllCats(): Promise<Cat[]> {
        return catService.readAll();
    }

    @Get("/:id")
    public async getCat(
        @Path() id: string,
        @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
    ): Promise<Cat | null> {
        const cat = catService.read(id) ?? null;
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

    @Put("/:id")
    public async updateCat(
        @Path() id: string,
        @Body() cat: CatData
    ): Promise<void> {
        return catService.update(id, cat);
    }

    @Delete("/:id")
    public async deleteCat(@Path() id: string): Promise<boolean> {
        return catService.remove(id);
    }
}

import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ProductsSlugAlreadyExistsError } from "../errors";

@Catch(ProductsSlugAlreadyExistsError)
export class ProductsSlugAlreadyExistsErrorFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

    }
}
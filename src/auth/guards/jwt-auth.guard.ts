import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_ALLOWED } from "./pass-auth.guard";

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {

    constructor(
        private reflector: Reflector
    ) { super(); }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isAllowed = this.reflector.getAllAndOverride<boolean>(IS_ALLOWED, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isAllowed) {
            return true;
        }

        return super.canActivate(context);
    }
}
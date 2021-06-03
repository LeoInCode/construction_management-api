import { Context, HttpRequest } from '@azure/functions';
import * as passport from 'passport';
import UserRepository from '../infra/typeorm/repositories/UserRepository';
import tokens from '../utils/tokens'

export default {
    local(context: Context, req: HttpRequest, next?: any) {
        passport.authenticate(
            'local',
            { session: false },
            (error, user, info) => {
                if (error) {
                    return next(error);
                }
                req.body = user;
                req.body.user
                return next();
            }
        )(context, req, next);
    },

    bearer(context: Context, req: HttpRequest, next: any) {
        passport.authenticate(
            'bearer',
            { session: false },
            (error, user, info) => {
                if (error) {
                    return next(error);
                }

                req.body.token = info.token;
                req.body = user;
                return next();
            }
        )(context, req, next);
    },

    async refresh(context: Context, req: HttpRequest, next: any) {
        try {
            const { refreshToken } = req.body;
            const id = + await tokens.refresh.verify(refreshToken);
            await tokens.refresh.invalid(refreshToken);
            req.body = await UserRepository.prototype.getUser(id);
            return next();
        } catch (error) {
            throw error.message;
        }
    }
}
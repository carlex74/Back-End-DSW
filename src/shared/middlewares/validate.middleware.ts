import { Request, Response, NextFunction } from 'express';
import { BaseSchema, safeParse, flatten, BaseIssue } from 'valibot';
import { HttpResponse } from '../response/http.response';

export const validationMiddleware = <TInput, TOutput>(
  schema: BaseSchema<TInput, TOutput, BaseIssue<TInput>>
) => {

  return (req: Request, res: Response, next: NextFunction) => {
    const result = safeParse(schema, req.body);

    if (result.success) {
      req.body = result.output;
      return next();
    }

    const errors = flatten(result.issues).nested;

    return HttpResponse.BadRequest(res, errors);
  };
};
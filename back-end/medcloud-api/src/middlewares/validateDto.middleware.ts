import { RequestHandler } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export function ValidadeDtoMiddleware(type: any): RequestHandler {

  return (req, res, next) => {
    const dtoObj = plainToInstance(type, req.body);
    
    validate(dtoObj).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const dtoErrors: string[] = [];
        errors.forEach((error: ValidationError) => {
          const constraints = error.constraints;
          if (constraints){
            Object.keys(constraints)
              .forEach((key: string) => { 
                dtoErrors.push(constraints[key]) 
              });
          };
        });
        res.status(400).json({ message:"Validation failed", errors: dtoErrors });
      } else {
        req.body = dtoObj;
        next();
      }
    });
  };
}
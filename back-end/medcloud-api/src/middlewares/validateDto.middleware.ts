import { RequestHandler } from "express";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";


function findErrorsConstraints(errors: ValidationError[], parentProperty?: string): string[] {
  const dtoErrors: string[] = [];
  // Find errors in current object
  errors.forEach((error: ValidationError) => {
    const constraints = error.constraints;
    if (constraints){
      Object.keys(constraints)
        .forEach((key: string) => { 
          dtoErrors.push(parentProperty ? `${parentProperty}.${constraints[key]}` : constraints[key]);
        });
    }
    // Recursively find errors in nested objects
    if (error.children && error.children.length > 0) {
      dtoErrors.push(...findErrorsConstraints(error.children, error.property));
    }
  });
  return dtoErrors;
}

export function ValidadeDtoMiddleware(type: any): RequestHandler {

  return (req, res, next) => {
    const dtoObj = plainToInstance(type, req.body);
    
    // Validate object
    validate(dtoObj).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const dtoErrors = findErrorsConstraints(errors);
        res.status(400).json({ message:"Validation failed", dtoErrors: dtoErrors });
      } else {
        req.body = instanceToPlain(dtoObj);
        next();
      }
    });
  };
}
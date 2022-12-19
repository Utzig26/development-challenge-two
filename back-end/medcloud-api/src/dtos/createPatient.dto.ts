import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsDateString, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

class Address {
  @IsString()
  @IsNotEmpty()
  public street: string;

  @IsString()
  @IsNotEmpty()
  public city: string;

  @IsString()
  @IsNotEmpty()
  public state: string;

  @IsString()
  @IsNotEmpty()
  public zip: string;
}

export class CreatePatientDto {
  @IsString()
  @MinLength(2, {message: 'First name should be at least 2 characters long'})
  public firstName: string;

  @IsString()
  @MinLength(2, {message: 'Last name should be at least 2 characters long'})
  public lastName: string;

  @IsEmail()
  @IsString()
  public email: string;

  @IsDateString()
  public birthDate: string;

  @Type(() => Object)
  public address: Address;
};

import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsDateString, IsEmail, IsString, MinLength, ValidateNested } from 'class-validator';

import { AddressDto } from './address.dto.js';

export class PatientDto {
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

  @ValidateNested()
  @Type(() => AddressDto)
  public address: AddressDto;
};

import { IsOptional } from 'class-validator';

import { AddressDto } from './address.dto';
import { PatientDto } from './patient.dto';

export class PartialPatientDto extends PatientDto {
  @IsOptional()
  public firstName: string;

  @IsOptional()
  public lastName: string;

  @IsOptional()
  public email: string;

  @IsOptional()
  public birthDate: string;

  @IsOptional()
  public address: AddressDto;
};

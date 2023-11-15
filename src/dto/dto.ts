import {
    validate,
    validateOrReject,
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
  } from 'class-validator';

export class Post {
  @Length(10, 20, { message: 'Title length must be between 10 and 20 characters' })
    title?: string;

  @Contains('hello', { message: 'Text must contain the word "hello"' })
    text?: string;

  @IsInt({ message: 'Rating must be an integer' })
    @Min(0, { message: 'Rating must be at least 0' })
    @Max(10, { message: 'Rating must be at most 10' })
    rating?: number;

  @IsEmail({}, { message: 'Invalid email format' })
    email?: string;

  @IsFQDN({}, { message: 'Invalid site format' })
    site?: string;

  @IsDate({ message: 'Invalid create date format' })
    createDate?: Date;
}


  



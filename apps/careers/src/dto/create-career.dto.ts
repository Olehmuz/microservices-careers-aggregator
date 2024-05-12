export class CreateCareerDto {
  title: string;
  description: string;
  careerId: string;
  postedAt: Date;
  location?: string;
  company?: string;
  url?: string;
  salary?: number;
  categories?: string[];
}

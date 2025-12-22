export interface App {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  detailedDescription: string;
  tags: string[];
  techStack: string[];
  link?: string;
  comingSoon?: boolean;
}

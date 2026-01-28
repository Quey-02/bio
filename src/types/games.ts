export interface Game {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  detailedDescription: string;
  platform: string[];
  tags: string[];
  techStack: string[];
  link?: string;
  comingSoon?: boolean;
  inDevelopment?: boolean;
}

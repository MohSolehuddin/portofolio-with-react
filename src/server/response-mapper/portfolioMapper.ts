export interface PortfolioGithubResponse {
  id: number;
  name: string;
  description: string;
  private: boolean;
  html_url: string;
  owner: {
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
}

export const portfolioMapper = (data: PortfolioGithubResponse[]) => {
  return data.map((project) => ({
    id: project.id.toString(),
    name: project.name,
    description: project.description,
    private: project.private,
    linkRepo: project.html_url,
    image: project.owner.avatar_url,
    started: new Date(project.created_at as string),
    ended: new Date(project.updated_at as string),
  }));
};

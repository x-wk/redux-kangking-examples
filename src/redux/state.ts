export default interface AppState {
   count?: number;
   tasks?: Array<Task>;
   github?: {
      users?: GitHubSearch;
      topics?: GitHubSearch;
      repositories?: GitHubSearch;
   }
}

export interface Task {
   id: string;
   title: string;
   isCompleted: boolean;
   createdTime?: Date;
   updatedTime?: Date;
}

export interface GitHubSearch {
   search?: {
      q?: string;
      sort?: string;
      order?: string;
      per_page?: number;
      page?: number;
   };
   result?: {
      total_count: number;
      incomplete_results: boolean;
      items: Array<any>;
   };
}

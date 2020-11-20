import { Author } from "./author.interface";
import { Category } from "./category.interface";
import { Video } from "./video.interface";

export interface IState {
    videos: Video[];
    categories: Category[];
    authors: Author[];
    formState: string;
    deleteDialogState: string;
    selectedVideo?: Video;
}
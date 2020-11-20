import { Video } from './video.interface';
import { getCategories } from './categories';
import { getAuthors } from './authors';
import { Category } from './category.interface';
import { Author } from './author.interface';
import { getCategoriesNames } from '../utils';

export const getVideos = (): Promise<Video[]> => {
  return Promise.all([getCategories(), getAuthors()])
    .then(([categories, authors]) => {
      return transformResponse(categories, authors);
  });
};

const transformResponse = (categories: Category[], authors: Author[]): Video[] => {

  return [...authors].map( author => {
    
    return author.videos.map( video => {
      const _video: Video = {
        id: video.id,
        categories: getCategoriesNames(video.catIds, categories),
        author: author.name,
        name: video.name
      }
      return _video;
    })

    
  }).flat();
}

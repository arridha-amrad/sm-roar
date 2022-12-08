export const QUERY_AUTHOR_DATA = {
  imageURL: true,
  username: true,
  name: true,
  id: true,
};

export const POST_INCLUDED_DATA = {
  _count: {
    select: {
      children: true,
      likes: true,
    },
  },
  medias: true,
  author: {
    select: QUERY_AUTHOR_DATA,
  },
};

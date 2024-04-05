export const getAllPostsQuery = () => {
  return ` *[_type == "post"]{
                title,
                slug,
                publishedAt,
                excerpt,
                _id,
                tags[]-> {
                    _id,
                    name,
                    slug
                },
                mainImage{
                    asset->{
                        url
                    }
                }
                }
            `;
};

export const getPostQuery = (slug: string) => {
  return `*[_type == "post" && slug.current == "${slug}"]{
            title,
            slug,
            body,
            publishedAt,
            excerpt,
            author->{
                _id,
                name,
                image{
                  asset->{
                    url
                  }
                }
            },
            tags[]->{
                _id,
                name,
                slug
            },
             mainImage{
                asset->{
                    url
                }
            }

        }[0]
    `;
};

export const getAllTagsQuery = () => {
  return `
    *[_type == "tag"]{
      _id,
      name,
      slug,
      "postCount": count(*[_type == "post" && references("tags", ^._id)])
    }
  `;
};

export const getPostsByTagQuery = (tag: string) => {
  return `
    *[_type == "post" && references(*[_type == "tag" && slug.current == "${tag}"]._id)]{
        title,
        slug,
        body,
        publishedAt,
        author->{
            _id,
            name,
        },
        tags[]->{
            _id,
            name,
            slug
        },
          mainImage{
            asset->{
                url
            }
        }

    }
  `;
};

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

export const photoFeedQuery = () => {
  return `*[_type == "photo"]{
          _id,
          _createdAt,
          image{
            asset->{url},
            alt,
            }
          }
  `;
};

export const getPostQuery = (slug: string) => {
  return `*[_type == "post" && slug.current == "${slug}"]{
            _id,
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
                },
                bio[]{
                  _type,
                  children[]{
                    text
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
            },
            comments[]->{
              message,
                _id,
                _updatedAt,
                created,
                likes[]->{
                  _id
                },
                parentComment->{
                  _id
                },
                children[]->{
                  _id
                },
                user->{
                  _id,
                  name,
                  email
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

export const getUserIfExistsQuery = (email: string) => {
  return `
    *[_type == "user" && email.current == "${email}"]
  `;
};

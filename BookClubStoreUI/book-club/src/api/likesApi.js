import axios from "axios";

export const likesApi = {
  addLike: (userId, bookId, token) => {
    return axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: "https://localhost:44367/graphql/",
      method: "post",
      data: {
        query: `
            mutation{
                addLike (input: {
                userId: ${userId}
                bookId: ${bookId}
                }) {
                like {
                    id
                    userId
                    bookId
                    user{
                    fullName
                    }
                    book{
                    id
                    name
                    }
                }
                }
            }
            `,
      },
    });
  },

  removeLike: (likeId, token) => {
    return axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: "https://localhost:44367/graphql/",
      method: "post",
      data: {
        query: `
            mutation {
                removeLike (likeId: ${likeId}) {
                    id
                    userId
                    bookId
                }
            }
              `,
      },
    });
  },

  addDisLike: (userId, bookId, token) => {
    return axios({
      headers: {
        'Authorization': `Bearer ${token}` 
      },
      url: "https://localhost:44367/graphql/",
      method: "post",
      data: {
        query: `
            mutation{
                addDisLike(input: {
                userId: ${userId}
                bookId: ${bookId}
                }) {
                id
                userId
                bookId
                }
            }
            `,
      },
    });
  },

  removeDisLike: (disLikeId, token) => {
    return axios({
      headers: {
        'Authorization': `Bearer ${token}` 
      },
      url: "https://localhost:44367/graphql/",
      method: "post",
      data: {
        query: `
            mutation{
              removeDisLike(disLikeId: ${disLikeId}) {
                id
                userId
                bookId
              }
            }
            `,
      },
    });
  },
};

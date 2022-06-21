import axios from "axios";

export const cartApi = {
  getCart: (userId, token) => {
    return axios({
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      url: "https://localhost:44367/graphql/",
      method: "post",
      data: {
        query: `
            query{
              cart(userId: ${userId}) {
                id
                total
                books {
                  id
                  name
                  imageUrl
                  description
                  price
                  authorId
                  author {
                    id
                    name
                  }
                  likes {
                    id
                    userId
                    bookId
                  }
                  disLikes {
                    id
                    userId
                    bookId
                  }
                }
              }
            }
            `,
      },
    });
  },

  addBookToCart: (userId, bookId, token) => {
    return axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: "https://localhost:44367/graphql/",
      method: "post",
      data: {
        query: `
            mutation{
                addToCart(bookId: ${bookId}
                userId: ${userId}) {
                    id
                    name
                    author {
                        id
                        name
                    }
                }
            }
            `,
      },
    });
  },

  deleteBookFromCart: (userId, bookId, token) => {
    return axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: "https://localhost:44367/graphql/",
      method: "post",
      data: {
        query: `
            mutation{
              deleteFromCart (bookId: ${bookId}
                userId: ${userId}) {
                id
                name
                authorId
              }
            }
            `,
      },
    });
  }
};

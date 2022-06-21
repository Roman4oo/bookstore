import axios from "axios";

export const ordersApi = {
  getUserOrders: (userId, token) => {
    return axios({
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      url: "https://localhost:44367/graphql/",
      method: "post",
      data: {
        query: `
            query{
                userOrders(userId: ${userId}) {
                    id
                    total
                    createdDate
                    isPaid
                    books {
                        id
                        name
                        author {
                            id
                            name
                        }
                        likes {
                            userId
                        }
                    }
                }
            }
            `,
      },
    });
  },

  getOrderDetails: (orderId, token) => {
    return axios({
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      url: "https://localhost:44367/graphql/",
      method: "post",
      data: {
        query: `
            query{
                orderDetails(orderId: ${orderId}) {
                id
                total
                isPaid
                createdDate
                userId
                books {
                    id
                    name
                    description
                    imageUrl
                    price
                    authorId
                    author{
                        id
                        name
                    }
                    likes{
                        id
                        userId
                        bookId
                    }
                    disLikes{
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

  createOrder: (order, token) => {
    return axios({
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      url: "https://localhost:44367/graphql/",
      method: "post",
      data: {
        query: `
        mutation{
            createOrder(input: {
              total: ${order.total}
              isPaid: ${order.isPaid}
              userId: ${order.userId}
            }) {
              id
              total
              isPaid
              createdDate
            }
          }
            `,
      },
    });
  },

  addBookToOrder: (book, orderId, token) => {
    return axios({
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      url: "https://localhost:44367/graphql/",
      method: "post",
      data: {
        query: `
        mutation{
            addBookToOrder(book: {
              id: ${book.id}
              price: ${book.price}
              authorId: ${book.authorId}
            }, orderId: ${orderId}) {
              id
              createdDate
              isPaid
              userId
              books {
                id
                name
                author{
                    id
                    name
                }
                likes{
                    id
                    userId
                    bookId
                }
                disLikes{
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

  createCheckout: (order) => {
    return axios({
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        url: "https://localhost:44367/graphql/",
        method: "post",
        data: {
          query: `
          mutation CreateCheckout($order: OrderInput){
            createCheckoutSession(order: $order)
          }
              `,
          variables:{
              order: order
          }
        },
      });
  }
};

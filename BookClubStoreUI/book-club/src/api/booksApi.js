import axios from "axios";

export const booksApi = {

    getBooks: (skip, take) => {
        return axios({
            url: "https://localhost:44367/graphql/",
            method: "post",
            data: {
              query: `
                query{
                    books(skip: ${skip} take: ${take}) {
                        items {
                            id
                            name
                            price
                            imageUrl
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
          })
    },

    getAuthorBooks: (authorId) => {
        return axios({
            url: "https://localhost:44367/graphql/",
            method: "post",
            data: {
              query: `
                query{
                    books(where: {authorId: {eq: ${authorId}}}) {
                    items {
                        id
                        name
                        price
                        imageUrl
                        author{
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
          })
    },

    getBookById: (id) => {
        return axios({
            url: "https://localhost:44367/graphql/",
            method: "post",
            data: {
              query: `
                query{
                    bookById(id: ${id}) {
                        id
                        name
                        description
                        price
                        imageUrl
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
                `,
            },
          })
    },

    getSearchedBooks: (search) => {
        return axios({
            url: "https://localhost:44367/graphql/",
            method: "post",
            data: {
              query: `
              query{
                books(where: {or:[
                        {name: {contains:"${search}"}}, 
                        {author: {name:{contains: "${search}"}}}
                    ]
                }) 
                  {
                    items {
                        id
                        name
                        description
                        price
                        imageUrl
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
          })
    },

    getSortedBooksByName: (prop, desc) => {
        var sorted = "ASC"
        if(desc === true){
            sorted = "DESC"
        }
        return axios({
            url: "https://localhost:44367/graphql/",
            method: "post",
            data: {
              query: `
              query{
                books(order: {${prop}: ${sorted}})
                  {
                    items {
                        id
                        name
                        description
                        price
                        imageUrl
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
          })
    }
}
import axios from "axios";

export const authorsApi = {
  getAuthors: (skip, take) => {
    return axios({
      url: "https://localhost:44367/graphql/",
      method: "post",
      data: {
        query: `
            query{
                authors(order: {
                name:ASC
                } skip: ${skip}, take: ${take}) {
                items {
                    id
                    name
                    books {
                    id
                    name
                    }
                }
                }
            }
            `,
      },
    })
  },

  getSearchedAuthors: (search) => {
    return axios({
      url: "https://localhost:44367/graphql/",
      method: "post",
      data: {
        query: `
            query{
                authors(where: {
                name: {contains: "${search}"}
                }) {
                items {
                    id
                    name
                    books {
                    id
                    name
                    }
                }
                }
            }
            `,
      },
    })
  }
};

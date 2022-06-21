import axios from "axios";

export const authApi = {
  getBooks: () => {
    return axios({
      url: "https://localhost:44367/graphql/",
      method: "post",
      data: {
        query: `
            query{
                books {
                  items {
                    id
                    name
                    author {
                      name
                    }
                  }
                }
              }
            `,
      },
    }).then((response) => console.log(response));
  },

  register: (registerModel) => {
    return axios({
      url: "https://localhost:44367/graphql/",
      method: "post",
      data: {
        query: `mutation{
              register(model: {
                fullName: "${registerModel.fullName}"
                email: "${registerModel.email}"
                password: "${registerModel.password}"
              }){
                id
                fullName
                email
              }
            }
          `,
      },
    }).then((response) => console.log(response));
  },

  login: (email, password) => {
    return axios({
      url: "https://localhost:44367/graphql/",
      method: "post",
      data: {
        query: `mutation{
            login(model: {
              email: "${email}"
              password: "${password}"
            }) {
              token
              user {
                id
                email
              }
            }
          }
          `,
      },
    });
  },
};

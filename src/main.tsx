import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import App from "./App.tsx";
import "./index.css";

const apolloClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Character: {
        fields: {
          feeling: {
            read(_, { readField }) {
              const status = readField("status"); // default to read from the parent(which is Character) if we don't specify the obj to read from.
              if (status === "Alive") return "Hoo ray!!";
              return "Oh No!!";
            },
          },
        },
      },
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://rickandmortyapi.com/graphql",
  documents: ["src/**/*.tsx", "src/**/*.graphql"],
  ignoreNoDocuments: false, // for better experience with the watcher
  generates: {
    "./src/generated/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;

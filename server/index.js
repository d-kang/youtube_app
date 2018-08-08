import { ApolloServer, gql } from 'apollo-server';
import YouTube from 'youtube-node';
import { resolve } from 'url';

require('dotenv').config();

const youTube = new YouTube();

youTube.setKey(process.env.YOUTUBE_API_KEY);

const typeDefs = gql`
  type VideoId {
    kind: String!
    videoId: String!
  }

  type Thumbnail {
    url: String!
    width: Int!
    height: Int!
  }


  type Thumbnails {
    default: Thumbnail!
    medium: Thumbnail!
    high: Thumbnail!
  }

  type Snippet {
    publishedAt: String!
    channelId: String!
    title: String!
    description: String!
    thumbnails: Thumbnails!
    channelTitle: String!
    liveBroadcastContent: String!
  }

  type Item {
    kind: String!
    etag: String!
    id: VideoId!
    snippet: Snippet!
  }
  type PageInfo {
    totalResults: Int!
    resultsPerPage: Int!
  }
  type SearchResult {
    kind: String!
    etag: String!
    nextPageToken: String!
    pageInfo: PageInfo!
    items: [Item]!
  }
  type Query {
    hello(msg: String): String!
    searchYoutube(search: String): SearchResult!

  }
`;

const promisify = (query) => {
  return new Promise((resolve, reject) => {
    youTube.search(query, 15, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}

const resolvers = {
  Query: {
    hello(_, args, context, info) {
      return args.msg;
    },
    async searchYoutube(_, args, context, info) {
      const result =  await promisify(args.search);
      console.log('result!!!: ', result);

      return result;
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const PORT = process.env.PORT || 3500;

server.listen(PORT)
  .then(() => console.log(`Server started! http://localhost:${PORT}`));
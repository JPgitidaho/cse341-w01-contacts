export default {
  openapi: "3.0.0",
  info: {
    title: "Movies API",
    version: "1.0.0",
    description: "API for managing movies and directors"
  },
  servers: [
    {
      url: "http://localhost:3000"
    }
  ],
  paths: {
    "/api/movies": {
      get: {
        summary: "Get all movies",
        responses: {
          200: { description: "List of movies" }
        }
      },
      post: {
        summary: "Create a movie",
        responses: {
          201: { description: "Movie created" },
          400: { description: "Validation error" }
        }
      }
    },
    "/api/movies/{id}": {
      get: {
        summary: "Get a movie by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Movie found" },
          404: { description: "Movie not found" }
        }
      },
      put: {
        summary: "Update a movie",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Movie updated" },
          400: { description: "Validation error" },
          404: { description: "Movie not found" }
        }
      },
      delete: {
        summary: "Delete a movie",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Movie deleted" },
          404: { description: "Movie not found" }
        }
      }
    },
    "/api/directors": {
      get: {
        summary: "Get all directors",
        responses: {
          200: { description: "List of directors" }
        }
      },
      post: {
        summary: "Create a director",
        responses: {
          201: { description: "Director created" },
          400: { description: "Validation error" }
        }
      }
    },
    "/api/directors/{id}": {
      get: {
        summary: "Get a director by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Director found" },
          404: { description: "Director not found" }
        }
      },
      put: {
        summary: "Update a director",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Director updated" },
          400: { description: "Validation error" },
          404: { description: "Director not found" }
        }
      },
      delete: {
        summary: "Delete a director",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Director deleted" },
          404: { description: "Director not found" }
        }
      }
    }
  }
};

export default {
  openapi: "3.0.0",
  info: {
    title: "Movies API",
    version: "1.0.0",
    description: "API for managing movies and directors"
  },
  servers: [
    { url: "https://cse341-w03-w04-movies-api.onrender.com" },
    { url: "http://localhost:3000" }
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
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Movie" },
              example: {
                title: "Inception",
                genre: "Sci-Fi",
                releaseYear: 2010,
                duration: 148,
                rating: 9,
                language: "English",
                budget: 160000000
              }
            }
          }
        },
        responses: {
          201: { description: "Movie created" },
          400: { description: "Validation error" }
        }
      }
    },
    "/api/movies/{id}": {
      get: {
        summary: "Get a movie by ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Movie found" },
          404: { description: "Movie not found" }
        }
      },
      put: {
        summary: "Update a movie",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Movie" },
              example: {
                title: "Inception",
                genre: "Sci-Fi",
                releaseYear: 2010,
                duration: 150,
                rating: 10,
                language: "English",
                budget: 165000000
              }
            }
          }
        },
        responses: {
          200: { description: "Movie updated" },
          400: { description: "Validation error" },
          404: { description: "Movie not found" }
        }
      },
      delete: {
        summary: "Delete a movie",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
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
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Director" },
              example: {
                name: "Christopher Nolan",
                birthdate: "1970-07-30",
                nationality: "British-American",
                awards: ["Oscar", "BAFTA"]
              }
            }
          }
        },
        responses: {
          201: { description: "Director created" },
          400: { description: "Validation error" }
        }
      }
    },
    "/api/directors/{id}": {
      get: {
        summary: "Get a director by ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Director found" },
          404: { description: "Director not found" }
        }
      },
      put: {
        summary: "Update a director",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Director" },
              example: {
                name: "Steven Spielberg",
                birthdate: "1946-12-18",
                nationality: "American",
                awards: ["Oscar", "Golden Globe"]
              }
            }
          }
        },
        responses: {
          200: { description: "Director updated" },
          400: { description: "Validation error" },
          404: { description: "Director not found" }
        }
      },
      delete: {
        summary: "Delete a director",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Director deleted" },
          404: { description: "Director not found" }
        }
      }
    }
  },
  components: {
    schemas: {
      Movie: {
        type: "object",
        properties: {
          title: { type: "string" },
          genre: { type: "string" },
          releaseYear: { type: "integer" },
          duration: { type: "integer" },
          rating: { type: "integer" },
          language: { type: "string" },
          budget: { type: "integer" }
        },
        required: ["title", "genre", "releaseYear"]
      },
      Director: {
        type: "object",
        properties: {
          name: { type: "string" },
          birthdate: { type: "string", format: "date" },
          nationality: { type: "string" },
          awards: { type: "array", items: { type: "string" } }
        },
        required: ["name", "nationality"]
      }
    }
  }
};

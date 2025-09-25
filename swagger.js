import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movies API",
      version: "1.0.0"
    },
    servers: [
      { url: "http://localhost:3000", description: "Local server" },
      { url: "https://cse341-w03-w04-movies-api.onrender.com", description: "Render server" }
    ],
    components: {
      securitySchemes: {
        sessionAuth: {
          type: "apiKey",
          in: "cookie",
          name: "connect.sid"
        }
      }
    },
    security: [{ sessionAuth: [] }],
    paths: {
      "/auth/signup": {
        post: {
          tags: ["Auth"],
          summary: "Create account",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string", example: "newuser@example.com" },
                    password: { type: "string", example: "StrongPass123!" }
                  },
                  required: ["email", "password"]
                }
              }
            }
          },
          responses: {
            201: { description: "User registered and logged in" },
            400: { description: "Invalid input" }
          }
        }
      },
      "/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login with email and password",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string", example: "testuser@example.com" },
                    password: { type: "string", example: "StrongPass123!" }
                  },
                  required: ["email", "password"]
                }
              }
            }
          },
          responses: {
            200: { description: "Login successful" },
            401: { description: "Login failed" }
          }
        }
      },
      "/auth/logout": {
        get: {
          tags: ["Auth"],
          summary: "Logout current user",
          responses: { 200: { description: "Logged out successfully" } }
        }
      },
      "/auth/google": {
        get: {
          tags: ["Auth"],
          summary: "Login with Google",
          responses: { 302: { description: "Redirect to Google login" } }
        }
      },
      "/auth/google/callback": {
        get: {
          tags: ["Auth"],
          summary: "Google OAuth callback",
          responses: {
            200: { description: "Google login successful" },
            401: { description: "Google login failed" }
          }
        }
      },
      "/api/directors": {
        get: {
          tags: ["Directors"],
          summary: "Get all directors",
          responses: { 200: { description: "List of directors" } }
        },
        post: {
          tags: ["Directors"],
          summary: "Create a new director",
          security: [{ sessionAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Peter Jackson" },
                    birthYear: { type: "integer", example: 1961 }
                  },
                  required: ["name"]
                }
              }
            }
          },
          responses: {
            201: { description: "Director created" },
            401: { description: "Unauthorized" }
          }
        }
      },
      "/api/directors/{id}": {
        get: {
          tags: ["Directors"],
          summary: "Get director by ID",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "Director found" },
            404: { description: "Not found" }
          }
        },
        put: {
          tags: ["Directors"],
          summary: "Update director by ID",
          security: [{ sessionAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Updated Director" },
                    birthYear: { type: "integer", example: 1970 }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: "Director updated" },
            401: { description: "Unauthorized" }
          }
        },
        delete: {
          tags: ["Directors"],
          summary: "Delete director by ID",
          security: [{ sessionAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "Director deleted" },
            401: { description: "Unauthorized" }
          }
        }
      },
      "/api/movies": {
        get: {
          tags: ["Movies"],
          summary: "Get all movies",
          responses: { 200: { description: "List of movies" } }
        },
        post: {
          tags: ["Movies"],
          summary: "Create a new movie",
          security: [{ sessionAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string", example: "The Lord of the Rings" },
                    year: { type: "integer", example: 2001 },
                    director: { type: "string", example: "directorId" }
                  },
                  required: ["title", "year", "director"]
                }
              }
            }
          },
          responses: {
            201: { description: "Movie created" },
            401: { description: "Unauthorized" }
          }
        }
      },
      "/api/movies/{id}": {
        get: {
          tags: ["Movies"],
          summary: "Get movie by ID",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "Movie found" },
            404: { description: "Not found" }
          }
        },
        put: {
          tags: ["Movies"],
          summary: "Update movie by ID",
          security: [{ sessionAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string", example: "Updated Title" },
                    year: { type: "integer", example: 2025 },
                    director: { type: "string", example: "directorId" }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: "Movie updated" },
            401: { description: "Unauthorized" }
          }
        },
        delete: {
          tags: ["Movies"],
          summary: "Delete movie by ID",
          security: [{ sessionAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "Movie deleted" },
            401: { description: "Unauthorized" }
          }
        }
      }
    }
  },
  apis: []
};

const specs = swaggerJsdoc(options);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

import swaggerUi from "swagger-ui-express";

const spec = {
  openapi: "3.0.0",
  info: {
    title: "CSE 341 Contacts API",
    version: "1.0.0",
    description: "API for managing contacts"
  },
  servers: [
    {
      url: "https://cse341-project1-contacts-0jjj.onrender.com",
      description: "Render server"
    },
    {
      url: "http://localhost:3000",
      description: "Local server"
    }
  ],
  paths: {
    "/contacts": {
      get: {
        summary: "Get all contacts",
        responses: {
          "200": { description: "OK" }
        }
      },
      post: {
        summary: "Create a new contact",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ContactInput" }
            }
          }
        },
        responses: {
          "201": { description: "Created" },
          "400": { description: "Bad Request" }
        }
      }
    },
    "/contacts/{id}": {
      get: {
        summary: "Get a contact by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { description: "OK" },
          "400": { description: "Invalid ID" },
          "404": { description: "Not found" }
        }
      },
      put: {
        summary: "Update a contact by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ContactInput" }
            }
          }
        },
        responses: {
          "204": { description: "No Content" },
          "400": { description: "Bad Request" },
          "404": { description: "Not found" }
        }
      },
      delete: {
        summary: "Delete a contact by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "204": { description: "No Content" },
          "400": { description: "Invalid ID" },
          "404": { description: "Not found" }
        }
      }
    }
  },
  components: {
    schemas: {
      Contact: {
        type: "object",
        properties: {
          _id: { type: "string", example: "66f2c0e3e0a10b6a0a5c9b1a" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string" },
          favoriteColor: { type: "string" },
          birthday: { type: "string", example: "1990-05-12" }
        }
      },
      ContactInput: {
        type: "object",
        required: ["firstName", "lastName", "email", "favoriteColor", "birthday"],
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string" },
          favoriteColor: { type: "string" },
          birthday: { type: "string" }
        }
      }
    }
  }
};

export const swaggerMiddleware = [swaggerUi.serve, swaggerUi.setup(spec)];

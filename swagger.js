export default {
  openapi: '3.0.0',
  info: {
    title: 'Movies API',
    version: '1.0.0',
    description: 'API for managing directors and movies with authentication'
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Local server' },
    { url: 'https://your-app.onrender.com', description: 'Render server' }
  ],
  components: {
    securitySchemes: {
      sessionAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'connect.sid'
      }
    },
    schemas: {
      Director: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          birthdate: { type: 'string', format: 'date' }
        }
      },
      Movie: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          year: { type: 'integer' },
          director: { type: 'string' }
        }
      },
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          email: { type: 'string' },
          provider: { type: 'string' },
          displayName: { type: 'string' }
        }
      }
    }
  },
  paths: {
    '/api/directors': {
      get: {
        summary: 'Get all directors',
        responses: { 200: { description: 'List of directors' } }
      },
      post: {
        summary: 'Create a new director',
        security: [{ sessionAuth: [] }],
        responses: { 201: { description: 'Director created' } }
      }
    },
    '/api/directors/{id}': {
      get: {
        summary: 'Get director by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Director found' }, 404: { description: 'Not found' } }
      },
      put: {
        summary: 'Update director by ID',
        security: [{ sessionAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Director updated' }, 404: { description: 'Not found' } }
      },
      delete: {
        summary: 'Delete director by ID',
        security: [{ sessionAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Director deleted' }, 404: { description: 'Not found' } }
      }
    },
    '/api/movies': {
      get: {
        summary: 'Get all movies',
        responses: { 200: { description: 'List of movies' } }
      },
      post: {
        summary: 'Create a new movie',
        security: [{ sessionAuth: [] }],
        responses: { 201: { description: 'Movie created' } }
      }
    },
    '/api/movies/{id}': {
      get: {
        summary: 'Get movie by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Movie found' }, 404: { description: 'Not found' } }
      },
      put: {
        summary: 'Update movie by ID',
        security: [{ sessionAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Movie updated' }, 404: { description: 'Not found' } }
      },
      delete: {
        summary: 'Delete movie by ID',
        security: [{ sessionAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Movie deleted' }, 404: { description: 'Not found' } }
      }
    },
    '/auth/signup': {
      post: {
        summary: 'Register a new user',
        responses: { 201: { description: 'User registered and logged in' } }
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
              email: {
                type: "string",
                example: "testuser@example.com"
              },
              password: {
                type: "string",
                example: "StrongPass123!"
              }
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
    '/auth/logout': {
      get: {
        summary: 'Logout current user',
        responses: { 200: { description: 'Logged out successfully' } }
      }
    },
    '/auth/google': {
      get: {
        summary: 'Login with Google',
        responses: { 302: { description: 'Redirect to Google OAuth' } }
      }
    },
    '/auth/google/callback': {
      get: {
        summary: 'Google OAuth callback',
        responses: { 200: { description: 'Google login successful' }, 401: { description: 'Google login failed' } }
      }
    }
  }
}

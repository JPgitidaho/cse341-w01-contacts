import dotenv from 'dotenv'
dotenv.config()


import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session'
import passport from './src/config/passport.js'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js'

import directorRoutes from './src/routes/directorRoutes.js'
import movieRoutes from './src/routes/movieRoutes.js'
import authRoutes from './src/routes/authRoutes.js'
import errorHandler from './src/middlewares/errorHandler.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.set('trust proxy', 1)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: 'lax'
    }
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/directors', directorRoutes)
app.use('/api/movies', movieRoutes)
app.use('/auth', authRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(errorHandler)

const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => console.error('MongoDB connection error:', err))

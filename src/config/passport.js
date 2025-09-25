import dotenv from 'dotenv'
dotenv.config()

import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import bcrypt from 'bcrypt'
import User from '../models/User.js'
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email })
        if (!user) return done(null, false, { message: 'User not found' })

        const isMatch = await bcrypt.compare(password, user.passwordHash)
        if (!isMatch) return done(null, false, { message: 'Invalid password' })

        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  )
)

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID)
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'loaded' : 'missing')
console.log('GOOGLE_CALLBACK_URL:', process.env.GOOGLE_CALLBACK_URL)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ provider: 'google', providerId: profile.id })
        if (!user) {
          user = await User.create({
            provider: 'google',
            providerId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value
          })
        }
        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

export default passport

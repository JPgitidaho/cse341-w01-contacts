import express from 'express'
import bcrypt from 'bcrypt'
import passport from 'passport'
import User from '../models/User.js'

const router = express.Router()


router.post('/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      email,
      passwordHash: hashedPassword,
      provider: 'local'
    })

    req.login(user, (err) => {
      if (err) return next(err)
      res.status(201).json({ message: 'Usuario registrado y logueado', user })
    })
  } catch (err) {
    next(err)
  }
})


router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/auth/login-failed' }),
  (req, res) => {
    res.json({ message: 'Login exitoso', user: req.user })
  }
)

router.get('/login-failed', (req, res) => {
  res.status(401).json({ message: 'Login fallido' })
})


router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err)
    res.json({ message: 'Sesión cerrada' })
  })
})


router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login-failed' }),
  (req, res) => {
    res.json({ message: 'Login con Google exitoso', user: req.user })
  }
)

export default router

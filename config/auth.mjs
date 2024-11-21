import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { User } from "../models/User.mjs";

const Passport = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        // Define os campos do login
        usernameField: "loginEmail",
        passwordField: "loginPassword",
      },
      function (username, password, done) {
        User.findOne({ email_user: username }).then((user) => {
          if (!user) {
            return done(null, false, { message: "Essa conta não existe" });
          }

          // Compara a senha fornecida com a senha armazenada no banco
          bcrypt.compare(password, user.password_user, (err, isMatch) => {
            if (err) {
              return done(err); // Retorna o erro se acontecer
            }

            if (isMatch) {
              return done(null, user); // Senha correta, retorna o usuário
            } else {
              return done(null, false, { message: "Senha incorreta" });
            }
          });
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err));
  });
};

export default Passport;

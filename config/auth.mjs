import { Strategy as LocalStrategy } from "passport-local";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { User } from "../models/User.mjs";

// No arquivo './config/auth.js'
export function configureAuth(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "loginEmail",
        passwordField: "loginPassword",
      },
      function (username, password, done) {
        // Procura o usuário com o 'username' (que neste caso é o 'email_user')
        User.findOne({ email_user: username }).then((err, user) => {
          if (err) {
            return done(err); // Retorna oF erro se acontecer
          }

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
  // passport.use(
  //   new LocalStrategy(
  //     {
  //       usernameField: "loginEmail",
  //       passwordField: "loginPassword",
  //     },
  //     (email, password, done) => {
  //       User.findOne({ email_user: email }).then((user) => {
  //         if (!user) return done(null, false);
  //         const isValid = bcrypt.compare(password, user.password_user);
  //         if (isValid) return done(null, false);
  //         return done(null, user);
  //       });
  //     }
  //   )
  // );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });
}

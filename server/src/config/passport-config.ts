// import type { PassportStatic } from "passport";
// import { default as passportLocal } from "passport-local";
// import { prisma } from "../db";
// import bcrypt from "bcrypt";
// import { User } from "@prisma/client";
// const LocalStrategy = passportLocal.Strategy;

// export default function initialize(
//   passport: PassportStatic,
//   getUser: (email: string) => Promise<User | null>
// ) {
//   passport.use(
//     new LocalStrategy(
//       { usernameField: "email" },
//       async (email, password, done) => {
//         try {
//           const user = await getUser(email);
//           if (!user) {
//             return done(null, false, { message: "no such user" });
//           }
//           if (await bcrypt.compare(password, user.password)) {
//             return done(null, user);
//           } else {
//             return done(null, false, { message: "password incorrect" });
//           }
//         } catch (err) {
//           return done(err, false, { message: "no user with that email" });
//         } finally {
//           prisma.$disconnect();
//         }
//       }
//     )
//   );
//   passport.serializeUser((user: any, done) => done(null, user.id));
//   passport.deserializeUser((id: string, done) => {
//     try {
//       const user = prisma.user.findUnique({
//         where: {
//           id: id,
//         },
//       });
//       done(null, user);
//     } catch (err) {
//       done(err, false);
//     } finally {
//       prisma.$disconnect();
//     }
//   });
// }

// decided not to use passport, keeping just in case.

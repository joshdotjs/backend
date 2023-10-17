"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// models:
const UsersModel = require('../users/model');
// utils:
const { hash } = require('../../util/hash');
const { asynch } = require('../../util/async');
const { HttpError, DatabaseError } = require('../../util/error');
const { removeWhitespace, lowercase } = require('../../util/string');
// ==============================================
exports.register = async (req, res, next) => {
    // Get todays date and time-index:
    let user = { ...req.body };
    console.log('[POST] /api/auth/register, user: ', user);
    // TODO: validate input
    // -return error is email or password don't meet requirements
    // never save the plain text password in the db
    user.password = hash(user.password);
    user.email = removeWhitespace(lowercase(user.email));
    try {
        const new_user = await UsersModel.insertUser(user);
        console.log('new_user: ', new_user);
        res.status(201).json({
            status: 'success',
        });
    }
    catch (err) {
        // next(new HttpError('Error', 400));
        res.status(400).json({ message: 'ERROR 400: Bad request' });
    }
};
// ==============================================
// Possible outcomes:
//  -Success:
//    --1. emai & password are valid in DB
//      ---Request:
//          {
//            "email": "josh@josh.com", [string]
//            "password": "josh" [string]
//          }
//      ---Response:
//          {
//            "status": "success",
//            "user": {
//                "id": 1, [number]
//                "email": "josh@josh.com", [string]
//                "password": "$2a$08$Yvcc7Kf4xpovNutrTrXDreGL.ujwOdPpEy9mXfhsxOqYqx0fwcbB.", [string]
//                "is_admin": true, [boolean]
//                "first_name": "josh", [string]
//                "last_name": "holloway", [string]
//                "created_at": "2023-10-05T00:39:27.702Z", [string]
//                "updated_at": "2023-10-05T00:39:27.702Z" [string]
//            },
//            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb3NoQGpvc2guY29tIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY5NzM2MjE4NiwiZXhwIjoxNjk3NDQ4NTg2fQ.bGqJJjrZN9X8R7vAsJBoKghJF5IpuypL8uK5kAee7a0"
//          }
//  
//  -Fail:
//    --1: email or password is missing
//    --2. email is not in DB
//    --3. password is not valid for email
exports.login = async (req, res, next) => {
    // const { email, password } = req.body;
    const email = req.body.email;
    const password = req.body.password;
    // console.log('[POST] /api/auth/login');
    // console.log('email: ', email, '\tpassword: ', password);
    // validate input
    if (!email || !password) // fail case: 1
        return next(new HttpError('email and password required', 401));
    const stripped_email = removeWhitespace(lowercase(email));
    const promise = UsersModel.getByEmail(stripped_email);
    const [user_array, error] = await asynch(promise);
    if (error)
        return next(new DatabaseError(error, '/src/api/auth/controller.js -- UsersModel.getByEmail()'));
    // possible returned values:
    //  -Success:
    //    --{ id: 1, email: 'email', password: 'password', is_admin: false, last_name: 'holloway', first_name: 'josh', created_at, updated_at }
    //  -Fail:
    //    --undefined
    const user = user_array[0];
    // console.log('user: ', user);
    // console.log('typeof user.created_at: ', typeof user?.created_at);
    if (user === undefined) // fail case 2: email is not in DB
        return next(new HttpError('User does not exist', 401));
    const password_is_correct = bcrypt.compareSync(password, user.password);
    if (!password_is_correct) // fail case 3: password is not valid for email
        return next(new HttpError('Password is wrong', 401));
    const payload = {
        id: user.id,
        email: user.email,
        is_admin: user.is_admin,
    };
    const options = {
        expiresIn: '1d', // '1d, 1h, 1m
    };
    const token_secret = process.env.TOKEN_SECRET;
    const token = jwt.sign(payload, token_secret, options);
    res.status(200).json({
        status: 'success',
        user,
        token,
    });
};
// ==============================================

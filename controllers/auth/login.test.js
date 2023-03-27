const express = require("express");
const bcrypt = require("bcryptjs");

const login = require("./signInUser");

const { User } = require("../../models/user");

const app = express();
app.use(express.json());

describe("Login controller test", () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());
  test("Check status, token, type of data params", async () => {
    const mEmail = "tampopo@mail.com";
    const mPassword = "tampopo@mail.com";
    const user = {
      password: bcrypt.hashSync(mPassword, bcrypt.genSaltSync(10)),
      email: mEmail,
    };

    const mReq = {
      body: { email: mEmail, password: mPassword },
    };
    const mRes = { json: jest.fn() };

    await jest.spyOn(User, "findOne").mockImplementationOnce(async () => user);

    login(mReq, mRes).then(() => {
      console.log(mRes);
      expect(mRes.status).toBe(200);
      expect(mRes.data.token).toBeDefined();
      expect(typeof mRes.data.user.email).toBe("string");
      expect(typeof mRes.data.user.subscription).toBe("string");
    });
  });
});

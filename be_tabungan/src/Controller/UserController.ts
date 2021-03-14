import { Request, Response } from "express";
import { User } from "../models/SchemaModel";
import { validate } from "../common/validation";
import { send } from "../common/utils";

class UserController {
  async getAll(req: Request, res: Response) {
    const users = await User.find();
    return send.success(res, { code: 200, data: users, message: "" });
  }
  async getById(req: Request, res: Response) {
    const user = await User.findById(req.params.id);
    return send.success(res, { code: 200, data: [user], message: "" });
  }
  async getByUid(req: Request, res: Response) {
    const user = await User.find({ uid: req.params.uid });
    return send.success(res, { code: 200, data: user, message: "" });
  }
  async login(req: Request, res: Response) {
    const { isValid, invalidMessages } = await validate(req.body, [
      { field: "password", type: "string", required: true },
      { field: "email", type: "string", required: true },
    ]);
    console.log(req.body);
    if (!isValid)
      return send.failed(res, {
        code: 400,
        data: invalidMessages,
        message: "Gagal",
      });

    const { email, password } = req.body;
    const get = await User.find({ email: email, password: password });
    if (get.length <= 0)
      return send.failed(res, { code: 400, data: {}, message: "Failed" });

    return send.success(res, { code: 200, data: get, message: "" });
  }

  async register(req: Request, res: Response) {
    //validate request
    const { isValid, invalidMessages } = await validate(req.body, [
      { field: "email", type: "string", required: true },
      { field: "name", type: "string", required: false },
      { field: "uid", type: "string", required: true },
      { field: "password", type: "string", required: true },
      { field: "gender", type: "string", required: true },
    ]);

    //request not valid
    if (!isValid)
      return send.failed(res, {
        code: 400,
        data: invalidMessages,
        message: "Gagal",
      });

    //prepare saved
    const { uid, email, name, password, gender } = req.body;
    const user = User.build({
      uid: uid,
      email: email,
      name: name,
      gender: gender,
      password: password,
      created: Date.now(),
      updated: Date.now(),
    });
    const saved = await user.save();
    if (saved)
      return send.created(res, { code: 201, data: saved, message: "" });
    else return send.failed(res, { code: 400, data: {}, message: "Failed" });
  }
}

const user = new UserController();
export { user };

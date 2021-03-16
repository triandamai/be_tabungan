import { Request, Response } from "express";
import { uploader } from "../common/uploader";
import { send } from "../common/utils";
import { validate } from "../common/validation";
import { Tabungan } from "../models/SchemaModel";
class TabunganController {
  /**
   * save deposit
   * @param req
   * @param res
   * @returns {code,data,message}
   */
  async deposit(req: Request, res: Response) {
    const { isValid, invalidMessages } = await validate(req.body, [
      { field: "sender", type: "string", required: true },
      { field: "nominal", type: "string", required: true },
      { field: "description", type: "string", required: true },
    ]);

    const myFile = req.file.originalname.split(".");
    const typeFile = myFile[myFile.length - 1];
    const { url, uploaded, fileName } = await uploader(req, typeFile);
    if (uploaded) {
      // return send.failed(res, { code: 400, data: req.body, message: "" });
      if (!isValid)
        return send.failed(res, {
          code: 400,
          data: invalidMessages,
          message: "",
        });

      const { sender, nominal, description } = req.body;
      const tabungan = Tabungan.build({
        sender: sender,
        nominal: nominal,
        receipt: url,
        receiptname: fileName,
        accepted: "",
        tabungantype: "deposit",
        description: description,
        created: Date.now(),
        updated: Date.now(),
      });
      const saved = await tabungan.save();
      if (!saved)
        return send.failed(res, { code: 400, data: {}, message: "Gagal" });
      return send.success(res, { code: 201, data: saved, message: "Berhasil" });
    }
  }
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  async acceptDeposit(req: Request, res: Response) {
    const { isValid, invalidMessages } = await validate(req.body, [
      { field: "uid", type: "string", required: true },
      { field: "id", type: "string", required: true },
    ]);
    if (!isValid)
      return send.failed(res, {
        code: 400,
        data: invalidMessages,
        message: "failed",
      });
    const { id, uid } = req.body;
    Tabungan.findByIdAndUpdate(
      id,
      { accepted: uid },
      { new: true },
      (err: any, result: any) => {
        if (err)
          return send.failed(res, { code: 400, data: err, message: "Gagal" });
        if (result)
          return send.success(res, {
            code: 200,
            data: result,
            message: "Berhasil memverifikasi",
          });
      }
    );
  }
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  async updateDeposit(req: Request, res: Response) {
    const { isValid, invalidMessages } = await validate(req, [
      { field: "id", type: "string", required: true },
      { field: "sender", type: "string", required: true },
      { field: "nominal", type: "string", required: true },
      { field: "description", type: "string", required: true },
    ]);

    const myFile = req.file.originalname.split(".");
    const typeFile = myFile[myFile.length - 1];
    const { url, uploaded, fileName } = await uploader(req, typeFile);
    if (uploaded) {
      if (!isValid)
        return send.failed(res, {
          code: 400,
          data: invalidMessages,
          message: "Beberapa Field wajib diisi",
        });

      const { id, sender, nominal, description } = req.body;
      Tabungan.findByIdAndUpdate(
        id,
        {
          sender: sender,
          nominal: nominal,
          receipt: url,
          receiptname: fileName,
          description: description,
          created: Date.now(),
          updated: Date.now(),
        },
        { new: true },
        (err, data) => {
          if (err)
            return send.failed(res, { code: 400, data: {}, message: "Gagal" });
          return send.created(res, {
            code: 201,
            data: data,
            message: "Berhasil",
          });
        }
      );
    } else {
      return send.failed(res, {
        code: 400,
        data: {},
        message: "Bukti tidak terupload",
      });
    }
  }
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  async getAll(req: Request, res: Response) {
    const tabungan = await Tabungan.find().sort({ updated: -1 });
    return send.success(res, { code: 200, data: tabungan, message: "Oke" });
  }
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  async getById(req: Request, res: Response) {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      const tabungan = await Tabungan.findOne({ _id: req.params.id });
      if (tabungan)
        return send.success(res, {
          code: 200,
          data: [tabungan],
          message: "Oke",
        });
      else return send.failed(res, { code: 400, data: [], message: "not oke" });
    } else return send.failed(res, { code: 400, data: [], message: "not oke" });
  }
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  async sum(req: Request, res: Response) {
    const data = await Tabungan.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$nominal",
          },
        },
      },
    ]);

    return send.success(res, { code: 200, data: data, message: "" });
  }
}

const tabungan = new TabunganController();
export { tabungan };

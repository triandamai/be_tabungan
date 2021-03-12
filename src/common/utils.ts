import { Response } from "express";

interface IData {
  code: Number;
  data?: any;
  message?: string;
}

class Send {
  success(res: Response, payload: IData) {
    res.status(200).json(payload);
  }
  created(res: Response, payload: IData) {
    res.status(201).json(payload);
  }
  failed(res: Response, payload: IData) {
    res.status(400).json(payload);
  }
  internalError(res: Response, payload: IData) {
    res.status(500).json(payload);
  }
}

const send = new Send();
export { send };

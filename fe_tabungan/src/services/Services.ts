type httpcode = 200 | 201 | 400 | 500 | 404 | 900;
type contenttype = "urlencoded" | "json" | "form-data";

interface IResult {
  success: boolean;
  code?: httpcode;
  data?: IResponse;
}
interface IResponse {
  code?: httpcode;
  data: Array<any>;
  message?: string;
}
class Service {
  BASE_URL = "http://localhost:4000";
  get(param: { path: string }): Promise<IResult> {
    return new Promise((resolve) => {
      fetch(this.BASE_URL + param.path, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((result: IResponse) => {
          //  console.log(result);
          if (result.code == 200 || result.code == 201)
            resolve({ success: true, code: result.code, data: result });
          else resolve({ success: false, code: result.code, data: result });
        })
        .catch((error) => {
          resolve({ success: false, data: error, code: 900 });
        });
    });
  }
  post(param: {
    path: string;
    body: any;
    type: contenttype;
  }): Promise<IResult> {
    return new Promise((resolve) => {
      let request;
      switch (param.type) {
        case "json":
          request = fetch(this.BASE_URL + param.path, {
            body: param.body,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          break;
        case "form-data":
          request = fetch(this.BASE_URL + param.path, {
            body: param.body,
            method: "POST",
          });
          break;
        case "urlencoded":
          request = fetch(this.BASE_URL + param.path, {
            body: param.body,
            method: "POST",
            headers: {
              "Content-Type": "application/application/x-www-form-urlencoded",
            },
          });

          break;
      }

      request
        .then((res) => res.json())
        .then((result: IResponse) => {
          if (result.code == 200 || result.code == 201)
            resolve({ success: true, code: 200, data: result });
          else resolve({ success: false, code: 400, data: result });
        })
        .catch((error) => {
          resolve({ success: false, data: error, code: 900 });
        });
    });
  }
  put(param: { path: string; body: any }): Promise<IResult> {
    return new Promise((resolve) => {});
  }

  login(body: any): Promise<IResult> {
    return new Promise((resolve) => {
      this.post({
        path: "/api/login",
        body: body,
        type: "json",
      }).then((result: IResult) => {
        if (result.success) {
          this.saveUser(result.data?.data[0]);
        }
        resolve(result);
      });
    });
  }
  register(body: any): Promise<IResult> {
    return new Promise((resolve) => {
      this.post({
        path: "/api/register",
        body: body,
        type: "json",
      }).then((result) => {
        if (result.success) {
          this.saveUser(result.data?.data);
        }
        resolve(result);
      });
    });
  }

  saveUser(data: any) {
    window.sessionStorage.setItem("zZZaAbB", data);
  }
  getUser() {
    return window.sessionStorage.getItem("zZZaAbB");
  }
}
export default new Service();
export {};

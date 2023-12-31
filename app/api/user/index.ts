import axios from "axios";

let rootUrl = "https://gpt.yunwooo.com";

interface LoginData {
  account: string;
  password: string;
}

interface RecordData {
  /** 回答的消息 */
  answerMessages?: Object;

  /** 结果花费的token */
  completionTokens?: number;

  /** 发送的消息 */
  messages?: string[];

  /** 上一条消息返回的id，通过此种方式还原对话，没有父级则为0 */
  parentId?: number;

  /** 提示语花费的token */
  promptTokens?: number;

  /** 完整请求体 */
  requestBody?: Object;

  /** 完整响应体 */
  responseBody?: Object | null;

  /** 总共花费的token */
  totalTokens?: number;
}

// 登录
export function LoginApi(data: LoginData) {
  return new Promise((resolve, reject) => {
    axios
      .post(rootUrl + "/web/user/login", data)
      .then((res) => {
        localStorage.setItem("loginInfo", JSON.stringify(res));
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// 记录
export function RecordApi(data: RecordData) {
  const loginInfo = localStorage.getItem("loginInfo");
  const token = JSON.parse(loginInfo || "").data.data.token;
  return new Promise((resolve, reject) => {
    axios
      .post(rootUrl + "/web/chat", data, {
        headers: { authorization: `${token}` },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

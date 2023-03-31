export type Params = {
  param01?: string;
  param02?: string;
  param03?: string;
};

export const emptyParams: Params = {
  param01: "",
  param02: "",
  param03: "",
};

export type paramKey = "param01" | "param02" | "param03";

// ↑ここより上は行数が増えても仕方がない(types)
// ↑ここより上はtypes
// ↓ここより下はdomains

export class MemberInfo {
  params: Params;
  constructor(params?: Params) {
    if (params) {
      this.params = params;
    } else {
      this.params = emptyParams;
    }
  }

  setParams(params: Params) {
    this.params = params;
  }

  setParamsFalsyToEmpty(params: Params) {
    for (const [key, param] of Object.entries(params)) {
      if (param) {
        this.params[key] = param;
      } else {
        this.params[key] = "";
      }
    }
  }

  setParam(key: paramKey, value: string) {
    this.params[key] = value;
  }
}

// 検証
const testFunc1 = () => {
  const requestParam: Params = {
    param01: "aaa",
    param02: null,
    param03: "ccc",
  };

  const memberInfo = new MemberInfo();
  memberInfo.setParams(requestParam);

  console.log(memberInfo.params);
  console.log(memberInfo.params["param01"]);

  memberInfo.setParam("param02", "bbb");
  // memberInfo.setParam("param0", "bbb"); // ストリングリテラルでkeyはガードされているためエラー
  console.log(memberInfo.params);

  // memberInfoを使って新たな型
  type Hoge = {
    name: string;
    mail: string;
    memberInfo: MemberInfo;
  };

  const hoge: Hoge = {
    name: "taro",
    mail: "taro@test.com",
    memberInfo: memberInfo,
  };
  hoge.memberInfo.setParam("param01", "hogehoge");
  console.log(hoge.memberInfo.params["param01"]);
};

testFunc1();

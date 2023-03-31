type Params = {
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

// ↑ここより上は仕方がない

class MemberInfo {
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

const testFunc1 = () => {
  const requestParam2: Params = {
    param01: "aaa",
    param02: null,
    param03: "ccc",
  };

  const memberInfo = new MemberInfo();
  memberInfo.setParams(requestParam2);

  console.log(memberInfo.params);
  console.log(memberInfo.params["param01"]);

  memberInfo.setParam("param02", "bbb");
  console.log(memberInfo.params);
  // 下記設定はエラー
  // memberInfo.setParam("param0", "bbb");
};

testFunc1();

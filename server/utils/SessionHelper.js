class SessionHelper {
  static setSession(req, res, data) {
    let dataResult = data.data;

    req.session["token"] = dataResult.token;
    req.session["userName"] = dataResult.userName;
    req.session["account"] = dataResult.account;
    req.session["role"] = dataResult.role;
  }

  static getSession(req, res) {
    return req.session;
  }
}

module.exports = SessionHelper;

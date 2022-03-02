var jwt = require("jsonwebtoken");
var uuid4 = require("uuid4");

var app_access_key = "621f56017a9d04e28c60dc53";
var app_secret =
  "o7X89LZ_-1GUmQK7Jnk6i4uSvpTBV_AOwwdHFIi_k0OeRPa8MrMqWFJLsfpVCfugBBwkb_83X5TctlQugY5TaUs0FXplEb4VwJ5Vosz6jfRlb4-EsqUBQxuhRfG063VT4cxUlV9VpL231D0P-m5pF7gato3aYt_SqXPUJfbTa-Q=";
const getToken = async () => {
  const token = jwt.sign(
    {
      access_key: app_access_key,
      type: "management",
      version: 2,
      iat: Math.floor(Date.now() / 1000),
      nbf: Math.floor(Date.now() / 1000),
    },
    app_secret,
    {
      algorithm: "HS256",
      expiresIn: "24h",
      jwtid: uuid4(),
    },
    function (err, token) {
      console.log(token);
    }
  );
  return token;
};

const videoCallToken = async (req, res) => {
  const token = await getToken();
  res.status(200).json({ token: token });
};

module.exports = {
  videoCallToken,
};

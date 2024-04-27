import Express from 'express'
const express = Express()

global.accessTokens = [];
global.refreshTokens = [];

express.post("/account/api/oauth/token", async (req, res) => {
    if (req.body.grant_type == "password") {
        const deviceId = functions.createId();
        
        var t = jwt.sign(
          JSON.stringify({
            email: req.user.email,
            password: req.user.password,
            type: "access",
          }),
          "verySecretKey"
        );
        var r = jwt.sign(
          JSON.stringify({
            email: req.user.email,
            password: req.user.password,
            type: "refresh",
          }),
          "verySecretKey"
        );
    
        global.accessTokens.push(t);
        global.refreshTokens.push(r);
        res.json({
          access_token: t,
          expires_in: 28800,
          expires_at: "9999-12-02T01:12:01.100Z",
          token_type: "bearer",
          refresh_token: r,
          refresh_expires: 86400,
          refresh_expires_at: "9999-12-02T01:12:01.100Z",
          account_id: req.user.accountId,
          client_id: clientId,
          internal_client: true,
          client_service: "fortnite",
          displayName: req.user.username,
          app: "fortnite",
          in_app_id: req.user.accountId,
          device_id: deviceId,
        });
    }
});

export default express
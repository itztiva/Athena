import Express from 'express'
const express = Express();

express.post("/fortnite/api/game/v2/profile/*/client/ClientQuestLogin", async (req, res) => {
    res.status(200).end();
})

export default express
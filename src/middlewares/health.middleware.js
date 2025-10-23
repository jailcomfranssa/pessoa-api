module.exports = (req, res) => {
    res.json({ ok: true, uptime: process.uptime() });
};

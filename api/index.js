const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { validateIP, getClass } = require('../backend/utils/ipValidator');
const { calculateCIDR } = require('../backend/utils/cidrCalculator');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Validation Of IP Backend is Running!');
});

app.post('/api/validate-classful', (req, res) => {
    const { ip } = req.body;
    const result = getClass(ip);

    if (result.classType === "Invalid") {
        return res.json({ valid: false, message: "Invalid IPv4 Address" });
    }

    res.json({ valid: true, classInfo: result });
});

app.post('/api/validate-cidr', (req, res) => {
    const { ip, mask } = req.body;
    const result = calculateCIDR(ip, mask);

    if (!result.valid) {
        return res.json({ valid: false, message: result.message });
    }

    res.json({ valid: true, cidrInfo: result });
});

// Start the server only if running locally (not in Vercel environment)
if (require.main === module) {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { validateIP, getClass } = require('./utils/ipValidator');
const { calculateCIDR } = require('./utils/cidrCalculator');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Validation Of IP API (v1.0.0)');
});

// Endpoint for Classful Validation
app.post('/api/validate-classful', (req, res) => {
    const { ip } = req.body;

    if (!ip) {
        return res.status(400).json({ valid: false, message: 'IP address is required' });
    }

    const validation = validateIP(ip);
    if (!validation.valid) {
        return res.json({ valid: false, message: validation.message });
    }

    const classInfo = getClass(ip);
    res.json({
        valid: true,
        message: 'Valid IPv4 Address',
        classInfo
    });
});

// Endpoint for CIDR Calculation
app.post('/api/validate-cidr', (req, res) => {
    const { ip, mask } = req.body;

    if (!ip || mask === undefined) {
        return res.status(400).json({ valid: false, message: 'IP and Subnet Mask are required' });
    }

    const cidrInfo = calculateCIDR(ip, mask);
    if (!cidrInfo.valid) {
        // If it's an IP error, validation.valid is false. If valid IP but invalid calculation, valid is false.
        // The helper returns { error: ... } for invalid inputs in some cases.
        // Let's ensure consistency.
        return res.json({ valid: false, message: cidrInfo.error || "Invalid calculation parameters" });
    }

    res.json({
        valid: true,
        cidrInfo
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

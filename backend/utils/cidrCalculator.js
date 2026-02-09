const { validateIP } = require('./ipValidator');

function intToIP(int) {
    const part1 = (int >>> 24) & 255;
    const part2 = (int >>> 16) & 255;
    const part3 = (int >>> 8) & 255;
    const part4 = int & 255;
    return `${part1}.${part2}.${part3}.${part4}`;
}

function ipToInt(ip) {
    const parts = ip.split('.').map(Number);
    return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function calculateCIDR(ip, maskBits) {
    const validation = validateIP(ip);
    if (!validation.valid) return { error: validation.message, valid: false };

    const mask = parseInt(maskBits, 10);
    if (isNaN(mask) || mask < 0 || mask > 32) return { error: "Invalid subnet mask (0-32)", valid: false };

    const ipInt = ipToInt(ip);
    // Create mask: e.g. /24 -> 11111111.11111111.11111111.00000000
    // We use shift 0 to ensure unsigned 32-bit integer in JS
    const subnetMaskInt = (mask === 0) ? 0 : (~0 << (32 - mask)) >>> 0;

    const networkInt = (ipInt & subnetMaskInt) >>> 0;
    const broadcastInt = (networkInt | (~subnetMaskInt)) >>> 0;

    // Calculate first and last usable host
    // Network + 1, Broadcast - 1
    // Special case handling for /31 and /32
    let firstHostInt, lastHostInt, numHosts;

    if (mask === 32) {
        firstHostInt = networkInt;
        lastHostInt = networkInt;
        numHosts = 1;
    } else if (mask === 31) {
        firstHostInt = networkInt;
        lastHostInt = broadcastInt;
        numHosts = 2;
    } else {
        firstHostInt = networkInt + 1;
        lastHostInt = broadcastInt - 1;
        numHosts = Math.pow(2, 32 - mask) - 2;
    }

    return {
        valid: true,
        networkAddress: intToIP(networkInt),
        broadcastAddress: intToIP(broadcastInt),
        subnetMask: intToIP(subnetMaskInt),
        firstHost: intToIP(firstHostInt),
        lastHost: intToIP(lastHostInt),
        numHosts: (numHosts < 0) ? 0 : numHosts
    };
}

module.exports = { calculateCIDR };

function validateIP(ip) {
    if (!ip) return { valid: false, message: "IP address is required" };

    const format = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = ip.match(format);

    if (!match) {
        return { valid: false, message: "Invalid format. Use x.x.x.x" };
    }

    const parts = [];
    for (let i = 1; i <= 4; i++) {
        const octet = parseInt(match[i], 10);
        if (octet > 255 || octet < 0) {
            return { valid: false, message: `Octet ${match[i]} is out of range (0-255)` };
        }
        parts.push(octet);
    }

    return { valid: true, message: "Valid IPv4 Address", parts };
}

function toBinary(parts) {
    return parts.map(part => part.toString(2).padStart(8, '0')).join('.');
}

function getClass(ip) {
    const validation = validateIP(ip);
    if (!validation.valid) return { classType: "Invalid", range: "N/A" };

    const parts = validation.parts;
    const firstOctet = parts[0];
    const binary = toBinary(parts);
    const ipInteger = ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;

    const result = {
        classType: "Unknown",
        range: "N/A",
        type: "Unknown",
        defaultMask: "N/A",
        networkId: "N/A",
        hostId: "N/A",
        binary,
        ipInteger,
        networkAddress: "N/A",
        broadcastAddress: "N/A",
        firstHost: "N/A",
        lastHost: "N/A",
        usableHosts: "N/A"
    };

    if (firstOctet >= 0 && firstOctet <= 126) {
        result.classType = "A";
        result.range = "1.0.0.0 - 126.255.255.255";
        result.type = "Public/Private (10.x.x.x)";
        result.defaultMask = "255.0.0.0";
        result.networkId = `${parts[0]}`;
        result.hostId = `${parts[1]}.${parts[2]}.${parts[3]}`;
        result.networkAddress = `${parts[0]}.0.0.0`;
        result.broadcastAddress = `${parts[0]}.255.255.255`;
        result.firstHost = `${parts[0]}.0.0.1`;
        result.lastHost = `${parts[0]}.255.255.254`;
        result.usableHosts = "16,777,214";
    } else if (firstOctet === 127) {
        result.classType = "Loopback";
        result.range = "127.0.0.0 - 127.255.255.255";
        result.type = "Reserved (Localhost)";
        result.defaultMask = "N/A";
    } else if (firstOctet >= 128 && firstOctet <= 191) {
        result.classType = "B";
        result.range = "128.0.0.0 - 191.255.255.255";
        result.type = "Public/Private (172.16.x.x - 172.31.x.x)";
        result.defaultMask = "255.255.0.0";
        result.networkId = `${parts[0]}.${parts[1]}`;
        result.hostId = `${parts[2]}.${parts[3]}`;
        result.networkAddress = `${parts[0]}.${parts[1]}.0.0`;
        result.broadcastAddress = `${parts[0]}.${parts[1]}.255.255`;
        result.firstHost = `${parts[0]}.${parts[1]}.0.1`;
        result.lastHost = `${parts[0]}.${parts[1]}.255.254`;
        result.usableHosts = "65,534";
    } else if (firstOctet >= 192 && firstOctet <= 223) {
        result.classType = "C";
        result.range = "192.0.0.0 - 223.255.255.255";
        result.type = "Public/Private (192.168.x.x)";
        result.defaultMask = "255.255.255.0";
        result.networkId = `${parts[0]}.${parts[1]}.${parts[2]}`;
        result.hostId = `${parts[3]}`;
        result.networkAddress = `${parts[0]}.${parts[1]}.${parts[2]}.0`;
        result.broadcastAddress = `${parts[0]}.${parts[1]}.${parts[2]}.255`;
        result.firstHost = `${parts[0]}.${parts[1]}.${parts[2]}.1`;
        result.lastHost = `${parts[0]}.${parts[1]}.${parts[2]}.254`;
        result.usableHosts = "254";
    } else if (firstOctet >= 224 && firstOctet <= 239) {
        result.classType = "D";
        result.range = "224.0.0.0 - 239.255.255.255";
        result.type = "Multicast";
        result.defaultMask = "N/A (Multicast)";
        result.networkAddress = "Multicast Group";
        result.broadcastAddress = "N/A";
        result.firstHost = "N/A";
        result.lastHost = "N/A";
        result.usableHosts = "N/A";
    } else if (firstOctet >= 240 && firstOctet <= 255) {
        result.classType = "E";
        result.range = "240.0.0.0 - 255.255.255.255";
        result.type = "Experimental";
        result.defaultMask = "N/A (Experimental)";
        result.networkAddress = "Experimental Block";
        result.broadcastAddress = "N/A";
        result.firstHost = "N/A";
        result.lastHost = "N/A";
        result.usableHosts = "N/A";
    }

    return result;
}

module.exports = { validateIP, getClass };

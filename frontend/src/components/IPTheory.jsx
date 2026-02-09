import { Info, Network, Box } from 'lucide-react';
import styles from './IPTheory.module.css';

export default function IPTheory({ activeTab }) {
    return (
        <article className={styles.container}>
            {/* General Theory Section */}
            <div className={styles.section}>
                <div className={styles.header}>
                    <Info size={24} className={styles.icon} />
                    <h2>Understanding IP Addresses</h2>
                </div>

                <div className={styles.content}>
                    <p className={styles.intro}>
                        An <strong>IP (Internet Protocol) Address</strong> is a unique numerical label assigned to every device connected to a computer network that uses the Internet Protocol for communication. Think of it like a home address for your computer—it allows data to find its way to you across the vast network of the internet.
                    </p>

                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <h3>IPv4 (Version 4)</h3>
                            <ul>
                                <li>Most common version</li>
                                <li>32-bit address scheme</li>
                                <li>Format: Four sets of numbers (0-255) separated by periods</li>
                                <li>Example: <code>192.168.1.1</code></li>
                            </ul>
                        </div>

                        <div className={styles.card}>
                            <h3>IPv6 (Version 6)</h3>
                            <ul>
                                <li>Solves IPv4 exhaustion</li>
                                <li>128-bit address scheme</li>
                                <li>Format: Hexadecimal groups separated by colons</li>
                                <li>Example: <code>2001:0db8:85a3...</code></li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.validationSection}>
                        <h3>How to Identify a Valid IPv4 Address</h3>
                        <p>To determine if an IPv4 address is valid, it must meet three simple rules:</p>
                        <ol>
                            <li><strong>Format:</strong> It must consist of four numbers separated by dots (periods).</li>
                            <li><strong>Range:</strong> Each of the four numbers (octets) must be between <strong>0 and 255</strong>.</li>
                            <li><strong>No Extra Characters:</strong> It should contain only digits and dots—no letters or special symbols.</li>
                        </ol>
                        <div className={styles.examples}>
                            <div className={styles.valid}>
                                <span>✅ Valid:</span> <code>192.168.0.1</code>
                            </div>
                            <div className={styles.invalid}>
                                <span>❌ Invalid:</span> <code>256.1.1.1</code> (Number &gt; 255)
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className={styles.divider} />

            {/* Dynamic Theory Section */}
            {activeTab === 'classful' ? (
                <div className={styles.section}>
                    <div className={styles.header}>
                        <Box size={24} className={styles.icon} />
                        <h2>Classful IPv4 Addressing</h2>
                    </div>

                    <div className={styles.content}>
                        <p className={styles.intro}>
                            In the original Internet routing scheme, IP addresses were divided into five classes (A through E). This system, known as <strong>Classful Addressing</strong>, determines the network size based on the first few bits of the IP address.
                        </p>

                        <div className={styles.grid}>
                            <div className={styles.card}>
                                <h3>Class A</h3>
                                <ul>
                                    <li><strong>Range:</strong> 0.0.0.0 to 127.255.255.255</li>
                                    <li><strong>Default Subnet Mask:</strong> 255.0.0.0 (/8)</li>
                                    <li><strong>Network/Host:</strong> N.H.H.H</li>
                                    <li><strong>Designed for:</strong> Very large networks (millions of hosts).</li>
                                </ul>
                            </div>

                            <div className={styles.card}>
                                <h3>Class B</h3>
                                <ul>
                                    <li><strong>Range:</strong> 128.0.0.0 to 191.255.255.255</li>
                                    <li><strong>Default Subnet Mask:</strong> 255.255.0.0 (/16)</li>
                                    <li><strong>Network/Host:</strong> N.N.H.H</li>
                                    <li><strong>Designed for:</strong> Medium-sized networks (universities, large companies).</li>
                                </ul>
                            </div>

                            <div className={styles.card}>
                                <h3>Class C</h3>
                                <ul>
                                    <li><strong>Range:</strong> 192.0.0.0 to 223.255.255.255</li>
                                    <li><strong>Default Subnet Mask:</strong> 255.255.255.0 (/24)</li>
                                    <li><strong>Network/Host:</strong> N.N.N.H</li>
                                    <li><strong>Designed for:</strong> Small networks (home, small business).</li>
                                </ul>
                            </div>

                            <div className={styles.card}>
                                <h3>Class D & E</h3>
                                <ul>
                                    <li><strong>Class D (224-239):</strong> Multicast groups.</li>
                                    <li><strong>Class E (240-255):</strong> Experimental / Research.</li>
                                    <li>Neither can be assigned to regular hosts.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.section}>
                    <div className={styles.header}>
                        <Network size={24} className={styles.icon} />
                        <h2>Classless Addressing (CIDR)</h2>
                    </div>

                    <div className={styles.content}>
                        <p className={styles.intro}>
                            <strong>CIDR (Classless Inter-Domain Routing)</strong> replaced the rigid Classful system to use IP addresses more efficiently. It allows for flexible network sizes using <strong>Subnet Masks</strong> and <strong>Suffix Notation</strong>.
                        </p>

                        <div className={styles.grid}>
                            <div className={styles.card}>
                                <h3>What is CIDR?</h3>
                                <ul>
                                    <li>Eliminates fixed classes (A, B, C).</li>
                                    <li>Uses a <strong>/Suffix</strong> (e.g., /24) to denote the network size.</li>
                                    <li>The suffix indicates how many bits are used for the <strong>Network ID</strong>.</li>
                                </ul>
                            </div>

                            <div className={styles.card}>
                                <h3>Subnet Mask</h3>
                                <ul>
                                    <li>A 32-bit number that separates the IP into Network and Host parts.</li>
                                    <li>Example: <code>255.255.255.0</code></li>
                                    <li>"1s" represent the Network, "0s" represent the Host.</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.validationSection}>
                            <h3>Why use CIDR?</h3>
                            <p>
                                CIDR reduces the waste of IP addresses (IP exhaustion) and decreases the size of routing tables on the internet router. It allows a company to simply use valid public IP addresses for the devices that need them, rather than a huge block that they might not fully utilize.
                            </p>

                            <div className={styles.examples}>
                                <div className={styles.valid}>
                                    <span>Example:</span> <code>192.168.1.0/24</code>
                                    <br />
                                    <span style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>256 IPs (254 usable)</span>
                                </div>
                                <div className={styles.valid}>
                                    <span>Example:</span> <code>10.0.0.0/8</code>
                                    <br />
                                    <span style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>16 Million+ IPs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
}

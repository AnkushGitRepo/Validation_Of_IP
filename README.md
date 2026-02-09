# Validation Of IP - Advanced IPv4 Analysis Tool

![Validation Of IP](frontend/public/favicon.png)

## Overview

**Validation Of IP** is a modern, responsive web application designed for network engineers, students, and enthusiasts. It provides a suite of tools to analyze, validate, and understand IPv4 addresses, including:

-   **Classful Validator:** Verify IPv4 addresses, identify their Class (A, B, C, D, E), and view detailed network information like Network Address, Broadcast Address, and Host ranges.
-   **CIDR Calculator:** Calculate subnet details based on IP and Subnet Mask using Classless Inter-Domain Routing (CIDR).
-   **IP Theory:** Learn the fundamentals of IP addressing, including the differences between Classful and Classless systems, dynamically updated based on your current view.

## Features

-   **Real-time Validation:** Instantly validate IPv4 addresses with error feedback.
-   **Comprehensive Analysis:** Get detailed breakdowns of Network ID, Host ID, Binary representation, and Integer values.
-   **Dynamic Theory Section:** Educational content that adapts to the tool you are using (Classful vs. CIDR).
-   **Responsive Design:** Optimized for all devices with a clean, modern UI.
-   **History Log:** Keep track of your recent calculations and validations.

## Technology Stack

-   **Frontend:** React, Vite, CSS Modules (Custom Light Theme)
-   **Backend:** Node.js, Express
-   **Deployment:** Vercel (Serverless Functions for Backend)

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm (v6 or higher)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/validation-of-ip.git
    cd validation-of-ip
    ```

2.  **Install Dependencies:**
    
    *For Frontend:*
    ```bash
    cd frontend
    npm install
    ```

    *For Backend:*
    ```bash
    cd ../backend
    npm install
    ```

### Running Locally

To run the application locally, you need to start both the frontend and backend servers.

1.  **Start the Backend:**
    ```bash
    cd backend
    npm start
    ```
    The backend server will run on `http://localhost:5001`.

2.  **Start the Frontend:**
    Open a new terminal window:
    ```bash
    cd frontend
    npm run dev
    ```
    The frontend will run on `http://localhost:5173`.

## Deployment on Vercel

This project is configured for seamless deployment on Vercel.

1.  **Push to GitHub:** Ensure your code is pushed to a GitHub repository.
2.  **Import to Vercel:**
    -   Go to [Vercel](https://vercel.com) and click "Add New... > Project".
    -   Import your `validation-of-ip` repository.
3.  **Configure Project:**
    -   Framework Preset: **Vite**
    -   Root Directory: `./` (Leave as default)
    -   Build Command: `cd frontend && npm install && npm run build` (or customize if needed)
    -   Output Directory: `frontend/dist`
    -   **Environment Variables:** Add any environment variables if you have them (e.g., in `.env`).
4.  **Deploy:** Click **Deploy**. Vercel will automatically detect the `vercel.json` configuration to handle the backend serverless functions and frontend routing.

## SEO & Optimization

-   **Advanced SEO:** Includes Open Graph and Twitter Card tags for social media sharing.
-   **Favicon:** Custom generated shield icon.
-   **Performance:** Built with Vite for lightning-fast loading.

## License

This project is licensed under the MIT License.

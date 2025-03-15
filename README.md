# Malama Health

A culturally relevant health literacy application for Hawaiian communities.

## Overview

Malama Health is a web application designed to improve health literacy among underserved communities in Hawaii, including rural populations, Filipinos, Pacific Islanders, and older adults. The application provides culturally tailored health education, interactive learning modules, community forums, and resource directories.

## Features

- **Learning Modules**: Interactive educational content about various health topics
- **Community Forum**: Discussion boards for sharing experiences and asking questions
- **Health Resources Directory**: Directory of local health services and resources
- **User Dashboard**: Track progress through learning modules
- **Cultural Integration**: Information presented with respect for Hawaiian culture and traditions

## Tech Stack

- **Frontend**: React with TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js with Express
- **Data Storage**: Local JSON file-based storage
- **Authentication**: JWT-based authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/malama-health.git
cd malama-health
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd backend
npm install
cd ..
```

### Running the Application

To run both frontend and backend concurrently:

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

To run only the frontend:
```bash
npm start
```

To run only the backend:
```bash
npm run start:backend
```

## Project Structure

```
malama-health/
├── backend/                # Backend server code
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── data/           # JSON data storage
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   └── server.js       # Main server file
│   └── package.json
├── public/                 # Public assets
├── src/                    # Frontend React code
│   ├── assets/             # Images and icons
│   ├── components/         # Reusable UI components
│   ├── context/            # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── services/           # API service layer
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
└── package.json
```

## Contributing

This project was created for a hackathon demonstration and is not actively maintained. Feel free to fork and extend it for your own purposes.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Created for SWITCH x ICSpark Hackathon
- Developed with a focus on cultural relevance and accessibility
disaster-aggregation-platform/
├── server.js              # Main server file
├── routes/                # Folder for route handlers
│   ├── userRoutes.js      # Routes for users
│   ├── weatherRoutes.js   # Routes for weather data
│   ├── newsRoutes.js      # Routes for news data
│   └── index.js           # Combine all routes
├── controllers/           # Folder for business logic
│   ├── userController.js  # Logic for user-related operations
│   ├── weatherController.js # Logic for weather-related operations
│   └── newsController.js  # Logic for news-related operations
├── db/                    # Folder for database connection
│   └── db.js              # Database connection setup
├── .env                   # Environment variables
├── package.json           # Node.js project configuration
└── README.md              # Project documentation

--npm install--#for install dependencies

# set up environment variables 
DB_USER=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=

# API Keys
OPENWEATHERMAP_API_KEY=
NEWS_API_KEY=


--node server.js---#to start the server


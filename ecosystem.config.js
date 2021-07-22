module.exports = {
    apps : [{
        name: "app",
        script: "cd backend/ && npm start",
        instances: 1,
        env: {
            NODE_ENV: process.env.NODE_ENV,
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}

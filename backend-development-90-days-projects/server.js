const http = require("http");

const server = http.createServer((req, res) => {

    res.setHeader("Content-Type", "application/json");

    if (req.url === "/" && req.method === "GET") {
        res.statusCode = 200;

        res.end(JSON.stringify({
            message: "Welcome to Chera Backend",
            day: 1,
            journey: "90 Days Backend Development"
        }));
    }

    else if (req.url === "/health" && req.method === "GET") {
        res.statusCode = 200;

        res.end(JSON.stringify({
            status: "OK"
        }));
    }

    else {
        res.statusCode = 404;

        res.end(JSON.stringify({
            message: "Route not found"
        }));
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
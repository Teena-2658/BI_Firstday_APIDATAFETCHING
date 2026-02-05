const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://bi-firstday-apidatafetching.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin); // 👈 return exact origin
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 🔴 THIS LINE IS CRITICAL
app.options("*", cors());
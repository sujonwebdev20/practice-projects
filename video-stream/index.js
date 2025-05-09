import path from "node:path";
import fs from "node:fs";
import { exec } from "node:child_process";
import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuid } from "uuid";

const app = express();

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
// app.use((req, res, next) => {
//   // res.header("Access-Control-Allow-Origin,")
// });

/* Multer Middleware */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + uuid() + path.extname(file.originalname)
    );
  },
});

/* multer configuration */
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.json({ msg: "Hello Video Stream" });
});

app.post("/upload", upload.single("file"), (req, res) => {
  const lessonId = uuid();
  const videoPath = req.file.path;
  const outputPath = `./uploads/courses/${lessonId}`;
  console.log("outputPath:", outputPath);
  console.log(
    "------------------------------------------------------------------------------------------------------------------------------------------"
  );
  const hlsPath = `${outputPath}/index.m3u8`;
  console.log("hlsPath:", hlsPath);
  console.log(
    "------------------------------------------------------------------------------------------------------------------------------------------"
  );

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  /* FFmpeg */
  const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;

  /* No queue because of POC, not to be used in production */
  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) console.log(`exec error: ${error}`);
    console.log(`stdout: ${stdout}`);
    console.log(
      "------------------------------------------------------------------------------------------------------------------------------------------"
    );
    console.log(`stderr: ${stderr}`);
    console.log(
      "------------------------------------------------------------------------------------------------------------------------------------------"
    );
    const videoUrl = `http://localhost:${PORT}/uploads/courses/${lessonId}/index.m3u8`;
    res.json({
      msg: "Video converted to HLS format.",
      videoUrl: videoUrl,
      lessonId: lessonId,
    });
  });
});

const PORT = 8000;

app.listen(PORT, () =>
  console.log(`Server listening on port http://localhost:${PORT}🎯🛜`)
);

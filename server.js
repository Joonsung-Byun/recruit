const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const upload = multer();

const { createClient } = require("@supabase/supabase-js");
const supabaseDB = createClient(process.env.SUPABASEURL,process.env.SUPABASEKEY);



app.get("/", (req, res) => {
  res.sendFile(__dirname, "index.html");
});

app.get("/postings", async (req, res) => {
  let { data, error } = await supabaseDB.from("postings").select("*");
  console.log(data);
  res.send(data);
});

app.post("/imgUpload", upload.single("file"), async (req, res) => {
  const file = req.file;
  try {
    const uniqueFileName = `${uuidv4()}-${file.originalname}`;
    const { data, error } = await supabaseDB.storage
      .from("joon-node-bucket")
      .upload(`public/${uniqueFileName}`, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      console.error("Error uploading image:", error);
      return res.status(500).send("Error uploading image.");
    } else {
      res.json({
        url:`${process.env.SUPABASEURL}/storage/v1/object/public/` +
          data.fullPath,
          name: file.originalname
      });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Server error.");
  }
});

app.post("/postings", async (req, res) => {
    const { data: insertData, error: insertError } = await supabaseDB
      .from("postings")
      .insert(req.body);

    const { data: selectData, error: selectError } = await supabaseDB
      .from("postings")
      .select("*");

    res.status(200).json(selectData);
}
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

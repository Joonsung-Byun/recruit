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
  res.send(data);
});

app.post("/postings", async (req, res) => {
  const { data: insertData, error: insertError } = await supabaseDB
      .from("postings")
      .insert(req.body);

  if (insertError) {
    console.log(insertError)
    console.log(insertError.message);
      return res.status(500).json({ error: insertError.message });
  }

  const { data: selectData, error: selectError } = await supabaseDB
      .from("postings")
      .select("*");

  if (selectError) {
      return res.status(500).json({ error: selectError.message });
  }

  res.status(200).send(selectData);
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

app.delete("/postings/:id", async (req, res) => {
  const deleteID = req.params.id
  const { data, error } = await supabaseDB.from("postings").delete().eq('id', deleteID);

  console.log('delete success');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const {data: selectData, error: selectError} = await supabaseDB.from("postings").select('*');

  if (selectError) {
    return res.status(500).json({ error: selectError.message });
  }

  res.status(200).send(selectData);
});

app.put("/postings/:id", async (req, res) => {
  const id = req.params.id;
  const { data, error } = await supabaseDB.from("postings")

  .update({
    groupName: req.body[0],
    location: req.body[1],
    members: req.body[2],
    date: req.body[5],
    startTime: req.body[3],
    endTime: req.body[4],
    resources: req.body[6],
    topic: req.body[7],
  })
  .eq('id', id);
  if (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }

  const {data: selectData, error:selectError} = await supabaseDB.from("postings").select('*');


  if (selectError) {
    return res.status(500).json({ error: selectError.message });
  }
  res.status(200).send(selectData);
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

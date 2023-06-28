const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const upload = require("express-fileupload");

const IMG_DIR = path.join(__dirname, "media");
const DATA = path.join(__dirname, "authors", "authors.json");
const STATIC_DIR = path.join(__dirname,"..","frontend")


app.use(express.json());
app.use(upload());


app.use(express.static(path.resolve(STATIC_DIR)));


app.get("/pictures/:filename", async (req, res) => {
  const filename = req.params.filename + ".jpg";
  const filePath = path.join(IMG_DIR, filename);

  try {
    const imageBlob = await fs.promises.readFile(filePath);
    res.setHeader("Content-Type", "image/jpeg");
    res.send(imageBlob);
  } catch (err) {
    console.error(err);
    res.status(404).send("File not found");
  }
});

app.get("/authors/", (req, res) => {
  fs.readFile(DATA, "utf-8", (err, data) => {
    if (err) {
      res.status(404).send("Not found");
    }
    const author = JSON.parse(data);
    res.json(author);
  });
});

const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");
const hours = String(date.getHours()).padStart(2, "0");
const minutes = String(date.getMinutes()).padStart(2, "0");

const formattedDate = `Uploaded at:${year}.${month}.${day} ${hours}:${minutes}`;

/*app.post("/authors/", (req, res) => {
  const formData = req.body;

  if (!formData) {
    return res.status(400).send("Missing form data.");
  }

  const file = req.files.file;

  if (!file) {
    return res.status(400).send("Missing file.");
  }

  const authors = JSON.parse(fs.readFileSync(DATA, "utf8"));

  let currentMaxId = 0;

  if (authors.length > 0) {
    authors.forEach((author) => {
      if (author.id > currentMaxId) {
        currentMaxId = author.id;
      }
    });
  }

  currentMaxId++;

  const authorData = {
    id: currentMaxId,
    data: formData,
    date: formattedDate,
  };
  authors.push(authorData);

  const newName = currentMaxId + ".jpg";
  fs.writeFile(DATA, JSON.stringify(authors, null, 2), "utf8", (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error: Unable to write file.");
    }

    return res.sendStatus(200);
  });
  file.mv(path.join(IMG_DIR, newName), (err) => {
    if (err) {
      console.log(err);
    }
  });
});*/

/*app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  fs.readFile(DATA, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Hiba történt a fájl olvasása során.");
      return;
    }

    let jsonData = JSON.parse(data);
    let entryToDelete = jsonData.find((entry) => entry.id.toString() === id);

    if (!entryToDelete) {
      res
        .status(404)
        .send("Nem található a megadott azonosítóval rendelkező bejegyzés.");
      return;
    }

    let updatedData = jsonData.filter((entry) => entry.id.toString() !== id);
    let updatedJsonData = JSON.stringify(updatedData);

    fs.writeFile(DATA, updatedJsonData, "utf8", (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Hiba történt a fájl írása során.");
        return;
      }

      const imagePath = path.join(IMG_DIR, `${id}.jpg`);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Hiba történt a képfájl törlése során.");
          return;
        }

        res
          .status(200)
          .send("A bejegyzés és a képfájl sikeresen törölve lett.");
      });
    });
  });
});*/

app.listen(9000, () => {
  console.log("Server is runing at http://localhost:9000");
});

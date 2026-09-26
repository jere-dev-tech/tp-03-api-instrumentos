const express = require("express");
const path = require("node:path");
const { leerJson } = require("./archivos");

async function main() {
  try {
    const rutaInstrumentos = path.join(
      __dirname,
      "..",
      "datos",
      "instrumentos.json"
    );

    const instrumentos = await leerJson(rutaInstrumentos);

    const app = express();
    const PORT = 3000;

    app.use(express.json());

    app.get("/", (req, res) => {
      res.status(200).json({
        mensaje: "Bienvenido. La API de instrumentos musicales está disponible",
      });
    });

    app.get("/api/instrumentos", (req, res) => {
      const { familia } = req.query;

      if (!familia) {
        return res.status(200).json(instrumentos);
      }

      const instrumentosFiltrados = instrumentos.filter((instrumento) => {
        return instrumento.familia.toLowerCase() === familia.toLowerCase();
      });

      res.status(200).json(instrumentosFiltrados);
    });

    app.get("/api/instrumentos/:id", (req, res) => {
      const id = Number(req.params.id);

      const instrumento = instrumentos.find((instrumento) => {
        return instrumento.id === id;
      });

      if (!instrumento) {
        return res.status(404).json({
          error: "Instrumento no encontrado",
        });
      }

      res.status(200).json(instrumento);
    });

    app.post("/api/instrumentos", (req, res) => {
      const { nombre, familia, origen, descripcion, disponible } = req.body;

      if (
        !nombre ||
        !familia ||
        !origen ||
        !descripcion ||
        disponible === undefined
      ) {
        return res.status(400).json({
          error: "Faltan campos obligatorios",
        });
      }

      const ultimoId =
        instrumentos.length > 0 ? instrumentos[instrumentos.length - 1].id : 0;

      const nuevoInstrumento = {
        id: ultimoId + 1,
        nombre,
        familia,
        origen,
        descripcion,
        disponible,
      };

      instrumentos.push(nuevoInstrumento);

      res.status(201).json(nuevoInstrumento);
    });

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error.message);
    process.exitCode = 1;
  }
}

main();
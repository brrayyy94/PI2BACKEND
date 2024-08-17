

// Create (C)
const add = async (req, res) => {
    try {
        const anuncio = new Anuncio(req.body);
        await anuncio.save();
        success(req, res, 'Anuncio creado', 201);
    } catch (error) {
        error(req, res, error, 500);
    }
};

// Read (R)
const get = async (req, res) => {
    try {
        const anuncios = await Anuncio.find();
        success(req, res, anuncios, 200);
    } catch (error) {
        error(req, res, error, 500);
    }
};

// Update (U)
const update = async (req, res) => {
    try {
        await Anuncio.findByIdAndUpdate(req.body._id, req.body);
        success(req, res, 'Anuncio actualizado', 200);
    }
    catch (error) {
        error(req, res, error, 500);
    }
}

// Delete (D)
const remove = async (req, res) => {
    try {
        await Anuncio.findByIdAndDelete(req.body._id);
        success(req, res, 'Anuncio eliminado', 200);
    }
    catch (error) {
        error(req, res, error, 500);
    }
}

export { add, get, update, remove };


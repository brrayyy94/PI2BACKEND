export const success = (res, message, status) => {
    res.status(status || 200).send(message);
};

export const error = (res, message, status, details) => {
    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    };

    console.error('[response error] ' + (details.message || JSON.stringify(details, getCircularReplacer())));
    if (res.headersSent) { // Verificar si ya se han enviado las cabeceras
        return; // Si ya se enviaron, se detiene la ejecución
    }
    console.log('res object:', res)
    res.status(status || 500).send({
        error: message,
        body: ''
    });
};
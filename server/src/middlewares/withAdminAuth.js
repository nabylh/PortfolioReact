export default (req, res, next) => {
    // Vérification si l'utilisateur est connecté
    if (!req.session || !req.session.user) {
        // Si l'utilisateur n'est pas connecté
        return res.status(401).json({ message: "Veuillez vous connecter." });
    }

    // Vérification si l'utilisateur a le rôle d'administrateur
    if (req.session.user.role !== "admin") {
        // Si l'utilisateur est connecté mais pas admin
        return res.status(403).json({ message: "ACCES DENIED " });
    }

    // Si tout est bon, passer à la route suivante
    next();
};






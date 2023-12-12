const annoucement = async (title, content) => {
    try {
    const response = await fetch('/api/sendAnnouncement', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
        // eslint-disable-next-line no-console
        console.log('Annonce envoyée avec succès !');
    } else {
        // eslint-disable-next-line no-console
        console.error('Erreur lors de l\'envoi de l\'annonce.');
    }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Erreur réseau :', error);
    }
}
module.exports = annoucement;

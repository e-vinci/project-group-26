async function fetchAnnouce(title, content) {
    console.log("On est dans le fetchAnnouce    ");
    try{

    
    const annoucement = await fetch('/api/users/annouce', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title, 
            content, 
        }),
    });
    if (!annoucement.ok) {
        throw new Error(`Failed to add user: ${annoucement.status}`);
    }
    } catch (err) {
        console.error('addAnnouce::error: ', err);
        throw err;
    }
}

async function readLastAnnouce() {
    try {
        const response = await fetch('/api/users/readAnnoucement');
        if (!response.ok) {
            throw new Error(`Failed to add user: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching number of students:', error);
        throw error;
    }
}

export { fetchAnnouce, readLastAnnouce };
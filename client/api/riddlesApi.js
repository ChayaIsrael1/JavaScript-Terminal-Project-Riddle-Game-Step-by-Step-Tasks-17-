import Riddle from '../classes/Riddle.js'

export async function getAllRiddles() {
    try {
        const response = await fetch("http://localhost:3000/api/riddles")
        
        if (!response.ok) {
            throw new Error(`Failed to fetch riddles. Status: ${response.status}`);
        }

        const data = await response.json()

        return data
    }
    catch (error) {
        console.error("Error in getAllRiddles:", error.message)
    }
}

export async function createRiddle(riddle) {
    const r = new Riddle(riddle)
    try {
        const response = await fetch("http://localhost:3000/api/riddles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(r)
        })

        if (!response.ok) {
            throw new Error(`Failed to create riddle. Status: ${response.status}`);
        }

        const data = await response.json()
        console.log("Riddle saved!", data)
        return data
    }
    catch (error) {
        console.error("Error in createRiddle:", error.message)
    }
}

export async function updateRiddle(id, riddle) {
    const r = new Riddle(riddle)
    try {
        const response = await fetch(`http://localhost:3000/api/riddles/${id}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(r)
        })

        if (!response.ok) {
            throw new Error(`Failed to update riddle. Status: ${response.status}`);
        }

        const data = await response.json()
                console.log("Riddle update!")

        return data
    }
    catch (error) {
        console.error("Error in updateRiddle:", error.message)
    }
}

export async function deleteRiddle(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/riddles/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            throw new Error(`Failed to delete riddle. Status: ${response.status}`);
        }

        const data = await response.json()
         console.log("Riddle delete!")
        return data
    }
    catch (error) {
        console.error("Error in deleteRiddle:", error.message)
    }
}

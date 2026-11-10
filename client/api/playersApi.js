import Player from '../classes/Player.js'

export async function findPlayerByName(name) {
    try {
        const response = await fetch(`http://localhost:3000/api/players?name=${name}`)
        if (!response.ok) {
            throw new Error(`Failed to find Player. Status: ${response.status}`);
        }
        const data = await response.json()
                return data.length > 0 ? data[0] : null;
    }
    catch (error) {
        console.error("Error in findPlayer:", error.message)
}
}


export async function createPlayer(name) {
  const p = new Player({ name: name, times: [], lowestTime: null });
try {
        const response = await fetch(`http://localhost:3000/api/players`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
            , body: JSON.stringify(p)

        })

        if (!response.ok) {
            throw new Error(`Failed to create Player. Status: ${response.status}`);
        }

        const data = await response.json()
        console.log("create Player!")
        return data
    }
    catch (error) {
        console.error("Error in createPlayer:", error.message)

}
}
export async function updatePlayer(id,player) {
const p =new Player(player)
try {
        const response = await fetch(`http://localhost:3000/api/players/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
            , body: JSON.stringify(p)
        })

        if (!response.ok) {
            throw new Error(`Failed to update Player. Status: ${response.status}`);
        }

        const data = await response.json()
         console.log("update Player!")
        return data
    }
    catch (error) {
        console.error("Error in updatePlayer:", error.message)
}
}
export async function getAllPlayers() {
 try {
        const response = await fetch("http://localhost:3000/api/players")
        
        if (!response.ok) {
            throw new Error(`Failed to getAllPlayers. Status: ${response.status}`);
        }

        const data = await response.json()

        return data
    }
    catch (error) {
        console.error("Error in getAllPlayers:", error.message)
    } 
}

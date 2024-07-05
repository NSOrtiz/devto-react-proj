const API_URL = "https://desafiobk-g33-2.onrender.com"

export async function login({email, password}){
    try{
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers:{
                "Content-type": "application/json", 
            }, 
            body: JSON.stringify({
                email,
                password,
            }),
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "Inicio de sesión fallido");
        }
        const json = await response.json();
        const token = json.data.token;
        localStorage.setItem("token", token);
        return json.data.token;
        
    } catch(error){
        console.error("Error al iniciar sesión:", error);
        throw error;
    }
}

export async function createUser(user){
    try {
        const response= await fetch(`${API_URL}/users`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        }); 
        
        if (response.status === 409) {
            throw new Error('Email already in use');
        }

        if(!response.ok){
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "Error creating user");
        }
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error("Error creating user: ", error);
        throw error;
    }
}

export async function createPost(postbody, token){

    try {
        const response= await fetch(`${API_URL}/posts`,{
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(postbody)
        })

        if(!response.ok){
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "Error crating post");
        }
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error("Error creating post: ", error);
        throw error;
    }
}

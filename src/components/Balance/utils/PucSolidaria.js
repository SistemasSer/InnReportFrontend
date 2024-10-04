const apiUrlv1 = process.env.REACT_APP_API_URL_2;

export const PucSolidaria = async () => {
    try {
        const response = await fetch(`${apiUrlv1}/puc_coop`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const sortedData = data.sort((a, b) => a.Codigo.localeCompare(b.Codigo));
        
        return sortedData; // Retornar los datos ordenados
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
};
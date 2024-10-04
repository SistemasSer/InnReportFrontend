const apiUrlv1 = process.env.REACT_APP_API_URL_2;

export const EntidadesSolidaria = async () => {
    try {
        const response = await fetch(`${apiUrlv1}/entidad_defaul`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        
        // Filtrar las entidades que no son de TipoEntidad = 2
        const filteredData = data.filter(entidad => entidad.TipoEntidad === 2);
        
        // Ordenar los datos filtrados
        const sortedData = filteredData.sort((a, b) => a.Sigla.localeCompare(b.Sigla));
        
        return sortedData; // Retornar los datos ordenados
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
};
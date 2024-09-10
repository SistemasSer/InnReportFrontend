import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL_2;

export const deleteDocument = async (DocId) => {
  if (!DocId) {
    throw new Error('Document ID is required');
  }

  try {
    await axios.delete(`${apiUrl}/Documento/${DocId}/delete/`);
    
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      'Error al eliminar el documento';
    throw new Error(errorMessage);
  }
};
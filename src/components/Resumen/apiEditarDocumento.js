import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL_2;

export const updateDocument = async (DocId, formData) => {
  if (!DocId) {
    throw new Error('Document ID is required');
  }

  try {
    const response = await axios.patch(
      `${apiUrl}/Documento/${DocId}/update/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      'Error al actualizar el documento';
    throw new Error(errorMessage);
  }
};
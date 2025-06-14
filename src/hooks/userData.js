import useAxiosSecure from "./useAxiosSecure";

const axiosSecure = useAxiosSecure
export const userData = async({params}) => {
    try {
    const response = await axiosSecure.get(`/orderData/${params.id}`);
    return response.data;
  } catch (error) {
    console.error('Loader error:', error);
    throw new Response('Failed to load user data', { status: error.response?.status || 500 });
  }
};

 
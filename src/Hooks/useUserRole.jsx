import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUserRole = () => {
	const {user} = useAuth()
	const axiosSecure = useAxiosSecure();

	const email = user?.email;

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["user-role", email],
		queryFn: async () => {
			if (!email) return null;
			const response = await axiosSecure.get(`/user/${email}`);
			return response.data.role
		},
		enabled: !!email,
	})

	return {role: data, isLoading, error, refetch}
};

export default useUserRole;
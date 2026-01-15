import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../services/apiAuth";
function useSignUp() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success("Account created successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signup, isLoading };
}

export default useSignUp;

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useLogout = () => {
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem("userData");
    Cookies.remove("userData");
    router.replace("/authentication");
  }, [router]);

  return logout;
};

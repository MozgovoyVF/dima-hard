import { axiosWithAuth } from "@/app/api/interceptors";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { NEXT_URL } from "@/constants/global.constants";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export const useFatsecretHandle = () => {
  const { push } = useRouter();
  const [link, setLink] = useState("");
  const [tokens, setTokens] = useState<{ token: string; secret: string }>();
  const [error, setError] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  const handleRequestToken = async () => {
    setError("");
    try {
      const response = await axiosWithAuth.get(`${NEXT_URL}/api/fatsecret/request_token`);

      const data = response.data;
      setLink(data.link);
      const tokens = { token: data.oauth_token, secret: data.oauth_token_secret };
      setTokens(tokens);
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  const handleAccessToken = async () => {
    setError("");
    if (ref.current && ref.current.value) {
      try {
        await axiosWithAuth.post(`${NEXT_URL}/api/fatsecret/access_token`, {
          body: { code: ref.current.value, token: tokens?.token, secret: tokens?.secret },
        });

        push(DASHBOARD_PAGES.PERSONAL_ACCOUNT);
      } catch (error: any) {
        setError(error.response.data.error);
      }
    }
  };

  return { handleRequestToken, handleAccessToken, link, ref, error };
};

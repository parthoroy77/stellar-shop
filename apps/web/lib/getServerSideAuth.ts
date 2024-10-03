import { getUserAuth } from "@/actions/auth";

export async function getServerSideAuth() {
  return await getUserAuth();
}

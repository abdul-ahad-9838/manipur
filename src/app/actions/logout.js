"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function studentLogoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("student_auth");

  redirect("/student-login");
}

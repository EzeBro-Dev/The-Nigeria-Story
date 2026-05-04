import { supabase } from "../lib/supabaseClient";


export async function sendMagicLink(email) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: "http://localhost:5173/dashboard",
    },
  });

  if (error) return { error: error.message };

  return { success: true };
}


export async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:5173/dashboard",
    },
  });

  if (error) return { error: error.message };
}

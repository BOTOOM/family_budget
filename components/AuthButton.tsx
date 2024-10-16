import { getDictionary } from "@/app/dictionaries";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton({ lng }: { lng: string }) {
  const supabase = createClient();
  const dict = await getDictionary(lng);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect(`/${lng}/login`);
  };

  return user ? (
    <div className="flex items-center">
      <form action={signOut}>
        <button className="bg-btn-background hover:bg-btn-background-hover">
          {dict.navbar.logout}
        </button>
      </form>
    </div>
  ) : (
    <Link
      href={`/${lng}/login`}
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      {dict.navbar.login}
    </Link>
  );
}

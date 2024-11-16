import Image from "next/image";
import { useDashboardContext } from "./Provider";
import { useRouter } from "next/router";

export function TopBar() {
  const { openSidebar } = useDashboardContext();
  const router = useRouter();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");

    // Redirect to the login page
    router.push("/auth/signin");
  };

  return (
    <header className="relative z-10 h-16 w-full items-center bg-white shadow md:h-20">
      <div className="relative mx-auto flex h-full flex-col justify-center px-3">
        <div className="relative flex w-full items-center pl-1 sm:ml-0 sm:pr-2">
          <div className="relative left-0 flex w-3/4">
            <div className="group relative flex h-full w-12 items-center">
              <button
                type="button"
                aria-expanded="false"
                aria-label="Toggle sidenav"
                onClick={openSidebar}
                className="text-4xl text-black focus:outline-none"
              >
                &#8801;
              </button>
            </div>
          </div>
          <div className="relative ml-5 flex w-full items-center justify-end p-1 sm:right-auto sm:mr-0">
            
            {/* Profile & Logout */}
            <div className="relative flex items-center gap-4">
              <a href="#" className="relative block">
                <Image
                  alt="profile"
                  src="/assets/user_icon.jpg"
                  width={40}
                  height={40}
                  className="mx-auto h-10 w-10 rounded-full object-cover"
                />
              </a>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-600 hover:text-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

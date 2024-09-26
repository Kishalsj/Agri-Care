import ClientDashboardNav from "@/components/sections/client-dashboard/ClientDashboardNav";

export default function Layout({ children }) {
  return (
    <section className=" relative flex">
      <div className="flex flex-col px-[1px] md:px-4 lg:w-10/12 mx-auto space-y-12 md:space-y-0">
        <div className="lg:h-10"></div>
        <div className="flex flex-col flex-1 md:flex-row gap-4 md:gap-0 space-x-0 md:space-x-5">
          <div className="w-full  md:w-3/12 md:block">
            <div className="hidden md:block">
              <div className="rounded-2xl bg-gray-100 p-4">
                <ClientDashboardNav />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 md:w-9/12 rounded-2xl bg-gray-100 p-4">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

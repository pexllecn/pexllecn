import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";


const breadcrumbItems = [{ title: "Inbox", link: "/dashboard/inbox" }];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <Heading title={`Inbox`} description="Manage tasks by Pexlle" />
      </div>
    </>
  );
}

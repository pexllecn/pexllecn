import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";

const breadcrumbItems = [{ title: "Empty page", link: "/dashboard/empty" }];
export default function page() {
  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title={`Empty Page`}
        description=" Manage your account settings and set e-mail preferences."
      />{" "}
    </div>
  );
}

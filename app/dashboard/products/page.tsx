import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";

const breadcrumbItems = [{ title: "Products", link: "/dashboard/products" }];
export default function page() {
  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <Heading title={`Products`} description="" />{" "}
    </div>
  );
}

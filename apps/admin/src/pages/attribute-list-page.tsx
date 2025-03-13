import { column } from "@/components/data-tables/attributes/column";
import AttributeListDataTable from "@/components/data-tables/attributes/data-table";
import AddAttributeModalForm from "@/components/forms/add-attribute-modal-form";
import { useGetAllAttributesWithValuesQuery } from "@repo/redux";

const AttributeListPage = () => {
  const { data, isFetching } = useGetAllAttributesWithValuesQuery();
  const attributes = data?.data || [];
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Attribute List</h1>
        <AddAttributeModalForm />
      </div>
      <AttributeListDataTable columns={column} data={attributes} isLoading={isFetching} />
    </div>
  );
};

export default AttributeListPage;

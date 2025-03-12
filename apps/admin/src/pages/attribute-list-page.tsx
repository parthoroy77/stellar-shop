import { column } from "@/components/data-tables/attributes/column";
import AttributeListDataTable from "@/components/data-tables/attributes/data-table";
import { useGetAllAttributesWithValuesQuery } from "@repo/redux";

const AttributeListPage = () => {
  const { data, isFetching } = useGetAllAttributesWithValuesQuery();
  const attributes = data?.data || [];
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-medium">Attribute List</h1>
      <AttributeListDataTable columns={column} data={attributes} isLoading={isFetching} />
    </div>
  );
};

export default AttributeListPage;

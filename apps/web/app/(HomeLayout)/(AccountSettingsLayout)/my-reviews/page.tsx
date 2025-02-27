import MyReviewHeader from "@/components/AccountSettings/my-review/my-review-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/index";

const MyReviewsPage = () => {
  return (
    <div className="space-y-5">
      <MyReviewHeader />
      <hr />
      <Tabs defaultValue="to-be-reviewed">
        <TabsList>
          <TabsTrigger className="text-xs sm:min-w-[200px] sm:text-sm" value="to-be-reviewed">
            To Be Reviewed
          </TabsTrigger>
          <TabsTrigger className="text-xs sm:min-w-[200px] sm:text-sm" value="reviewed">
            Already Reviewed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="to-be-reviewed">To be reviewed</TabsContent>
        <TabsContent value="reviewed">Already Reviewed</TabsContent>
      </Tabs>
    </div>
  );
};

export default MyReviewsPage;

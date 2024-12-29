import ManageAddresses from "@/components/AccountSettings/Profile/manage-addresses";
import ManageProfilePhoto from "@/components/AccountSettings/Profile/manage-profile-photo";
import ProfileInformationForm from "@/components/Forms/Profile/profile-information-form";

const ProfilePage = () => {
  return (
    <div className="divide-y *:py-5">
      <div className="space-y-1 !pt-0">
        <h1 className="text-xl font-semibold">Manage Profile</h1>
        <span className="text-accent-foreground text-sm">Update your profile photo and personal information here.</span>
      </div>
      <ProfileInformationForm />
      <ManageProfilePhoto />
      <ManageAddresses />
    </div>
  );
};

export default ProfilePage;

import UserDonations from "../../../components/UserDonations";

export default function DashboardDonations() {

  return (
    <main className="dashboard-main-section w-full px-4 mx-auto">
      <UserDonations ShowAll={true} />
    </main>
  );
}

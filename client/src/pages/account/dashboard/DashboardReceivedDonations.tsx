import UserDonations from "../../../components/UserDonations";

export default function DashboardDonations() {
  return (
    <main className="dashboard-main-section w-full px-4 mx-auto overflow-y-auto overflow-x-hidden">
      <UserDonations ShowAll={true} />
    </main>
  );
}

import DashboardLayout from "@/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactNode } from "react";

const InstructorDashboardPage: NextPageWithLayout = () => <div>instructr</div>;

export default InstructorDashboardPage;

InstructorDashboardPage.getLayout = function getLayout(page): ReactNode {
  return <DashboardLayout>{page}</DashboardLayout>;
};

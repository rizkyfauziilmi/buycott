"use client";

import { ManageProductTable } from "./manage-product-table";
import { ProductApprovalChart } from "./product-approval-chart";
import { ProductCategoryChart } from "./product-category-chart";

export const ProductDashboard = () => {
  return (
    <div className="h-screen space-y-6 overflow-y-auto p-4">
      <div className="space-y-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Overview
        </h3>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <ProductCategoryChart />
          <ProductApprovalChart />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Manage Products
        </h3>
        <ManageProductTable />
      </div>
    </div>
  );
};

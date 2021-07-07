import React from "react";

// components

// import CardUpdateCategory from "components/Cards/CardUpdateCategory.js";
// import CardProfile from "components/Cards/CardProfile.js";

import CardUpdateBill from "../../../components/admin/Cards/CardUpdateBill.js";
import CardProfile from "../../../components/admin/Cards/CardProfile.js";

export default function UpdateCategory() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardUpdateBill />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}
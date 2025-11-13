"use client";
import SideNav from "@/components/dashboard/sideNav";
import { RiArrowRightUpLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import FilterComponent from "@/components/customer/filterBar";
import { useCustomers } from "./useCustomers";

const CustomerTrxn = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<boolean | "">("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedPerPage, setSelectedPerPage] = useState("10");
  const [searchValue, setSearchValue] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [sortBy, setSortBy] = useState("");
  const [selectedOrderLabel, setSelectedOrderLabel] = useState("Newest");

  const { getUsers } = useCustomers();
  const { data, isLoading } = getUsers({
    page,
    pageSize: parseInt(selectedPerPage),
    status: selectedStatus,
    startDate,
    endDate,
    name: searchValue,
    orderLabel: selectedOrderLabel,
  });

  const users = data?.data || [];

  const handleReset = () => {
    setSearchValue("");
    setSelectedStatus("");
    setSelectedOrder("");
    setSelectedOrderLabel("Newest");
    setSortBy("");
    setSelectedPerPage("10");
    setStartDate("");
    setEndDate("");
  };

  const cardData = [
    {
      title: "Total Number of Customers",
      number: data?.meta?.totalCount || 0,
      link: "",
      lastTxn: 0,
    },
    {
      title: "Your customers are in",
      number: data?.kpis?.totalNumber || 0,
      link: "",
      lastTxn: 0,
    },
  ];

  const formatAmount = (val: number | string) =>
    Number(val)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <SideNav>
      <div className="py-5">
        <div className="px-2.5 py-4 md:py-3.5 md:px-6 bg-white rounded-md my-4">
          <h1 className="text-[#072032] text-xl md:text-2xl font-semibold font-dm-sans mb-2">
            Customers
          </h1>

          <div className="grid md:grid-cols-2 gap-3">
            {cardData.map((card, index) => {
              return (
                <div
                  key={index}
                  className="py-3.5 px-3 bg-white border border-gray-200 rounded-md"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={38}
                          height={38}
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth={1}
                          >
                            <path
                              strokeLinejoin="round"
                              d="m15.5 10.5l-3 3l-2-2l-3 3"
                            ></path>
                            <path d="M14.5 4.5H7.7c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C4.5 6.02 4.5 6.58 4.5 7.7v8.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.428.218.988.218 2.108.218h8.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874c.218-.428.218-.988.218-2.108V9.5"></path>
                            <circle cx={18.5} cy={5.5} r={2}></circle>
                          </g>
                        </svg>
                        <p className="text-[#072032] font-semibold text-base font-dm-sans">
                          {card.title}
                        </p>
                      </div>

                      <h1 className="text-[#072032] font-medium font-dm-sans text-2xl py-1 ">
                        {card.number}
                      </h1>
                    </div>
                    <div className="bg-[#22c55e]/20 flex justify-center items-center w-[30px] h-[30px] rounded-md">
                      <RiArrowRightUpLine
                        className="text-[#22c55e]"
                        size={20}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <FilterComponent
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          handleReset={handleReset}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setSelectedOrderLabel={setSelectedOrderLabel}
          selectedOrderLabel={selectedOrderLabel}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <div className="py-3.5  bg-white rounded-md my-4">
          <div className="w-full pl-3 overflow-x-auto">
            <table className="w-full min-w-max border-collapse">
              <thead className="bg-[#e2e8f0] w-full">
                <tr className="bg-[#f7ecff] text-left text-sm font-medium text-gray-900">
                  <th className="font-poppins py-2 px-4 whitespace-nowrap text-sm font-semibold">
                    Name
                  </th>
                  <th className="font-poppins py-2 px-4 whitespace-nowrap text-sm font-semibold">
                    Email
                  </th>
                  <th className="font-poppins py-2 px-4 whitespace-nowrap text-sm font-semibold">
                    Phone
                  </th>
                  <th className="font-poppins py-2 px-4 whitespace-nowrap text-sm font-semibold">
                    Date Joined
                  </th>
                  <th className="font-poppins py-2 px-4 whitespace-nowrap text-sm font-semibold">
                    Country
                  </th>
                  <th className="font-poppins py-2 px-4 whitespace-nowrap text-sm font-semibold">
                    Last Transaction
                  </th>
                  <th className="font-poppins py-2 px-4 whitespace-nowrap text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8">
                      <Loader2 className="animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-6 text-sm font-poppins opacity-70"
                    >
                      No Customers found
                    </td>
                  </tr>
                ) : (
                  users.map((user: any, index: any) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-[#fbf6ff]"
                      } border-b border-gray-100`}
                    >
                      <td className="px-4 font-semibold text-sm py-3 font-poppins">
                        {user.fullName}
                      </td>
                      <td className="px-4 text-sm py-3 font-poppins">
                        {user.email}
                      </td>
                      <td className="px-4 text-sm py-3 font-poppins">
                        {user.phoneNumber || "-"}
                      </td>

                      <td className="px-4 text-sm py-3 font-poppins">
                        {new Date(user.createdAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      <td className="px-4 text-sm capitalize py-3 font-poppins">
                        {user.country || "-"}
                      </td>

                      <td className="px-4 text-sm capitalize py-3 font-poppins">
                        {user?.lastTransaction?.fromCurrency === "GBP"
                          ? "£"
                          : user?.lastTransaction?.fromCurrency === "NGN"
                          ? "₦"
                          : ""}
                        {user?.lastTransaction?.amount || "-"}
                      </td>
                      <td className="px-4 text-sm py-3 font-poppins">
                        <span
                          className={`p-1 text-center uppercase rounded-sm border ${
                            user.isVerified === true
                              ? "bg-green-500/40 text-green-500 border-green-500"
                              : "bg-red-500/40 text-red-500 border-red-500"
                          }`}
                        >
                          {user.isVerified === true
                            ? "APPROVED"
                            : "NOT APPROVED"}
                        </span>
                      </td>
                      {/* <td className="px-4 text-sm py-1 font-poppins">
                        {user.toCurrency === "NGN" ? "₦" : "£"}
                        {formatAmount(
                          user.toCurrency === "NGN"
                            ? user.convertedNGNAmount
                            : user.convertedGBPAmount
                        )}
                      </td>

                      <td className="px-4 text-sm py-1 font-poppins">
                        <span className="flex flex-col gap-0.5">
                          {user.recipientFullName}
                          <p>{user.recipientEmail}</p>
                        </span>
                      </td>

                      <td className="px-4 text-sm py-1 font-poppins">
                        <span>
                          {user.recipientBankName}
                          <p>{user.recipientAccountNumber}</p>
                        </span>
                      </td>

                     

                       */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!isLoading && (
            <div className="flex items-center justify-between mt-4 px-3 md:px-6">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="p-2 disabled:opacity-40"
              >
                <ChevronLeft />
              </button>

              <p className="text-xs font-poppins text-main-dark">
                Page {data?.meta.currentPage}
              </p>

              <button
                onClick={() => setPage(page + 1)}
                className="p-2 disabled:opacity-40"
              >
                <ChevronRight size={20} className="text-main-dark-II" />
              </button>
            </div>
          )}
        </div>
      </div>
    </SideNav>
  );
};

export default CustomerTrxn;

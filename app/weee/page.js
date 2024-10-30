"use client";

import "../globals.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import "../globals.css";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function Catalog() {
  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  const center = {
    lat: -34.397,
    lng: 150.644,
  };

  const lineChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    values: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
  };

  const donutChartData = {
    labels: ["Red", "Blue", "Yellow"],
    values: [300, 50, 100],
  };

  // Chart data configurations
  const lineChartConfig = {
    labels: lineChartData.labels,
    datasets: [
      {
        label: "My Line Chart",
        data: lineChartData.values,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const donutChartConfig = {
    labels: donutChartData.labels,
    datasets: [
      {
        label: "My Donut Chart",
        data: donutChartData.values,
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dummyData = [
    {
      corporate: "Acme Corp",
      location: "New York",
      weight: 1200,
      status: "Active",
    },
    {
      corporate: "Globex Inc.",
      location: "London",
      weight: 1500,
      status: "Inactive",
    },
    {
      corporate: "Umbrella Corp",
      location: "Tokyo",
      weight: 1100,
      status: "Active",
    },
    {
      corporate: "Wayne Enterprises",
      location: "Gotham",
      weight: 2000,
      status: "Pending",
    },
    {
      corporate: "Stark Industries",
      location: "Los Angeles",
      weight: 1700,
      status: "Active",
    },
    {
      corporate: "Oscorp",
      location: "New York",
      weight: 1300,
      status: "Inactive",
    },
    {
      corporate: "Soylent Corp",
      location: "San Francisco",
      weight: 1600,
      status: "Pending",
    },
  ];

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.$ = window.jQuery = require("jquery");
  //   }

  //   const table = $("#myTable").DataTable({
  //     responsive: {
  //       details: {
  //         type: "column",
  //         target: "tr",
  //       },
  //     },
  //     autoWidth: false,
  //     stateSave: true,
  //     destroy: true,
  //     lengthMenu: [50, 100, 150],
  //     columnDefs: [
  //       {
  //         responsivePriority: 2,
  //         targets: 0,
  //       },
  //       {
  //         visible: true,
  //         targets: 1,
  //       },
  //       {
  //         responsivePriority: 3,
  //         targets: 2,
  //       },
  //       {
  //         responsivePriority: 1,
  //         targets: 3,
  //       },
  //     ],
  //   });

  //   if (dummyData.length) {
  //     table.clear();
  //     dummyData.forEach((item) => {
  //       table.row
  //         .add([item.corporate, item.location, item.weight, item.status])
  //         .draw();
  //     });
  //   } else {
  //     table.clear();
  //     table.draw();
  //   }

  //   return () => {
  //     table.destroy();
  //   };
  // }, []);

  return (
    <section className="w-full bg-inherit">
      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-flow-dense gap-4 mb-4">
        <div className="col-span-2 row-span-3 bg-white rounded-lg flex flex-col justify-start items-start p-4">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Collections
          </h1>
          <Line
            data={lineChartConfig}
            // options={{
            //   responsive: true,
            //   maintainAspectRatio: true,
            // }}
          />
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 row-span-2 bg-white rounded-lg flex flex-col justify-start items-start p-4">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Trend of Collection
          </h1>
          <Doughnut
            data={donutChartConfig}
            // options={{
            //   responsive: true,
            //   maintainAspectRatio: true,
            // }}
          />
        </div>
        <div className="col-span-2 row-span-3 bg-white rounded-lg flex flex-col justify-start items-start p-4 w-full">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Collection Requests
          </h1>
          <div className="relative overflow-x-auto w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Corporate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Weight
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data.corporate}
                    </th>
                    <td className="px-6 py-4">{data.location}</td>
                    <td className="px-6 py-4">{data.weight}</td>
                    <td className="px-6 py-4">{data.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 row-span-4 bg-white rounded-lg flex flex-col justify-start items-start p-4">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Activity Overview
          </h1>
          <ol className="relative border-s border-gray-200 dark:border-gray-700">
            <li className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                February 2022
              </time>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                Added new Driver Doja
              </h3>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                Driver Doja brings enhanced performance and compatibility,
                ensuring seamless integration with your existing fleet. Enjoy
                features like real-time tracking, advanced diagnostics, and
                optimized fuel efficiency across 20+ modules, including
                dashboards, analytics, and maintenance schedules.
              </p>
              {/* <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                Learn more{" "}
                <svg
                  className="w-3 h-3 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a> */}
            </li>
            <li className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                March 2022
              </time>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                Approved Collection Request
              </h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                The collection request has been successfully approved and is now
                being processed. You can track the progress and view details on
                the updated project dashboard.
              </p>
            </li>
            <li className="ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                April 2022
              </time>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                New Vehicle Added
              </h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                The new vehicle has been successfully added to your fleet.
                Explore its features and integrate it with your existing
                operations seamlessly.
              </p>
            </li>
          </ol>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg h-80 flex justify-center items-center overflow-hidden">
        <LoadScript
          className="rounded-lg max-h-80 flex justify-center items-center"
          googleMapsApiKey="AIzaSyDTAWQ2aQW3a4ZiPTR0c2VZ_EaHk-TUTZI"
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={8}
            className="rounded-lg max-h-80 flex justify-center items-center"
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    </section>
  );
}

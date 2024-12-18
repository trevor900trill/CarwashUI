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
    labels: ["Basic Wash", "Premium Wash", "Exterior Polish"],
    values: [300, 50, 100],
  };

  // Chart data configurations
  const lineChartConfig = {
    labels: lineChartData.labels,
    datasets: [
      {
        label: "Car Wash Requests Trend",
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
        label: "Service Distribution",
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
      user: "John Doe",
      rating: 4.5,
      service: "Premium Wash",
      earnings: 50.0,
    },
    {
      user: "Jane Smith",
      rating: 4.0,
      service: "Basic Wash",
      earnings: 20.0,
    },
    {
      user: "Mike Johnson",
      rating: 3.8,
      service: "Interior Detailing",
      earnings: 75.0,
    },
    {
      user: "Emily Davis",
      rating: 4.9,
      service: "Exterior Polish",
      earnings: 100.0,
    },
    {
      user: "Chris Brown",
      rating: 3.5,
      service: "Engine Cleaning",
      earnings: 120.0,
    },
    {
      user: "Sarah Wilson",
      rating: 4.7,
      service: "Deluxe Wash",
      earnings: 90.0,
    },
    {
      user: "David Clark",
      rating: 3.2,
      service: "Basic Wash",
      earnings: 18.0,
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
            Car Wash Visits
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
            Popular Services
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
            Top Earners
          </h1>
          <div className="relative overflow-x-auto w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Earnings
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
                      {data.user}
                    </th>
                    <td className="px-6 py-4">{data.rating}</td>
                    <td className="px-6 py-4">{data.service}</td>
                    <td className="px-6 py-4">{data.earnings}</td>
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
                Launched Premium Wash Service
              </h3>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                Our Premium Wash service is now live, offering customers a
                complete car detailing experience, including exterior polish,
                interior vacuuming, and tire shine. Enjoy a new level of
                cleanliness and customer satisfaction.
              </p>
            </li>
            <li className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                March 2022
              </time>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                Approved New Customer Subscription
              </h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                A new customer subscription was approved for the unlimited
                monthly car wash package. The subscription includes access to
                priority booking and exclusive discounts on additional services.
              </p>
            </li>
            <li className="ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                April 2022
              </time>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                Added New Washing Bay
              </h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                A new washing bay has been added to the facility, increasing our
                capacity to serve customers during peak hours. The new bay
                includes state-of-the-art equipment for faster and more
                efficient washes.
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

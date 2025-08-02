import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getAnalyticsData = async () => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null, // to group all documents together
        totalSales: { $sum: 1 }, // count of all orders
        totalRevenue: { $sum: "$totalAmount" }, // sum of all order prices
      },
    },
  ]);
  const { totalSales, totalRevenue } = salesData[0] || {
    totalSales: 0,
    totalRevenue: 0,
  };

  return {
    users: totalUsers,
    products: totalProducts,
    totalSales,
    totalRevenue,
  };
};

export const getDailySalesData = async (startDate, endDate) => {
  try {
    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // group by date
          sales: { $sum: 1 }, // count of orders per day
          revenue: { $sum: "$totalAmount" }, // sum of order prices per day
        },
      },
      {
        $sort: { _id: 1 }, // sort by date ascending or rising
      },
    ]);

    // Example of daily sales data format:
    //   [
    //     {
    //       _id: "2023-10-01",
    //       sales: 10,
    //       revenue: 500.55,
    //     },
    //   ];

    const dateArray = getDatesInRange(startDate, endDate);
    console.log("Date Array:", dateArray); // Debugging line to check date array

    return dateArray.map((date) => {
      const foundData = dailySalesData.find((item) => item._id === date);

      return {
        date,
        sales: foundData?.sales || 0,
        revenue: foundData?.revenue || 0,
      };
    });
  } catch (error) {
    throw error;
  }
};

function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]); // format as YYYY-MM-DD
    currentDate.setDate(currentDate.getDate() + 1); // increment by one day
  }

  return dates;
}

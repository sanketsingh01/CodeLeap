import React from "react";
import {
  eachDayOfInterval,
  format,
  startOfToday,
  subDays,
  getDay,
  isSameMonth,
  getDaysInMonth,
} from "date-fns";
import clsx from "clsx";

const LoginHeatmap = ({ loginMap = {} }) => {
  const today = startOfToday();
  const startDate = subDays(today, 364); // 365 days total including today

  // Get all days in our range
  const allDays = eachDayOfInterval({
    start: startDate,
    end: today,
  });

  console.log("Total days in range:", allDays.length);
  console.log("Start date:", format(startDate, "yyyy-MM-dd (EEE)"));
  console.log("End date:", format(today, "yyyy-MM-dd (EEE)"));

  // Group days by month for debugging
  const monthCounts = {};
  allDays.forEach((day) => {
    const monthKey = format(day, "yyyy-MM");
    monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
  });
  console.log("Days per month:", monthCounts);

  // Create grid: 53 weeks × 7 days
  const totalWeeks = 53;
  const grid = Array(totalWeeks)
    .fill(null)
    .map(() => Array(7).fill(null));

  // Fill the grid with actual days
  allDays.forEach((day, index) => {
    const daysSinceStart = Math.floor(
      (day - startDate) / (1000 * 60 * 60 * 24)
    );
    const startDayOfWeek = getDay(startDate);
    const totalDaysFromGridStart = daysSinceStart + startDayOfWeek;

    const weekIndex = Math.floor(totalDaysFromGridStart / 7);
    const dayIndex = totalDaysFromGridStart % 7;

    if (weekIndex < totalWeeks && dayIndex < 7) {
      grid[weekIndex][dayIndex] = day;
    }
  });

  // Remove empty weeks at the end
  const weeks = grid.filter((week) => week.some((day) => day !== null));

  // Calculate month labels
  const monthLabels = weeks.map((week, index) => {
    const firstRealDay = week.find((day) => day !== null);

    if (!firstRealDay) {
      return { show: false, label: "" };
    }

    if (index === 0) {
      return { show: true, label: format(firstRealDay, "MMM") };
    }

    const prevWeek = weeks[index - 1];
    const prevFirstRealDay = prevWeek
      ? prevWeek.find((day) => day !== null)
      : null;

    if (!prevFirstRealDay) {
      return { show: true, label: format(firstRealDay, "MMM") };
    }

    const shouldShow = !isSameMonth(firstRealDay, prevFirstRealDay);

    return {
      show: shouldShow,
      label: shouldShow ? format(firstRealDay, "MMM") : "",
    };
  });

  const getDayIntensity = (dateStr) => {
    const loginCount = loginMap[dateStr] || 0;
    if (loginCount === 0) return 0;
    return 4;
  };

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 0:
        return "bg-gray-800";
      case 4:
        return "bg-green-400";
      default:
        return "bg-gray-800";
    }
  };

  return (
    <div className="p-6 bg-black text-white mt-10 rounded-xl">
      <h2 className="mb-4 text-xl font-semibold">Login Activity</h2>

      <div className="relative">
        {/* Month Labels */}
        <div className="flex mb-2">
          {monthLabels.map((month, i) => (
            <div
              key={i}
              className={clsx("text-xs text-gray-400", {
                "ml-2": month.show && i > 0,
              })}
              style={{ width: "15px", marginRight: "2px" }}
            >
              {month.show ? month.label : ""}
            </div>
          ))}
        </div>

        {/* Day labels (Sun, Mon, etc.) */}
        <div className="absolute left-0 top-6 flex flex-col text-xs text-gray-400">
          <div className="h-3 mb-1">Sun</div>
          <div className="h-3 mb-1"></div>
          <div className="h-3 mb-1">Tue</div>
          <div className="h-3 mb-1"></div>
          <div className="h-3 mb-1">Thu</div>
          <div className="h-3 mb-1"></div>
          <div className="h-3 mb-1">Sat</div>
        </div>

        {/* Heatmap Grid */}
        <div className="flex gap-1 ml-8">
          {weeks.map((week, weekIdx) => (
            <div
              key={weekIdx}
              className={clsx("flex flex-col gap-1", {
                "ml-2": monthLabels[weekIdx]?.show && weekIdx > 0,
              })}
            >
              {week.map((day, dayIdx) => {
                if (day === null) {
                  return null;
                }

                const dateStr = format(day, "yyyy-MM-dd");
                const loginCount = loginMap[dateStr] || 0;
                const intensity = getDayIntensity(dateStr);

                return (
                  <div
                    key={dayIdx}
                    title={`${format(
                      day,
                      "MMM d, yyyy"
                    )} - ${loginCount} login${loginCount !== 1 ? "s" : ""}`}
                    className={clsx(
                      "w-3 h-3 rounded-sm",
                      getIntensityColor(intensity)
                    )}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginHeatmap;

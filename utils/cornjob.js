const cron = require("node-cron");
const User = require("../models/userModel");
const { subDays, startOfDay, endOfDay } = require("date-fns");

cron.schedule("* * * * *", async () => {
    console.log("Hello world " + new Date());

    try {

        const yesterDay = subDays(new Date(), 1);
        const yesterDayStart = startOfDay(yesterDay);
        const yesterDayEnd = endOfDay(yesterDay)

        console.log(yesterDayStart, yesterDayEnd);


        const users = await User.find({ 
            status: "active",
            createdAt:{
                $gte: yesterDayStart,
                $lt: yesterDayEnd
            }
        });
        console.log(users);  // You’ll see the list of active users
    } catch (error) {
        console.error("Error fetching users:", error);
    }
});















// ┌───────────── second (0 - 59)
// │ ┌───────────── minute (0 - 59)
// │ │ ┌───────────── hour (0 - 23)
// │ │ │ ┌───────────── day of month (1 - 31)
// │ │ │ │ ┌───────────── month (1 - 12)
// │ │ │ │ │ ┌───────────── day of week (0 - 7) (0 or 7 = Sunday)
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *

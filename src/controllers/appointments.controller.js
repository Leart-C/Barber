const { getAvailableSlots } = require("../services/slots.service");
const { createAppointment } = require("../services/appointments.service");

async function bookAppointment(req, res) {
  try {
    const { date, slot, clientName } = req.body;
    const userId = req.user.userId;

    if (!date || !slot || !clientName) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["date", "slot", "clientName"],
      });
    }

    const appointment = await createAppointment({
      date,
      slot,
      clientName,
      userId,
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: {
        id: appointment.id,
        date: appointment.date,
        time: appointment.slot_time.slice(0, 5),
        clientName: appointment.client_name,
        status: appointment.status,
      },
    });
  } catch (err) {
    if (err.message === "SLOT_TAKEN") {
      return res.status(409).json({
        error: "Termini vecse eshte nxene",
        message: "Ky slot është marrë tashmë. Ju lutem zgjidhni një tjetër.",
      });
    }

    if (err.message === "DAY_CLOSED") {
      return res.status(400).json({
        error: "Day is closed",
        message: "Berberi nuk punon në këtë datë.",
      });
    }
    console.error("Error booking appointment:", err);
    res.status(500).json({
      error: "Internal server error",
      message: "Diçka shkoi gabim. Ju lutem provoni përsëri.",
    });
  }
}

async function availableSlots(req, res) {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        error: "Date is required",
        example: "/api/appointments/available?date=2024-03-15",
      });
    }

    const result = await getAvailableSlots(date);

    res.json({
      success: true,
      date,
      closed: result.closed,
      message: result.message,
      availableSlots: result.slots,
      count: result.slots.length,
    });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  availableSlots,
  bookAppointment,
};

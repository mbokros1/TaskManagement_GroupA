import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TicketDetail() {
  const { id } = useParams();

  return (
    <div>
      Ticket Detail View
    </div>
  );
}

import { useState } from "react";

function CreateTicketForm(){
    const today = new Date();
    const [ticketname, setTicketName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(today);
    const [dueDate, setDueDate] = useState(today);
    const [assignment, setAssignment] = useState("");

    const handleCreateTicketSubmit = async (e) => {
        e.preventDefault();
    }

    return(<div>
        <h4>Create New Ticket</h4>
        <form onSubmit={handleCreateTicketSubmit}>
            <input 
            value={ticketname}
            onChange={e => setTicketName(e.target.value)}
            placeholder="task"
            required
            // TODO on all: send data in useState to back end
            />
            <input 
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Please describe this task here."
            />
            <input
            value={startDate}
            onChange={e => setStartDate(new Date(e.target.value))}
            //Both Canada and India use dd/mm/yy format
            // TODO: validate that user input is actually a date
            placeholder={`${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`}
            />
            <input 
            value={dueDate}
            onChange={e => setDueDate(new Date(e.target.value))}
            // TODO: validate that user input is actually a date
            placeholder={`${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`}
            />
            <input
            value={assignment}
            onChange={e => setAssignment(e.target.value)}
            placeholder="Assigned to"
            // TODO: make sure that input is a selection from users with dev role
            />
        </form>
    </div>);
}

export default CreateTicketForm;
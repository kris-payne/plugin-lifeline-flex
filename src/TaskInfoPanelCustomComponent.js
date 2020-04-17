import React from 'react';

const TaskInfoPanelCustomComponent = (props) => {
const phoneNumber = props.task.source.attributes.custPhoneNumber;
const name = props.task.source.attributes.custName;

return (
         <div>
             <br />
             <hr />
             <h3>Attached Task Attributes</h3>
             <ul>
               <li>Customer's Phone Number: {phoneNumber}</li>
               <li>Customer's Name: {name}</li>
             </ul>
         </div>
);
}
export default TaskInfoPanelCustomComponent;
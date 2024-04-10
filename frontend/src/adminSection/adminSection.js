import { useState, useEffect } from 'react';
import "../App.css";
import Airtable from 'airtable';

const baseID = 'app6jwabQc7oAiKOz';
const tableName = 'tblTqWNfklvo3A3B5';
const apiKey = 'patyshrIvDewX5ttf.cd7f9555627cd562cb47a10102e29ae66bbca96b9cec612e8e574ff7bb8be952';

const base = new Airtable({apiKey: apiKey}).base(baseID);

export default function AdminSection() {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await base(tableName).select().all();
                setTableData(records);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-8 mb-4">Past Delayed Flight Records</h1>
            <div className="admin-section">
                <div className="admin-section__left">
                </div>
                <div className="admin-section__right">
                    <div className="admin-section__right__content">
                        <table>
                            <thead>
                                <tr>
                                    <th>Flight Number</th>
                                    <th>No Delay Operational Cost</th>
                                    <th>No Delay Satisfaction Cost</th>
                                    <th>No Delay Reimbursemnt Cost</th>
                                    <th>No Delay Downstream Cost</th>
                                    <th>No Delay Total Cost</th>
                                    <th></th>
                                    <th>Delay Operational Cost</th>
                                    <th>Delay Satisfaction Cost</th>
                                    <th>Delay Reimbursement Cost</th>
                                    <th>Delay Downstream Cost</th>
                                    <th>Delay Total Cost</th>
                                    <th>Decision</th>
                                    <th>Delay Category</th>
                                    <th>Justification</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((record) => (
                                    <tr key={record.id}>
                                        <td>{record.fields.flight_number}</td>
                                        <td>{record.fields.no_delay_operational_cost}</td>
                                        <td>{record.fields.delay_operational_cost}</td>
                                        <td>{record.fields.no_delay_satisfaction_cost}</td>
                                        <td>{record.fields.delay_satisfaction_cost}</td>
                                        <td>{record.fields.no_delay_reimbursement_cost}</td>
                                        <td>{record.fields.delay_reimbursement_cost}</td>
                                        <td>{record.fields.no_delay_downstream_cost}</td>
                                        <td>{record.fields.delay_downstream_cost}</td>
                                        <td>{record.fields.no_delay_total_cost}</td>
                                        <td>{record.fields.delay_total_cost}</td>
                                        <td>{record.fields.decision}</td>
                                        <td>{record.fields.remarks}</td>
                                        <td>{record.fields.justification}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

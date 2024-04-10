import { useState, useEffect } from 'react';
import "../App.css";
import Airtable from 'airtable';

const baseID = 'app6jwabQc7oAiKOz';
const tableName = 'tblTqWNfklvo3A3B5';
const apiKey = 'patyshrIvDewX5ttf.cd7f9555627cd562cb47a10102e29ae66bbca96b9cec612e8e574ff7bb8be952';

const base = new Airtable({apiKey: apiKey}).base(baseID);

export default function AdminSection() {
    const [tableData, setTableData] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);

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

    const handleFlightSelect = (flight) => {
        setSelectedFlight(flight === selectedFlight ? null : flight); 
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-8 mb-4">Past Delayed Flight Records</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border px-4 py-2 text-xl">Flight Number</th>
                        <th className="border px-4 py-2 text-xl">Decision</th>
                        <th className="border px-4 py-2 text-xl">Justification</th>
                        <th className="border px-4 py-2 text-xl">Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((record, index) => (
                        <>
                            <tr key={record.fields.flight_number} onClick={() => handleFlightSelect(record.fields.flight_number)} 
                                className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}>
                                <td className="border px-4 py-2">TR{record.fields.flight_number}</td>
                                <td className="border px-4 py-2">{record.fields.decision}</td>
                                <td className="border px-4 py-2">{record.fields.justification}</td>
                                <td className="border px-4 py-2">{record.fields.remarks}</td>
                            </tr>
                            {selectedFlight === record.fields.flight_number && (
                                <tr className="expanded-row">
                                    <td colSpan="4">
                                        <div className="mt-6 mb-6">
                                            <h1 className="text-3xl font-bold text-center mt-8 mb-4">Cost Breakdown for TR{record.fields.flight_number}:</h1>
                                            <table className="mx-auto w-full lg:w-1/2 table-fixed">
                                                <tbody>
                                                    <tr>
                                                        <th className="border px-4 py-2 text-xl">No Delay Cost Breakdown</th>
                                                        <th className="border px-4 py-2 text-xl">Cost</th>
                                                    </tr>
                                                    <tr className="bg-gray-100 hover:bg-gray-200 border px-4 py-2">
                                                        <td className="border px-4 py-2">No Delay Operational Cost</td>
                                                        <td>{record.fields.no_delay_operational_cost}</td>
                                                    </tr>
                                                    <tr className="bg-white hover:bg-gray-200 border px-4 py-2">
                                                        <td>No Delay Satisfaction Cost</td>
                                                        <td>{record.fields.no_delay_satisfaction_cost}</td>
                                                    </tr>
                                                    <tr className="bg-gray-100 hover:bg-gray-200 border px-4 py-2">
                                                        <td>No Delay Reimbursement Cost</td>
                                                        <td>{record.fields.no_delay_reimbursement_cost}</td>
                                                    </tr>
                                                    <tr className="bg-white hover:bg-gray-200 border px-4 py-2">
                                                        <td>No Delay Downstream Cost</td>
                                                        <td>{record.fields.no_delay_downstream_cost}</td>
                                                    </tr>
                                                    <tr className="bg-gray-100 hover:bg-gray-200 border px-4 py-2">
                                                        <td>No Delay Total Cost</td>
                                                        <td>{record.fields.no_delay_total_cost}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="mt-4 mb-4">
                                            <table className="mx-auto w-full lg:w-1/2 table-fixed">
                                                <tbody>
                                                    <tr>
                                                        <th className="border px-4 py-2 text-xl">Delay Cost Breakdown</th>
                                                        <th className="border px-4 py-2 text-xl">Cost</th>
                                                    </tr>
                                                    <tr className="bg-gray-100 hover:bg-gray-200 border px-4 py-2">
                                                        <td>Delay Operational Cost</td>
                                                        <td>{record.fields.delay_operational_cost}</td>
                                                    </tr>
                                                    <tr className="bg-white hover:bg-gray-200 border px-4 py-2">
                                                        <td>Delay Satisfaction Cost</td>
                                                        <td>{record.fields.delay_satisfaction_cost}</td>
                                                    </tr>
                                                    <tr className="bg-gray-100 hover:bg-gray-200 border px-4 py-2">
                                                        <td>Delay Reimbursement Cost</td>
                                                        <td>{record.fields.delay_reimbursement_cost}</td>
                                                    </tr>
                                                    <tr className="bg-white hover:bg-gray-200 border px-4 py-2">
                                                        <td>Delay Downstream Cost</td>
                                                        <td>{record.fields.delay_downstream_cost}</td>
                                                    </tr>
                                                    <tr className="bg-gray-100 hover:bg-gray-200 border px-4 py-2">
                                                        <td>Delay Total Cost</td>
                                                        <td>{record.fields.delay_total_cost}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
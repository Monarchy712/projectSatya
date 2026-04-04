import './Ledger.css';

function Ledger(props) {
    // main ledger table to show transactions
    const { contractors } = props;

    return (
        <section className="ledger">
            <h2 className="ledger__header">Public Ledger</h2>
            <div className="ledger__table">
                <table>
                    <thead>
                        <tr>
                            <th>Contractor</th>
                            <th>Status</th>
                            <th>On-Chain Hash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contractors?.map(c => (
                            <tr key={c.id}>
                                <td>{c.name}</td>
                                <td>{c.status}</td>
                                <td>{c.hash}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Ledger;

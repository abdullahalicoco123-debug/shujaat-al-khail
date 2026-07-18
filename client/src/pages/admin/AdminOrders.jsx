import { useState, useEffect } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const statusOptions = ["pending", "confirmed", "delivered", "cancelled"];

  const fetchOrders = () => {
    const token = localStorage.getItem("adminToken");
    fetch("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) fetchOrders();
    } catch {
      alert("Could not update status");
    }
  };

  const formatPrice = (value) => `SAR ${value.toLocaleString("en-US")}`;
  const formatDate = (d) => new Date(d).toLocaleString();

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="admin-products">
      <div className="admin-products-header">
        <h2>Orders ({orders.length})</h2>
      </div>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>City</th>
              <th>Total</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <>
                <tr key={order._id}>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{order.customerName}</td>
                  <td>{order.customerPhone}</td>
                  <td>{order.city}</td>
                  <td>{formatPrice(order.totalAmount)}</td>
                  <td>
                    <select
                      className={`admin-status admin-status-${order.status}`}
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="admin-edit-btn"
                      onClick={() =>
                        setExpanded(expanded === order._id ? null : order._id)
                      }
                    >
                      {expanded === order._id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {expanded === order._id && (
                  <tr key={`${order._id}-details`}>
                    <td colSpan="7">
                      <div className="admin-order-details">
                        <p>
                          <strong>Address:</strong> {order.address}, {order.city}
                        </p>
                        {order.customerEmail && (
                          <p>
                            <strong>Email:</strong> {order.customerEmail}
                          </p>
                        )}
                        {order.notes && (
                          <p>
                            <strong>Notes:</strong> {order.notes}
                          </p>
                        )}
                        <div className="admin-order-items">
                          {order.items.map((item, i) => (
                            <div className="admin-order-item" key={i}>
                              <img
                                src={
                                  item.image ||
                                  "https://via.placeholder.com/48?text=Item"
                                }
                                alt=""
                              />
                              <span>
                                {item.nameEn} — {item.quantity} ×{" "}
                                {formatPrice(item.price)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;